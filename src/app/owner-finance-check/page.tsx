import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ContactCTA from "@/components/sections/ContactCTA";
import { ownerFinanceCheckData as d, ofcFAQs } from "@/data/owner-finance-check";

export const metadata: Metadata = {
  title: d.meta.title,
  description: d.meta.description,
};

const LINE_URL = "https://lin.ee/gGDzjTi";

/* ── ตราประทับ "ตรวจก่อนเซ็น" — ปิดท้าย ── */
function ApprovedStamp() {
  return (
    <span className="inline-flex -rotate-6 items-center gap-2 rounded-lg border-2 border-dashed border-teal/60 px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-teal">
      ✓ ตรวจก่อนเซ็น
    </span>
  );
}

// 6 อาการ "ยังอ่านงบของตัวเองไม่ออก"
const PAINS = d.painPoints.items;

// งบ 3 ตัวที่เจ้าของต้องอ่านเป็น (แกนของคลาส — เรียงตามลำดับการอ่าน)
const STATEMENTS = [
  { k: "งบดุล", c: "accent", s: "ดูว่าธุรกิจมีอะไร เป็นหนี้เท่าไหร่ — เงินจมในสต๊อก/ลูกหนี้อยู่ตรงไหน" },
  { k: "งบกำไรขาดทุน", c: "teal", s: "ดูว่ากำไรจริงเหลือเท่าไหร่ ต้นทุน/ค่าใช้จ่ายกินกำไรตรงไหน" },
  { k: "งบกระแสเงินสด", c: "fg", s: "ดูเงินสดเข้า-ออกจริง — คำตอบว่าทำไมงบมีกำไร แต่ในบัญชีไม่มีเงิน" },
];

const FEATURES = d.features;

