import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ContactCTA from "@/components/sections/ContactCTA";
import { businessHealthCheckData as d, bhcFAQs } from "@/data/business-health-check";

export const metadata: Metadata = {
  title: d.meta.title,
  description: d.meta.description,
};

const LINE_URL = "https://lin.ee/gGDzjTi";

/* ── ECG heartbeat trace (เส้นชีพจร) — tile กว้าง 1200 ต่อกัน 2 ชุดให้ scroll เนียน ── */
const ECG_TILE =
  "M0,60 H150 q14,0 18,-7 t18,7 H250 l10,-44 l13,80 l10,-58 l7,22 H420 q14,0 18,8 t18,-8 H600";

function EcgLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    >
      <g stroke="var(--color-teal)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ECG_TILE} />
        <path d={ECG_TILE} transform="translate(600,0)" />
      </g>
    </svg>
  );
}

const SYMPTOMS = [
  { n: "01", t: "ขายดีขึ้นทุกปี แต่เงินสดในมือฝืดลงทุกปี" },
  { n: "02", t: "ทำงานแทบตาย แต่ต้องควักเงินตัวเองมาหมุนตลอด" },
  { n: "03", t: "กู้เงินไม่จบสักที ทั้งที่ไม่ได้ลงทุนอะไรเพิ่ม" },
  { n: "04", t: "ไม่รู้ว่า “กำไรจริง” หรือแค่ “ดูเหมือนกำไร”" },
  { n: "05", t: "เปิดงบมาแล้วงง ไม่รู้ตัวเลขแต่ละบรรทัดมาจากไหน" },
  { n: "06", t: "ปล่อยบัญชีปิดงบคนเดียว ตรวจงานเขาไม่เป็น" },
];

// 3 เครื่องมือ = 3 EP ของคลาสจริง
const LAYERS = [
  { n: 1, t: "อ่านงบ + Financial Ratios", s: "งบดุล/งบกำไรขาดทุน อ่านเป็น % + Ratio ที่แบงก์ดู — เห็นกำไรจริงและจุดเสี่ยง" },
  { n: 2, t: "CEO Dashboard", s: "มอนิเตอร์กำไร/ขาดทุนรายเดือน ให้บัญชีหยอด คุณคลิกดู ไม่ต้องรอปิดงบ" },
  { n: 3, t: "Smart Cash Flow", s: "ประมาณการเงินสด รู้ล่วงหน้าว่าเดือนไหนเงินจะตึง วางแผนหมุนได้ทัน" },
];

const PRESCRIPTION = d.features;
// แยกแกนหลัก 3 EP (บทเรียนจริง เรียงเป็นลำดับ) ออกจากทักษะเสริม — ให้ลำดับชั้นชัด ไม่ใช่การ์ด 8 ใบเท่ากันหมด
const CORE_EP = PRESCRIPTION.filter((f) => f.title.startsWith("EP"));
const SKILLS = PRESCRIPTION.filter((f) => !f.title.startsWith("EP"));
const LEAKS = ["สต๊อก (เงินจม)", "ลูกหนี้ค้างเก็บ", "เงินกู้กรรมการ"];

