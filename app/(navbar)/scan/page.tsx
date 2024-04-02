"use client";
type Props = {};

import { Button } from "@/components/ui/button";
import { google } from "@google-cloud/vision/build/protos/protos";
import {
  Apple,
  ArrowRightCircle,
  Book,
  Box,
  ChefHat,
  CircleHelp,
  CloudUpload,
  Footprints,
  ShirtIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ListItem = {
  name: string;
  quantity: number;
  icon: JSX.Element;
};

const Page = (props: Props) => {
  const [files, setFiles] = useState<FileList>();
  const [list, setList] = useState<ListItem[]>([]);

  // const list = [
  //   {
  //     name: "Clothes",
  //     quantity: 1,
  //     icon: <ShirtIcon className="size-8" />,
  //   },
  //   {
  //     name: "Shoes",
  //     quantity: 3,
  //     icon: <Footprints className="size-8" />,
  //   },
  //   {
  //     name: "Books",
  //     quantity: 5,
  //     icon: <Book className="size-8" />,
  //   },
  //   {
  //     name: "Fruits",
  //     quantity: 2,
  //     icon: <Apple className="size-8" />,
  //   },
  //   {
  //     name: "Food",
  //     quantity: 5,
  //     icon: <ChefHat className="size-8" />,
  //   },
  // ];

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
    labels: google.cloud.vision.v1.IEntityAnnotation[][], // TODO: Fix this type. Also make sure it corresponds with the backend
  ) => {
    const newItems: ListItem[] = [];
    labels.forEach((label) => {
      const name = label.description || "Unknown";
      const icon = <Box className="size-8" />;
      const quantity = 1;

      let found = false;
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].name === name) {
          newItems[i].quantity++;
          found = true;
          break;
        }
      }

      if (!found) {
        newItems.push({ name, quantity, icon });
      }
    });

    setList(newItems);
  };

  const sendFiles = async () => {
    const base64Files = await convertFilesToBase64();
    if (!base64Files) return;

    console.log(base64Files);
    const response = await fetch("/api/scan_images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: base64Files }),
    });

    const { labels } = await response.json();
    processLabels(labels);
  };

  return (
    <div className="grid min-h-96 grid-cols-2 grid-rows-1 space-x-8 divide-x-4 divide-dotted px-20 py-12 ">
      <div className="flex flex-col justify-between ">
        <div className="space-y-8">
          <div className="space-y-1">
            <h1 className="relative inline-flex items-center gap-x-1  text-4xl font-bold">
              <span>Scan Items to Donate </span>
              <Button className="rounded-full" size={"icon"} variant={"ghost"}>
                <CircleHelp
                  strokeWidth={2.5}
                  className="size-6 text-slate-500"
                />
              </Button>
            </h1>
            <p className="text-2xl">
              Upload images of your donation items. We will handle the rest.
            </p>
          </div>

          <div className="flex items-center gap-x-4 ">
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

            <Button className="text-xl" variant={"link"}>
              Input Manually
            </Button>
          </div>

          <div className="pb-6">
            {files && (
              <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-slate-50 flex max-h-[30rem] flex-col gap-4 overflow-y-auto">
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
          </div>
        </div>

        <div className="flex flex-row-reverse">
          {/* <Link href={"/map"}> */}
          <Button
            onClick={sendFiles}
            className="space-x-4 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
            variant={"default"}
            size={"lg"}
          >
            <span>Scan</span>
            <ArrowRightCircle strokeWidth={3} />
          </Button>
          {/* </Link> */}
        </div>
      </div>

      <div className="flex  flex-col space-y-8 pl-8">
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

        <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-primary scrollbar-track-slate-50 max-h-[43rem] space-y-8 overflow-auto pr-4">
          {list.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center gap-x-3">
                {item.icon}
                <span className="text-2xl font-semibold">{item.name}</span>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-2xl font-medium">{item.quantity}x</span>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <TrashIcon strokeWidth={2.75} className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
