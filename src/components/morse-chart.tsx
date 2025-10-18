import React from "react";

const MORSE_CODE_DATA: Record<string, string[]> = {
  A: ["•", "-"],
  B: ["-", "•", "•", "•"],
  C: ["-", "•", "-", "•"],
  D: ["-", "•", "•"],
  E: ["•"],
  F: ["•", "•", "-", "•"],
  G: ["-", "-", "•"],
  H: ["•", "•", "•", "•"],
  I: ["•", "•"],
  J: ["•", "-", "-", "-"],
  K: ["-", "•", "-"],
  L: ["•", "-", "•", "•"],
  M: ["-", "-"],
  N: ["-", "•"],
  O: ["-", "-", "-"],
  P: ["•", "-", "-", "•"],
  Q: ["-", "-", "•", "-"],
  R: ["•", "-", "•"],
  S: ["•", "•", "•"],
  T: ["-"],
  U: ["•", "•", "-"],
  V: ["•", "•", "•", "-"],
  W: ["•", "-", "-"],
  X: ["-", "•", "•", "-"],
  Y: ["-", "•", "-", "-"],
  Z: ["-", "-", "•", "•"],
  "1": ["•", "-", "-", "-", "-"],
  "2": ["•", "•", "-", "-", "-"],
  "3": ["•", "•", "•", "-", "-"],
  "4": ["•", "•", "•", "•", "-"],
  "5": ["•", "•", "•", "•", "•"],
  "6": ["-", "•", "•", "•", "•"],
  "7": ["-", "-", "•", "•", "•"],
  "8": ["-", "-", "-", "•", "•"],
  "9": ["-", "-", "-", "-", "•"],
  "0": ["-", "-", "-", "-", "-"],
};

interface MorseChartProps {
  className?: string;
}

export function MorseChart({ className = "" }: MorseChartProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Object.entries(MORSE_CODE_DATA).map(([char, code]) => (
        <div key={char} className="flex items-center gap-4">
          <span className="w-8 font-bold text-left">{char}</span>
          <div className="flex gap-4">
            {code.map((symbol, idx) => (
              <div
                key={idx}
                className="flex items-center"
                style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {symbol === "•" ? (
                  <div className="bg-primary size-2" />
                ) : (
                  <div className="bg-primary w-6 h-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
