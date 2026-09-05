import HeroSpotlight from "@/components/sections/HeroSpotlight";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import JourneyTimeline, { type JourneyStep } from "@/components/sections/JourneyTimeline";
// import Transformation from "@/components/sections/Transformation"; // ซ่อนไว้ก่อน
import PricingCards, { type PricingPackage } from "@/components/sections/PricingCards";
import SeminarShowcase from "@/components/sections/SeminarShowcase";
import UpcomingClass from "@/components/sections/UpcomingClass";
import FAQAccordion from "@/components/ui/FAQAccordion";
import LandingCTA from "@/components/landing/LandingCTA";
import Reveal from "@/components/ui/Reveal";
import { landingData } from "@/data/landing";
// import { bucBeforeAfterRows } from "@/data/bank-uncensored"; // ซ่อนไว้ก่อน (Transformation)

export const metadata = {
  title: "WinWin Consult - ออกแบบโครงสร้างทางการเงินสำหรับเจ้าของธุรกิจ | Scale Up With Win",
};

export default function HomePage() {
  const { hero, services } = landingData;

  // เส้นทางบริการ 3 ขั้น: ออนไลน์ → Onsite (รวม IB+IBF) → Exclusive (Private)
  const journeySteps: JourneyStep[] = [
    {
      eyebrow: "ขั้นที่ 1 · ออนไลน์",
      title: "คลาสออนไลน์",
      lead: "เริ่มปูพื้นความเข้าใจการเงินธุรกิจและมุมมองแบงก์ — เรียนออนไลน์ได้ทุกที่ทุกเวลา",
      carousel: true,
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
          image: "/images/business-health-check.webp",
        },
        {
          title: "Owner Finance Check",
          subtitle: "อ่านงบก่อนเซ็น — รู้ตัวเลขที่ควรดู",
          image: "/images/owner-finance-check.webp",
        },
        {
          title: "Scale Ready Manufacturing",
          subtitle: "เห็นภาพการเงินให้ชัด เตรียมธุรกิจให้พร้อมโต",
          image: "/images/scale-ready.webp",
          href: "/scale-ready",
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

  // แกลเลอรีบรรยากาศคลาสจริง (3 รูป) — คำบรรยายบรรยากาศ
  const galleryItems = [
    { image: "/images/gallery-inside-bank.jpg", title: "เรียนสดกับผู้ประกอบการตัวจริง" },
    { image: "/images/gallery-ibf.jpg", title: "เข้มข้นทุกคลาส" },
    { image: "/images/gallery-workshop.jpg", title: "ลงมือใช้เครื่องมือจริง ไม่ใช่แค่ฟัง" },
  ];

  // FAQ ทั่วไป (ปรับ/เพิ่มได้)
  const faqs = [
    {
      question: "เหมาะกับใคร ต้องมีพื้นฐานบัญชีไหม?",
      answer:
        "เหมาะกับเจ้าของธุรกิจและผู้ประกอบการที่อยากเข้าใจการเงินและสินเชื่อแบบใช้ได้จริง ไม่ต้องมีพื้นฐานบัญชี เราสอนในมุม “เจ้าของธุรกิจ” เข้าใจง่าย ไม่ใช่ภาษานักบัญชี",
    },
    {
      question: "คลาสออนไลน์กับ Onsite ต่างกันอย่างไร?",
      answer:
        "คลาสออนไลน์เรียนได้ทุกที่ทุกเวลา เหมาะกับการปูพื้น ส่วน Onsite คือเรียนสด ลงมือทำกับผู้เชี่ยวชาญแบบใกล้ชิด เจาะลึกเคสธุรกิจของคุณโดยตรง",
    },
    {
      question: "เคยกู้ไม่ผ่าน หรือติดบูโร เรียนได้ไหม?",
      answer:
        "ได้ คลาสจะช่วยให้คุณรู้ว่าตัวเองเป็นเคสแบบไหน ธนาคารมองอย่างไร และมีทางไหนบ้างที่ยังไปต่อได้ เพื่อเตรียมตัวให้ถูกก่อนยื่นจริง",
    },
    {
      question: "เรียนจบแล้วได้อะไรกลับไปใช้?",
      answer:
        "ได้เครื่องมือ Template และ Checklist ที่เอาไปใช้กับธุรกิจจริงได้ทันที พร้อมความเข้าใจมุมมองแบงก์ ที่ช่วยให้วางแผนการเงินและขอสินเชื่อได้แม่นขึ้น",
    },
    {
      question: "สมัครและชำระเงินอย่างไร?",
      answer:
        "ทักไลน์ @win_win แจ้งคอร์ส/แพ็คเกจที่สนใจ ทีมงานจะแจ้งรอบเรียน ขั้นตอน และช่องทางชำระเงินให้ทันที",
    },
    {
      question: "มีรอบเรียนเมื่อไหร่ จองอย่างไร?",
      answer:
        "รอบเรียนมีต่อเนื่องตลอดปี ดูรอบล่าสุดและจองที่นั่งได้ผ่าน LINE @win_win",
    },
  ];

  // การ์ดราคา — ทุกใบติดต่อผ่าน LINE · จัดกลุ่ม ออนไลน์ → onsite → exclusive
  const LINE_URL = "https://lin.ee/gGDzjTi";
  const pricingPackages: PricingPackage[] = [
    {
      group: "เรียนออนไลน์",
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
      group: "เรียนออนไลน์",
      eyebrow: "ออนไลน์",
      title: "Business Health Check",
      description: "ตรวจสุขภาพการเงินธุรกิจ รู้จุดอ่อนก่อนแบงก์เจอ",
      image: "/images/business-health-check.webp",
      features: [
        "วิเคราะห์สุขภาพการเงินธุรกิจเจาะลึก",
        "รู้จุดอ่อนที่ต้องแก้ก่อนแบงก์เจอ",
        "มีเครื่องมือ + Checklist ใช้เองได้",
      ],
      price: "฿7,900",
      detailUrl: "/business-health-check",
    },
    {
      group: "เรียนออนไลน์",
      eyebrow: "ออนไลน์ · Zoom",
      title: "Owner Finance Check",
      description: "อ่านงบก่อนเซ็น — รู้ตัวเลขที่ควรดู",
      image: "/images/owner-finance-check.webp",
      features: [
        'อ่านงบแบบ "เจ้าของ" ไม่ใช่ภาษานักบัญชี',
        'แยก "กำไรจริง vs เงินสดจริง"',
        "รู้ตัวเลขเตือนภัยก่อนธุรกิจมีปัญหา",
        "มี Template + Checklist ใช้จริง",
      ],
      savings: "ประหยัด ฿4,000 · 68% off",
      price: "฿1,900",
      originalPrice: "฿5,900",
      detailUrl: "/owner-finance-check",
    },
    {
      group: "เรียนออนไลน์",
      eyebrow: "ออนไลน์ · ZOOM",
      title: "Scale Ready Manufacturing",
      description: "เห็นภาพการเงินให้ชัด เตรียมธุรกิจให้พร้อมโต",
      image: "/images/scale-ready.webp",
      features: [
        "เห็นเส้นทางเงินทั้งโรงงาน (เข้า–ออก–ค้าง)",
        "รู้สินค้าตัวไหนขายดีแต่กินเงินสด",
        "รู้ต้องใช้เงินเพิ่มเท่าไรก่อนเพิ่มยอดขาย",
        "MAP → GAP → MOVE ใช้จริงกับธุรกิจตัวเอง",
      ],
      savings: "ประหยัด ฿5,000 · 63% off",
      price: "฿2,900",
      originalPrice: "฿7,900",
      detailUrl: "/scale-ready",
    },
    {
      group: "เรียนสด (Onsite)",
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
      group: "เรียนสด (Onsite)",
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
      group: "เรียนสด (Onsite)",
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
        subnote="Scale Up With Win"
        primaryCta={{ text: hero.ctaPrimary.text, url: hero.ctaPrimary.url, target: "_blank" }}
        secondaryCta={{ text: hero.ctaSecondary.text, url: hero.ctaSecondary.url }}
        stats={[
          { value: "1,000+", label: "เจ้าของธุรกิจที่ไว้ใจ" },
          { value: "8+ ปี", label: "ในแวดวงสินเชื่อธุรกิจ" },
          { value: "6", label: "คอร์ส & บริการ" },
        ]}
      />

      {/* Before / After — เลือกเฉพาะคำถามที่ trigger สุด 5 ข้อ (มี stagger ในตัว) */}
      {/* ซ่อนไว้ก่อน
      <Transformation rows={[0, 5, 1, 2, 6].map((i) => bucBeforeAfterRows[i])} />
      */}

      {/* Section 2 — แนะนำตัวสั้น */}
      <Reveal>
        <LandingHero />
      </Reveal>
      <Reveal>
        <LandingAbout />
      </Reveal>

      {/* แถบภาพคั่น — บรรยากาศคลาสจริง (ไม่มีหัวข้อ) */}
      <SeminarShowcase items={galleryItems} />

      {/* Section บริการ — ไทม์ไลน์เส้นทาง 3 ขั้น (มี stagger ในตัว) */}
      <JourneyTimeline
        eyebrow="เส้นทาง 3 ขั้น"
        heading={services.heading}
        subtitle={services.subtitle}
        steps={journeySteps}
      />

      {/* คลาสล่าสุดที่กำลังจะมาถึง */}
      <Reveal>
        <UpcomingClass image="/images/KVIBF2.webp" lineUrl={LINE_URL} />
      </Reveal>

      {/* Section การ์ดราคา — เลือกบริการ + สมัคร (มี stagger ในตัว) */}
      <PricingCards
        eyebrow="สมัครเรียน"
        heading="เลือกคอร์สที่ใช่สำหรับธุรกิจคุณ"
        highlight="ที่ใช่"
        subtitle={services.subtitle}
        packages={pricingPackages}
        lineUrl={LINE_URL}
      />

      {/* FAQ — ปิดข้อกังวลก่อนตัดสินใจ */}
      <Reveal>
        <FAQAccordion faqs={faqs} />
      </Reveal>

      <Reveal>
        <LandingCTA />
      </Reveal>
    </main>
  );
}
