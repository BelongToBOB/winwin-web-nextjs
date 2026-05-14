"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Store admin email for API auth
  useEffect(() => {
    if (session?.user?.email) {
      sessionStorage.setItem("admin-email", session.user.email);
    }
  }, [session?.user?.email]);
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("lms-theme") as Theme;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("lms-theme", next);
  };

  if (status === "loading") {
    return (
      <div data-theme={theme} className="flex min-h-screen items-center justify-center" style={{ background: "var(--lms-bg)" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--lms-accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const links = [
    { href: "/admin", label: "ภาพรวม", exact: true },
    { href: "/admin/courses", label: "จัดการคอร์ส" },
    { href: "/admin/students", label: "นักเรียน" },
  ];

  return (
    <div data-theme={theme} className="flex min-h-screen" style={{ background: "var(--lms-bg)", color: "var(--lms-text)" }}>
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col" style={{ background: "var(--lms-bg-secondary)", borderRight: "1px solid var(--lms-border)" }}>
        <div className="flex h-14 items-center justify-between px-4" style={{ borderBottom: "1px solid var(--lms-border)" }}>
          <div className="flex items-center gap-2">
            <Image src="/favicon.png" alt="WinWin" width={24} height={24} className="rounded" />
            <span className="text-sm font-semibold" style={{ color: "var(--lms-accent-text)" }}>Admin</span>
          </div>
          <button onClick={toggle} className="relative flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-300" style={{ background: theme === "dark" ? "var(--lms-border)" : "var(--lms-accent)" }}>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white shadow transition-transform duration-300" style={{ transform: theme === "light" ? "translateX(18px)" : "translateX(0)" }}>
              {theme === "dark" ? (
                <svg className="h-2.5 w-2.5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="h-2.5 w-2.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </span>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {links.map((link: any) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href) && pathname !== "/admin";
            return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
              style={{
                background: active ? "var(--lms-accent-bg)" : "transparent",
                color: active ? "var(--lms-text)" : "var(--lms-text-secondary)",
                fontWeight: active ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
            );
          })}
        </nav>

        <div className="p-3" style={{ borderTop: "1px solid var(--lms-border)" }}>
          <Link href="/learn" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition hover:opacity-80" style={{ color: "var(--lms-text-muted)" }}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            กลับ /learn
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
