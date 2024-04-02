import Logo from "@/components/logo";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b px-12 py-6 shadow-sm">
        <Logo />
      </div>
      <main className="flex h-full flex-1 flex-col ">{children}</main>
    </>
  );
}