export default function OwnerFinanceCheckPage() {
  return (
    <main className="bg-bg text-fg">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-accent/15 bg-bg-subtle pt-8 pb-16 md:pt-10 md:pb-24">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* cover banner */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-card border border-accent/25 shadow-[0_28px_70px_-30px_rgba(234,179,8,0.5)]">
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
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-bg/80 px-3 py-1.5 font-mono text-[11px] text-accent backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              WINWIN · อ่านงบ ฉบับเจ้าของ
            </span>
          </div>

          {/* ข้อความ */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-[clamp(1.9rem,1.2rem+3vw,3.4rem)] font-bold leading-[1.12] text-fg [text-wrap:balance]">
              เซ็นอนุมัติงบทุกปี แต่{" "}
              <span className="text-negative">“อ่านงบของตัวเองได้ครบไหม”</span>?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-fg-2">
              คลาสออนไลน์ (Zoom) ที่ทำให้เจ้าของ <span className="text-fg">อ่านงบของธุรกิจตัวเองเป็น</span>{" "}
              — รู้ว่าตัวเลขไหนต้องดู แยก “กำไรจริง” ออกจาก “เงินสดจริง” และเห็นตัวเลขเตือนภัยก่อนสาย ไม่ต้องเป็นบัญชี สอนโดยอดีต RM ธนาคารกสิกร 7 ปี
            </p>
            {/* งบ 3 ตัวที่ต้องอ่านเป็น */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {STATEMENTS.map((s) => (
                <span
                  key={s.k}
                  className="rounded-pill border border-accent/30 bg-accent/[0.08] px-3 py-1.5 font-mono text-[11px] text-accent"
                >
                  {s.k}
                </span>
              ))}
              <span className="font-mono text-[11px] text-fg-muted">— อ่านเป็นทั้ง 3 ในมุมเจ้าของ</span>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#features"
                className="mkt-focus inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                ดูสิ่งที่ได้เรียนในคลาส
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

      {/* ══════════ เคยเจอแบบนี้ไหม (PAINS = checklist ที่ยังทำไม่ได้) ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            ถ้าทุกวันนี้ คุณยังอ่านงบของตัวเองไม่ออก…
          </h2>
          <p className="mt-3 text-fg-2">
            มีกี่ข้อตรงกับคุณ? ยิ่งหลายข้อ ยิ่งแปลว่าตัวเลขธุรกิจถูกคนอื่นอ่านแทนคุณ
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/10 bg-white/[0.06] sm:grid-cols-2">
          {PAINS.map((p, i) => (
            <li key={i} className="flex items-start gap-4 bg-bg px-5 py-6">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-negative/50 font-mono text-xs text-negative">
                ✕
              </span>
              <p className="min-w-0 flex-1 font-medium leading-snug text-fg">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════ เคสจริง (STORY — กำไร ≠ เงินสด) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto grid w-full max-w-[var(--container-marketing)] grid-cols-1 gap-10 px-4 py-section sm:px-6 md:grid-cols-[auto_1fr] md:items-start lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent md:[writing-mode:vertical-rl] md:rotate-180">
            เคสจริง · จากห้อง RM
          </p>
          <blockquote className="min-w-0 max-w-3xl">
            <p className="text-h3 font-semibold leading-relaxed text-fg">
              “เจ้าของเปิดงบมา เห็นบรรทัดกำไรเป็นบวก ก็สบายใจ —
              <span className="text-negative"> แต่ไม่เคยดูว่าเงินสดจริงเหลือเท่าไหร่</span>”
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fg-2">
              งบบอกกำไรเป็นล้าน แต่เงินในบัญชีแทบไม่มี — เพราะกำไรไปจมอยู่ในสต๊อกและลูกหนี้
              ถ้าอ่านงบเป็น{" "}
              <span className="text-fg">คุณจะเห็นช่องว่างระหว่าง “กำไร” กับ “เงินสด” ตั้งแต่ในกระดาษ</span>{" "}
              ก่อนที่เงินจะหมุนไม่ทัน — นี่คือตัวเลขที่เจ้าของส่วนใหญ่อ่านข้ามไป
            </p>
            <footer className="mt-6 font-mono text-sm text-fg-2">
              — วิน กวินทร์รัศม์ นิธิกรภาคย์
              <span className="block text-accent">RM ที่อ่านงบของคนอื่นมาเป็นพันเคส — รู้ว่าตัวเลขไหนบอกว่าธุรกิจกำลังจะมีปัญหา</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ══════════ อ่านงบ 3 ตัว (แกนของคลาส) ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            อ่านงบ 3 ตัวให้เป็น — ในมุมเจ้าของ
          </h2>
          <p className="mt-3 text-fg-2">
            ไม่ต้องอ่านทุกบรรทัดเหมือนนักบัญชี — รู้แค่ว่า <span className="text-fg">แต่ละงบต้องดูตัวเลขไหน และตัวเลขนั้นบอกอะไร</span> ก็คุมธุรกิจของตัวเองได้
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STATEMENTS.map((s, i) => (
            <div
              key={s.k}
              className="min-w-0 flex flex-col rounded-card border bg-surface p-6"
              style={{ borderColor: `color-mix(in srgb, var(--color-${s.c}) 30%, transparent)` }}
            >
              <span className="font-mono text-xs" style={{ color: `var(--color-${s.c})` }}>
                ● งบที่ {i + 1}
              </span>
              <p className="mt-2 text-lg font-bold" style={{ color: `var(--color-${s.c})` }}>
                {s.k}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.s}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-card border border-accent/25 bg-accent/[0.06] px-6 py-5">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">หัวใจของคลาส</span>
          <p className="min-w-0 flex-1 text-sm text-fg-2">
            อ่าน 3 งบต่อกันให้เห็นภาพเดียว — <span className="font-medium text-fg">“กำไรในงบ ≠ เงินในบัญชี”</span> ช่องว่างนี้คือสิ่งที่ต้องเห็นก่อนเซ็น
          </p>
        </div>
      </section>

      {/* ══════════ สิ่งที่ได้เรียน (FEATURES = checklist ✓ ที่ทำได้) ══════════ */}
      <section id="features" className="border-y border-white/10 bg-bg-subtle scroll-mt-20">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-bold [text-wrap:balance]">
                เรียนจบ คุณจะอ่านงบของธุรกิจตัวเองออก
              </h2>
            </div>
            <span className="rounded-pill border border-teal/30 bg-teal/10 px-4 py-1.5 font-mono text-xs text-teal">
              {FEATURES.length} สิ่งที่ทำได้
            </span>
          </header>

          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3 border-t border-white/10 pt-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 font-mono text-xs font-bold text-teal">
                  ✓
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-fg">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ ผู้สอน ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-3xl gap-5 rounded-card border border-white/10 bg-surface p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-base font-bold text-accent">
            RM
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-mono text-xs text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              ผู้สอน · อดีตคนแบงก์
            </p>
            <h3 className="mt-2 text-h3 font-bold text-fg">{d.instructor.name}</h3>
            <p className="mt-1 text-sm text-accent">{d.instructor.role}</p>
            <p className="mt-3 leading-relaxed text-fg-2">{d.instructor.bio}</p>
          </div>
        </div>
      </section>

      {/* ══════════ ราคา + โบนัส ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <h2 className="text-h2 font-bold [text-wrap:balance]">
            ครั้งหน้าก่อนเซ็น อ่านงบเองให้ออก
          </h2>
          <p className="mt-3 text-fg-2">{d.pricingTag}</p>

          <div className="mt-8 rounded-card border border-accent/30 bg-bg p-7 text-left shadow-glow md:p-9">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-4xl font-bold text-fg tabular-nums">{d.pricing[0]?.price}</span>
              {d.pricing[0]?.originalPrice && (
                <>
                  <span className="text-lg text-fg-2 line-through tabular-nums">{d.pricing[0].originalPrice}</span>
                  <span className="rounded-pill border border-negative/30 bg-negative/10 px-3 py-1 font-mono text-xs font-bold text-negative">
                    ประหยัด ฿4,000 · 68% off
                  </span>
                </>
              )}
            </div>
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
              {d.bonuses.map((b) => (
                <li key={b.title} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 text-teal">＋</span>
                  <span className="min-w-0 text-fg-2">
                    <span className="font-medium text-fg">{b.title}</span> — {b.description}
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
              สมัครเรียน Owner Finance Check
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <FAQAccordion
        faqs={ofcFAQs.map((f) => ({ question: f.q, answer: f.a }))}
        eyebrow="ก่อนตัดสินใจ"
        heading="คำถามที่เจ้าของธุรกิจมักถามก่อนเรียน"
        subtitle="มีคำถามเพิ่มเติม ทักไลน์ @WIN_WIN ได้เลย"
      />

      {/* ══════════ CLOSE ══════════ */}
      <section className="relative overflow-hidden border-t border-accent/15 bg-bg-subtle">
        <div className="relative mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <ApprovedStamp />
          </div>
          <h2 className="mt-6 text-h2 font-bold [text-wrap:balance]">
            คนหนึ่ง<span className="text-negative">เซ็นทั้งที่อ่านไม่ออก</span> อีกคน<span className="text-teal">อ่านงบตัวเองเป็นก่อนเซ็น</span>
          </h2>
          <p className="mt-4 text-lead text-fg-2">
            ความต่างระหว่างเจ้าของที่ “ปล่อยให้คนอื่นอ่านงบแทน” กับเจ้าของที่ “อ่านงบของตัวเองออก และใช้มันตัดสินใจได้”
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-focus mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            เริ่มอ่านงบตัวเองให้ออก → สมัครเลย
          </a>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
