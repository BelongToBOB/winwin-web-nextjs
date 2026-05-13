"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetch(`${LMS_API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setSent(true);
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image src="/favicon.png" alt="WinWin" width={64} height={64} className="mx-auto rounded-xl" />
        <h1 className="text-2xl font-bold text-yellow-accent">ลืมรหัสผ่าน</h1>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="text-sm text-green-400">
                ส่งลิงก์รีเซ็ตรหัสผ่านไปที่ {email} แล้ว
              </p>
              <p className="mt-2 text-xs text-gray-500">กรุณาตรวจสอบกล่องข้อความ (รวมถึง spam)</p>
            </div>
            <Link href="/learn/login" className="inline-block text-sm text-yellow-accent hover:underline">
              กลับหน้าเข้าสู่ระบบ
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400">กรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้</p>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <input
                type="email"
                placeholder="อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full rounded-lg bg-yellow-accent py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
              </button>
            </form>

            <Link href="/learn/login" className="inline-block text-sm text-gray-400 hover:text-gray-300">
              กลับหน้าเข้าสู่ระบบ
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
