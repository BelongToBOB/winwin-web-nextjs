import HeroSpotlight from "@/components/sections/HeroSpotlight";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import LandingServices from "@/components/landing/LandingServices";
import LandingCTA from "@/components/landing/LandingCTA";
import { landingData } from "@/data/landing";

export const metadata = {
  title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
};

export default function HomePage() {
  const { hero } = landingData;

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

      {/* Section 2 — Hero เดิม (ย้ายลงมาจาก section 1) */}
      <LandingHero />
      <LandingAbout />
      <LandingServices />
      <LandingCTA />
    </main>
  );
}
