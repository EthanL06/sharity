"use client";
type Props = {};

import { Button } from "@/components/ui/button";
import { google } from "@google-cloud/vision/build/protos/protos";
import {
  ArrowRightCircle,
  Box,
  CircleHelp,
  CloudUpload,
  Search,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ManualInput from "./components/manual-input";
import { useList } from "@/context/ListContext";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ListItem = {
  name: string;
  quantity: number;
  icon: JSX.Element;
};

const Page = (props: Props) => {
  const router = useRouter();
  const { list, setList } = useList();
  const [files, setFiles] = useState<FileList>();
  const [loading, setLoading] = useState(false);

  // before the files are sent, they have to be converted to base64
  const convertFilesToBase64 = async () => {
    if (!files) return;

    const promises = Array.from(files).map(async (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });

    const base64Files = await Promise.all(promises);
    return base64Files;
  };

  // Get the labels from the images. If there are the same labels, they will be combined and the quantity will be increased
  const processLabels = async (
    labelsArr: google.cloud.vision.v1.IEntityAnnotation[][], // TODO: Fix this type. Also make sure it corresponds with the backend
  ) => {
    const newItems: ListItem[] = [];
    labelsArr.forEach((labels) => {
      labels.forEach((label) => {
        if (label.score && label.score < 0.7) return;
        const name = label.description as string;
        const icon = <Box className="size-8" />;
        const existingItem = newItems.find((item) => item.name === name);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          newItems.push({ name, quantity: 1, icon });
        }
      });
    });

    // If there already items in the list, combine them with the new items
    if (list.length > 0) {
      const combinedItems: ListItem[] = [];
      list.forEach((item) => {
        const existingItem = newItems.find(
          (newItem) => newItem.name === item.name,
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          combinedItems.push(item);
        }
      });

      newItems.push(...combinedItems);
    }

    setList(newItems);
  };

  const sendFiles = async () => {
    const base64Files = await convertFilesToBase64();
    if (!base64Files) return;

    setFiles(undefined);
    setLoading(true);
    const response = await fetch("/api/scan_images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: base64Files }),
    });

    const { labels } = await response.json();
    await processLabels(labels);
    setLoading(false);
  };

  return (
    <div className=" grid grid-cols-1 grid-rows-2 space-x-8 divide-y-4 divide-dotted px-6 py-12 lg:px-20 min-[1140px]:grid-cols-2 min-[1140px]:grid-rows-1 min-[1140px]:divide-x-4 min-[1140px]:divide-y-0">
      <div className="flex flex-col pb-8">
        <div className="space-y-8">
          <div className="space-y-1">
            <h1 className="relative inline-flex items-center gap-x-1  text-4xl font-bold">
              <span>Scan Items to Donate </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-full"
                    size={"icon"}
                    variant={"ghost"}
                  >
                    <CircleHelp
                      strokeWidth={2.5}
                      className="size-6 text-slate-500"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      About Scanning Items
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Uploaded images are sent to our servers where they are
                      processed by our AI object detection model. Images are not
                      stored on our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </h1>
            <p className="text-2xl">
              Upload images of your donation items. We will handle the rest.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <input
              onChange={(e) => {
                const userFiles = e.target.files;
                if (!userFiles) return;

                if (!files) {
                  setFiles(userFiles as FileList);
                  return;
                }

                const newFiles = Array.from(files); // Convert FileList to array
                for (let i = 0; i < userFiles.length; i++) {
                  newFiles.push(userFiles[i]);
                }

                // convert back to FileList
                const newFilesList = new DataTransfer();
                newFiles.forEach((file) => {
                  newFilesList.items.add(file);
                });

                setFiles(newFilesList.files);
              }}
              id="file-picker"
              type="file"
              className="hidden"
              multiple
              accept=".jpeg, .jpg, .png, .gif, .bmp, .webp, .raw, .ico, .pdf, .tiff"
            />
            <Button
              className="space-x-4 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
              variant={"default"}
              size={"lg"}
              onClick={() => {
                document.getElementById("file-picker")?.click();
              }}
            >
              <CloudUpload className="size-8" strokeWidth={3} />{" "}
              <span>Upload Images</span>
            </Button>

            <ManualInput />
          </div>

          <div className="pb-6">
            {files && (
              <div className="flex h-full max-h-[30rem] flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
                {Array.from(files).map((file, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-x-2"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      className="size-16 rounded-lg border object-cover"
                      width={128}
                      height={128}
                      alt={file.name}
                    />

                    <div className="font-medium">{file.name}</div>
                    <Button
                      onClick={() => {
                        const newFiles = Array.from(files); // Convert FileList to array
                        for (let i = 0; i < files.length; i++) {
                          if (files[i].name === file.name) {
                            newFiles.splice(i, 1);
                            break;
                          }
                        }

                        // convert back to FileList
                        const newFilesList = new DataTransfer();
                        newFiles.forEach((file) => {
                          newFilesList.items.add(file);
                        });

                        setFiles(newFilesList.files);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <TrashIcon strokeWidth={2.75} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {
              // If the loading state is active, show a loading spinner
              loading && (
                <div className="flex flex-col items-center justify-center gap-1 text-xl font-medium">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span>Scanning items...</span>
                </div>
              )
            }
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-2 sm:justify-end ">
          <Button
            disabled={loading || !files}
            onClick={sendFiles}
            className=" space-x-3 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
            variant={"default"}
            size={"lg"}
          >
            <span>Scan Images</span>

            <Search strokeWidth={3} />
          </Button>

          <Button
            onClick={() => router.push("/map")}
            disabled={list.length === 0 || loading}
            className="space-x-3 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
            variant={"default"}
            size={"lg"}
          >
            <span>Confirm Items</span>

            <ArrowRightCircle strokeWidth={3} />
          </Button>
        </div>
      </div>

      <div className="flex  flex-col space-y-8 pt-8 min-[1140px]:pl-8 min-[1140px]:pt-0">
        <h2 className="relative text-4xl font-bold">
          <span>Your List</span>
          <svg
            className="absolute bottom-[-12px] left-[4px] hidden md:block "
            width="149"
            height="14"
            viewBox="0 0 149 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7C12.5333 1.66667 22.0667 1.66667 31.6 7C41.1333 12.3333 50.6667 12.3333 60.2 7C69.7333 1.66667 79.2667 1.66667 88.8 7C98.3333 12.3333 107.867 12.3333 117.4 7C126.933 1.66667 136.467 1.66667 146 7"
              stroke="#4C75F2"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </h2>

        <div className="h-full max-h-full space-y-8 overflow-y-auto pr-4 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
          {list.map((item, index) => (
            <div
              key={item.name + "-" + index}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center gap-x-3">
                <div className="shrink-0">{item.icon}</div>
                <span className="text-2xl font-semibold">{item.name}</span>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-2xl font-medium">{item.quantity}x</span>
                <Button
                  onClick={() => {
                    const newList = list.filter((_, i) => i !== index);
                    setList(newList);
                  }}
                  className="rounded-full"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <TrashIcon strokeWidth={2.75} className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}

          {
            // If there are no items in the list, show a message
            list.length === 0 && (
              <div className="text-xl font-medium text-slate-800">
                Scan items to add to your list!
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default Page;
