import type { Metadata } from "next";
import { Geist, Geist_Mono, Cascadia_Code } from "next/font/google";
import "./globals.css";
import { Heart } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cascadiaCode = Cascadia_Code({
  variable: "--font-cascadia-code",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Signum",
  description: "Morse code translator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cascadiaCode.variable} antialiased min-h-screen flex flex-col font-mono`}
      >
        <header className="p-6 border-b border-border bg-background">
          <Link href="/" className="text-xl font-extrabold italic">
            Signum.
          </Link>
        </header>
        <div className="p-6 flex-grow">{children}</div>
        <footer className="p-6 border-t border-border bg-background">
          <p>
            Made with{" "}
            <Heart
              size={16}
              className="inline-block animate-pulse text-red-800 [animation-duration:3s]"
              aria-label="Heart icon"
            />{" "}
            by{" "}
            <a
              href="https://github.com/pythonatsea"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit pythonatsea's GitHub profile (opens in new tab)"
            >
              pythonatsea
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
