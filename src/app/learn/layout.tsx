"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface SidebarCourse {
  id: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  progress: { percent: number };
}

function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [courses, setCourses] = useState<SidebarCourse[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`${LMS_API}/learn/my-courses`, {
      headers: { "x-user-email": session.user.email },
    })
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [session?.user?.email]);

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isLearnHome = pathname === "/learn";
  const currentSlug = pathname.match(/^\/learn\/([^/]+)/)?.[1];

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <Link href="/learn" className="flex items-center gap-2">
          <Image src="/favicon.png" alt="WinWin" width={24} height={24} className="rounded" />
          <span className="text-sm font-semibold text-yellow-accent">WinWin Learn</span>
        </Link>
        {/* Mobile close */}
        <button onClick={() => setMobileOpen(false)} className="lg:hidden rounded p-1 text-gray-400 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Courses */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <Link
          href="/learn"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
            isLearnHome ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          หน้าหลัก
        </Link>

        {courses.length > 0 && (
          <div className="pt-3 pb-1 px-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-600">
              คอร์สของฉัน
            </span>
          </div>
        )}

        {courses.map((course) => {
          const active = currentSlug === course.slug;
          return (
            <Link
              key={course.id}
              href={`/learn/${course.slug}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              {course.coverUrl ? (
                <img src={course.coverUrl} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/10 text-xs text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="block truncate">{course.title}</span>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-yellow-accent" style={{ width: `${course.progress.percent}%` }} />
                  </div>
                  <span className="text-[10px] tabular-nums text-gray-600">{course.progress.percent}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      {session?.user && (
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-accent/10 text-xs font-semibold text-yellow-accent">
              {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-gray-200">{session.user.name || "User"}</p>
              <p className="truncate text-[11px] text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/learn/login" })}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-xs text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md px-4 lg:hidden">
        <button onClick={() => setMobileOpen(true)} className="rounded p-1.5 text-gray-400 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/learn" className="flex items-center gap-2">
          <Image src="/favicon.png" alt="WinWin" width={24} height={24} className="rounded" />
          <span className="text-sm font-semibold text-yellow-accent">WinWin Learn</span>
        </Link>
        <div className="w-8" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <aside
            className="absolute left-0 top-0 bottom-0 flex w-72 flex-col bg-[#0A0A0A] border-r border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0A0A0A]">
        {sidebarContent}
      </aside>
    </>
  );
}

function LearnShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LearnShell>{children}</LearnShell>
    </SessionProvider>
  );
}
