import Eyebrow from "@/components/ui/Eyebrow";
import CTAButton from "@/components/ui/CTAButton";

interface Props {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  badgeLabel?: string;
  dateLabel?: string;
  lineUrl?: string;
  seatNote?: string;
  ctaText?: string;
}

// แบนเนอร์คลาสล่าสุดที่กำลังจะมาถึง — premium, static (CSS-only animation)
export default function UpcomingClass({
  eyebrow = "เปิดรับสมัคร · รอบล่าสุด",
  heading = "คลาสที่กำลังจะมาถึง",
  subtitle = "Inside Business Finance · การเงินธุรกิจและการวางแผนภายใน",
  image,
  imageAlt = "คลาส Inside Business Finance รอบ 15 สิงหาคม 2569",
  badgeLabel = "NEW",
  dateLabel = "15 สิงหาคม 2569",
  lineUrl = "https://lin.ee/gGDzjTi",
  seatNote = "รับจำนวนจำกัด",
  ctaText = "สำรองที่นั่ง · ติดต่อ Line",
}: Props) {
  return (
    <section className="relative w-full overflow-hidden border-t border-accent/10 bg-bg-subtle py-section">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="teal" className="justify-center">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
            </span>
            {eyebrow}
          </Eyebrow>
          <h2 className="text-h2 font-semibold text-fg">{heading}</h2>
          <p className="max-w-xl text-sm text-fg-2 sm:text-base">{subtitle}</p>
        </div>

        {/* banner frame */}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mkt-focus group relative mx-auto block max-w-6xl"
        >
          {/* gradient glow border */}
          <span
            aria-hidden="true"
            className="mkt-breathe absolute -inset-px rounded-[calc(var(--radius-card)+2px)] bg-gradient-to-br from-accent/60 via-accent/10 to-teal/40 blur-[2px]"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-px rounded-[calc(var(--radius-card)+2px)] bg-gradient-to-br from-accent/70 via-transparent to-teal/50"
          />

          <div className="relative overflow-hidden rounded-card border border-white/10 bg-bg">
            {/* NEW badge — pulse */}
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-bg/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {badgeLabel}
            </span>

            {/* date chip — ซ่อนบน mobile (จอแคบจะทับหน้าวิทยากร; วันที่มีในรูป + bar ด้านล่างแล้ว) */}
            <span className="absolute right-4 top-4 z-10 hidden rounded-pill border border-white/15 bg-bg/80 px-3 py-1.5 text-xs font-semibold text-fg backdrop-blur-sm sm:block">
              {dateLabel}
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* hover sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </a>

        {/* date + CTA bar */}
        <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-6 rounded-card border border-white/10 bg-surface/60 p-5 backdrop-blur-sm sm:flex-row sm:p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-accent/20 bg-bg text-accent">
              <span className="text-xl font-bold leading-none tabular-nums">15</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-fg-muted">
                ส.ค.
              </span>
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                เปิดเรียน
              </span>
              <span className="text-lg font-semibold text-fg">{dateLabel}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <CTAButton href={lineUrl} target="_blank" variant="line" size="large">
              {ctaText}
            </CTAButton>
            <span className="flex items-center gap-1.5 text-xs text-fg-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-negative" aria-hidden="true" />
              {seatNote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
