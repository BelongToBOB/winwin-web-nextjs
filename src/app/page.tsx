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
      subCards: [
        {
          title: "Bank Uncensored",
          subtitle: "รู้ทันแบงก์ ก่อนยื่นกู้",
          image: "/images/mainkvbuc2.webp",
          href: "/bank-uncensored",
        },
        {
          title: "Business Health Check",
          subtitle: "เช็กสุขภาพการเงินธุรกิจ รู้จุดอ่อนก่อนแบงก์เจอ",
          image: "/images/business-health-check.png",
        },
        {
          title: "Owner Finance Check",
          subtitle: "อ่านงบก่อนเซ็น — รู้ตัวเลขที่ควรดู",
          image: "/images/owner-finance-check.jpg",
        },
      ],
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
      eyebrow: "ขั้นที่ 3 · ตัวต่อตัว",
      title: "Exclusive Private Consult",
      lead: "ที่ปรึกษาส่วนตัวแบบ Exclusive — วางแผนเฉพาะธุรกิจคุณโดยตรง",
      image: "/images/EPCmainKV.webp",
      imageAlt: "Private Consult WinWin",
      href: "/private-consult",
      ctaText: "ดูรายละเอียด",
    },
  ];

  // การ์ดราคา — ทุกใบติดต่อผ่าน LINE · จัดกลุ่ม ออนไลน์ → onsite → exclusive
  const LINE_URL = "https://lin.ee/gGDzjTi";
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
      detailUrl: "/bank-uncensored",
    },
    {
      eyebrow: "ออนไลน์",
      title: "Business Health Check",
      description: "ตรวจสุขภาพการเงินธุรกิจ รู้จุดอ่อนก่อนแบงก์เจอ",
      image: "/images/business-health-check.png",
      features: [
        "วิเคราะห์สุขภาพการเงินธุรกิจเจาะลึก",
        "รู้จุดอ่อนที่ต้องแก้ก่อนแบงก์เจอ",
        "มีเครื่องมือ + Checklist ใช้เองได้",
      ],
      price: "฿7,900",
    },
    {
      eyebrow: "ออนไลน์ · Zoom",
      title: "Owner Finance Check",
      description: "อ่านงบก่อนเซ็น — รู้ตัวเลขที่ควรดู",
      image: "/images/owner-finance-check.jpg",
      features: [
        'อ่านงบแบบ "เจ้าของ" ไม่ใช่ภาษานักบัญชี',
        'แยก "กำไรจริง vs เงินสดจริง"',
        "รู้ตัวเลขเตือนภัยก่อนธุรกิจมีปัญหา",
        "มี Template + Checklist ใช้จริง",
      ],
      savings: "ประหยัด ฿4,000 · 68% off",
      price: "฿1,900",
      originalPrice: "฿5,900",
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
      detailUrl: "/inside-business-finance",
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
      detailUrl: "/inside-bank",
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
      detailUrl: "/private-consult",
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

      {/* Before / After — เลือกเฉพาะคำถามที่ trigger สุด 5 ข้อ (มี stagger ในตัว) */}
      <Transformation rows={[0, 5, 1, 2, 6].map((i) => bucBeforeAfterRows[i])} />

      {/* Section 2 — แนะนำตัวสั้น */}
      <Reveal>
        <LandingHero />
      </Reveal>
      <Reveal>
        <LandingAbout />
      </Reveal>

      {/* Section บริการ — ไทม์ไลน์เส้นทาง 3 ขั้น (มี stagger ในตัว) */}
      <JourneyTimeline
        eyebrow="เส้นทาง 3 ขั้น"
        heading={services.heading}
        subtitle={services.subtitle}
        steps={journeySteps}
      />

      {/* Section การ์ดราคา — เลือกบริการ + สมัคร (มี stagger ในตัว) */}
      <PricingCards
        eyebrow="สมัครเรียน"
        heading="เลือกคอร์สที่ใช่สำหรับธุรกิจคุณ"
        highlight="ที่ใช่"
        subtitle={services.subtitle}
        packages={pricingPackages}
        lineUrl={LINE_URL}
      />

      <Reveal>
        <LandingCTA />
      </Reveal>
    </main>
  );
}
