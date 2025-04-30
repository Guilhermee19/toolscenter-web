"use client";

import HeaderHero from "@/components/header-hero";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";
import { convertText, TextFormat } from "@/lib/textConverter";

export default function TextConvert() {
  const [textEntry, setTextEntry] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [type, setType] = useState<TextFormat>("lower_case");

  const convertOptions = [
    { label: "lower case", action: "lower_case" },
    { label: "UPPER CASE", action: "upper_case" },
    { label: "Sentence case", action: "sentence_case" },
    { label: "Title Case", action: "title_case" },
    { label: "camelCase", action: "camel_case" },
    { label: "PascalCase", action: "pascal_case" },
    { label: "snake_case", action: "snake_case" },
    { label: "CONSTANT_CASE", action: "constant_case" },
    { label: "kebab-case", action: "kebab_case" },
    { label: "COBOL-CASE", action: "cobol_case" },
    { label: "Train-Case", action: "train_case" },
  ] as const;

  useEffect(() => {
    setTextOutput(convertText(textEntry, type));
  }, [textEntry, type]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <HeaderHero title="Text Convert" />
      <Separator className="my-2 bg-white" />

      <div className="flex flex-wrap my-2">
        {convertOptions.map((option) => (
          <Button
            key={option.action}
            variant="outline"
            className={cn(
              "mr-2 mb-2 bg-blue-900 border-blue-900 hover:bg-blue-800 hover:border-blue-800 text-white hover:text-white",
              { "bg-blue-500 border-blue-500": type === option.action }
            )}
            onClick={() => setType(option.action)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="w-full h-full grid lg:grid-cols-2 gap-2">
        <Textarea
          className="bg-[#14181e] h-full min-h-40 border-none focus:border-none active:border-none resize-none rounded-lg text-white pt-4"
          onChange={(e) => setTextEntry(e.target.value)}
          value={textEntry}
          placeholder="Enter text here..."
        />
        <Textarea
          readOnly
          className="bg-[#14181e] h-full min-h-40 border-none focus:border-none active:border-none resize-none rounded-lg text-white pt-4"
          value={textOutput}
          placeholder="Converted text will appear here..."
        />
      </div>
    </div>
  );
}
