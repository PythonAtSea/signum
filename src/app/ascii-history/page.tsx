"use client";

import { useState } from "react";

export default function Page() {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0]);

  return (
    <div className="max-w-2xl justify-self-center w-full border-l-4 border-primary pl-4">
      <h1 className="text-2xl font-bold">History of Morse Code</h1>
      <h2 className="text-xl font-bold mb-2 mt-6">
        Consolidation of Teleprinter codes
      </h2>
      <p>
        The first draft of ASCII was made by Bob Bemer, a engineer from IBM, to
        replace the various teleprinter codes used in the 1950s. It was
        submitted to the American Standards Association (ASA), which later
        became the American National Standards Institute (ANSI), in 1961. ASCII
        was based on the earlier teleprinter codes, but added some new
        characters, such as the backspace and delete characters. It also
        standardized the use of control characters, such as carriage return and
        line feed.
      </p>
      <h2 className="text-xl font-bold mb-2 mt-6">Development</h2>
      <p>
        The first version of ASCII was published in 1963 as ASA X3.4-1963, and
        was used by the Teletype Model 33. It had the uppercase letters, digits,
        and control characters, which were used for controlling mechanical
        functions of teleprinters. There was a brief debate over whether the
        remaining 28 codes should be used for lowercase letters or special
        characters, but in May 1963 the CCITT Working Party on the New Telegraph
        Alphabet recommended the addition of lowercase letters. They were added
        such that they were a single bit different from their uppercase
        counterparts, which made it easier to convert between the two. They were
        added in the 1967 revision, ASCII-1967.
      </p>
      <h2 className="text-xl font-bold mb-2 mt-6">ASCII Playground</h2>
      <div className="flex flex-col p-4 border bg-muted w-fit">
        <div className="flex space-x-2">
          {bits.map((bit, index) => (
            <button
              key={index}
              className={`w-16 h-16 flex items-center justify-center rounded-lg border ${
                bit === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground"
              }`}
              onClick={() => {
                const newBits = [...bits];
                newBits[index] = bits[index] === 0 ? 1 : 0;
                setBits(newBits);
              }}
            >
              {bit}
            </button>
          ))}
        </div>
        <div className="mt-4 text-lg font-bold">
          Character:{" "}
          {(() => {
            const charCode = bits.reduce(
              (acc, bit, index) => acc + bit * Math.pow(2, 6 - index),
              0
            );
            const controlChars: Record<number, string> = {
              0: "Null (NUL)",
              1: "Start of Heading (SOH)",
              2: "Start of Text (STX)",
              3: "End of Text (ETX)",
              4: "End of Transmission (EOT)",
              5: "Enquiry (ENQ)",
              6: "Acknowledge (ACK)",
              7: "Bell (BEL)",
              8: "Backspace (BS)",
              9: "Horizontal Tab (TAB)",
              10: "Line Feed (LF)",
              11: "Vertical Tab (VT)",
              12: "Form Feed (FF)",
              13: "Carriage Return (CR)",
              14: "Shift Out (SO)",
              15: "Shift In (SI)",
              16: "Data Link Escape (DLE)",
              17: "Device Control 1 (DC1)",
              18: "Device Control 2 (DC2)",
              19: "Device Control 3 (DC3)",
              20: "Device Control 4 (DC4)",
              21: "Negative Acknowledge (NAK)",
              22: "Synchronous Idle (SYN)",
              23: "End of Transmission Block (ETB)",
              24: "Cancel (CAN)",
              25: "End of Medium (EM)",
              26: "Substitute (SUB)",
              27: "Escape (ESC)",
              28: "File Separator (FS)",
              29: "Group Separator (GS)",
              30: "Record Separator (RS)",
              31: "Unit Separator (US)",
              127: "Delete (DEL)",
            };
            let charDisplay = "";
            if (charCode >= 32 && charCode <= 126) {
              charDisplay = String.fromCharCode(charCode);
            } else if (charCode === 32) {
              charDisplay = "␣";
            } else if (controlChars[charCode]) {
              charDisplay = controlChars[charCode];
            } else {
              charDisplay = `[${charCode}]`;
            }
            return `${charDisplay}, ${charCode}`;
          })()}
        </div>
      </div>
    </div>
  );
}
