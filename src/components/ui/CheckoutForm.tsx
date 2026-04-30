"use client";
import { useState, useEffect } from "react";

interface CourseData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  installmentEnabled: boolean;
  installmentMonths: number[];
  enabledChannels: string[];
  isActive: boolean;
}

interface Props {
  courseSlug: string;
  apiBase?: string;
}

const CHANNEL_LABELS: Record<string, { label: string; group: string }> = {
  bank_qrcode: { label: "QR PromptPay", group: "scan" },
  creditcard: { label: "บัตรเครดิต / เดบิต", group: "card" },
  payplus_kbank: { label: "K PLUS", group: "mobile" },
  mobilebank_scb: { label: "SCB Easy", group: "mobile" },
  mobilebank_bay: { label: "KMA", group: "mobile" },
  mobilebank_bbl: { label: "Bualuang mBanking", group: "mobile" },
  mobilebank_ktb: { label: "Krungthai NEXT", group: "mobile" },
  installment_kbank: { label: "KBank ผ่อนชำระ", group: "installment" },
  installment_ktc_flexi: { label: "KTC ผ่อนชำระ", group: "installment" },
  installment_scb: { label: "SCB ผ่อนชำระ", group: "installment" },
  installment_krungsri: { label: "กรุงศรี ผ่อนชำระ", group: "installment" },
  installment_firstchoice: { label: "First Choice ผ่อนชำระ", group: "installment" },
};

const INSTALLMENT_MONTHS: Record<string, number[]> = {
  installment_kbank: [3, 4, 6, 10],
  installment_ktc_flexi: [3, 4, 6, 10],
  installment_scb: [3, 4, 6, 10],
  installment_krungsri: [3, 6, 9, 10],
  installment_firstchoice: [3, 6, 10, 12, 24, 36],
};

