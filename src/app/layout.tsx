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
  description: "ที่ปรึกษาแบบมืออาชีพ ช่วยธุรกิจ SME วางโครงสร้างการเงินและยื่นกู้สินเชื่อให้ผ่านง่ายขึ้น",
  metadataBase: new URL("https://winwinwealth.co"),
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "WinWin Wealth Creation",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={prompt.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem("lms-theme")||"dark";document.documentElement.setAttribute("data-theme",t)})()` }} />
      </head>
      <body className="bg-black text-gray-50 font-sans antialiased overflow-x-hidden">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
