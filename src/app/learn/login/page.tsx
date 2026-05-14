"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = "0x4AAAAAADOTTgnDHUu3NEb3";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const isNotEnrolled = error === "not_enrolled";
  const isRegistered = searchParams.get("registered") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [credError, setCredError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setCredError("กรุณารอการตรวจสอบสักครู่");
      return;
    }
    setLoading(true);
    setCredError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setCredError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } else {
      window.location.href = "/learn";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center lms-bg px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image
          src="/favicon.png"
          alt="WinWin"
          width={64}
          height={64}
          className="mx-auto rounded-xl"
        />
        <h1 className="text-2xl font-bold text-[var(--lms-accent-text)]">
          WinWin Learn
        </h1>
        {isRegistered && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-400">
              สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ
            </p>
          </div>
        )}

        {isNotEnrolled && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              อีเมลนี้ยังไม่ได้ซื้อคอร์ส
            </p>
            <Link
              href="/checkout"
              className="mt-3 inline-block rounded-lg bg-[var(--lms-accent)] px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              ซื้อคอร์ส
            </Link>
          </div>
        )}

        {error && !isNotEnrolled && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
            </p>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-3 text-left">
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />

          <div className="text-right">
            <Link href="/learn/forgot-password" className="text-xs text-[var(--lms-text-muted)] hover:text-[var(--lms-text-secondary)]">
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
              options={{ theme: "dark", size: "flexible" }}
            />
          </div>

          {credError && (
            <p className="text-xs text-red-400">{credError}</p>
          )}
          <button
            type="submit"
            disabled={loading || !turnstileToken}
            className="w-full rounded-lg bg-[var(--lms-accent)] py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--lms-border)]" />
          <span className="text-xs text-[var(--lms-text-muted)]">หรือ</span>
          <div className="h-px flex-1 bg-[var(--lms-border)]" />
        </div>

        {/* Google Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/learn" })}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm font-medium text-[var(--lms-text)] transition hover:bg-[var(--lms-border)]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          เข้าสู่ระบบด้วย Google
        </button>

        {/* Register Link */}
        <p className="text-sm text-[var(--lms-text-secondary)]">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/learn/register"
            className="text-[var(--lms-accent-text)] hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
