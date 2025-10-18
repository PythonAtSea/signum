"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_TEXT = "hello";

const englishToASCII = (text: string): string => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
};

const asciiToEnglish = (ascii: string): string => {
  const bytes = ascii.split(/\s+/).filter((b) => b.length > 0);
  return bytes
    .map((byte) => {
      const code = parseInt(byte, 2);
      return isNaN(code) ? "" : String.fromCharCode(code);
    })
    .join("");
};

export default function Page() {
  const [englishText, setEnglishText] = useState("");
  const [asciiText, setASCIIText] = useState("");
  const sourceRef = useRef<"english" | "ascii" | null>(null);

  const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnglishText(value);
    sourceRef.current = "english";
    setASCIIText(englishToASCII(value));
  };

  const handleASCIIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setASCIIText(value);
    sourceRef.current = "ascii";
    setEnglishText(asciiToEnglish(value));
  };

  return (
    <div className="max-w-4xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-6">ASCII {`<=>`} English</h1>
      <Label htmlFor="english-input" className="mb-2">
        Enter English text, including all unicode characters:
      </Label>
      <Input
        id="english-input"
        placeholder={DEMO_TEXT}
        className="mb-6 bg-background"
        value={englishText}
        onChange={handleEnglishChange}
      />
      <Label htmlFor="ascii-input" className="mb-2">
        Enter ASCII with bytes separated by spaces:
      </Label>
      <Input
        id="ascii-input"
        placeholder={englishToASCII(DEMO_TEXT)}
        className="mb-6 bg-background"
        value={asciiText}
        onChange={handleASCIIChange}
      />
    </div>
  );
}
