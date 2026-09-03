"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "@/components/ui/MobileMenu";

const navLinks = [{ label: "หน้าแรก", href: "/" }];

// จัดหมวดตามโครงเว็บ (Journey + Pricing หน้าแรก): ออนไลน์ → onsite → ตัวต่อตัว
const courseGroups = [
  {
    label: "เรียนออนไลน์",
    courses: [
      { label: "Bank Uncensored", href: "/bank-uncensored" },
      { label: "Business Health Check", href: "/business-health-check" },
      { label: "Owner Finance Check", href: "/owner-finance-check" },
      { label: "Scale Ready", href: "/scale-ready" },
    ],
  },
  {
    label: "เรียนสด (Onsite)",
    courses: [
      { label: "Inside Bank", href: "/inside-bank" },
      { label: "Inside Business Finance", href: "/inside-business-finance" },
    ],
  },
  {
    label: "ตัวต่อตัว",
    courses: [{ label: "Private Consult", href: "/private-consult" }],
  },
  {
    label: "เครื่องมือ/สมาชิก",
    courses: [{ label: "Monthly Finance OS", href: "/monthly-finance-os" }],
  },
];

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-surface-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* ซ้าย — โลโก้ */}
            <Link href="/" className="mkt-focus flex items-center">
              <img src="/images/winwinlogo.webp" alt="WinWin Consult" className="h-12 w-auto" />
            </Link>

            {/* กลาง — ลิงก์หลัก (active = pill ทอง) */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const active = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mkt-focus px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? "bg-accent text-on-accent"
                        : "text-fg hover:bg-surface-2"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="relative group">
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-fg hover:bg-surface-2 transition-colors flex items-center gap-1">
                  คลาสทั้งหมด
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-max min-w-[240px] opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
                  <div className="pt-2">
                    <div className="bg-surface border border-white/10 rounded-card py-2 shadow-xl">
                      {courseGroups.map((group, gi) => (
                        <div
                          key={group.label}
                          className={gi > 0 ? "mt-1 border-t border-white/10 pt-1" : ""}
                        >
                          <p className="px-4 pb-1 pt-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                            {group.label}
                          </p>
                          {group.courses.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                currentPath === link.href
                                  ? "text-accent bg-surface-3"
                                  : "text-fg-2 hover:text-fg hover:bg-surface-2"
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/#about"
                className="mkt-focus px-5 py-2.5 rounded-lg text-sm font-semibold text-fg hover:bg-surface-2 transition-colors"
              >
                เกี่ยวกับวิน
              </Link>
            </div>

            {/* ขวา — บัญชี + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* เข้าเรียน — ซ่อนไว้ก่อน /learn ยังไม่เปิดใช้ (2026-07-11)
              <Link
                href="/learn"
                className="mkt-focus flex items-center gap-1.5 text-sm font-medium text-fg-2 hover:text-fg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
                </svg>
                เข้าเรียน
              </Link>
              */}

              <a
                href="https://lin.ee/gGDzjTi"
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-focus px-5 py-2.5 rounded-pill text-sm font-semibold bg-accent hover:bg-accent-hover text-on-accent transition-colors"
              >
                ติดต่อ
              </a>
            </div>

            <div className="md:hidden">
              <MobileMenu
                navLinks={navLinks}
                courseGroups={courseGroups}
                currentPath={currentPath}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
