import Art from "@/components/art";

export default function Page() {
  return (
    <div className="max-w-2xl justify-self-center w-full border-l-4 border-primary pl-4">
      <h1 className="text-2xl font-bold mb-6">The history of Morse Code.</h1>
      <h2 className="text-xl font-bold mb-2">Early Innovations</h2>
      <p>
        Morse Code&apos;s roots come from the early 19th century, when various
        European experimenters were working on electric signalling systems.
        Early systems had an electrically controlled needle that would point to
        the left or the right. These systems were very slow, because they
        required the receiver to switch between writing and watching the needle.
        An early innovation was putting a piece of ivory on one side and a piece
        of metal on the other, so that the operator could write down the signals
        based on the sound.
      </p>
      <Art manualImageIndex={0} />
      <h2 className="text-xl font-bold mt-6 mb-2">
        Samuel Morse and Alfred Vail
      </h2>
      <p>
        An American artist, Samuel Morse, was the first person to create a
        telegraph alphabet similar to modern Morse code. In the earliest
        versions of his system, Morse only planned on transmitting numbers, and
        used a codebook to look up words. However, Alfred Vail expanded it to
        include letters. He estimated the frequency of letters by counting the
        movable type in the type cases of a local newspaper. The most common
        letters received shorter sequences. For example, the letter E was used
        most often, so it was given the shortest sequence, a single dot. Morse
        also developed a device that indented a paper tape to record the signals
        as they were received.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-2">
        Change from graphical to audible signals.
      </h2>
      <p>
        In the first Morse telegraph systems, the armature made a clicking sound
        as it moved to mark the paper tape. Operators discovered they could
        translate the clicks directly to dots and dashes without needing to look
        at the paper tape. When Morse code began being used over radio waves the
        dots and dashes were sent as long and short pulses.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-2">Friedrich Gerke</h2>
      <p>
        Morse Code, as defined by the International Morse Code Recommendation,
        is based on the recommendations of Friedrich Gerke, which had many
        improvements over the original Morse Code. It did away with the
        differently lengthened dashes, leaving just dots and dashes. He also
        added codes for letters with umlauts, as he was German. His version was
        adopted by Germany and Austria in 1851, and was adapted into
        International Morse Code in 1865, with some modifications, such as
        redesigning the codes for numbers.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-2">
        Radiotelegraphy and aviation
      </h2>
      <p>
        In the 1890s, Morse code began to be used over radio waves, as voice
        transmission was not yet practical. However, it wasn&apos;t used for
        aviation until 1910, when the US Army first experimented with the idea
        of sending Morse code from an airplane. The first regular use of Morse
        code in aviation was on airships, which had the space to accommodate the
        transmitters, which were quite heavy at that point in time. During WWI,
        Zeppelin airships were equipped with radios, and some allied aircraft
        were also equipped. However, they didn&apos;t see widespread use until
        the mid-1920s, when in 1928 the first flight from California to
        Australia had a dedicated crewman to handle Morse code transmissions. In
        the 1930s, all pilots were required to be proficient in Morse code, both
        for navigation and communication. Militaries also used Morse code
        extensively during WWII for fast moving battles, particularly in the
        German Blitzkrieg offensives, although it was also used by the Allied
        forces.
      </p>
      <h2 className="text-xl font-bold mt-6 mb-2">Demise of Morse Code</h2>
      <p>
        After the introduction of the telephone, Morse code was gradually
        replaced by voice communication. It remained the international standard
        for maritime emergency communications until 1999, when it was replaced
        by the Global Maritime Distress and Safety System. The last Morse code
        transmission by the United States was on the 12th of July, 1999, signing
        off with the first Morse code message, &quot;What hath God wrought&quot;
      </p>
    </div>
  );
}
