import HeroSpotlight from "@/components/sections/HeroSpotlight";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import JourneyTimeline, { type JourneyStep } from "@/components/sections/JourneyTimeline";
import ServiceCards, { type ServiceCardItem } from "@/components/sections/ServiceCards";
import LandingCTA from "@/components/landing/LandingCTA";
import { landingData } from "@/data/landing";

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

  // การ์ดขาย — บริการเดียวกัน ลำดับเดียวกับ timeline
  const serviceCards: ServiceCardItem[] = orderedCards.map((card) => ({
    title: card.title,
    subtitle: card.subtitle,
    image: card.image,
    url: card.url,
    ctaText: "ดูรายละเอียด",
  }));

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

      {/* Section 2 — แนะนำตัวสั้น */}
      <LandingHero />
      <LandingAbout />

      {/* Section บริการ — ไทม์ไลน์เส้นทาง 4 ขั้น (แทนกริดเดิม) */}
      <JourneyTimeline
        eyebrow="เส้นทาง 4 ขั้น"
        heading={services.heading}
        subtitle={services.subtitle}
        steps={journeySteps}
      />

      {/* Section การ์ดขาย — เลือกบริการ + สมัคร */}
      <ServiceCards
        eyebrow="สมัครเรียน"
        heading="เลือกบริการที่ใช่"
        highlight="ที่ใช่"
        subtitle={services.subtitle}
        cards={serviceCards}
      />

      <LandingCTA />
    </main>
  );
}
