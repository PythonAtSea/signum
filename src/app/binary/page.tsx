"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_TEXT = "hello";

const englishToBinary = (text: string): string => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
};

const binaryToEnglish = (binary: string): string => {
  const bytes = binary.split(/\s+/).filter((b) => b.length > 0);
  return bytes
    .map((byte) => {
      const code = parseInt(byte, 2);
      return isNaN(code) ? "" : String.fromCharCode(code);
    })
    .join("");
};

export default function Page() {
  const [englishText, setEnglishText] = useState("");
  const [binaryText, setBinaryText] = useState("");
  const sourceRef = useRef<"english" | "binary" | null>(null);

  const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnglishText(value);
    sourceRef.current = "english";
    setBinaryText(englishToBinary(value));
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBinaryText(value);
    sourceRef.current = "binary";
    setEnglishText(binaryToEnglish(value));
  };

  return (
    <div className="max-w-4xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-6">Binary {`<=>`} English</h1>
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
      <Label htmlFor="binary-input" className="mb-2">
        Enter binary with bytes separated by spaces:
      </Label>
      <Input
        id="binary-input"
        placeholder={englishToBinary(DEMO_TEXT)}
        className="mb-6 bg-background"
        value={binaryText}
        onChange={handleBinaryChange}
      />
    </div>
  );
}
