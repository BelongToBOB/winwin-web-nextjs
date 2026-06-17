"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "@/components/ui/MobileMenu";

const navLinks = [{ label: "หน้าแรก", href: "/" }];

const courseLinks = [
  { label: "Bank Uncensored", href: "/bank-uncensored" },
  { label: "Inside Bank", href: "/inside-bank" },
  { label: "Inside Business Finance", href: "/inside-business-finance" },
  { label: "Private Consult", href: "/private-consult" },
];

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-surface-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <img src="/images/winwinlogo.webp" alt="WinWin Consult" className="h-12 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mkt-focus px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.href
                      ? "text-accent"
                      : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative group">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-fg-2 hover:text-fg transition-colors flex items-center gap-1">
                  คลาสทั้งหมด
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-full min-w-[220px] opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
                  <div className="pt-2">
                    <div className="bg-surface border border-white/10 rounded-card py-2 shadow-xl">
                      {courseLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            currentPath === link.href
                              ? "text-accent bg-surface-3"
                              : "text-fg-2 hover:text-fg hover:bg-surface-2"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/#about"
                className="mkt-focus px-4 py-2 rounded-lg text-sm font-medium text-fg-2 hover:text-fg transition-colors"
              >
                เกี่ยวกับวิน
              </Link>

              <Link
                href="/learn"
                className="mkt-focus px-4 py-2 rounded-lg text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                เข้าเรียน
              </Link>

              <a
                href="https://lin.ee/gGDzjTi"
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-focus ml-2 px-5 py-2 rounded-pill text-sm font-semibold bg-accent hover:bg-accent-hover text-on-accent transition-colors"
              >
                ติดต่อ
              </a>
            </div>

            <div className="md:hidden">
              <MobileMenu
                navLinks={navLinks}
                courseLinks={courseLinks}
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
