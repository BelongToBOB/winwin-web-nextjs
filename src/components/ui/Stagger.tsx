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

// container ที่ไล่ลูกทีละชิ้น (stagger) — CSS-only
// เนื้อหา "มองเห็นได้เสมอ" แม้ JS ไม่รัน (กันจอเปล่าบน webview เก่า/in-app)
// - onMount: ใส่คลาส play ตั้งแต่ SSR → เล่นตอนโหลดโดยไม่พึ่ง JS (เช่น hero)
// - scroll: JS เพิ่มคลาส play ตอนเลื่อนเจอ; ถ้า JS ไม่รัน = แสดงเฉย ๆ
export function Stagger({ children, className = "", as = "div", onMount = false }: ContainerProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

  useEffect(() => {
    if (onMount) return; // play อยู่ใน SSR แล้ว
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // อยู่ในจอตั้งแต่ mount แล้ว → ปล่อยให้แสดงเลย (ไม่ซ่อน ไม่ flash)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("mkt-stagger-play");
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onMount]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${onMount ? "mkt-stagger-play" : ""} ${className}`.trim()}
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
