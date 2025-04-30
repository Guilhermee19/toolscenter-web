import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SidebarCustom from "@/components/sidbar-custom";
import { cn } from "@/lib/utils";
import CardScreen from "@/components/card-screen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tools Center",
  description: "Tools Center - Ferramentas para desenvolvedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4 pl-2 w-full min-h-dvh bg-gradient-to-b from-[#15191f] to-[#000000]`}
      >
        <div
          className={cn(
            "flex w-full flex-1 flex-col overflow-hidden md:flex-row"
          )}
        >
          <SidebarCustom />

          <CardScreen>{children}</CardScreen>
        </div>
      </body>
    </html>
  );
}
