interface Props {
  eyebrow?: string;
  heading?: string;
  items: string[];
}

// หน้าแรก — Pain points แบบ "เปิดแผล" (เลขผี + glow แดง + hover ยก)
export default function PainPointsShowcase({
  eyebrow = "ปัญหาที่เจ้าของธุรกิจเจอ",
  heading = 'เคยสงสัยไหม... ทำไมธุรกิจคุณไปได้ดี แต่พอถึงเวลาต้องใช้เงินก้อน กลับ <span class="text-negative">"ไปต่อไม่ได้"</span>?',
  items,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-bg-subtle py-section">
      {/* red glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-negative/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-negative">
            <span className="h-px w-8 bg-negative" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2
            className="mt-4 text-h2 font-bold leading-tight text-fg"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="surface-card group relative overflow-hidden rounded-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-negative/40 hover:shadow-[0_0_40px_-12px_rgba(239,68,68,0.45)]"
            >
              <span
                className="pointer-events-none absolute -right-1 -top-5 select-none text-7xl font-black leading-none text-negative/10"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-negative/10 text-negative transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </span>
                <p className="pt-1 text-lg font-medium text-fg">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
