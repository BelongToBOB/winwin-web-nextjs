"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const LMS_API = "https://checkout.winwinwealth.co/api";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAADOTTgnDHUu3NEb3";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!turnstileToken) {
      setError("กรุณารอการตรวจสอบสักครู่");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (form.password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${LMS_API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          displayName: form.displayName.trim(),
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "เกิดข้อผิดพลาด");
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }
      router.push("/learn/login?registered=true");
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center lms-bg px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Link href="/learn/login" className="inline-flex items-center gap-1 text-sm transition hover:opacity-70" style={{ color: "var(--lms-text-muted)" }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          กลับ
        </Link>
        <Image
          src="/favicon.png"
          alt="WinWin"
          width={64}
          height={64}
          className="mx-auto rounded-xl"
        />
        <h1 className="text-2xl font-bold text-[var(--lms-accent-text)]">
          สมัครสมาชิก
        </h1>
        <p className="text-sm text-[var(--lms-text-secondary)]">
          สร้างบัญชีเพื่อเข้าเรียนคอร์สที่ซื้อแล้ว
        </p>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <input
            type="text"
            placeholder="ชื่อที่แสดง"
            value={form.displayName}
            onChange={set("displayName")}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />
          <input
            type="email"
            placeholder="อีเมล"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
            value={form.password}
            onChange={set("password")}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            required
            className="w-full rounded-lg border border-[var(--lms-border-input)] bg-[var(--lms-bg-input)] px-4 py-3 text-sm text-[var(--lms-text)] placeholder:text-[var(--lms-text-muted)] focus:border-[var(--lms-accent)] focus:outline-none"
          />

          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
              options={{ theme: "auto", size: "flexible" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !turnstileToken}
            className="w-full rounded-lg bg-[var(--lms-accent)] py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "var(--lms-border)" }} />
          <span className="text-xs" style={{ color: "var(--lms-text-muted)" }}>หรือ</span>
          <div className="h-px flex-1" style={{ background: "var(--lms-border)" }} />
        </div>

        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/learn" })}
          className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
          style={{ border: "1px solid var(--lms-border-input)", background: "var(--lms-bg-input)", color: "var(--lms-text)" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          สมัครด้วย Google
        </button>

        <p className="text-sm" style={{ color: "var(--lms-text-secondary)" }}>
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/learn/login" className="hover:underline" style={{ color: "var(--lms-accent-text)" }}>
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
