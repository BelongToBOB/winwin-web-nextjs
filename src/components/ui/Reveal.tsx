"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** หน่วงก่อน reveal (ms) */
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

// Scroll reveal แบบ CSS — เนื้อหา "มองเห็นได้เสมอ" แม้ JS ไม่รัน (กันจอเปล่าบน webview เก่า)
// JS เป็นแค่ของแถม: เพิ่มคลาส .mkt-reveal-play ตอนเลื่อนเจอเพื่อเล่น animation
export default function Reveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // อยู่ในจอตั้งแต่ mount แล้ว → ปล่อยให้แสดงเลย (ไม่ซ่อน ไม่ flash)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) return;

    const play = () => {
      el.style.setProperty("--mkt-reveal-from", FROM[from]);
      if (delay) el.style.setProperty("--mkt-reveal-delay", `${delay}ms`);
      el.classList.add("mkt-reveal-play");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
