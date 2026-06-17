import CTAButton from "@/components/ui/CTAButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import HeroSpotlight from "@/components/sections/HeroSpotlight";

// หน้า dev ชั่วคราว — โชว์ design tokens + primitives (ลบทิ้งก่อน merge prod ได้)
// เปิดที่ http://localhost:3000/styleguide

export const metadata = { title: "Styleguide — ui-refactor" };

const swatches: { name: string; cls: string; hex: string }[] = [
  { name: "bg", cls: "bg-bg", hex: "#14110d" },
  { name: "bg-subtle", cls: "bg-bg-subtle", hex: "#1a1611" },
  { name: "surface", cls: "bg-surface", hex: "#1b1814" },
  { name: "surface-2", cls: "bg-surface-2", hex: "#232019" },
  { name: "surface-3", cls: "bg-surface-3", hex: "#2c281f" },
  { name: "accent", cls: "bg-accent", hex: "#facc15" },
  { name: "accent-hover", cls: "bg-accent-hover", hex: "#fde047" },
  { name: "teal", cls: "bg-teal", hex: "#5ec9a7" },
  { name: "fg", cls: "bg-fg", hex: "#f4f5f7" },
  { name: "fg-2", cls: "bg-fg-2", hex: "#b4b0a6" },
  { name: "fg-muted", cls: "bg-fg-muted", hex: "#8a857a" },
  { name: "negative", cls: "bg-negative", hex: "#ef4444" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t border-white/10 py-12">
      <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-fg-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* HeroSpotlight demo — placeholder content (โชว์ look ต้นแบบเต็มรูปแบบ) */}
      <HeroSpotlight
        eyebrow="LIMITLESS CLUB · AI EXPERT JOURNEY"
        headline="6 วัน ปลดล็อก ธุรกิจคุณ"
        highlight="ปลดล็อก"
        lead="เจ้าของธุรกิจที่เลิกลงมือทำเองทุกอย่าง แล้วกลายเป็นคนสั่งการระบบ"
        subnote="ไม่ใช่คอร์สแยกกัน — เป็นการไต่ระดับที่ออกแบบมาเป็นชุดเดียว"
        primaryCta={{ text: "ดู TRANSFORMATION", url: "#" }}
        secondaryCta={{ text: "ดู Package ทั้งหมด", url: "#" }}
        stats={[
          { value: "1,000+", label: "ผู้เรียน" },
          { value: "6", label: "วัน" },
          { value: "3", label: "เฟส" },
        ]}
        announcement={{
          tag: "NEW",
          text: "รอบใหม่! Shortcut to AI Expert Day 1 — ส. 20 มิถุนายน 2569",
          url: "#",
        }}
      />

      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-16 sm:px-6 lg:px-8">
        <Eyebrow mark>UI REFACTOR · STYLEGUIDE</Eyebrow>
        <h1 className="mt-4 text-h1 font-bold">Design tokens & primitives</h1>
        <p className="mt-3 text-lead text-fg-2">premium dark + ทอง · teal รอง — อ้างอิง limitlessclub</p>

        {/* Colors */}
        <Block title="Color tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((s) => (
              <div key={s.name} className="surface-card overflow-hidden rounded-card">
                <div className={`h-20 ${s.cls}`} />
                <div className="p-3">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-fg-muted">{s.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* Typography */}
        <Block title="Typography scale">
          <div className="flex flex-col gap-4">
            <p className="text-display font-bold">Display · ปลดล็อกธุรกิจคุณ</p>
            <p className="text-h1 font-bold">H1 · ด้วยเวลาแค่ 6 วัน</p>
            <p className="text-h2 font-bold">H2 · เลือก Package ที่ใช่</p>
            <p className="text-h3 font-semibold">H3 · คุณสั่งการระบบ</p>
            <p className="text-lead text-fg-2">Lead · ไม่ใช่คอร์สแยกกัน — เป็นการไต่ระดับที่ออกแบบมาเป็นชุดเดียว</p>
            <p className="text-base text-fg-2">Body · ข้อความปกติบนพื้นเข้ม อ่านสบายผ่าน WCAG AA</p>
            <Eyebrow>Eyebrow · TRANSFORMATION</Eyebrow>
          </div>
        </Block>

        {/* Buttons */}
        <Block title="Buttons (CTAButton)">
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton href="#" variant="yellow">ดู TRANSFORMATION</CTAButton>
            <CTAButton href="#" variant="outline">ดู Package ทั้งหมด</CTAButton>
            <CTAButton href="#" variant="teal">เลือก Package นี้</CTAButton>
            <CTAButton href="#" variant="white-outline">ดูรายละเอียด</CTAButton>
            <CTAButton href="#" variant="line">เพิ่มเพื่อน LINE</CTAButton>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton href="#" variant="yellow" size="large">เริ่ม 6-DAY JOURNEY</CTAButton>
            <CTAButton href="#" variant="outline" size="large">ดู Package</CTAButton>
          </div>
        </Block>

        {/* Badges */}
        <Block title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">MOST POPULAR</Badge>
            <Badge variant="accent">Early Bird</Badge>
            <Badge variant="teal">ทุกอย่างครบ</Badge>
            <Badge variant="teal">34% OFF</Badge>
            <Badge>เฟส 1 · เรียนรู้</Badge>
            <Badge variant="negative">เหลือ 1 ที่</Badge>
          </div>
        </Block>

        {/* SectionHeading */}
        <Block title="SectionHeading (eyebrow + highlight)">
          <SectionHeading
            eyebrow="TRANSFORMATION"
            eyebrowMark
            title="วันที่ 0 vs วันที่ 6"
            highlight="6"
            highlightTone="teal"
            lead="คุณอยู่ตรงไหน — และจะอยู่ตรงไหนหลังจบ 6 วัน"
          />
        </Block>

        {/* Cards */}
        <Block title="Cards (surface-card)">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { tag: "accent" as const, label: "MOST POPULAR", title: "The Limitless Master", price: "฿44,900" },
              { tag: "teal" as const, label: "ทุกอย่างครบ", title: "Scale 10X", price: "฿80,800" },
              { tag: "default" as const, label: "PACKAGE A", title: "The Essential Starter", price: "฿14,900" },
            ].map((c) => (
              <div key={c.title} className="surface-card flex flex-col gap-4 rounded-card p-6">
                <Badge variant={c.tag}>{c.label}</Badge>
                <h3 className="text-h3 font-bold">{c.title}</h3>
                <p className="text-sm text-fg-2">รวมทุก 6 วัน — ตั้งแต่พื้นฐานจนถึงสั่งการทีม Agent</p>
                <p className="text-2xl font-bold text-fg">{c.price}</p>
                <CTAButton href="#" variant={c.tag === "teal" ? "teal" : "outline"}>เลือก Package นี้</CTAButton>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </main>
  );
}
