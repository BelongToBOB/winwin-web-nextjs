"use client";

import { useEffect, useRef } from "react";

type ContainerTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
  /** true = เล่นตอน mount (above-fold เช่น hero), false = เล่นตอนเลื่อนเจอ */
  onMount?: boolean;
}

// รองรับ scroll-driven CSS ไหม (Chromium 115+/Android WebView ใหม่)
function supportsScrollTimeline() {
  return typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "view()");
}

// container ไล่ลูกทีละชิ้น (stagger) — เนื้อหา "มองเห็นได้เสมอ" แม้ JS ไม่รัน
// - onMount: .mkt-stagger-load (เล่นตอนโหลดด้วย CSS, ไม่พึ่ง JS — เช่น hero)
// - scroll: .mkt-stagger; เบราว์เซอร์ใหม่ scroll-driven ล้วน, iOS/เก่าใช้ JS เพิ่ม is-armed/is-in
export function Stagger({ children, className = "", as = "div", onMount = false }: ContainerProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

  useEffect(() => {
    if (onMount) return; // เล่นตอนโหลดด้วย CSS แล้ว
    const el = ref.current;
    if (!el) return;
    if (supportsScrollTimeline()) return; // CSS จัดการเองแล้ว
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

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
    const t = setTimeout(reveal, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [onMount]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${onMount ? "mkt-stagger-load" : "mkt-stagger"} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  as?: ItemTag;
}

// ลูกแต่ละชิ้นใน Stagger (delay มาจาก CSS :nth-child)
export function StaggerItem({ children, className = "", as = "div" }: ItemProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
