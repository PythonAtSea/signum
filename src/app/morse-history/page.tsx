import Art from "@/components/art";

export default function Page() {
  return (
    <div className="max-w-2xl justify-self-center w-full border-l-4 border-primary pl-4">
      <h1 className="text-2xl font-bold mb-6">The history of Morse Code.</h1>
      <h2 className="text-xl font-bold mb-2">Early Innovations</h2>
      <p>
        Morse Code&apos;s roots come from the early 19th century, when various
        European experimenters were working on electric signalling systems.
        Early systems had a electrically controlled needle that would point to
        the left or the right. These systems were very slow, because they
        required the receiver to switch between writing and watching the needle.
        A early innovation was putting a piece of ivory on one side and a piece
        of metal on the other, so that the operator could write down the signals
        based on the sound.
      </p>
      <Art manualImageIndex={0} />
      <h2 className="text-xl font-bold my-6">Samuel Morse and Alfred Vail</h2>
    </div>
  );
}
