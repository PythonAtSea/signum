"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Volume2, VolumeOff, Square } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [audio, setAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentOscillator, setCurrentOscillator] =
    useState<OscillatorNode | null>(null);
  const [beepBackground, setBeepBackground] = useState("bg-muted");
  const [backgroundTimeouts, setBackgroundTimeouts] = useState<number[]>([]);

  const audioContext = new (window.AudioContext ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const morseDictionary: { [key: string]: string } = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
  };

  useEffect(() => {
    if (text.trim() === "") {
      setMorse(
        "there's nothing here"
          .toUpperCase()
          .split("")
          .map((char) => morseDictionary[char] || "")
          .join(" ")
      );
      return;
    }
    const morseCode = text
      .toUpperCase()
      .split("")
      .map((char) => morseDictionary[char] || "")
      .join(" ");
    setMorse(morseCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const playMorseCode = async () => {
    if (isPlaying) return;
    backgroundTimeouts.forEach(clearTimeout);
    setBackgroundTimeouts([]);
    await audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0;

    let time = audioContext.currentTime;
    const unit = 0.1;
    let totalTime = 0;

    morse.split("").forEach((symbol) => {
      switch (symbol) {
        case ".":
          totalTime += unit * 2;
          break;
        case "-":
          totalTime += unit * 4;
          break;
        case " ":
          totalTime += unit * 3;
          break;
      }
    });

    oscillator.start(time);
    oscillator.stop(time + totalTime);
    setCurrentOscillator(oscillator);
    setIsPlaying(true);

    oscillator.onended = () => {
      setIsPlaying(false);
      setCurrentOscillator(null);
      setBeepBackground("bg-muted");
      backgroundTimeouts.forEach(clearTimeout);
      setBackgroundTimeouts([]);
    };

    const newTimeouts: number[] = [];
    morse.split("").forEach((symbol) => {
      switch (symbol) {
        case ".":
          if (audio) {
            gainNode.gain.setValueAtTime(1, time);
          }
          newTimeouts.push(
            setTimeout(
              () => setBeepBackground("bg-primary"),
              (time - audioContext.currentTime) * 1000
            ) as unknown as number
          );
          time += unit;
          if (audio) {
            gainNode.gain.setValueAtTime(0, time);
          }
          newTimeouts.push(
            setTimeout(
              () => setBeepBackground("bg-muted"),
              (time - audioContext.currentTime) * 1000
            ) as unknown as number
          );
          time += unit;
          break;
        case "-":
          if (audio) {
            gainNode.gain.setValueAtTime(1, time);
          }
          newTimeouts.push(
            setTimeout(
              () => setBeepBackground("bg-primary"),
              (time - audioContext.currentTime) * 1000
            ) as unknown as number
          );
          time += unit * 3;
          if (audio) {
            gainNode.gain.setValueAtTime(0, time);
          }
          newTimeouts.push(
            setTimeout(
              () => setBeepBackground("bg-muted"),
              (time - audioContext.currentTime) * 1000
            ) as unknown as number
          );
          time += unit;
          break;
        case " ":
          time += unit * 3;
          break;
      }
    });
    setBackgroundTimeouts(newTimeouts);
  };

  const stopMorseCode = () => {
    if (currentOscillator) {
      currentOscillator.stop();
      setIsPlaying(false);
      setCurrentOscillator(null);
      setBeepBackground("bg-muted");
      backgroundTimeouts.forEach(clearTimeout);
      setBackgroundTimeouts([]);
    }
  };

  return (
    <div className="max-w-4xl justify-self-center w-full">
      <h1 className="text-2xl font-bold">English to Morse Code Translator</h1>
      <Input
        placeholder="Text..."
        className="bg-background"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {morse.length > 0 && (
        <div className="mt-4 p-4 border bg-muted">
          <h2 className="text-lg font-semibold mb-2">Morse Code:</h2>
          <p className="whitespace-pre-wrap">{morse}</p>
          <div className="flex items-center mt-2">
            <Button
              onClick={() => {
                if (isPlaying) {
                  stopMorseCode();
                } else {
                  playMorseCode();
                }
              }}
            >
              {isPlaying ? <Square /> : <Play />}
            </Button>
            <Button
              onClick={() => setAudio(!audio)}
              variant="ghost"
              className="ml-2"
            >
              {audio ? <Volume2 /> : <VolumeOff />}
            </Button>
            <div
              className={`flex-1 ${beepBackground} h-9 ml-2 border border-border`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
