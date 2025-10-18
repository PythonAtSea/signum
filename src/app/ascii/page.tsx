"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

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
  const [englishCopyIcon, setEnglishCopyIcon] = useState<"copy" | "check">(
    "copy"
  );
  const [asciiCopyIcon, setASCIICopyIcon] = useState<"copy" | "check">("copy");

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
    <div className="max-w-2xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-6">ASCII {`<=>`} English</h1>
      <Label htmlFor="english-input" className="mb-2">
        Enter English text, including all unicode characters:
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          id="english-input"
          placeholder={DEMO_TEXT}
          className="mb-6 bg-background"
          value={englishText}
          onChange={handleEnglishChange}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(englishText);
            setEnglishCopyIcon("check");
            setTimeout(() => setEnglishCopyIcon("copy"), 2000);
          }}
        >
          {englishCopyIcon === "copy" ? (
            <Copy className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Label htmlFor="ascii-input" className="mb-2">
        Enter ASCII with bytes separated by spaces:
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          id="ascii-input"
          placeholder={englishToASCII(DEMO_TEXT)}
          className="mb-6 bg-background"
          value={asciiText}
          onChange={handleASCIIChange}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(asciiText);
            setASCIICopyIcon("check");
            setTimeout(() => setASCIICopyIcon("copy"), 2000);
          }}
        >
          {asciiCopyIcon === "copy" ? (
            <Copy className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
