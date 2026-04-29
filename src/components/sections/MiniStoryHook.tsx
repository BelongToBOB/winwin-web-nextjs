interface Props {
  lines: string[];
  highlightLine?: string;
  author?: string;
  authorNote?: string;
}

export default function MiniStoryHook({
  lines,
  highlightLine,
  author = "วิน กวินทร์รัศม์ นิธิกรภาคย์",
  authorNote = "(เดี๋ยววินจะเล่าให้ฟัง)",
}: Props) {
  return (
    <section className="w-full bg-black py-12 md:py-16 border-t border-zinc-900/60 bg-gradient-to-b from-zinc-900/80 to-transparent p-8 md:p-12 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Big Quote Mark */}
        <svg className="w-12 h-12 md:w-16 md:h-16 text-yellow-500/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Content */}
        <div className="space-y-4 text-gray-300 text-lg md:text-xl leading-relaxed relative z-10 font-medium">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          {highlightLine && (
            <p dangerouslySetInnerHTML={{ __html: highlightLine }} />
          )}
        </div>

        {/* Sign off */}
        <div className="mt-8 pt-6 border-t border-zinc-800/60 max-w-[200px] mx-auto">
          <p className="text-yellow-500/80 text-sm font-semibold tracking-wide">{author}</p>
          {authorNote && (
            <p className="mt-2 text-zinc-500 text-sm italic relative z-10">{authorNote}</p>
          )}
        </div>
      </div>
    </section>
  );
}
