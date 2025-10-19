import Image from "next/image";

export default function Page() {
  return (
    <div className="max-w-2xl justify-self-center w-full">
      <h1 className="text-2xl font-bold mb-2">QR Code History</h1>
      <p>
        QR codes were invented by the Denso Wave automobile products company, as
        a way to encode data about packages of products. The initial alternating
        square design was developed by Masahiro Hara, and was inspired by the Go
        board. The pattern of the detection markers was based on the least
        common pattern in written text, which turned out to be 1:1:3:1:1 ratio
        of black and white modules.
      </p>
      <h1 className="text-2xl font-bold mb-2 mt-6">QR Pattern</h1>
      <p>
        A QR code consists of position markers, a alignment marker, timing
        patterns, data modules, error correction modules, and a quiet zone. The
        position markers are the large squares in three corners of the code,
        which help the scanner locate and orient the code. The alignment marker
        is a smaller square near the bottom right corner, which helps with
        distortion correction. The timing patterns are alternating black and
        white modules that are used to determine the size of the QR code. The
        data modules contain the actual encoded data, while the error correction
        modules allow the code to be read even if it is partially damaged.
        Finally, the quiet zone is a margin of white space around the code that
        helps the scanner distinguish the code from its surroundings.
      </p>
      <Image
        src="/qrStructure.svg"
        alt="QR Code Pattern"
        className="my-4 bg-primary"
        width={400}
        height={400}
      />
    </div>
  );
}
