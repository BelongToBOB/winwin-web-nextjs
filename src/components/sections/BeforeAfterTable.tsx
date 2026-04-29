interface Props {
  rows: { before: string; after: string }[];
  heading?: string;
}

export default function BeforeAfterTable({
  rows,
  heading = "ก่อนเรียน vs หลังเรียน",
}: Props) {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {heading}
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-zinc-800">
          <div className="grid grid-cols-2">
            <div className="bg-red-900/20 border-b border-zinc-800 p-4 text-center">
              <span className="text-red-400 font-bold text-lg">😥 ก่อนเรียน</span>
            </div>
            <div className="bg-green-900/10 border-b border-l border-zinc-800 p-4 text-center">
              <span className="text-green-400 font-bold text-lg">🎯 หลังเรียน</span>
            </div>
            {rows.map((row, i) => (
              <>
                <div
                  key={`before-${i}`}
                  className={`bg-zinc-900/50 p-4 md:p-5${i < rows.length - 1 ? " border-b border-zinc-800" : ""}`}
                >
                  <p className="text-gray-400 text-base">{row.before}</p>
                </div>
                <div
                  key={`after-${i}`}
                  className={`bg-zinc-900/30 p-4 md:p-5 border-l border-zinc-800${i < rows.length - 1 ? " border-b border-zinc-800" : ""}`}
                >
                  <p className="text-white font-medium text-base">{row.after}</p>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-red-900/20 px-4 py-3 border-b border-zinc-800">
                <p className="text-gray-400 text-sm"><span className="text-red-400 mr-1">😥</span>{row.before}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-white font-medium text-sm"><span className="text-green-400 mr-1">🎯</span>{row.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
