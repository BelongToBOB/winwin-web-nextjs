interface Props {
  heading?: string;
  yesItems: string[];
  noItems: string[];
  outcomes?: string[];
  canvasImages?: string[];
}

export default function WhoIsThisFor({
  heading = "คลาสนี้เหมาะกับคุณ ถ้า…",
  yesItems,
  noItems,
  outcomes = [],
  canvasImages = [],
}: Props) {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {heading}
          </h2>
        </div>

        {/* เหมาะกับ */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
          <ul className="space-y-4">
            {yesItems.map((item, i) => (
              <li key={i} className="flex items-start text-gray-300">
                <span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">✅</span>
                <span
                  className="text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ไม่เหมาะกับ */}
        <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
          <p className="text-red-400 font-bold mb-4">คลาสนี้ไม่เหมาะกับคุณ ถ้า…</p>
          <ul className="space-y-3">
            {noItems.map((item, i) => (
              <li key={i} className="flex items-start text-gray-400">
                <span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">❌</span>
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ผลลัพธ์หลังจบคลาส */}
        {outcomes.length > 0 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 mt-6">
            <p className="text-white font-bold mb-5">🎯 ผลลัพธ์หลังจบคลาส</p>
            <ul className="space-y-3 mb-8">
              {outcomes.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">✅</span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a href="#pricing" className="inline-block bg-yellow-500 text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_4px_20px_rgba(234,179,8,0.4)]">
                ดูโปรโมชั่นสุดพิเศษตอนนี้ →
              </a>
            </div>
          </div>
        )}

        {/* Canvas images */}
        {canvasImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            {canvasImages.map((src, i) => (
              <div key={i} className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(250,204,21,0.2)] bg-zinc-900 group">
                <img
                  src={src}
                  alt="Course info canvas"
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-yellow-400/30 group-hover:border-yellow-400/70 z-20 rounded-2xl md:rounded-3xl transition-colors pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