export default function BusinessHealthCheckPage() {
  return (
    <main className="bg-bg text-fg">
      {/* ══════════ HERO — cover banner แบบคลาสอื่น + เอกลักษณ์ monitor ══════════ */}
      <section className="relative overflow-hidden border-b border-teal/15 bg-bg-subtle pt-8 pb-16 md:pt-10 md:pb-24">
        {/* faint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-teal-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-teal-soft) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* cover banner */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-card border border-teal/25 shadow-[0_28px_70px_-30px_rgba(94,201,167,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.hero.heroImage}
              alt={d.hero.heroAlt}
              width={1672}
              height={941}
              className="block aspect-video w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill border border-teal/30 bg-bg/80 px-3 py-1.5 font-mono text-[11px] text-teal backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-teal" />
              WINWIN · CEO MONITOR
            </span>
          </div>

          {/* ข้อความ — ตรงกลางใต้ภาพ */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-[clamp(1.9rem,1.2rem+3vw,3.4rem)] font-bold leading-[1.12] text-fg [text-wrap:balance]">
              ขายดีขึ้นทุกปี แต่ทำไม{" "}
              <span className="text-negative">“เงินไม่เคยเหลือ”</span>?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-fg-2">
              เครื่องตรวจสุขภาพธุรกิจ ฉบับคนแบงก์ — อ่านงบเป็น เห็น{" "}
              <span className="text-fg">กำไรจริง · เงินจม · กระแสเงินสดล่วงหน้า</span>{" "}
              ก่อนปัญหาลามจนสาย สอนโดยอดีต RM ธนาคารกสิกร 7 ปี
            </p>
            <p className="mt-5 inline-block rounded-lg border border-accent/30 bg-accent/[0.08] px-4 py-2 font-mono text-[13px] text-accent">
              เคสจริง: เจ้าของคิดว่ากำไร 25% → คำนวณจริงเหลือ 3%
            </p>

            {/* zone bar */}
            <div className="mx-auto mt-7 max-w-md">
              <div className="flex h-3 overflow-hidden rounded-pill">
                <div className="flex-1 bg-teal/80" />
                <div className="flex-1 bg-accent/80" />
                <div className="flex-1 bg-negative/80" />
              </div>
              <div className="mt-1.5 flex justify-between font-mono text-[11px]">
                <span className="text-teal">● ปกติ</span>
                <span className="text-accent">● เฝ้าระวัง</span>
                <span className="text-negative">● วิกฤต</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#prescription"
                className="mkt-focus inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                ดูเครื่องมือในคลาส
              </a>
            </div>
            <p className="mt-4 text-sm text-fg-2">
              หรือทักไลน์{" "}
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
                @WIN_WIN
              </a>{" "}
              ปรึกษาทีมที่ปรึกษาฟรีก่อนตัดสินใจ
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ อาการ (SYMPTOMS) ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            6 สัญญาณที่ธุรกิจส่งบอก — แต่เจ้าของมักมองข้าม
          </h2>
          <p className="mt-3 text-fg-2">
            มีกี่ข้อตรงกับคุณ? ยิ่งหลายข้อ ยิ่งควรเช็กก่อนสาย
          </p>
        </header>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/[0.06] sm:grid-cols-2">
          {SYMPTOMS.map((sx) => (
            <li key={sx.n} className="group flex items-start gap-4 bg-bg px-5 py-6 transition-colors hover:bg-surface">
              <span className="mt-0.5 font-mono text-sm font-bold text-negative/70">{sx.n}</span>
              <div className="flex-1">
                <p className="font-medium leading-snug text-fg">{sx.t}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════ วินิจฉัย (DIAGNOSIS STORY) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto grid w-full max-w-[var(--container-marketing)] gap-10 px-4 py-section sm:px-6 md:grid-cols-[auto_1fr] md:items-start lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal md:[writing-mode:vertical-rl] md:rotate-180">
            เคสจริง · จากห้องเรียน
          </p>
          <blockquote className="max-w-3xl">
            <p className="text-h3 font-semibold leading-relaxed text-fg">
              “วินถามนักเรียนทุกคนก่อนเลยว่า คิดว่าธุรกิจตัวเองกำไรกี่ % —
              <span className="text-negative"> เคสนี้ตอบ 25%</span>”
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fg-2">
              ยอดขาย 200 ล้าน เขาเข้าใจว่ามีกำไร 25% แต่พอนั่งคำนวณจริง ๆ —
              ต้นทุนไป 90% เหลือกำไรขั้นต้นแค่ 10% หักค่าใช้จ่าย ดอกเบี้ย ภาษี{" "}
              <span className="text-fg">กำไรจริงเหลือแค่ 3%</span>{" "}
              นี่แหละที่มาของคำว่า “ขายดีจนเจ๊ง” และ “ทำธุรกิจมาตั้งนาน ทำไมเงินไม่เหลือ”
            </p>
            <footer className="mt-6 font-mono text-sm text-fg-muted">
              — วิน กวินทร์รัศม์ นิธิกรภาคย์
              <span className="block text-teal">ดีที่ยังทัน — เพราะเขาสงสัยว่า “25% มันต้องได้ 25 ล้าน แล้วทำไมเงินเหลือแค่นี้”</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ══════════ CASHFLOW 4 ชั้น + จุดรั่ว ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            3 จอมอนิเตอร์ ที่ทำให้คุณ “เห็น” ธุรกิจตัวเอง
          </h2>
          <p className="mt-3 text-fg-2">
            กำไรในงบ ≠ เงินในกระเป๋า — สิ่งที่ทำให้ธุรกิจไม่รอดคือ <span className="text-fg">Cash Flow ไม่ใช่กำไร</span> · เรียงเป็น 3 EP จากอ่านงบ → มอนิเตอร์รายเดือน → ประมาณการเงินสด
          </p>
        </header>

        <ol className="mt-10 space-y-3">
          {LAYERS.map((l, i) => (
            <li
              key={l.n}
              className="flex items-center gap-5 rounded-card border border-white/10 bg-surface px-5 py-5 md:px-7"
              style={{ marginLeft: `${i * 1.5}rem` }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal/40 font-mono text-lg font-bold text-teal">
                {l.n}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-fg">{l.t}</p>
                <p className="text-sm text-fg-2">{l.s}</p>
              </div>
              {i < LAYERS.length - 1 && (
                <span className="ml-auto hidden font-mono text-xs text-teal/60 sm:block">ต่อ ↓</span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-card border border-negative/25 bg-negative/[0.06] px-6 py-5">
          <span className="font-mono text-xs uppercase tracking-wider text-negative">เงินจมหลัก ๆ</span>
          <div className="flex flex-wrap gap-2">
            {LEAKS.map((leak) => (
              <span key={leak} className="rounded-pill border border-negative/30 bg-bg px-4 py-1.5 text-sm font-medium text-fg">
                {leak}
              </span>
            ))}
          </div>
          <span className="text-sm text-fg-2">— ดูดเงินสดออกเงียบ ๆ โดยไม่รู้ตัว</span>
        </div>
      </section>

      {/* ══════════ ใบสั่งยา (TREATMENT / FEATURES) ══════════ */}
      <section id="prescription" className="border-y border-white/10 bg-bg-subtle scroll-mt-20">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-bold [text-wrap:balance]">
                เรียนจบ มอนิเตอร์ธุรกิจตัวเองได้ทันที
              </h2>
            </div>
            <span className="rounded-pill border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent">
              {CORE_EP.length} บทเรียน + {SKILLS.length} ทักษะ
            </span>
          </header>

          {/* แกนหลัก: 3 บทเรียน EP — เด่นกว่า เรียงเป็นลำดับจริง */}
          <div className="mt-10">
            <p className="flex items-center gap-2 font-mono text-xs text-teal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
              3 บทเรียนหลัก — เรียงเป็นลำดับ
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {CORE_EP.map((f) => {
                const [tag, ...rest] = f.title.split(" · ");
                const name = rest.join(" · ");
                return (
                  <div
                    key={f.title}
                    className="flex flex-col rounded-card border border-teal/30 bg-bg p-6 shadow-[0_18px_50px_-30px_rgba(94,201,167,0.5)]"
                  >
                    <span className="inline-flex w-fit items-center rounded-pill border border-teal/40 bg-teal/10 px-3 py-1 font-mono text-xs font-bold text-teal">
                      {tag}
                    </span>
                    <h3 className="mt-4 text-lg font-bold leading-snug text-fg [text-wrap:balance]">{name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-2">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ทักษะที่ติดตัวกลับไป — list ทรงต่างจากการ์ด EP ตัดความซ้ำของกริด */}
          <div className="mt-10">
            <p className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              และทักษะที่ติดตัวกลับไป
            </p>
            <ul className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {SKILLS.map((f) => (
                <li key={f.title} className="flex gap-3 border-t border-white/10 pt-4">
                  <span className="mt-0.5 shrink-0 font-bold text-accent">＋</span>
                  <div>
                    <h3 className="font-semibold text-fg">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-2">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Score zones */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { c: "teal", z: "เขียว", t: "ปกติ", s: "ฐานแข็ง พร้อมโต/ขยาย/กู้" },
              { c: "accent", z: "เหลือง", t: "เฝ้าระวัง", s: "มีจุดต้องอุดก่อนเร่งเครื่อง" },
              { c: "negative", z: "แดง", t: "วิกฤต", s: "ต้องรักษาก่อน อย่าเพิ่งขยาย" },
            ].map((zone) => (
              <div
                key={zone.z}
                className="rounded-card border bg-bg px-5 py-5"
                style={{ borderColor: `color-mix(in srgb, var(--color-${zone.c}) 35%, transparent)` }}
              >
                <span className="font-mono text-xs" style={{ color: `var(--color-${zone.c})` }}>
                  ● Health Score
                </span>
                <p className="mt-1 text-lg font-bold" style={{ color: `var(--color-${zone.c})` }}>
                  {zone.z} · {zone.t}
                </p>
                <p className="mt-1 text-sm text-fg-2">{zone.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ หมอประจำตัว (INSTRUCTOR) ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-3xl gap-5 rounded-card border border-white/10 bg-surface p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal/40 font-mono text-base font-bold text-teal">
            RM
          </div>
          <div>
            <p className="flex items-center gap-2 font-mono text-xs text-teal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
              ผู้สอน · อดีตคนแบงก์
            </p>
            <h3 className="mt-2 text-h3 font-bold text-fg">{d.instructor.name}</h3>
            <p className="mt-1 text-sm text-accent">{d.instructor.role}</p>
            <p className="mt-3 leading-relaxed text-fg-2">{d.instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* ══════════ แพ็กเกจตรวจ (PRICING + BONUS) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            เริ่มเข้าใจตัวเลขธุรกิจตัวเองได้ ตั้งแต่วันนี้
          </h2>
          <p className="mt-3 text-fg-2">{d.pricingTag}</p>

          <div className="mt-8 rounded-card border border-accent/30 bg-bg p-7 text-left shadow-glow md:p-9">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-bold text-fg tabular-nums">{d.pricing[0]?.price}</span>
              {d.pricing[0]?.originalPrice && (
                <span className="text-lg text-fg-muted line-through tabular-nums">{d.pricing[0].originalPrice}</span>
              )}
            </div>
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
              {d.bonuses.map((b) => (
                <li key={b.title} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 text-teal">＋</span>
                  <span className="text-fg-2">
                    <span className="font-medium text-fg">{b.title}</span>
                    {b.value && <span className="ml-1 font-mono text-xs text-accent">({b.value})</span>}
                  </span>
                </li>
              ))}
            </ul>
            {d.bonusTotalValue && (
              <p className="mt-4 font-mono text-xs text-fg-muted">รวมโบนัส {d.bonusTotalValue}</p>
            )}
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mkt-focus mt-7 flex w-full items-center justify-center rounded-pill bg-accent px-8 py-4 text-base font-bold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              สมัครตรวจสุขภาพธุรกิจ
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <FAQAccordion
        faqs={bhcFAQs.map((f) => ({ question: f.q, answer: f.a }))}
        eyebrow="ก่อนตัดสินใจ"
        heading="คำถามที่เจ้าของธุรกิจมักถามก่อนตรวจ"
        subtitle="มีคำถามเพิ่มเติม ทักไลน์ @WIN_WIN ได้เลย"
      />

      {/* ══════════ CLOSE ══════════ */}
      <section className="relative overflow-hidden border-t border-teal/15 bg-bg-subtle">
        <div className="absolute inset-x-0 top-0 h-16 overflow-hidden opacity-40">
          <EcgLine />
        </div>
        <div className="relative mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            คนหนึ่ง<span className="text-negative">รู้ตัวตอนสาย</span> อีกคน<span className="text-teal">รู้ตั้งแต่ยังแก้ได้</span>
          </h2>
          <p className="mt-4 text-lead text-fg-2">
            ความต่างระหว่างเจ้าของที่ “หวังว่าจะไม่มีอะไร” กับเจ้าของที่ “ตรวจเจอก่อนและรักษาทัน”
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-focus mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            รู้ก่อน แก้ทัน → เริ่มเลย
          </a>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
