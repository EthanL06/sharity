"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
export default function Home() {
  const fadeInAnimationVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.6,
        delay: index * 0.5,
      },
    }),
  };

  return (
    <main className="relative flex flex-1 items-center justify-center space-y-4 px-4 pt-6 sm:p-8">
      <div className="relative flex  h-[35rem] w-full flex-col items-center justify-center rounded-md   antialiased  bg-dot-large-slate-400/50">
        <div className="mx-auto mb-2 flex max-w-3xl flex-col items-center p-4">
          <div className="flex flex-col items-center">
            <Link
              href={"/"}
              className="relative z-20  text-center font-sans text-3xl  font-bold  text-primary md:text-4xl"
            >
              <motion.div
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                custom={0}
              >
                sharity.
              </motion.div>
            </Link>

            <motion.div
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              custom={0}
              className="z-20 mr-3 text-center text-sm font-semibold text-slate-500"
            >
              /shehr • ity/
            </motion.div>
          </div>
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={1}
            className="relative z-20 
         mt-3 w-full grow text-pretty text-center  font-sans text-3xl  font-semibold sm:text-4xl md:text-5xl md:leading-tight"
          >
            We make
            <br />
            donating easier.
            <svg
              className="absolute bottom-[-6px] right-[9px] hidden md:block "
              width="149"
              height="14"
              viewBox="0 0 149 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.3,
                  duration: 1,
                }}
                d="M3 7C12.5333 1.66667 22.0667 1.66667 31.6 7C41.1333 12.3333 50.6667 12.3333 60.2 7C69.7333 1.66667 79.2667 1.66667 88.8 7C98.3333 12.3333 107.867 12.3333 117.4 7C126.933 1.66667 136.467 1.66667 146 7"
                stroke="#4C75F2"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        <div className="z-20 mx-auto flex flex-wrap justify-center gap-2">
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={2}
            className="grow"
          >
            <Link href="/scan">
              <Button
                className="w-full rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
                variant={"default"}
                size={"lg"}
              >
                Donate Now!
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            custom={2.5}
            className="grow"
          >
            <Link href="/requests">
              <Button
                className="w-full grow rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
                size={"lg"}
                variant={"outline"}
              >
                Request Donations
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-t from-background via-background/0 to-background"></div>
        <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-l from-background via-background/0 to-background"></div>
      </div>
    </main>
  );
}
