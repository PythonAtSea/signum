"use client";
import Link from "next/link";
import Art from "../components/art";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        An interactive exploration of an older form of communication.
      </h1>
      <Art />
      <Link
        href="/eng-to-morse"
        className="text-2xl font-bold text-blue-500 hover:underline w-fit"
      >
        English {`=>`} Morse Code
      </Link>
      <Link
        href="/morse-to-eng"
        className="text-2xl font-bold text-blue-500 hover:underline w-fit"
      >
        Morse Code {`=>`} English
      </Link>
    </div>
  );
}
