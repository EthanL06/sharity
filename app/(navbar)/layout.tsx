import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex h-full flex-1 flex-col ">{children}</main>
    </>
  );
}
