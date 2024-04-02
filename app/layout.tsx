import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationMenu from "@/components/navigation-menu";

import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ListProvider } from "@/context/ListContext";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "sharity.",
  description: "Donating made easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans text-slate-900 antialiased",
          fontSans.variable,
        )}
      >
        <ListProvider>{children}</ListProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
