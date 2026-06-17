import Eyebrow from "@/components/ui/Eyebrow";

interface Props {
  rows: { before: string; after: string }[];
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
}

// หน้าแรก — Before/After แบบไทม์ไลน์: เส้นสันหลังไล่สี + โหนดลูกศรทอง
export default function Transformation({
  rows,
  eyebrow = "TRANSFORMATION",
  heading = "ก่อนเรียน vs หลังเรียน",
  subtitle = "จากคำถามที่ค้างคาใจ สู่ความมั่นใจที่ลงมือได้จริง",
}: Props) {
  return (
    <section className="w-full border-t border-accent/10 bg-bg py-section">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow mark>{eyebrow}</Eyebrow>
          <h2 className="text-h2 font-bold leading-tight text-fg">{heading}</h2>
          <p className="text-lead text-fg-2">{subtitle}</p>
        </div>

        <ol className="relative space-y-5">
          {/* spine */}
          <span
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-negative/40 via-accent/50 to-teal/50 md:block"
            aria-hidden="true"
          />
          {rows.map((row, i) => (
            <li
              key={i}
              className="relative grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]"
            >
              {/* before — ทึม */}
              <div className="rounded-card border border-negative/15 bg-bg-subtle p-5 md:text-right">
                <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-negative md:justify-end">
                  ก่อน
                </span>
                <p className="text-fg-2">{row.before}</p>
              </div>

              {/* node — ลูกศรทองเรืองแสง */}
              <div className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-bg text-accent shadow-glow">
                <svg
                  className="h-5 w-5 rotate-90 md:rotate-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>

              {/* after — teal เรืองแสง */}
              <div className="surface-card group rounded-card border border-teal/30 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_36px_-10px_rgba(94,201,167,0.5)]">
                <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
                  หลัง
                </span>
                <p className="font-medium text-fg">{row.after}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
