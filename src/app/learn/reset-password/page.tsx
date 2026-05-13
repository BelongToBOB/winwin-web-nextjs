"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

function ResetContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("รหัสผ่านไม่ตรงกัน"); return; }
    if (password.length < 6) { setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${LMS_API}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "ไม่สำเร็จ"); return; }
      setSuccess(true);
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-400">ลิงก์ไม่ถูกต้อง</p>
        <Link href="/learn/forgot-password" className="text-sm text-yellow-accent hover:underline">ขอลิงก์ใหม่</Link>
      </div>
    );
  }

  return (
    <>
      {success ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-400">เปลี่ยนรหัสผ่านสำเร็จ</p>
          </div>
          <Link href="/learn/login" className="inline-block rounded-lg bg-yellow-accent px-6 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300">
            เข้าสู่ระบบ
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400">กรอกรหัสผ่านใหม่</p>
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <input type="password" placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัว)" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none" />
            <input type="password" placeholder="ยืนยันรหัสผ่านใหม่" value={confirm} onChange={e => setConfirm(e.target.value)} required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none" />
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-yellow-accent py-3 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-50">
              {loading ? "กำลังบันทึก..." : "ตั้งรหัสผ่านใหม่"}
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image src="/favicon.png" alt="WinWin" width={64} height={64} className="mx-auto rounded-xl" />
        <h1 className="text-2xl font-bold text-yellow-accent">ตั้งรหัสผ่านใหม่</h1>
        <Suspense><ResetContent /></Suspense>
      </div>
    </div>
  );
}
