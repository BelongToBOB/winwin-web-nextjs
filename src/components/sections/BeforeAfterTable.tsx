import Eyebrow from "@/components/ui/Eyebrow";

interface Props {
  rows: { before: string; after: string }[];
  heading?: string;
  eyebrow?: string;
}

function Mark({ type }: { type: "x" | "check" }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 ${type === "x" ? "text-negative" : "text-teal"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      {type === "x" ? (
        <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5" />
      )}
    </svg>
  );
}

export default function BeforeAfterTable({
  rows,
  heading = "ก่อนเรียน vs หลังเรียน",
  eyebrow = "TRANSFORMATION",
}: Props) {
  return (
    <section className="w-full bg-bg py-section border-t border-accent/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          {eyebrow && <Eyebrow mark>{eyebrow}</Eyebrow>}
          <h2 className="text-h2 font-bold text-fg leading-tight">{heading}</h2>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-hidden rounded-card border border-white/10 md:block">
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-negative/10 p-4">
              <Mark type="x" />
              <span className="text-lg font-bold text-negative">ก่อนเรียน</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-b border-l border-white/10 bg-teal-soft p-4">
              <Mark type="check" />
              <span className="text-lg font-bold text-teal">หลังเรียน</span>
            </div>
            {rows.map((row, i) => (
              <div key={i} className="contents">
                <div
                  className={`bg-surface/40 p-4 md:p-5${i < rows.length - 1 ? " border-b border-white/10" : ""}`}
                >
                  <p className="text-base text-fg-2">{row.before}</p>
                </div>
                <div
                  className={`border-l border-white/10 bg-surface/20 p-4 md:p-5${i < rows.length - 1 ? " border-b" : ""}`}
                >
                  <p className="text-base font-medium text-fg">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-4 md:hidden">
          {rows.map((row, i) => (
            <div key={i} className="overflow-hidden rounded-card border border-white/10 bg-surface">
              <div className="flex items-start gap-2 border-b border-white/10 bg-negative/10 px-4 py-3">
                <Mark type="x" />
                <p className="text-sm text-fg-2">{row.before}</p>
              </div>
              <div className="flex items-start gap-2 px-4 py-3">
                <Mark type="check" />
                <p className="text-sm font-medium text-fg">{row.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
