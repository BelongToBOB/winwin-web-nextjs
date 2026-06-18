import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  navLinks: NavLink[];
  courseLinks: NavLink[];
  currentPath: string;
}

export default function MobileMenu({ navLinks, courseLinks, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlay = isOpen ? (
    <div
      id="mobile-menu-panel"
      className="fixed inset-0 top-16 z-[9999] bg-bg/95 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="px-4 py-6 space-y-1">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPath === link.href
                ? "text-accent bg-surface"
                : "text-fg-2 hover:text-fg hover:bg-surface"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}

        {/* Courses section */}
        <div className="pt-2 pb-1 px-4">
          <span className="text-xs font-semibold text-fg-muted uppercase tracking-wider">
            คลาสทั้งหมด
          </span>
        </div>
        {courseLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPath === link.href
                ? "text-accent bg-surface"
                : "text-fg-2 hover:text-fg hover:bg-surface"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}

        <a
          href="/#about"
          className="block px-4 py-3 rounded-lg text-base font-medium text-fg-2 hover:text-fg hover:bg-surface transition-colors"
          onClick={() => setIsOpen(false)}
        >
          เกี่ยวกับวิน
        </a>

        <a
          href="/learn"
          className="block px-4 py-3 rounded-lg text-base font-medium text-accent hover:text-accent-hover hover:bg-surface transition-colors"
          onClick={() => setIsOpen(false)}
        >
          เข้าเรียน
        </a>

        {/* LINE CTA */}
        <div className="pt-4 px-4">
          <a
            href="https://lin.ee/gGDzjTi"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-5 py-3 rounded-lg text-base font-semibold text-white transition-colors"
            style={{ backgroundColor: "#00B900" }}
            onClick={() => setIsOpen(false)}
          >
            ติดต่อ LINE @WIN_WIN
          </a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Hamburger button — 3 ขีด morph เป็น X */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mkt-focus relative flex h-10 w-10 items-center justify-center text-fg-2 transition-colors hover:text-fg"
        aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        <span className="relative block h-4 w-6" aria-hidden="true">
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ease-out motion-reduce:transition-none ${
              isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Portal overlay to document.body — escapes navbar stacking context */}
      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  );
}
