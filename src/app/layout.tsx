import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SidebarCustom from "@/components/sidbar-custom";
import { cn } from "@/lib/utils";
import Script from "next/script";

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
        {/* ✅ CORRETO */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7471699067461249"
          crossOrigin="anonymous"
        />

        <div
          className={cn(
            "flex w-full flex-1 flex-col overflow-hidden md:flex-row"
          )}
        >
          <SidebarCustom />

          <div className="relative w-full flex flex-1 lg:ml-2 h-[calc(100dvh-2rem)] lg:h-auto">
            <div className="flex h-11/12 mt-auto w-full flex-1 flex-col gap-2 rounded-2xl bg-[#1f2735] p-4 md:p-6 shadow-2xl">
              {children} {/* Exibindo os children passados para o componente */}
            </div>
          </div>

          {/* <CardScreen>{children}</CardScreen> */}
        </div>
      </body>
    </html>
  );
}
