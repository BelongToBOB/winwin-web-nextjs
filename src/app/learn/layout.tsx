"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function TopBar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/learn" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="WinWin"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-sm font-semibold text-yellow-accent">
            WinWin Learn
          </span>
        </Link>

        {session?.user && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/learn/login" })}
              className="rounded-md bg-white/10 px-3 py-1 text-xs text-gray-300 transition hover:bg-white/20"
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-black text-gray-50">
        <TopBar />
        <main className="flex-1">{children}</main>
      </div>
    </SessionProvider>
  );
}
