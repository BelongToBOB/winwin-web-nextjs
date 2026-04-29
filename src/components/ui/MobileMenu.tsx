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
      className="fixed inset-0 top-16 z-[9999] bg-black/95 backdrop-blur-md overflow-y-auto"
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
                ? "text-yellow-400 bg-zinc-900"
                : "text-gray-300 hover:text-white hover:bg-zinc-900"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}

        {/* Courses section */}
        <div className="pt-2 pb-1 px-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            คลาสทั้งหมด
          </span>
        </div>
        {courseLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              currentPath === link.href
                ? "text-yellow-400 bg-zinc-900"
                : "text-gray-300 hover:text-white hover:bg-zinc-900"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}

        <a
          href="/#about"
          className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-zinc-900 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          เกี่ยวกับวิน
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
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-300 hover:text-white transition-colors"
        aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Portal overlay to document.body — escapes navbar stacking context */}
      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  );
}
