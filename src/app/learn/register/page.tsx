"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LMS_API = "https://checkout.winwinwealth.co/api";

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

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "เกิดข้อผิดพลาด");
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
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image
          src="/favicon.png"
          alt="WinWin"
          width={64}
          height={64}
          className="mx-auto rounded-xl"
        />
        <h1 className="text-2xl font-bold text-yellow-accent">
          สมัครสมาชิก
        </h1>
        <p className="text-sm text-gray-400">
          สร้างบัญชีเพื่อเข้าเรียนคอร์สที่ซื้อแล้ว
        </p>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <input
              type="text"
              placeholder="ชื่อที่แสดง"
              value={form.displayName}
              onChange={set("displayName")}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="อีเมล"
              value={form.email}
              onChange={set("email")}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
              value={form.password}
              onChange={set("password")}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-yellow-accent/50 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-accent py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className="text-sm text-gray-400">
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            href="/learn/login"
            className="text-yellow-accent hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
