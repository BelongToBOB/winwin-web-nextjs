"use client";

import { useEffect } from "react";

export default function HeroSlider() {
  useEffect(() => {
    const slider = document.getElementById("hero-slider") as HTMLElement | null;
    const dots = document.querySelectorAll<HTMLElement>("#hero-dots span");
    if (!slider || !dots.length) return;

    let current = 0;
    const total = 3;
    let auto: ReturnType<typeof setInterval>;

    const startAuto = () => {
      auto = setInterval(() => {
        current = (current + 1) % total;
        const child = slider.children[current] as HTMLElement;
        slider.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
      }, 3000);
    };

    const timeoutId = setTimeout(startAuto, 2000);

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const width = (slider.children[0] as HTMLElement).offsetWidth + 12;
      const index = Math.round(scrollLeft / width);
      dots.forEach((d, i) => {
        d.classList.toggle("bg-yellow-400", i === index);
        d.classList.toggle("bg-zinc-600", i !== index);
      });
      current = index;
    };

    const handleTouchStart = () => clearInterval(auto);

    slider.addEventListener("scroll", handleScroll);
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      clearInterval(auto);
      slider.removeEventListener("scroll", handleScroll);
      slider.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return null;
}
