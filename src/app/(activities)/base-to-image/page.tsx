"use client";

import HeaderHero from "@/components/header-hero";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";

export default function TextConvert() {
  const [textEntry, setTextEntry] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Função para validar e converter base64
  useEffect(() => {
    if (textEntry) {
      // Verifica se o texto é um base64 válido de imagem
      const isBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(textEntry);
      if (isBase64) {
        setImageSrc(textEntry);
      } else {
        setImageSrc(null); // Se não for base64 válido, limpa a imagem
      }
    }
  }, [textEntry]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <HeaderHero title="Base64 Image" />
      <Separator className="my-2 bg-white" />

      <div className="w-full h-full grid lg:grid-cols-2 gap-2">
        <Textarea
          className="bg-[#14181e] h-full min-h-40 border-none focus:border-none active:border-none resize-none rounded-lg text-white pt-4"
          onChange={(e) => setTextEntry(e.target.value)}
          value={textEntry}
          placeholder="Enter text here..."
        />

        {/* Exibe a imagem quando a base64 for válida */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Base64 Image"
            className="w-full h-full object-contain border-none rounded-lg"
          />
        ) : (
          <div className="text-white">No valid image data provided</div>
        )}
      </div>
    </div>
  );
}
