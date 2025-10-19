"use client";
import Link from "next/link";
import Art from "../components/art";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        An interactive exploration of three different ways of encoding text for
        transmission.
      </h1>
      <Art />
      <div className="gap-2 flex flex-col">
        <h2 className="font-bold text-lg">Morse Code:</h2>
        <ul className="gap-2 flex flex-col list-disc list-inside">
          <li>
            <Link
              href="/morse-history"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              Morse Code History
            </Link>
          </li>
          <li>
            <Link
              href="/eng-to-morse"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              English {`==>`} Morse Code
            </Link>
          </li>
          <li>
            <Link
              href="/morse-to-eng"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              Morse Code {`==>`} English
            </Link>
          </li>
        </ul>
      </div>
      <div className="gap-2 flex flex-col">
        <h2 className="font-bold text-lg">ASCII:</h2>
        <ul className="gap-2 flex flex-col list-disc list-inside">
          <li>
            <Link
              href="/ascii-history"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              ASCII History
            </Link>
          </li>
          <li>
            <Link
              href="/ascii"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              ASCII {`<=>`} English
            </Link>
          </li>
        </ul>
      </div>
      <div className="gap-2 flex flex-col">
        <h2 className="font-bold text-lg">QR Codes:</h2>
        <ul className="gap-2 flex flex-col list-disc list-inside">
          <li>
            <Link
              href="/qr-code"
              className="text-2xl font-bold text-blue-500 hover:underline w-fit"
            >
              Text {`==>`} QR Code
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
