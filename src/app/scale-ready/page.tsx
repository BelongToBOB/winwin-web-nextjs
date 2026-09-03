import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ContactCTA from "@/components/sections/ContactCTA";
import {
  scaleReadyData as d,
  srFAQs,
  srSchedule,
  srHeroChips,
  srBeforeKnow,
  srSteps,
  srLearnItems,
  srTransformation,
  srWhoIsThisFor as who,
} from "@/data/scale-ready";

export const metadata: Metadata = {
  title: d.meta.title,
  description: d.meta.description,
};

const LINE_URL = "https://lin.ee/gGDzjTi";
const CTA_LABEL = "สมัครเรียน SCALE READY MANUFACTURING";

export default function ScaleReadyPage() {
  const hasHero = Boolean(d.hero.heroImage);

  return (
    <main className="bg-bg text-fg">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-accent/15 bg-bg-subtle pt-8 pb-16 md:pt-10 md:pb-24">
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

        <div
          className={`relative mx-auto grid w-full items-center gap-10 px-4 sm:px-6 lg:px-8 ${
            hasHero ? "max-w-6xl md:grid-cols-[1.15fr_1fr]" : "max-w-3xl"
          }`}
        >
          {/* ข้อความ */}
          <div className={hasHero ? "order-2 text-center md:order-1 md:text-left" : "text-center"}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/[0.08] px-3 py-1.5 font-mono text-[11px] tracking-wider text-accent">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {d.hero.badge}
            </span>

            <h1 className="mt-5 text-[clamp(1.9rem,1.2rem+3vw,3.4rem)] font-bold leading-[1.12] text-fg [text-wrap:balance]">
              ผลิตมากขึ้น ยอดขายมากขึ้น แต่ทำไม{" "}
              <span className="text-negative">เงินสดในธุรกิจกลับไม่ได้เพิ่มตาม</span>?
            </h1>
            <p className={`mt-5 max-w-xl text-lead text-fg-2 ${hasHero ? "mx-auto md:mx-0" : "mx-auto"}`}>
              {d.hero.description}
            </p>

            {/* meta chips */}
            <div className={`mt-7 flex flex-wrap gap-2 ${hasHero ? "justify-center md:justify-start" : "justify-center"}`}>
              {srHeroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-pill border border-teal/30 bg-teal/[0.08] px-3 py-1.5 font-mono text-[11px] text-teal"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* price teaser */}
            <div className={`mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 ${hasHero ? "justify-center md:justify-start" : "justify-center"}`}>
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {d.pricing[0]?.label}
              </span>
              <span className="text-3xl font-bold tabular-nums text-fg">{d.pricing[0]?.price}</span>
              {d.pricing[0]?.originalPrice && (
                <span className="text-lg text-fg-muted line-through tabular-nums">
                  {d.pricing[0].originalPrice}
                </span>
              )}
            </div>

            <div className={`mt-8 flex ${hasHero ? "justify-center md:justify-start" : "justify-center"}`}>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-focus inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                {CTA_LABEL}
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

          {/* ผู้สอน (คัตเอาต์ พื้นหลังโปร่ง) — แสดงเมื่อมีไฟล์ hero เท่านั้น กันรูปแตกก่อนไฟล์มา */}
          {hasHero && (
            <div className="relative order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-6 top-10 rounded-card bg-accent/[0.06] blur-2xl"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.hero.heroImage}
                alt={d.hero.heroAlt}
                className="relative z-10 mx-auto block w-full max-w-[420px] object-contain"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}
        </div>
      </section>

      {/* ══════════ PAIN — ตอบไม่ชัด ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">{d.painPoints.heading}</h2>
          <p className="mt-3 text-fg-2">
            ปัญหาอาจไม่ใช่เพราะธุรกิจไม่มีข้อมูล แต่เป็นเพราะเรายังไม่รู้ว่า “ต้องถามอะไรจากข้อมูลที่มี”
          </p>
        </header>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/[0.06] sm:grid-cols-2">
          {d.painPoints.items.map((p, i) => (
            <li key={i} className="flex items-start gap-4 bg-bg px-5 py-6">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-negative/50 font-mono text-xs text-negative">
                ?
              </span>
              <p className="min-w-0 flex-1 font-medium leading-snug text-fg">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════ POSITIONING ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">{d.sectionHeadline.heading}</h2>
          <p className="mt-4 text-lead text-fg-2">{d.sectionHeadline.subheading}</p>

          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-fg-2">{d.solution.text}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {d.solution.highlight.split(" · ").map((chip) => (
              <span
                key={chip}
                className="rounded-pill border border-teal/30 bg-bg px-4 py-1.5 text-sm font-medium text-fg"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MAP → GAP → MOVE ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="flex items-center gap-2 font-mono text-xs text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            หลังเรียน คุณจะมองธุรกิจผ่าน 3 ขั้นตอน
          </p>
          <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
            <span className="text-teal">MAP</span> → <span className="text-teal">GAP</span> →{" "}
            <span className="text-teal">MOVE</span> — เห็นภาพ · เห็นจุด · เห็นทาง
          </h2>
        </header>

        {/* ก่อนเรียน: รู้เพียงว่า… */}
        <div className="mt-8 rounded-card border border-white/10 bg-surface px-6 py-5">
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">ก่อนเรียน คุณอาจรู้เพียงว่า…</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {srBeforeKnow.map((b) => (
              <span key={b} className="rounded-pill border border-white/10 bg-bg px-3 py-1.5 text-sm text-fg-2">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-fg-2">
            ข้อมูลเหล่านี้บอกว่า “ธุรกิจกำลังเป็นอย่างไร” แต่ยังไม่ชัดพอที่จะตัดสินใจว่า{" "}
            <span className="text-fg">ควรกลับไปจัดการเรื่องใดก่อน</span>
          </p>
        </div>

        <ol className="mt-8 space-y-4">
          {srSteps.map((step, i) => (
            <li
              key={step.code}
              className="relative rounded-card border border-teal/25 bg-surface p-6 shadow-[0_18px_50px_-30px_rgba(94,201,167,0.5)] md:p-8"
              style={{ marginLeft: `${i * 1.5}rem` }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal/40 font-mono text-lg font-bold text-teal">
                  {i + 1}
                </span>
                <span className="inline-flex items-center rounded-pill border border-teal/40 bg-teal/10 px-3 py-1 font-mono text-xs font-bold tracking-wider text-teal">
                  STEP {i + 1} · {step.code}
                </span>
                <h3 className="text-h3 font-bold text-fg">{step.title}</h3>
              </div>

              <p className="mt-4 border-l-2 border-teal pl-4 text-fg-2">{step.lead}</p>

              {step.flow && (
                <p className="mt-4 rounded-lg border border-accent/25 bg-accent/[0.06] px-4 py-3 font-mono text-sm text-accent">
                  {step.flow}
                </p>
              )}

              {step.bullets && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-fg-2">
                      <span className="mt-1 shrink-0 text-teal" aria-hidden="true">
                        ›
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {step.body && <p className="mt-4 text-sm leading-relaxed text-fg-2">{step.body}</p>}
            </li>
          ))}
        </ol>
      </section>

      {/* ══════════ สิ่งที่คุณจะได้เรียน (7 ✓) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <h2 className="text-h2 font-bold [text-wrap:balance]">สิ่งที่คุณจะได้รับจากคลาสนี้</h2>
          </header>
          <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {srLearnItems.map((item) => (
              <li key={item} className="flex gap-3 border-t border-white/10 pt-4">
                <span className="mt-0.5 shrink-0 font-bold text-teal">✓</span>
                <p className="leading-relaxed text-fg">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ การเปลี่ยนแปลง — ก่อน / ระหว่าง / หลัง ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">การเปลี่ยนแปลงที่คุณจะได้รับ</h2>
        </header>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {srTransformation.map((t, i) => (
            <div key={t.phase} className="flex flex-col rounded-card border border-white/10 bg-surface p-6">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {String(i + 1).padStart(2, "0")} · {t.phase}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-snug text-fg [text-wrap:balance]">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ เหมาะ / ไม่เหมาะ กับใคร ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <h2 className="text-h2 font-bold [text-wrap:balance]">{who.heading}</h2>
          </header>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* เหมาะ */}
            <div className="rounded-card border border-teal/25 bg-bg p-6 md:p-7">
              <p className="flex items-center gap-2 font-mono text-xs text-teal">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
                เหมาะสำหรับ
              </p>
              <ul className="mt-5 space-y-3">
                {who.yesItems.map((y) => (
                  <li key={y} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-bold text-teal">✓</span>
                    <span className="text-fg-2">{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* ไม่เหมาะ */}
            <div className="rounded-card border border-negative/25 bg-bg p-6 md:p-7">
              <p className="flex items-center gap-2 font-mono text-xs text-negative">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-negative" />
                คลาสนี้อาจยังไม่เหมาะกับคุณ หาก…
              </p>
              <ul className="mt-5 space-y-3">
                {who.noItems.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-bold text-negative">✕</span>
                    <span className="text-fg-2">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            เห็นภาพการเงินให้ชัด <span className="text-accent">เตรียมธุรกิจให้พร้อมโต</span>
          </h2>
          <p className="mt-3 text-fg-2">{d.pricingTag}</p>

          <div className="mt-8 rounded-card border border-accent/30 bg-bg p-7 text-left shadow-glow md:p-9">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {d.pricing[0]?.label}
              </span>
              <span className="text-4xl font-bold tabular-nums text-fg">{d.pricing[0]?.price}</span>
              {d.pricing[0]?.originalPrice && (
                <span className="text-lg text-fg-muted line-through tabular-nums">
                  {d.pricing[0].originalPrice}
                </span>
              )}
            </div>

            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
              {srSchedule.map((s) => (
                <li key={s.label} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 text-teal">＋</span>
                  <span className="text-fg-2">
                    <span className="font-medium text-fg">{s.label}:</span> {s.value}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mkt-focus mt-7 flex w-full items-center justify-center rounded-pill bg-accent px-8 py-4 text-base font-bold text-on-accent transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <FAQAccordion
        faqs={srFAQs.map((f) => ({ question: f.q, answer: f.a }))}
        eyebrow="ก่อนตัดสินใจ"
        heading="คำถามที่พบบ่อย"
        subtitle="มีคำถามเพิ่มเติม ทักไลน์ @WIN_WIN ได้เลย"
      />

      {/* ══════════ CLOSE ══════════ */}
      <section className="border-t border-accent/15 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            ก่อนพาธุรกิจไปต่อ — <span className="text-teal">รู้ก่อนว่าควรเริ่มจัดการตรงไหน</span>
          </h2>
          <p className="mt-4 text-lead text-fg-2">
            เป้าหมายของคลาสนี้ คือช่วยให้เจ้าของเห็นภาพธุรกิจของตัวเองชัดขึ้น เพื่อรู้ว่า “ควรเริ่มจัดการอะไรต่อ”
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-focus mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            {CTA_LABEL}
          </a>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
