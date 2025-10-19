"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { useState } from "react";

export default function Page() {
  const { Image } = useQRCode();
  const [text, setText] = useState("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");

  const maxLengthByLevel: Record<string, number> = {
    L: 2953,
    M: 2331,
    Q: 1663,
    H: 1273,
  };

  const maxLength = maxLengthByLevel[errorCorrectionLevel] || 1273;

  return (
    <div className="max-w-2xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
      <div className="bg-muted border border-border p-4">
        <Label className="mb-2">
          Text:
          <span className="text-muted-foreground text-sm ml-2">
            {text.length} / {maxLength}
          </span>
        </Label>
        <div className="mb-6 flex flex-row gap-2">
          <Input
            placeholder="Bobby Tables"
            className="bg-background"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxLength}
          />
          <Dialog>
            <DialogTrigger>
              <Info className="size-9 px-2.5 border border-border" />
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
              <DialogHeader>
                <DialogTitle>QR code data types</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">Website</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      https://
                      <span className=" text-purple-500 font-bold">[url]</span>
                    </code>
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Email</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      mailto:
                      <span className=" text-purple-500 font-bold">
                        [email]
                      </span>
                    </code>
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Phone Number</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      tel:
                      <span className=" text-purple-500 font-bold">
                        [phone]
                      </span>
                    </code>
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">SMS</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      sms:
                      <span className=" text-purple-500 font-bold">
                        [phone]
                      </span>
                    </code>
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Facetime</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      facetime:
                      <span className=" text-purple-500 font-bold">
                        [phone]
                      </span>
                    </code>
                  </p>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      facetime:
                      <span className=" text-purple-500 font-bold">
                        [email]
                      </span>
                    </code>
                  </p>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      facetime-audio:
                      <span className=" text-purple-500 font-bold">
                        [phone]
                      </span>
                    </code>
                  </p>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      facetime-audio:
                      <span className=" text-purple-500 font-bold">
                        [email]
                      </span>
                    </code>
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Contact Info</h2>
                  <p>
                    <code className="bg-muted px-1.5 py-0.5 font-mono text-sm">
                      MECARD:N:
                      <span className=" text-purple-500 font-bold">[name]</span>
                      ;ADR:
                      <span className=" text-purple-500 font-bold">
                        [address]
                      </span>
                      ;TEL:
                      <span className=" text-purple-500 font-bold">
                        [phone]
                      </span>
                      ;EMAIL:
                      <span className=" text-purple-500 font-bold">
                        [email]
                      </span>
                      ;
                    </code>
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Label className="mb-2">Error Correction Level:</Label>
        <Select
          onValueChange={(value) => {
            setErrorCorrectionLevel(value);
            const newMax = maxLengthByLevel[value] || 1273;
            if (text.length > newMax) {
              setText(text.slice(0, newMax));
            }
          }}
          value={errorCorrectionLevel}
        >
          <SelectTrigger className={`w-full bg-background ${text && "mb-6"}`}>
            <SelectValue placeholder="Error Correction Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low</SelectItem>
            <SelectItem value="M">Medium</SelectItem>
            <SelectItem value="Q">Quartile</SelectItem>
            <SelectItem value="H">High</SelectItem>
          </SelectContent>
        </Select>
        {text && (
          <>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              text={text}
              options={{
                errorCorrectionLevel: errorCorrectionLevel,
                margin: 2,
                scale: 10,
                width: 400,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
