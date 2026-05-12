"use client";
import { useState, useEffect } from "react";

const CONFIG: Record<string, { title: string; message: string; color: string; icon: string }> = {
  success: {
    title: "ชำระเงินสำเร็จ!",
    message: "ขอบคุณที่สมัครเรียน ระบบส่งอีเมลยืนยันพร้อมรหัสเข้าเรียนให้แล้ว กรุณาตรวจสอบกล่องข้อความ",
    color: "green",
    icon: "✅",
  },
  failed: {
    title: "การชำระเงินไม่สำเร็จ",
    message: "กรุณาลองใหม่อีกครั้ง หรือเลือกช่องทางชำระเงินอื่น หากมีปัญหา ติดต่อ LINE @winwinwealth",
    color: "red",
    icon: "❌",
  },
  cancelled: {
    title: "ยกเลิกการชำระเงิน",
    message: "คุณได้ยกเลิกการชำระเงิน สามารถกลับไปสมัครใหม่ได้ตลอดเวลา",
    color: "gray",
    icon: "🚫",
  },
};

const COLORS: Record<string, { iconBg: string; text: string }> = {
  green: { iconBg: "bg-green-500/10 border-green-500/30", text: "text-green-400" },
  red:   { iconBg: "bg-red-500/10 border-red-500/30",     text: "text-red-400" },
  gray:  { iconBg: "bg-zinc-700/50 border-zinc-600/30",   text: "text-gray-400" },
};

function CheckmarkAnimation() {
  return (
    <div className="w-24 h-24 mx-auto mb-6 relative">
      <svg viewBox="0 0 96 96" className="w-full h-full">
        <circle
          cx="48" cy="48" r="44"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          opacity="0.2"
        />
        <circle
          cx="48" cy="48" r="44"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray="276.46"
          strokeDashoffset="276.46"
          strokeLinecap="round"
          style={{ animation: "circleIn 0.6s ease-out 0.2s forwards" }}
        />
        <path
          d="M28 48 L42 62 L68 34"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="60"
          strokeDashoffset="60"
          style={{ animation: "checkIn 0.4s ease-out 0.7s forwards" }}
        />
      </svg>
      <style>{`
        @keyframes circleIn {
          to { stroke-dashoffset: 0; }
        }
        @keyframes checkIn {
          to { stroke-dashoffset: 0; }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function PaymentResult() {
  const [status, setStatus] = useState<string | null>(null);
  const [bucCode, setBucCode] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status") || "unknown");
    setBucCode(params.get("buc") || "");
  }, []);

  // Auto redirect for success
  useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          const surveyUrl = bucCode
            ? `/survey?buc=${bucCode}`
            : "/survey";
          window.location.href = surveyUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, bucCode]);

  if (!status) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Success — animated checkmark + auto redirect
  if (status === "success") {
    return (
      <div className="max-w-md mx-auto px-6 text-center">
        <CheckmarkAnimation />

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-green-400">
          ชำระเงินสำเร็จ!
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mb-2">
          ขอบคุณที่สมัครเรียน ระบบส่งอีเมลยืนยันพร้อมรหัสเข้าเรียนให้แล้ว
        </p>

        <p className="text-gray-500 text-sm mb-8">
          กำลังพาไปกรอกแบบสอบถามใน {countdown} วินาที...
        </p>

        {/* Progress bar */}
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-8 max-w-xs mx-auto">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ animation: "progressFill 5s linear forwards" }}
          />
        </div>

        <a
          href={bucCode ? `/survey?buc=${bucCode}` : "/survey"}
          className="inline-block px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all text-sm"
        >
          กรอกแบบสอบถามเลย →
        </a>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <p className="text-gray-500 text-sm mb-3">พร้อมเข้าเรียนแล้ว?</p>
          <a
            href="/learn/register"
            className="inline-block px-6 py-2.5 rounded-xl bg-zinc-800 text-gray-300 font-medium border border-zinc-700 hover:border-zinc-500 transition-all text-sm"
          >
            สมัครบัญชีเพื่อเข้าเรียน →
          </a>
        </div>
      </div>
    );
  }

  // Failed / Cancelled / Unknown
  const c = CONFIG[status] || {
    title: "ไม่ทราบสถานะ",
    message: "กรุณาตรวจสอบอีเมลหรือติดต่อทีมงานที่ LINE @winwinwealth",
    color: "gray",
    icon: "❓",
  };
  const colors = COLORS[c.color] || COLORS.gray;

  return (
    <div className="max-w-md mx-auto px-6 text-center">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${colors.iconBg} border flex items-center justify-center text-4xl`}>
        {c.icon}
      </div>

      <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${colors.text}`}>
        {c.title}
      </h1>

      <p className="text-gray-400 text-base leading-relaxed mb-8">
        {c.message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/checkout"
          className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all"
        >
          ลองอีกครั้ง
        </a>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-zinc-800 text-gray-300 font-medium border border-zinc-700 hover:border-zinc-500 transition-all"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </div>
  );
}
