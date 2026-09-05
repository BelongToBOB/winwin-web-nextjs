"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

interface CardCarouselProps {
  children: React.ReactNode;
  /** gap class ที่ตรงกับ grid track เดิม เช่น "gap-4" | "gap-6" */
  gapClass?: string;
  /** flex-basis ต่อสไลด์ (ต้องหักลบ gap มาแล้ว) เพื่อให้ขนาดการ์ด "เท่าเดิม" ทุก breakpoint */
  basisClass: string;
  /** aria-label ของทั้ง carousel */
  ariaLabel?: string;
  className?: string;
}

// Carousel แบบ CSS scroll-snap: touch/trackpad เลื่อนได้ native, เพิ่มปุ่ม prev/next + dots + drag ด้วยเมาส์
// - ซ่อน controls อัตโนมัติเมื่อการ์ดพอดีจอ (ไม่มีปุ่มตาย)
// - ใช้ theme tokens (accent = ทอง, inactive = white-alpha) ไม่ hardcode สี
export default function CardCarousel({
  children,
  gapClass = "gap-4",
  basisClass,
  ariaLabel,
  className = "",
}: CardCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const slides = Children.toArray(children);

  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.children;
    if (items.length === 0) return;
    const first = items[0] as HTMLElement;
    const second = items[1] as HTMLElement | undefined;
    const stride = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    if (stride <= 0) return;
    const perView = Math.max(1, Math.round(track.clientWidth / stride));
    const p = Math.max(1, items.length - perView + 1);
    const a = Math.min(p - 1, Math.max(0, Math.round(track.scrollLeft / stride)));
    setPages(p);
    setActive(a);
    setCanScroll(p > 1 && track.scrollWidth - track.clientWidth > 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const onScroll = () => measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => measure());
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure, slides.length]);

  const behavior = (): ScrollBehavior =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(pages - 1, Math.max(0, index));
    const target = track.children[clamped] as HTMLElement | undefined;
    if (target) track.scrollTo({ left: target.offsetLeft, behavior: behavior() });
  };

  // manual loop (Option A): next จากสไลด์สุดท้าย → วนไปแรก, prev จากแรก → วนไปสุดท้าย (ไม่มี autoplay)
  const step = (dir: -1 | 1) => {
    if (dir === 1) goTo(active >= pages - 1 ? 0 : active + 1);
    else goTo(active <= 0 ? pages - 1 : active - 1);
  };

  // drag ด้วยเมาส์ (touch/trackpad ปล่อยให้ scroll-snap จัดการ native ไม่ไปสู้กับมัน)
  // + ตรวจจับ "ลาก/ปัดพ้นขอบ" เพื่อวน: pointer events ยังยิงบน touch ตอนชิดขอบ (native ไม่เริ่ม pan
  //   เพราะเลื่อนต่อไม่ได้) จึงได้ pointerup จริง; ถ้า native เข้าเทคโอเวอร์จะได้ pointercancel แทน (ยกเลิก)
  const EDGE = 2; // px: ถือว่าชิดขอบ (ให้ตรงกับเกณฑ์ canScroll > 2 ใน measure)
  const SWIPE = 30; // px: ระยะขั้นต่ำที่ถือว่าตั้งใจปัด (กันวนตอนปล่อยปกติในช่วง)
  const drag = useRef<{ startX: number; lastX: number; startLeft: number; isMouse: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !canScroll) return;
    drag.current = {
      startX: e.clientX,
      lastX: e.clientX,
      startLeft: track.scrollLeft,
      isMouse: e.pointerType === "mouse",
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;
    drag.current.lastX = e.clientX;
    // ลากด้วยเมาส์เท่านั้น; touch/trackpad ปล่อยให้ native scroll-snap ทำงาน
    if (drag.current.isMouse) {
      track.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    }
  };
  const endDrag = () => {
    const track = trackRef.current;
    const d = drag.current;
    drag.current = null;
    if (!track || !d || !canScroll) return;
    const dx = d.lastX - d.startX; // < 0 = ปัดซ้าย (ไปข้างหน้า), > 0 = ปัดขวา (ย้อนกลับ)
    if (Math.abs(dx) < SWIPE) return; // ปล่อยปกติในช่วง ไม่ใช่การปัด → ไม่วน
    const maxLeft = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= EDGE;
    const atEnd = track.scrollLeft >= maxLeft - EDGE;
    if (atEnd && dx < 0) goTo(0); // ปัดไปข้างหน้าจากสไลด์สุดท้าย → วนไปแรก
    else if (atStart && dx > 0) goTo(pages - 1); // ปัดย้อนจากสไลด์แรก → วนไปสุดท้าย
  };
  const cancelDrag = () => {
    // native scroll (touch pan) เข้าเทคโอเวอร์ → ยกเลิกการตรวจจับปัดพ้นขอบ กันวนผิดพลาด
    drag.current = null;
  };

  const arrow = (dir: "left" | "right") => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dir === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"}
      />
    </svg>
  );

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={cancelDrag}
        className={`no-scrollbar relative flex ${gapClass} snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain ${
          canScroll ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        {slides.map((child, i) => (
          <li key={i} className={`h-auto shrink-0 grow-0 snap-start ${basisClass}`}>
            {child}
          </li>
        ))}
      </ul>

      {canScroll && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="ก่อนหน้า"
            className="mkt-focus flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            {arrow("left")}
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`ไปสไลด์ที่ ${i + 1}`}
                aria-current={i === active}
                className={`mkt-focus h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-accent" : "w-2.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="ถัดไป"
            className="mkt-focus flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            {arrow("right")}
          </button>
        </div>
      )}
    </div>
  );
}
