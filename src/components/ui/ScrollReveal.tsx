"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal observer.
 * - Chromium 115+: CSS scroll-driven (.mkt-reveal via animation-timeline) จัดการเอง — observer แค่ inert
 * - iOS Safari / เก่า: เพิ่ม .is-visible (transition path ใน globals.css) ตอนเข้าจอ
 * - reduced-motion / no-IO: เผยทันที (CSS @media reduced-motion ก็ force opacity:1 อยู่แล้ว)
 * ใส่ class "mkt-reveal js-reveal" ที่ element ที่อยากให้ fade-up ตอนเลื่อนถึง
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".js-reveal"));
    if (!els.length) return;

    const show = () => els.forEach((el) => el.classList.add("is-visible"));

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));

    // safety: กันค้างซ่อนถ้า IO ไม่ยิงใน 2.5s
    const t = setTimeout(show, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
