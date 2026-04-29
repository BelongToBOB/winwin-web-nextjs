import type { LandingPageData } from "./types";

export const landingData: LandingPageData = {
  hero: {
    name: "วินวิน กวินทร์รัศม์ นิธิกรภาคย์",
    badge: "ที่ปรึกษาการเงิน",
    headline: "ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ",
    subheadline:
      "นักวางแผนกลยุทธ์การเงิน เพื่อขยายธุรกิจ ด้วยสินเชื่อจากธนาคาร",
    highlight: "สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
    profileImage: "/images/profile.webp",
    ctaPrimary: {
      text: "ติดต่อปรึกษา",
      url: "https://lin.ee/gGDzjTi",
    },
    ctaSecondary: {
      text: "เรียนรู้เพิ่มเติม",
      url: "/#about",
    },
    socials: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/share/1BxuH7sXen/?mibextid=wwXIfr",
        label: "Facebook",
      },
      {
        platform: "youtube",
        url: "https://youtube.com/@Winwin_consult",
        label: "YouTube",
      },
      {
        platform: "line",
        url: "https://lin.ee/gGDzjTi",
        label: "LINE",
      },
    ],
  },

  about: {
    heading: "ประวัติและประสบการณ์",
    subtitle: "จาก Relationship Manager สู่เจ้าของธุรกิจ และที่ปรึกษาการเงิน",
    experience: [
      {
        role: "Associate Relationship Manager",
        org: "ธนาคารกสิกรไทย",
        period: "มิถุนายน 2009 – 2011",
      },
      {
        role: "Relationship Manager",
        org: "ธนาคารกสิกรไทย",
        period: "มิถุนายน 2011 – 2017",
      },
    ],
    bio: "วินเป็นคนกลางที่อยู่ระหว่างเจ้าของธุรกิจกับธนาคาร เข้าใจทั้งสองฝั่ง ทั้งในมุมของเจ้าของธุรกิจที่ต้องการเงินทุน และในมุมของธนาคารที่ต้องบริหารความเสี่ยง จากประสบการณ์ตรงในการวิเคราะห์สินเชื่อกว่า 8 ปี และการเป็นเจ้าของธุรกิจเอง ทำให้วินมองเห็นปัญหาที่เจ้าของธุรกิจส่วนใหญ่มองข้าม",
    businesses: [
      "เจ้าของธุรกิจปั๊มน้ำมัน PTT OR",
      "เจ้าของธุรกิจร้านคาเฟ่อเมชอน",
      "เจ้าของธุรกิจร้าน 7-11",
      "เจ้าของเพจสร้างธุรกิจโดยไม่ใช้เงินตัวเอง สไตล์วินวิน",
      "ที่ปรึกษาการเงิน สำหรับเจ้าของธุรกิจ",
      "นักวางแผนกลยุทธ์การเงิน เพื่อขยายธุรกิจ ด้วยสินเชื่อจากธนาคาร",
      "ผู้แนะนำการลงทุนด้านหลักทรัพย์",
    ],
    philosophy: [
      "หนี้ไม่ใช่ภาระ ถ้าเรารู้จักวางแผนก่อนการกู้ เปลี่ยนหนี้ให้กลายเป็นเครื่องมือขยายธุรกิจ",
      "การเงินที่ดีไม่ใช่แค่การมีเงิน แต่คือการรู้ว่าจะใช้เงินอย่างไรให้ธุรกิจเติบโตอย่างยั่งยืน",
    ],
    quote:
      "หนี้ไม่ใช่ภาระ ถ้าเรารู้จักวางแผนก่อนการกู้ เปลี่ยนหนี้ให้กลายเป็นเครื่องมือขยายธุรกิจ",
  },

  services: {
    heading: "บริการให้คำปรึกษา",
    subtitle: "เลือกรูปแบบที่เหมาะกับธุรกิจของคุณ",
    cards: [
      {
        title: "Bank Uncensored",
        subtitle: "คอร์สออนไลน์ความลับของธนาคาร",
        url: "/bank-uncensored",
        image: "/images/mainkvbuc2.webp",
      },
      {
        title: "Inside Bank",
        subtitle: "Workshop สินเชื่อธนาคาร 1 วันเต็ม",
        url: "/inside-bank",
        image: "/images/IBKv-Hero.webp",
      },
      {
        title: "Inside Business Finance",
        subtitle: "การเงินธุรกิจและการวางแผนภายใน",
        url: "/inside-business-finance",
        image: "/images/KVIBF2.webp",
      },
      {
        title: "Private Consult",
        subtitle: "การปรึกษาส่วนตัวเพื่อธุรกิจคุณโดยเฉพาะ",
        url: "/private-consult",
        image: "/images/EPCmainKV.webp",
      },
    ],
  },

  cta: {
    heading: "พร้อมที่จะขยายธุรกิจของคุณแล้วหรือยัง?",
    body: "ติดต่อวินวินเพื่อปรึกษาเรื่องการวางแผนการเงิน สินเชื่อธนาคาร และกลยุทธ์ขยายธุรกิจ ไม่มีค่าใช้จ่ายเบื้องต้น",
    buttons: [
      {
        text: "Facebook Messenger",
        url: "https://m.me/105859671508979",
      },
      {
        text: "Line: @win_win",
        url: "https://lin.ee/gGDzjTi",
      },
    ],
  },

  footer: {
    brand: "WinWin Consult",
    tagline:
      "ที่ปรึกษาการเงินสำหรับเจ้าของธุรกิจ | สร้างธุรกิจโดยไม่ใช้เงินตัวเอง",
    copyright: "© 2026 WinWin Consult. สงวนลิขสิทธิ์.",
  },
};
