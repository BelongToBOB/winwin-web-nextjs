interface Props {
  heading: string;
  introText?: string;
  introSub?: string;
  afterText?: string;
  bullets: { text: string }[];
  quoteHighlight?: string;
  quoteSub?: string;
  closingLines?: string[];
}

export default function ReframeClose({
  heading,
  introText,
  introSub,
  afterText,
  bullets,
  quoteHighlight,
  quoteSub,
  closingLines = [],
}: Props) {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {introText && (
          <p className="text-gray-400 text-lg mb-10">
            {introText}
            {introSub && (
              <>
                <br />
                <span className="text-gray-300">{introSub}</span>
              </>
            )}
          </p>
        )}

        {afterText && <p className="text-white font-bold text-lg mb-6">{afterText}</p>}

        <div className="text-left space-y-4 mb-10 max-w-2xl mx-auto">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <span className="text-green-400 font-bold mt-0.5 shrink-0">→</span>
              <p
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: bullet.text }}
              />
            </div>
          ))}
        </div>

        {quoteHighlight && (
          <div className="border-l-4 border-yellow-500 pl-6 py-3 text-left mb-10 max-w-2xl mx-auto">
            <p className="text-yellow-400 font-bold text-xl leading-snug mb-2">{quoteHighlight}</p>
            {quoteSub && <p className="text-gray-400 text-base">{quoteSub}</p>}
          </div>
        )}

        {closingLines.length > 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto">
            {closingLines.map((line, i) => (
              <p
                key={i}
                className="text-gray-300 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
