"use client";
type Props = {};

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowRightCircle,
  Book,
  ChefHat,
  CircleHelp,
  CloudUpload,
  Footprints,
  ShirtIcon,
  TrashIcon,
} from "lucide-react";
const Page = (props: Props) => {
  const list = [
    {
      name: "Clothes",
      quantity: 1,
      icon: <ShirtIcon className="size-8" />,
    },
    {
      name: "Shoes",
      quantity: 3,
      icon: <Footprints className="size-8" />,
    },
    {
      name: "Books",
      quantity: 5,
      icon: <Book className="size-8" />,
    },
    {
      name: "Fruits",
      quantity: 2,
      icon: <Apple className="size-8" />,
    },
    {
      name: "Food",
      quantity: 5,
      icon: <ChefHat className="size-8" />,
    },
  ];

  return (
    <div className="grid min-h-96 grid-cols-2 grid-rows-1 space-x-8 divide-x-4 divide-dotted ">
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

          <div className="flex items-center gap-x-4">
            <Button
              className="space-x-4 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
              variant={"default"}
              size={"lg"}
            >
              <CloudUpload className="size-8" strokeWidth={3} />{" "}
              <span>Upload Images</span>
            </Button>

            <Button className="text-xl" variant={"link"}>
              Input Manually
            </Button>
          </div>
        </div>

        <div className="flex flex-row-reverse">
          <Button
            className="space-x-4 rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
            variant={"default"}
            size={"lg"}
          >
            <span>Continue</span>
            <ArrowRightCircle strokeWidth={3} />
          </Button>
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
