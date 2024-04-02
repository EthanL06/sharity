import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative flex  h-[35rem] w-full flex-col items-center justify-center rounded-md bg-white  antialiased  bg-dot-large-background/[0.2]  dark:bg-background dark:bg-dot-large-white/[0.2]">
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="relative z-10  text-center font-sans text-lg  font-bold  md:text-7xl">
          Shary
        </h1>
        <p
          className="text-balanced relative z-10 mt-3
         text-center font-sans text-sm md:text-2xl"
        >
          We make donating easier.
        </p>
      </div>

      <div className="z-20 mx-auto flex gap-x-2">
        <Button variant={"default"} size={"lg"}>
          Donate Now!
        </Button>
        <Button size={"lg"} variant={"secondary"}>
          Learn More
        </Button>
      </div>
      {/* <BackgroundBeams /> */}

      <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-t from-background via-background/0 to-background"></div>
      <div className="pointer-events-none absolute z-10 h-full w-full bg-gradient-to-l from-background via-background/0 to-background"></div>
    </div>
  );
}
