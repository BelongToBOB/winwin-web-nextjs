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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/winwinlogo.webp" alt="WinWin Consult" className="h-8 w-auto" />
              <span className="hidden sm:inline text-sm font-semibold tracking-[0.1em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-400">
                WinWin Wealth Creation
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.href
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative group">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  คลาสทั้งหมด
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-full min-w-[220px] opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
                  <div className="pt-2">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl py-2 shadow-xl">
                      {courseLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            currentPath === link.href
                              ? "text-yellow-400 bg-zinc-800"
                              : "text-gray-300 hover:text-white hover:bg-zinc-800"
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
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                เกี่ยวกับวิน
              </Link>

              <Link
                href="/learn"
                className="px-4 py-2 rounded-lg text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                เข้าเรียน
              </Link>

              <a
                href="https://lin.ee/gGDzjTi"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold bg-yellow-500 hover:bg-yellow-400 text-black transition-colors"
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
