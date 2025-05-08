"use client";

import HeaderHero from "@/components/header-hero";
import { convertTypeGenerator } from "@/lib/typeGenerator";
import Editor from "@monaco-editor/react";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";

export default function TSTypeGenerator() {
  const [textEntry, setTextEntry] = useState("");
  const [textOutput, setTextOutput] = useState("");

  useEffect(() => {
    try {
      const parsed = JSON.parse(textEntry);
      const result = convertTypeGenerator(parsed, true, "IRoot");
      setTextOutput(result);
    } catch (err) {
      console.log(err);
      setTextOutput("// Erro ao converter JSON: verifique a sintaxe.");
    }
  }, [textEntry]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <HeaderHero title="Type Generator" />

      <Separator className="my-2 bg-white" />

      <div className="w-full h-full grid lg:grid-cols-2 gap-2">
        <Editor
          className="h-full min-h-40 border-none rounded-lg text-white overflow-hidden pt-2 bg-[#1e1e1e]"
          defaultLanguage="json"
          theme="vs-dark"
          value={textEntry}
          onChange={(value) => setTextEntry(value || "")}
        />

        <Editor
          className="h-full min-h-40 border-none rounded-lg text-white overflow-hidden pt-2 bg-[#1e1e1e]"
          defaultLanguage="typescript"
          theme="vs-dark"
          value={textOutput}
        />
      </div>
    </div>
  );
}
