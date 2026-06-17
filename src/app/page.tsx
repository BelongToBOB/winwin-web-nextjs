import HeroSpotlight from "@/components/sections/HeroSpotlight";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import JourneyTimeline, { type JourneyStep } from "@/components/sections/JourneyTimeline";
import PainPoints from "@/components/sections/PainPoints";
import BeforeAfterTable from "@/components/sections/BeforeAfterTable";
import PhotoTestimonials from "@/components/sections/PhotoTestimonials";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import PricingCards, { type PricingPackage } from "@/components/sections/PricingCards";
import LandingCTA from "@/components/landing/LandingCTA";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";
import { insideBankData } from "@/data/inside-bank";
import { bucBeforeAfterRows } from "@/data/bank-uncensored";

export const metadata = {
  title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
};

export default function HomePage() {
  const { hero, services } = landingData;

  // เส้นทางบริการ 4 ขั้น — map จาก services จริง, ปลดล็อก→ขั้นถัดไปอัตโนมัติ
  // ลำดับ: BUC → IBF → Inside Bank → Private (สลับ IBF มาก่อน IB)
  const orderedCards = [...services.cards];
  [orderedCards[1], orderedCards[2]] = [orderedCards[2], orderedCards[1]];

  const journeySteps: JourneyStep[] = orderedCards.map((card, i) => ({
    eyebrow: `ขั้นที่ ${i + 1}`,
    title: card.title,
    lead: card.subtitle,
    image: card.image,
    imageAlt: card.title,
    href: card.url,
    ctaText: "ดูรายละเอียด",
  }));

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
      {/* Section 1 — Hero แบบต้นแบบ (bg image เติมทีหลัง) */}
      <HeroSpotlight
        eyebrow={hero.badge}
        headline={hero.headline}
        highlight="เจ้าของธุรกิจ"
        lead={hero.subheadline}
        subnote={hero.highlight}
        primaryCta={{ text: hero.ctaPrimary.text, url: hero.ctaPrimary.url, target: "_blank" }}
        secondaryCta={{ text: hero.ctaSecondary.text, url: hero.ctaSecondary.url }}
      />

      {/* Pain points — เปิดแผล */}
      <Reveal>
        <section className="w-full bg-bg-subtle py-section">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <PainPoints items={insideBankData.painPoints.items} />
          </div>
        </section>
      </Reveal>

      {/* Before / After — โชว์ผลลัพธ์ */}
      <Reveal>
        <BeforeAfterTable rows={bucBeforeAfterRows} />
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
          eyebrow="เส้นทาง 4 ขั้น"
          heading={services.heading}
          subtitle={services.subtitle}
          steps={journeySteps}
        />
      </Reveal>

      {/* Social proof — รีวิว (วางก่อน Pricing ตาม conversion best practice) */}
      <Reveal>
        <PhotoTestimonials photos={insideBankData.photos} />
      </Reveal>
      <Reveal>
        <VideoTestimonials videos={insideBankData.videos} />
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