const GROUP_ORDER = ["scan", "card", "mobile", "installment"];
const GROUP_LABELS: Record<string, string> = {
  scan: "QR Code",
  card: "บัตรเครดิต",
  mobile: "Mobile Banking",
  installment: "ผ่อนชำระ",
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("th-TH").format(n) + ".-";

export default function CheckoutForm({
  courseSlug,
  apiBase = "https://checkout.winwinwealth.co/api",
}: Props) {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [channelCode, setChannelCode] = useState("");
  const [installmentMonths, setInstallmentMonths] = useState<number | null>(
    null
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch course on mount
  useEffect(() => {
    setLoadingCourse(true);
    setFetchError(null);
    fetch(`${apiBase}/courses/${courseSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("ไม่พบคอร์สนี้");
        return res.json();
      })
      .then((data: CourseData) => {
        setCourse(data);
        if (data.enabledChannels.length > 0) {
          setChannelCode(data.enabledChannels[0]);
        }
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoadingCourse(false));
  }, [courseSlug, apiBase]);

  const isInstallment = channelCode.startsWith("installment_");
  const availableMonths = isInstallment
    ? INSTALLMENT_MONTHS[channelCode] || []
    : [];

  // Reset installment months when channel changes
  useEffect(() => {
    if (!isInstallment) {
      setInstallmentMonths(null);
    } else if (availableMonths.length > 0 && !installmentMonths) {
      setInstallmentMonths(availableMonths[0]);
    }
  }, [channelCode]);

  const handleSubmit = async () => {
    setError(null);
    if (!course) return;

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("กรุณากรอกชื่อ นามสกุล และอีเมล");
      return;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) {
      setError("กรุณากรอกอีเมลที่ถูกต้อง");
      return;
    }
    if (!channelCode) {
      setError("กรุณาเลือกวิธีชำระเงิน");
      return;
    }
    if (isInstallment && !installmentMonths) {
      setError("กรุณาเลือกจำนวนเดือนผ่อนชำระ");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/checkout/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          channelCode,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          ...(lineId.trim() ? { lineId: lineId.trim() } : {}),
          ...(isInstallment && installmentMonths
            ? { installmentMonths }
            : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }

      // Redirect to payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading skeleton
  if (loadingCourse) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-lg mx-auto px-4 sm:px-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-zinc-800 rounded-xl w-48 mx-auto" />
            <div className="h-5 bg-zinc-800 rounded-xl w-32 mx-auto" />
            <div className="h-14 bg-zinc-800 rounded-xl" />
            <div className="h-14 bg-zinc-800 rounded-xl" />
            <div className="h-14 bg-zinc-800 rounded-xl" />
            <div className="h-14 bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // Fetch error
  if (fetchError || !course) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="text-red-400">{fetchError || "ไม่พบข้อมูลคอร์ส"}</p>
        </div>
      </section>
    );
  }

  // Channels shown in UI (subset — others kept in CHANNEL_LABELS for future use)
  const VISIBLE_CHANNELS = new Set([
    "bank_qrcode", "creditcard",
    "payplus_kbank", "mobilebank_scb", "mobilebank_bay", "mobilebank_bbl",
    // "installment_kbank", // ผ่อนชำระ — เปิดทีหลัง
  ]);

  // Group channels
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    channels: course.enabledChannels.filter(
      (ch) => VISIBLE_CHANNELS.has(ch) && (CHANNEL_LABELS[ch]?.group || "other") === group
    ),
  })).filter((g) => g.channels.length > 0);

  return (
    <section
      id="checkout"
      className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10"
    >
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <a href="/bank-uncensored" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6">
            ← กลับ
          </a>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            สมัครเรียน
          </h2>
          <p className="text-gray-400">{course.title}</p>
          <p className="text-yellow-400 text-2xl font-bold mt-3">
            {formatPrice(course.price)}
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Payment channel */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300 block">
              เลือกวิธีชำระเงิน
            </label>
            {grouped.map((g) => (
              <div key={g.group}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {g.label}
                </p>
                <div
                  className={`grid gap-2 ${g.channels.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                >
                  {g.channels.map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setChannelCode(ch)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 text-left ${
                        channelCode === ch
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500"
                          : "bg-zinc-900 text-gray-300 border-zinc-700 hover:border-zinc-500"
                      }`}
                    >
                      {CHANNEL_LABELS[ch]?.label || ch}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Installment months */}
          {isInstallment && availableMonths.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">
                จำนวนงวด
              </label>
              <div className="flex flex-wrap gap-2">
                {availableMonths.map((m) => (
                  <button
                    key={m}
                    onClick={() => setInstallmentMonths(m)}
                    className={`py-2 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                      installmentMonths === m
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500"
                        : "bg-zinc-900 text-gray-300 border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {m} เดือน
                  </button>
                ))}
              </div>
              {installmentMonths && (
                <p className="text-xs text-gray-500">
                  ≈ {formatPrice(Math.ceil(course.price / installmentMonths))}{" "}
                  / เดือน
                </p>
              )}
            </div>
          )}

          {/* 3. Customer info */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300 block">
              ข้อมูลผู้สมัคร
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ชื่อ *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="นามสกุล *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="อีเมล *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
            <p className="text-xs text-gray-600 -mt-1 px-1">
              อีเมลใช้สำหรับส่งข้อมูลการเข้าเรียนเท่านั้น
            </p>
            <input
              type="tel"
              placeholder="เบอร์โทรศัพท์ *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Line ID *"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* 4. Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-4 rounded-xl text-base font-bold transition-all duration-200 ${
              submitting
                ? "bg-yellow-500/50 text-black/50 cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02]"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                กำลังดำเนินการ...
              </span>
            ) : (
              `ชำระเงิน ${formatPrice(course.price)}`
            )}
          </button>

          <p className="text-center text-gray-600 text-xs">
            หลังชำระเงินสำเร็จ
            ระบบจะส่งอีเมลยืนยันพร้อมรหัสเข้าเรียนอัตโนมัติ
          </p>
        </div>
      </div>
    </section>
  );
}
