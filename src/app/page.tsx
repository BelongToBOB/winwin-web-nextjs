import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import LandingServices from "@/components/landing/LandingServices";
import LandingCTA from "@/components/landing/LandingCTA";

export const metadata = {
  title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
};

export default function HomePage() {
  return (
    <main>
      <LandingHero />
      <LandingAbout />
      <LandingServices />
      <LandingCTA />
    </main>
  );
}
