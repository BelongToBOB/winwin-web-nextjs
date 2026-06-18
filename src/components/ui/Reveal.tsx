"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** หน่วงก่อน reveal (ms) — ใช้เฉพาะ fallback */
  delay?: number;
  /** ทิศทางเข้า */
  from?: "up" | "down" | "left" | "right";
}

const FROM: Record<NonNullable<Props["from"]>, string> = {
  up: "translateY(28px)",
  down: "translateY(-28px)",
  left: "translateX(28px)",
  right: "translateX(-28px)",
};

// รองรับ scroll-driven CSS ไหม (Chromium 115+/Android WebView ใหม่)
function supportsScrollTimeline() {
  return typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "view()");
}

// Scroll reveal — เนื้อหา "มองเห็นได้เสมอ" แม้ JS ไม่รัน
// เบราว์เซอร์ใหม่ใช้ CSS scroll-driven ล้วน (.mkt-reveal); ที่ไม่รองรับใช้ JS เพิ่ม is-armed/is-in
export default function Reveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (supportsScrollTimeline()) return; // CSS จัดการเองแล้ว
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    el.style.setProperty("--mkt-reveal-from", FROM[from]);
    if (delay) el.style.setProperty("--mkt-reveal-delay", `${delay}ms`);

    // อยู่ในจอตั้งแต่ mount แล้ว → แสดงเลย (ไม่ซ่อน ไม่ flash)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.classList.add("is-armed");
    const reveal = () => {
      el.classList.add("is-in");
      el.classList.remove("is-armed");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // safety: กันค้างซ่อนถ้า IO ไม่ยิง
    const t = setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [delay, from]);

  return (
    <div ref={ref} className={`mkt-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
