import type { Metadata } from "next";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title:
    "Monthly Finance OS — เห็นเงินจริงของธุรกิจทุกเดือน | Inside Business Finance",
  description:
    "ระบบดูเงินธุรกิจรายเดือน บอกว่าเดือนนี้ตัดสินใจอะไรได้ กรอก 9 ตัวเลข/เดือน ระบบคิด Cashflow-กำไรจริง-แดชบอร์ดเจ้าของให้อัตโนมัติ ราคานักเรียนในคลาส 4,190 บาท/ปี",
};

const LINE_URL = "https://lin.ee/gGDzjTi";

/* ── เนื้อหา (ยึดตาม handoff: IBF_MonthlyOS build_html.py) ── */

const HERO_CHIPS = ["กระแสเงินสด 4 ชั้น", "กำไรจริง 3 ชั้น", "แดชบอร์ดเจ้าของ 10 ช่อง"];

// ปัญหาที่เจอ (ยอดขายดูดีแต่เงินหาย)
const PAINS = [
  { b: "ปีละครั้ง", t: "ปิดงบทีไร ถึงรู้ว่าเงินหายไปไหน ทั้งที่ปีนี้ขายดีกว่าปีก่อน" },
  { b: "กำไรที่จับต้องไม่ได้", t: "งบบอกกำไร แต่บัญชีไม่มีเงิน เพราะเงินไปจมในสต็อกกับลูกหนี้" },
  { b: "ตัดสินใจด้วยความรู้สึก", t: "อยากขยาย/ลงเครื่องจักร/เปิดสาขา แต่ไม่รู้ว่า “ตอนนี้พร้อมจริงไหม”" },
  { b: "ขอกู้แล้วตอบไม่ได้", t: "แบงก์ขอตัวเลขรายเดือน แต่คุณมีแค่งบปีที่แล้ว" },
];

// เทียบกับโปรแกรมบัญชี/นักบัญชี
const COMPARE = [
  {
    k: "บอกอะไร",
    acc: "กำไรทางบัญชี (ถูกตามหลักบัญชี)",
    os: "เงินสดจริงที่เหลือใช้ / เหลือโต",
  },
  {
    k: "ภาษา",
    acc: "ภาษาบัญชี (EBITDA, ลูกหนี้, ค่าเสื่อม)",
    os: "ภาษาเจ้าของ (เหลือจริงเท่าไหร่ / โตได้ไหม)",
  },
  {
    k: "ตัดสินใจ",
    acc: "ดูย้อนหลัง สรุปปีละครั้ง",
    os: "บอกว่า “เดือนนี้ตัดสินใจอะไรได้” ทันที",
  },
];

// สิ่งที่ได้ในระบบ (3 engines + trend + runway + pdf)
const FEATURES = [
  {
    title: "Engine 1 · กระแสเงินสด 4 ชั้น",
    description: "ไล่จากเงินเข้าจริง จนถึงเงินเหลือเพื่อโตจริง (Growth Cash)",
  },
  {
    title: "Engine 2 · กำไรจริง 3 ชั้น",
    description: "แยกกำไรบัญชีออกจากเงินที่เจ้าของใช้ได้จริง (Owner-Usable Cash)",
  },
  {
    title: "Engine 3 · แดชบอร์ดเจ้าของ 10 ช่อง",
    description:
      "ตอบ 5 คำถาม: ขายได้เท่าไหร่ / เหลือจริงไหม / รั่วตรงไหน / เงินเข้าจริงไหม / พอโต-พอจ่ายหนี้ไหม",
  },
  {
    title: "กราฟเทรนด์เดือนต่อเดือน (MoM)",
    description: "ยอดขายโต/ลดกี่ % ค่าใช้จ่ายพุ่งไหม เงินสดขึ้นหรือลง",
  },
  {
    title: "สายป่านธุรกิจ (Runway) + สัญญาณหยุด (Hard Stop)",
    description: "เตือนอัตโนมัติเมื่อยังไม่ควรขยาย/ก่อหนี้",
  },
  {
    title: "รายงาน PDF รายเดือน แบรนด์เต็ม",
    description: "พร้อมเก็บไว้คุยกับแบงก์/หุ้นส่วน",
  },
];

