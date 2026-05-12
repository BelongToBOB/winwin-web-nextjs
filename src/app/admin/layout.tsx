"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/courses", label: "จัดการคอร์ส", icon: "📚" },
  ];

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-black/50">
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <Image src="/favicon.png" alt="WinWin" width={24} height={24} className="rounded" />
        <span className="text-sm font-semibold text-yellow-accent">Admin</span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              pathname.startsWith(link.href)
                ? "bg-white/10 text-white font-medium"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/learn"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
        >
          ← กลับ /learn
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
