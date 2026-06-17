import HeroSpotlight from "@/components/sections/HeroSpotlight";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import JourneyTimeline, { type JourneyStep } from "@/components/sections/JourneyTimeline";
import Transformation from "@/components/sections/Transformation";
import PricingCards, { type PricingPackage } from "@/components/sections/PricingCards";
import LandingCTA from "@/components/landing/LandingCTA";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";
import { bucBeforeAfterRows } from "@/data/bank-uncensored";

export const metadata = {
  title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
};

export default function HomePage() {
  const { hero, services } = landingData;

  // เส้นทางบริการ 3 ขั้น: ออนไลน์ → Onsite (รวม IB+IBF) → Exclusive (Private)
  const journeySteps: JourneyStep[] = [
    {
      eyebrow: "ขั้นที่ 1 · ออนไลน์",
      title: "คลาสออนไลน์",
      lead: "เริ่มปูพื้นความเข้าใจการเงินธุรกิจและมุมมองแบงก์ — เรียนออนไลน์ได้ทุกที่ทุกเวลา",
      bullets: [
        "Bank Uncensored — รู้ทันแบงก์ ก่อนยื่นกู้",
        "คอร์สออนไลน์ใหม่ ๆ กำลังจะเพิ่มเร็ว ๆ นี้",
      ],
      image: "/images/mainkvbuc2.webp",
      imageAlt: "คลาสออนไลน์ WinWin",
      href: "/bank-uncensored",
      ctaText: "ดูคลาสออนไลน์",
    },
    {
      eyebrow: "ขั้นที่ 2 · ONSITE",
      title: "คลาส Onsite",
      lead: "ลงลึกแบบลงมือจริง เรียนสดกับผู้เชี่ยวชาญตัวต่อตัว",
      subCards: [
        {
          title: "Inside Bank",
          subtitle: "Workshop สินเชื่อธนาคาร 1 วันเต็ม",
          image: "/images/IBKv-Hero.webp",
          href: "/inside-bank",
        },
        {
          title: "Inside Business Finance",
          subtitle: "การเงินธุรกิจและการวางแผนภายใน",
          image: "/images/KVIBF2.webp",
          href: "/inside-business-finance",
        },
      ],
    },
    {
      eyebrow: "ขั้นที่ 3 · EXCLUSIVE",
      title: "Private Consult",
      lead: "ที่ปรึกษาส่วนตัวแบบ Exclusive — วางแผนเฉพาะธุรกิจคุณโดยตรง",
      image: "/images/EPCmainKV.webp",
      imageAlt: "Private Consult WinWin",
      href: "/private-consult",
      ctaText: "ดูรายละเอียด",
    },
  ];

  // การ์ดราคา — ราคา/ส่วนลด/bullet จาก data จริงในไฟล์คอร์สแต่ละตัว
  // (highlight "MOST POPULAR" = Inside Bank เป็นค่าเริ่ม ปรับได้)
  const pricingPackages: PricingPackage[] = [
    {
      eyebrow: "ออนไลน์",
      title: "Bank Uncensored",
      description: "คอร์สออนไลน์ความลับของธนาคาร",
      image: "/images/mainkvbuc2.webp",
      features: [
        "Statement ดี vs น่าสงสัย ต่างกันตรงไหน",
        "ติดบูโรกู้ได้ไหม?",
        "Checklist 6 เอกสาร + Roadmap ก่อนยื่นกู้",
      ],
      savings: "ประหยัด ฿8,000 · 50% off",
      price: "฿7,900",
      originalPrice: "฿15,900",
      url: "/bank-uncensored",
    },
    {
      badge: { label: "MOST POPULAR", tone: "accent" },
      eyebrow: "คอร์ส",
      title: "Inside Business Finance",
      description: "การเงินธุรกิจและการวางแผนภายใน",
      image: "/images/KVIBF2.webp",
      features: [
        "Owner Finance Thinking (100M Method)",
        "Cashflow 4 ชั้น",
        "Real Profit Framework",
        "Bank POV Check",
      ],
      savings: "ประหยัด ฿10,000 · 39% off",
      price: "฿15,900",
      originalPrice: "฿25,900",
      highlighted: true,
      highlightTone: "accent",
      url: "/inside-business-finance",
    },
    {
      eyebrow: "Workshop",
      title: "Inside Bank",
      description: "Workshop สินเชื่อธนาคาร 1 วันเต็ม",
      image: "/images/IBKv-Hero.webp",
      features: [
        "Coaching แก้ไขเคสเฉพาะบุคคล (1 วันเต็ม)",
        "Template แผนธุรกิจฉบับยื่นจริง",
        "Checklist 15 ข้อ ที่แบงก์ใช้ดูคุณ",
        "เครื่องมือคำนวณความสามารถชำระหนี้",
      ],
      savings: "ประหยัด ฿31,100 · 53% off",
      price: "฿27,900",
      originalPrice: "฿59,000",
      url: "/inside-bank",
    },
    {
      eyebrow: "ตัวต่อตัว",
      title: "Private Consult",
      description: "การปรึกษาส่วนตัวเพื่อธุรกิจคุณโดยเฉพาะ",
      image: "/images/EPCmainKV.webp",
      features: [
        "เปิดงบการเงินธุรกิจคุณ",
        "วิเคราะห์จุดอ่อนเฉพาะเคสคุณ",
        "FORMULA APPROVE เฉพาะของธุรกิจคุณ",
        "เลือกสินเชื่อที่ใช่",
      ],
      price: "฿35,000",
      url: "/private-consult",
    },
  ];

  return (
    <main>
      {/* Section 1 — Hero แบบต้นแบบ */}
      <HeroSpotlight
        bgImage="/images/home-hero-kv.jpg"
        bgAlt="บรรยากาศสัมมนา WinWin Wealth Creation"
        eyebrow={hero.badge}
        headline={hero.headline}
        highlight="เจ้าของธุรกิจ"
        lead={hero.subheadline}
        subnote={hero.highlight}
        primaryCta={{ text: hero.ctaPrimary.text, url: hero.ctaPrimary.url, target: "_blank" }}
        secondaryCta={{ text: hero.ctaSecondary.text, url: hero.ctaSecondary.url }}
      />

      {/* Before / After — เลือกเฉพาะคำถามที่ trigger สุด 5 ข้อ */}
      <Reveal>
        <Transformation rows={[0, 5, 1, 2, 6].map((i) => bucBeforeAfterRows[i])} />
      </Reveal>

      {/* Section 2 — แนะนำตัวสั้น */}
      <Reveal>
        <LandingHero />
      </Reveal>
      <Reveal>
        <LandingAbout />
      </Reveal>

      {/* Section บริการ — ไทม์ไลน์เส้นทาง 4 ขั้น (แทนกริดเดิม) */}
      <Reveal>
        <JourneyTimeline
          eyebrow="เส้นทาง 3 ขั้น"
          heading={services.heading}
          subtitle={services.subtitle}
          steps={journeySteps}
        />
      </Reveal>

      {/* Section การ์ดราคา — เลือกบริการ + สมัคร */}
      <Reveal>
        <PricingCards
          eyebrow="สมัครเรียน"
          heading="เลือกบริการที่ใช่"
          highlight="ที่ใช่"
          subtitle={services.subtitle}
          packages={pricingPackages}
        />
      </Reveal>

      <Reveal>
        <LandingCTA />
      </Reveal>
    </main>
  );
}
