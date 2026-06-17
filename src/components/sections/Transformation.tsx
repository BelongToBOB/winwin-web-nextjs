import Eyebrow from "@/components/ui/Eyebrow";

interface Props {
  rows: { before: string; after: string }[];
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
}

// หน้าแรก — Before/After: แคปซูลเดียวไหลจาก "ก่อน" (หม่น) → "หลัง" (teal สว่าง)
export default function Transformation({
  rows,
  eyebrow = "TRANSFORMATION",
  heading = "ก่อนเรียน vs หลังเรียน",
  subtitle = "จากคำถามที่ค้างคาใจ สู่ความมั่นใจที่ลงมือได้จริง",
}: Props) {
  return (
    <section className="w-full border-t border-accent/10 bg-bg py-section">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow mark>{eyebrow}</Eyebrow>
          <h2 className="text-h2 font-bold leading-tight text-fg">{heading}</h2>
          <p className="text-lead text-fg-2">{subtitle}</p>
        </div>

        <ul className="flex flex-col gap-4">
          {rows.map((row, i) => (
            <li
              key={i}
              className="group grid grid-cols-1 overflow-hidden rounded-card border border-white/10 transition-colors hover:border-teal/30 md:grid-cols-[1fr_auto_1fr]"
            >
              {/* ก่อน — หม่น */}
              <div className="flex flex-col justify-center gap-1.5 bg-negative/[0.06] p-5 text-left md:p-6 md:text-right">
                <span className="text-xs font-semibold uppercase tracking-wide text-negative/90">
                  ก่อน
                </span>
                <p className="text-fg-2">{row.before}</p>
              </div>

              {/* โหนดลูกศรทอง */}
              <div className="flex items-center justify-center bg-bg-subtle px-4 py-2 md:px-3 md:py-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-bg text-accent shadow-glow">
                  <svg
                    className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5 md:rotate-0 md:group-hover:translate-x-0.5 md:group-hover:translate-y-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              {/* หลัง — teal สว่าง */}
              <div className="flex flex-col justify-center gap-1.5 bg-teal-soft p-5 transition-colors duration-300 group-hover:bg-teal/[0.18] md:p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                  หลัง
                </span>
                <p className="font-medium text-fg">{row.after}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
