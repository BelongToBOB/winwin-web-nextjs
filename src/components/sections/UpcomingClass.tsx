"use client";

import { useEffect, useState } from "react";
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
  /** ISO วันเปิดเรียน สำหรับนับถอยหลัง */
  targetDate?: string;
  features?: string[];
  lineUrl?: string;
  seatNote?: string;
  ctaText?: string;
}

const DEFAULT_FEATURES = [
  "ระบบเงิน 5 ช่อง Monitor รายเดือน",
  "Cashflow Layer 4 ชั้น เห็นเงินจริง",
  "Business Health Check ฉบับคนแบงก์",
  "โครงสร้างกำไรที่คุมได้",
  "Template + Dashboard พร้อมใช้",
];

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | null;

function diff(target: number): Remaining {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

// แบนเนอร์คลาสล่าสุดที่กำลังจะมาถึง — premium, นับถอยหลัง + ticker
export default function UpcomingClass({
  eyebrow = "เปิดรับสมัคร · รอบล่าสุด",
  heading = "คลาสที่กำลังจะมาถึง",
  subtitle = "Inside Business Finance — รอบสด เรียนกับคนแบงก์ตัวจริง",
  image,
  imageAlt = "คลาส Inside Business Finance รอบ 4 กรกฎาคม 2569",
  badgeLabel = "NEW",
  dateLabel = "4 กรกฎาคม 2569",
  targetDate = "2026-07-04T00:00:00+07:00",
  features = DEFAULT_FEATURES,
  lineUrl = "https://lin.ee/gGDzjTi",
  seatNote = "รับจำนวนจำกัด",
  ctaText = "สำรองที่นั่ง · ติดต่อ Line",
}: Props) {
  const [remaining, setRemaining] = useState<Remaining>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    // clock ต้องคำนวณฝั่ง client เท่านั้น (กัน hydration mismatch)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(diff(target));
    const id = setInterval(() => setRemaining(diff(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const countdown = [
    { value: remaining?.days, label: "วัน" },
    { value: remaining?.hours, label: "ชม." },
    { value: remaining?.minutes, label: "นาที" },
    { value: remaining?.seconds, label: "วินาที" },
  ];

  const ticker = [...features, ...features];

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
          className="mkt-focus group relative mx-auto block max-w-5xl"
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

            {/* date chip */}
            <span className="absolute right-4 top-4 z-10 rounded-pill border border-white/15 bg-bg/80 px-3 py-1.5 text-xs font-semibold text-fg backdrop-blur-sm">
              {dateLabel}
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[2059/764] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* hover sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </a>

        {/* countdown + CTA bar */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-card border border-white/10 bg-surface/60 p-5 backdrop-blur-sm sm:flex-row sm:p-6">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
              เปิดเรียนอีก
            </span>
            <div className="flex items-center gap-2.5">
              {countdown.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-accent/20 bg-bg text-2xl font-bold tabular-nums text-accent sm:h-16 sm:w-16 sm:text-3xl">
                    {mounted && unit.value != null
                      ? String(unit.value).padStart(2, "0")
                      : "--"}
                  </span>
                  <span className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-fg-muted">
                    {unit.label}
                  </span>
                </div>
              ))}
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

        {/* feature ticker */}
        <div className="group relative mx-auto mt-8 max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="mkt-marquee flex w-max items-center gap-3">
            {ticker.map((feature, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-pill border border-white/10 bg-surface/50 px-4 py-2 text-sm text-fg-2"
              >
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
