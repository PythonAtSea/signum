"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Check, Copy } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const UNIT = 100;
const DASH_THRESHOLD = UNIT * 2;
const LETTER_SPACE = UNIT * 3;
const WORD_SPACE = UNIT * 7;

const MORSE_TO_ENGLISH: { [key: string]: string } = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

export default function Page() {
  const [morse, setMorse] = useState("");
  const [english, setEnglish] = useState("");
  const [beeping, setBeeping] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [copyIcon, setCopyIcon] = useState<"copy" | "check">("copy");

  const pressStartTimeRef = useRef<number | null>(null);
  const lastReleaseTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPressingRef = useRef<boolean>(false);
  const spaceAddedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!morse.trim()) {
      setEnglish("");
      return;
    }

    const words = morse.split("  ");
    const translatedWords = words.map((word) => {
      const letters = word.split(" ").filter((code) => code.length > 0);
      return letters.map((code) => MORSE_TO_ENGLISH[code] || "?").join("");
    });
    setEnglish(translatedWords.join(" "));
  }, [morse]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (event.code === "Space") {
        event.preventDefault();

        if (isPressingRef.current || pressStartTimeRef.current !== null) return;

        isPressingRef.current = true;
        pressStartTimeRef.current = Date.now();
        setBeeping(true);
        if (
          lastReleaseTimeRef.current !== null &&
          morse.length > 0 &&
          !spaceAddedRef.current
        ) {
          const gap = Date.now() - lastReleaseTimeRef.current;
          if (gap > WORD_SPACE) {
            setMorse((prev) => prev + "  ");
            spaceAddedRef.current = true;
          } else if (gap > LETTER_SPACE) {
            setMorse((prev) => prev + " ");
            spaceAddedRef.current = true;
          }
        }
      }

      if (event.code === "Delete") {
        event.preventDefault();
        setMorse("");
        setEnglish("");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (event.code === "Space") {
        event.preventDefault();

        if (!isPressingRef.current || pressStartTimeRef.current === null)
          return;

        isPressingRef.current = false;
        setBeeping(false);

        const pressDuration = Date.now() - pressStartTimeRef.current;

        if (pressDuration < DASH_THRESHOLD) {
          setMorse((prev) => prev + ".");
        } else {
          setMorse((prev) => prev + "-");
        }

        pressStartTimeRef.current = null;
        lastReleaseTimeRef.current = Date.now();
        spaceAddedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [morse]);

  useEffect(() => {
    if (inputFocused) {
      setBeeping(false);
      isPressingRef.current = false;
      pressStartTimeRef.current = null;
    }
  }, [inputFocused]);

  return (
    <div className="max-w-2xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-4">Morse Code to English</h1>
      {morse.length}
      <Input
        placeholder="Morse code..."
        className="bg-background"
        value={morse}
        onChange={(e) => setMorse(e.target.value)}
        style={{ fontVariantLigatures: "none" }}
        ref={inputRef}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      <div className="mt-4 p-4 border bg-muted">
        <h2 className="text-lg font-semibold">Key morse code</h2>
        <p className="mb-2 text-sm text-muted-foreground bg-background w-fit py-1 pl-2 pr-1">
          Bound to <Kbd>Space</Kbd>, clear with <Kbd>Delete</Kbd>
        </p>
        <div
          className={`h-9 w-full ${
            beeping && !inputFocused ? "bg-primary" : "bg-background"
          }`}
        />
      </div>
      {/*timeSincePress !== null && (
        <div className="mt-4 p-4 border bg-muted">
          <p>Time since last press: {timeSincePress}ms</p>
        </div>
      )*/}
      {/*currentPressTime !== null && (
        <div className="mt-4 p-4 border bg-muted">
          <p>
            Last press time: {new Date(currentPressTime).toLocaleTimeString()}
          </p>
        </div>
      )*/}
      {english.length > 0 && (
        <div className="mt-4 p-4 border bg-muted">
          <h2 className="text-lg font-semibold mb-2">English:</h2>
          <div className="flex flex-row gap-2">
            <Input
              className="whitespace-pre-wrap bg-background"
              value={english}
              readOnly
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(english);
                setCopyIcon("check");
                setTimeout(() => setCopyIcon("copy"), 2000);
              }}
            >
              {copyIcon === "copy" ? (
                <Copy className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
