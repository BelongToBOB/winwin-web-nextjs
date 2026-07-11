import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ",
    template: "%s | WinWin Wealth",
  },
  description:
    "WinWin Consult ที่ปรึกษาการเงินธุรกิจสำหรับเจ้าของกิจการ SME โดยวิน กวินทร์รัศม์ นิธิกรภาคย์ — วางโครงสร้างการเงิน ยื่นขอสินเชื่อธนาคารให้ผ่านง่ายขึ้น และเทคนิคสร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
  keywords: [
    "ที่ปรึกษาการเงินธุรกิจ",
    "ที่ปรึกษาการเงิน SME",
    "วางแผนการเงินธุรกิจ",
    "ขอสินเชื่อธุรกิจ",
    "ยื่นกู้ธนาคารให้ผ่าน",
    "สินเชื่อ SME",
    "โครงสร้างการเงินธุรกิจ",
    "สร้างธุรกิจไม่ใช้เงินตัวเอง",
    "คอร์สการเงินธุรกิจ",
    "WinWin Consult",
    "วิน วิน เวลธ์",
    "วิน กวินทร์รัศม์",
  ],
  metadataBase: new URL("https://www.winwinwealth.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.winwinwealth.co",
    siteName: "WinWin Wealth Creation",
    title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ",
    description:
      "ที่ปรึกษาการเงินธุรกิจ SME — วางโครงสร้างการเงิน ยื่นขอสินเชื่อให้ผ่านง่ายขึ้น สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
    images: [{ url: "/images/winwinlogo.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinWin Consult - ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ",
    description:
      "ที่ปรึกษาการเงินธุรกิจ SME — วางโครงสร้างการเงิน ยื่นขอสินเชื่อให้ผ่านง่ายขึ้น สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
    images: ["/images/winwinlogo.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

// Structured data (schema.org) — ให้ Google/AI เข้าใจแบรนด์เป็น entity ที่ชัดเจน
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.winwinwealth.co/#organization",
      name: "WinWin Consult",
      legalName: "บริษัท วิน วิน เวลธ์ ครีเอชั่น จำกัด",
      url: "https://www.winwinwealth.co",
      logo: "https://www.winwinwealth.co/images/winwinlogo.webp",
      description:
        "ที่ปรึกษาการเงินธุรกิจสำหรับเจ้าของกิจการ SME — วางโครงสร้างการเงิน ยื่นขอสินเชื่อธนาคาร และสร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
      founder: { "@id": "https://www.winwinwealth.co/#founder" },
      sameAs: [
        "https://www.facebook.com/consultantwinwin",
        "https://www.instagram.com/winwin_consult/",
        "https://www.tiktok.com/@winwin_business",
        "https://youtube.com/@Winwin_consult",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.winwinwealth.co/#founder",
      name: "วิน กวินทร์รัศม์ นิธิกรภาคย์",
      jobTitle: "ที่ปรึกษาการเงินธุรกิจ / นักวางแผนกลยุทธ์การเงิน",
      worksFor: { "@id": "https://www.winwinwealth.co/#organization" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.winwinwealth.co/#website",
      url: "https://www.winwinwealth.co",
      name: "WinWin Consult",
      inLanguage: "th-TH",
      publisher: { "@id": "https://www.winwinwealth.co/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={prompt.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem("lms-theme")||"light";document.documentElement.setAttribute("data-theme",t)})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-black text-gray-50 font-sans antialiased overflow-x-hidden">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