export default function MonthlyFinanceOSPage() {
  return (
    <main className="bg-bg text-fg">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden border-b border-accent/15 bg-bg-subtle pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
            Inside Business Finance
          </p>
          <h1 className="mt-5 text-[clamp(1.9rem,1.2rem+3vw,3.4rem)] font-bold leading-[1.14] text-fg [text-wrap:balance]">
            ธุรกิจคุณไม่ได้ขาดกำไร
            <br />
            <span className="text-accent">
              มันขาดวันที่คุณ “เห็นเงินจริง” ก่อนสายเกินแก้
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-fg-2">
            Monthly Finance OS คือระบบปฏิบัติการการเงินรายเดือนสำหรับเจ้าของธุรกิจ —
            เปลี่ยนการดูตัวเลขจาก “ปีละครั้งตอนปิดงบ” เป็น{" "}
            <span className="text-fg">
              “ทุกเดือน เห็นเงินสดจริง รู้ว่าเดือนนี้ตัดสินใจอะไรได้”
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {HERO_CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-pill border border-accent/30 bg-accent/[0.08] px-3 py-1.5 font-mono text-[11px] text-accent"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mkt-focus inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              ทักไลน์ @WIN_WIN เพื่อสมัคร
            </a>
            <a href="#features" className="text-sm text-fg-2 hover:text-fg">
              หรือดูสิ่งที่ได้ในระบบก่อน ↓
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ ผู้ออกแบบระบบ (วิน) ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-card border border-accent/25 bg-surface p-6 sm:p-8">
          <p className="flex items-center gap-2 font-mono text-xs text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            ผู้ออกแบบระบบ
          </p>
          <h2 className="mt-2 text-h3 font-bold text-fg">
            วิน — Strategic Financial Architect · Growth Partner สำหรับ SME ไทย
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed text-fg-2">
            <p>
              ไม่ใช่โค้ช ไม่ใช่นักบัญชี ไม่ใช่คนขายสินเชื่อ ไม่ใช่นายหน้ากู้เงิน —
              วินคือคนที่ออกแบบ “โครงสร้างการเงิน” ให้เจ้าของธุรกิจ SME ไทยโตด้วยเงินทุนอย่างมีกลยุทธ์
              ไม่ใช่โตด้วยการเดา
            </p>
            <p>
              จากประสบการณ์ Relationship Manager (RM) ธนาคาร วินเห็นเกมทั้งกระดาน —
              มุมเจ้าของที่อยากได้วงเงิน มุมธนาคารที่ชั่งความเสี่ยงจากงบการเงิน
              และหลักวิเคราะห์เครดิตจริง ทั้งความสามารถจ่ายหนี้คืน (DSCR)
              และกระแสเงินสดก่อน–หลังชำระหนี้
            </p>
            <p>
              และวันนี้วินนั่งอีกฝั่ง — เจ้าของธุรกิจที่สร้างกิจการระดับร้อยล้านด้วยสินเชื่อธนาคารจริง
              หน้าที่ของวินจึงไม่ใช่พาคุณไปกู้ แต่คือออกแบบโครงสร้างเงินทุนให้ธุรกิจโตได้
              โดยไม่เพิ่มความเสี่ยงเกินจำเป็น — ทำเรื่องการเงินที่ซับซ้อนให้เข้าใจง่ายและใช้ได้จริง
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ ถ้าคุณเคยเจอแบบนี้ (PAINS) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              ถ้าคุณเคยเจอแบบนี้
            </p>
            <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
              เงินหายทั้งที่ธุรกิจ “ดูดี”
            </h2>
            <p className="mt-3 text-fg-2">
              ยอดขายโตทุกเดือน กำไรก็มีในงบ แต่พอสิ้นเดือนกลับต้องลุ้นว่าจ่ายเงินเดือนทันไหม
            </p>
          </header>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/10 bg-white/[0.06] sm:grid-cols-2">
            {PAINS.map((p) => (
              <li key={p.b} className="flex items-start gap-4 bg-bg px-5 py-6">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-negative/50 font-mono text-xs text-negative">
                  ✕
                </span>
                <p className="min-w-0 flex-1 leading-snug text-fg-2">
                  <span className="font-semibold text-fg">{p.b}</span> — {p.t}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ ปัญหาที่แท้จริง ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            ปัญหาที่แท้จริง
          </p>
          <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
            ไม่ใช่คุณทำเงินไม่เก่ง — แต่คุณเห็นตัวเลขช้าไป
          </h2>
          <p className="mt-5 leading-relaxed text-fg-2">
            เจ้าของธุรกิจส่วนใหญ่เห็นตัวเลขจริงแค่ปีละครั้ง ตอนที่แก้อะไรไม่ทันแล้ว
            และมักสับสนระหว่าง “กำไรทางบัญชี” กับ “เงินสดจริงในมือ” — ซึ่งเป็นคนละตัวกัน
          </p>
          <p className="mt-4 leading-relaxed text-fg-2">
            Monthly Finance OS แก้ตรงนี้ ด้วยการทำให้ “การดูเงินรายเดือน” ง่ายจนคุณทำได้จริงทุกเดือน
            แล้วไล่ให้เห็นว่าเงินหายไปตรงไหน จนถึงตัวเลขสุดท้ายที่สำคัญที่สุด —{" "}
            <span className="font-semibold text-fg">เงินเหลือเพื่อโตจริง (Growth Cash)</span>
          </p>
        </div>
      </section>

      {/* ══════════ ต่างจากโปรแกรมบัญชี (COMPARE) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              ต่างจากที่คุณเคยใช้ยังไง
            </p>
            <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
              ไม่ใช่โปรแกรมบัญชี ไม่ใช่นักบัญชี
            </h2>
          </header>

          <div className="mt-10 overflow-hidden rounded-card border border-white/10">
            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-[minmax(0,7rem)_1fr_1fr]">
              {/* header row (desktop) */}
              <div className="hidden bg-surface-3 px-5 py-3 font-mono text-xs text-fg-muted sm:block" />
              <div className="hidden bg-surface-3 px-5 py-3 text-sm font-bold text-fg-2 sm:block">
                โปรแกรมบัญชี / นักบัญชี
              </div>
              <div className="hidden bg-surface-3 px-5 py-3 text-sm font-bold text-accent sm:block">
                Monthly Finance OS
              </div>

              {COMPARE.map((row) => (
                <div key={row.k} className="contents">
                  <div className="bg-surface px-5 py-4 font-semibold text-accent">
                    {row.k}
                  </div>
                  <div className="bg-bg px-5 py-4 text-sm leading-relaxed text-fg-2">
                    <span className="font-mono text-[11px] text-fg-muted sm:hidden">
                      บัญชี:{" "}
                    </span>
                    {row.acc}
                  </div>
                  <div className="bg-bg px-5 py-4 text-sm font-medium leading-relaxed text-fg">
                    <span className="font-mono text-[11px] text-accent sm:hidden">
                      Monthly OS:{" "}
                    </span>
                    {row.os}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ สิ่งที่ได้ในระบบ (FEATURES) ══════════ */}
      <section
        id="features"
        className="mx-auto w-full max-w-[var(--container-marketing)] scroll-mt-20 px-4 py-section sm:px-6 lg:px-8"
      >
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            สิ่งที่คุณได้ในระบบ
          </p>
          <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
            กรอกน้อย เห็นเยอะ — กรอก 9 ตัวเลข/เดือน ระบบคิดให้หมด
          </h2>
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

        {/* แผนผัง: กรอกที่ไหน → ไปโผล่ช่องไหน */}
        <figure className="mt-12">
          <figcaption className="mb-4 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              กรอกที่ไหน » ไปโผล่ช่องไหน
            </span>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-fg-2">
              ตัวเลขไม่กี่ตัวที่คุณกรอก ถูกร้อยเข้า engine แล้วไปโผล่เป็น 10 ช่องบนแดชบอร์ดเจ้าของ —
              เห็นทั้งเส้นทางว่าอะไรมาจากอะไร
            </p>
          </figcaption>
          <div className="overflow-hidden rounded-card border border-accent/20 bg-[#0F1D33]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/monthly-os-flow.png"
              alt="แผนผังเส้นโยง Monthly Finance OS — กรอก 9 ช่องแล้วไปโผล่ที่ช่องไหนบนแดชบอร์ด Owner Dashboard 10 ช่อง"
              width={1600}
              height={1180}
              className="block w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-card border border-accent/25 bg-accent/[0.06] px-6 py-5">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            single source of truth
          </span>
          <p className="min-w-0 flex-1 text-sm text-fg-2">
            ทุกตัวเลขใช้ engine ชุดเดียวกับที่คุณเรียนในคลาส —{" "}
            <span className="font-medium text-fg">ตัวเลขไม่ขัดกันระหว่างเครื่องมือ</span>
          </p>
        </div>
      </section>

      {/* ══════════ หน้าตาจริงของระบบ (SHOWCASE) ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
          <header className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              หน้าตาจริงของระบบ
            </p>
            <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
              เปิดมาเห็นทันทีว่าเดือนนี้ตัดสินใจอะไรได้
            </h2>
          </header>

          <figure className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-card border border-accent/25 shadow-[0_28px_70px_-30px_rgba(234,179,8,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/monthly-os-dashboard.png"
                alt="ตัวอย่างแดชบอร์ด Monthly Finance OS — Growth Cash ติดลบ ขึ้นสัญญาณหยุด"
                width={1320}
                height={1200}
                className="block w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-fg-2">
              ตัวอย่างจริง (ก.ค. 2569): กำไรขั้นต้นสูงถึง 91.7% ดูน่าพอใจ — แต่ระบบจับได้ว่า
              Growth Cash (เงินเหลือเพื่อโตจริง) ติดลบ 3.33 ล้าน แล้วขึ้นสัญญาณหยุดทันที
              “ยังไม่ควรรับภาระหนี้เพิ่ม” นี่คือจุดที่ตัวเลขบัญชีสวย
              แต่เงินสดจริงเตือนคุณก่อนสายเกินแก้
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ══════════ ทำไมต้องดูทุกเดือน ══════════ */}
      <section className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            ทำไมต้องดูทุกเดือน
          </p>
          <h2 className="mt-3 text-h2 font-bold [text-wrap:balance]">
            ยิ่งใช้นาน ยิ่งเห็นภาพ ยิ่งเลิกยาก (ในทางที่ดี)
          </h2>
          <p className="mt-5 leading-relaxed text-fg-2">
            การดูเงินปีละครั้งเหมือนชั่งน้ำหนักปีละหน — รู้ตอนสายเกินแก้
            แต่พอเห็นตัวเลขทุกเดือน คุณจะจับปัญหาได้ตั้งแต่ยังเล็ก ปรับได้ทัน
            และเมื่อข้อมูลสะสมหลายเดือน คุณจะมีสิ่งที่แบงก์อยากเห็นที่สุด —{" "}
            <span className="font-semibold text-fg">
              ตัวเลขรายเดือนที่สม่ำเสมอ พร้อม Runway และความสามารถจ่ายหนี้ (DSCR)
            </span>
          </p>
        </div>
      </section>

      {/* ══════════ ราคา + เหมาะ/ไม่เหมาะ ══════════ */}
      <section className="border-y border-white/10 bg-bg-subtle">
        <div className="mx-auto w-full max-w-3xl px-4 py-section sm:px-6 lg:px-8">
          <header className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              ราคาสำหรับนักเรียนในคลาส
            </p>
          </header>

          <div className="mt-8 rounded-card border border-accent/30 bg-bg p-7 text-center shadow-glow md:p-9">
            <p className="text-lg text-fg-2 line-through tabular-nums">
              ราคาเต็ม 12,900 บาท/ปี
            </p>
            <p className="mt-1 text-fg">เฉพาะนักเรียนในคลาส</p>
            <p className="mt-3 flex items-end justify-center gap-2">
              <span className="text-[clamp(2.75rem,2rem+4vw,4rem)] font-bold leading-none text-accent tabular-nums">
                4,190
              </span>
              <span className="pb-1 text-2xl font-bold text-fg">บาท</span>
              <span className="pb-1.5 text-lg font-semibold text-fg-2">/ ปี</span>
            </p>
            <p className="mt-3 text-sm text-fg-2">
              เดือนละ ~349 บาท · วันละ ~11 บาท · ประหยัดจากราคาเต็ม 8,710 บาท
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mkt-focus mt-7 flex w-full items-center justify-center rounded-pill bg-accent px-8 py-4 text-base font-bold text-on-accent transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              ทักไลน์ @WIN_WIN เพื่อสมัคร
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-teal/25 bg-surface p-6">
              <h3 className="font-mono text-sm font-bold text-teal">เหมาะกับคุณถ้า</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg-2">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  อยากเห็นเงินจริงของธุรกิจทุกเดือน ไม่ใช่รอปิดงบ
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  กำลังคิดเรื่องขยาย/กู้ และอยากตัดสินใจด้วยตัวเลข ไม่ใช่ความรู้สึก
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-teal">✓</span>
                  อยากมีตัวเลขรายเดือนที่พร้อมคุยกับแบงก์เมื่อถึงเวลา
                </li>
              </ul>
            </div>
            <div className="rounded-card border border-negative/25 bg-surface p-6">
              <h3 className="font-mono text-sm font-bold text-negative">ยังไม่เหมาะถ้า</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg-2">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-negative">✕</span>
                  อยากได้โปรแกรมบัญชีเต็มรูปแบบสำหรับยื่นภาษี (นี่คือเครื่องมือเพื่อการตัดสินใจ)
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-negative">✕</span>
                  ยังไม่พร้อมกรอกตัวเลข 9 ช่องต่อเดือน (ใช้เวลาไม่กี่นาที แต่ต้องทำสม่ำเสมอ)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CLOSE ══════════ */}
      <section className="relative overflow-hidden border-t border-accent/15 bg-bg-subtle">
        <div className="relative mx-auto w-full max-w-3xl px-4 py-section text-center sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            เริ่มใช้เดือนนี้
          </p>
          <h2 className="mt-4 text-h2 font-bold [text-wrap:balance]">
            ทักไลน์เพื่อสมัคร แล้วเริ่มเห็นเงินจริงของธุรกิจคุณ
          </h2>
          <p className="mt-4 text-lead text-fg-2">
            ไม่ต้องรอปิดงบสิ้นปี — เริ่มบันทึกเดือนนี้ เดือนหน้าคุณจะเห็นเทรนด์แรกของธุรกิจตัวเอง
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-focus mt-8 inline-flex items-center gap-2 rounded-pill bg-accent px-9 py-4 text-base font-bold text-on-accent shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            ทักไลน์ @WIN_WIN เพื่อสมัคร
          </a>
          <p className="mt-4 font-mono text-xs text-accent">
            ราคานักเรียน 4,190 บาท/ปี สงวนไว้สำหรับผู้เรียนในคลาสเท่านั้น
          </p>
          <p className="mx-auto mt-6 max-w-xl text-xs italic leading-relaxed text-fg-muted">
            เครื่องมือเพื่อการตัดสินใจของเจ้าของธุรกิจ ไม่ใช่คำแนะนำการลงทุนหรืองบการเงินตรวจสอบ
          </p>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
