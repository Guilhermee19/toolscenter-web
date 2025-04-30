"use client";

import HeaderHero from "@/components/header-hero";
import QrCodeGeneration from "@/components/qrcode";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

export default function QrcodeGenerator() {
  const [textEntry, setTextEntry] = useState("https://toolscenter.dev/");

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <HeaderHero title="QR Code Generator" />
      <Separator className="my-2 bg-white" />

      <div className="w-full h-full grid lg:grid-cols-2 gap-2">
        <Textarea
          className="bg-[#14181e] h-full min-h-40 border-none focus:border-none active:border-none resize-none rounded-lg text-white pt-4"
          onChange={(e) => setTextEntry(e.target.value)}
          value={textEntry}
          placeholder="Enter text here..."
        />
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
          <div className="rounded-2xl overflow-hidden aspect-square">
            <QrCodeGeneration
              url={textEntry}
              width={300}
              margin={2}
              scale={4}
              colorBg={"#efefef"}
              colorQrCode={"#1f2735"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
