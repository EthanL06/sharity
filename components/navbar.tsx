"use client";

import { useRouter } from "next/navigation";
import Logo from "./logo";
import { Button } from "./ui/button";

type Props = {};
const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-b px-12 py-6 shadow-sm">
      <Logo />
      <Button
        onClick={() => router.push("/scan")}
        className="rounded-full py-7 text-lg font-semibold md:py-8 md:text-xl"
        size={"lg"}
        variant={"outline"}
      >
        Scan Items
      </Button>
    </div>
  );
};
export default Navbar;
