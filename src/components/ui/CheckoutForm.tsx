"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import generatePayload from "promptpay-qr";

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

interface BankInfo {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

interface SlipResult {
  success: boolean;
  customerCode: string;
  orderNo: string;
  status: "paid" | "pending_manual";
  message: string;
  error?: string;
}

interface Props {
  courseSlug: string;
  apiBase?: string;
}

const CHANNEL_LABELS: Record<string, { label: string; group: string }> = {
  bank_qrcode: { label: "QR ชำระเงิน", group: "scan" },
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

const SLIP_CHANNELS = new Set(["bank_qrcode", "payplus_kbank"]);

const GROUP_ORDER = ["scan", "mobile", "installment", "card"];
const GROUP_LABELS: Record<string, string> = {
  scan: "QR ชำระเงิน",
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
  const [installmentMonths, setInstallmentMonths] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slip states
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [slipError, setSlipError] = useState<string | null>(null);
  const [slipResult, setSlipResult] = useState<SlipResult | null>(null);

  const isSlipChannel = SLIP_CHANNELS.has(channelCode);
  const isInstallment = channelCode.startsWith("installment_");
  const availableMonths = isInstallment ? INSTALLMENT_MONTHS[channelCode] || [] : [];

  // Fetch course + bank info on mount
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

    fetch(`${apiBase}/checkout/bank-info`)
      .then((r) => r.json())
      .then(setBankInfo)
      .catch(() => {});
  }, [courseSlug, apiBase]);

  // Reset installment months when channel changes
  useEffect(() => {
    if (!isInstallment) {
      setInstallmentMonths(null);
    } else if (availableMonths.length > 0 && !installmentMonths) {
      setInstallmentMonths(availableMonths[0]);
    }
  }, [channelCode]);

  // ── Slip handlers ──────────────────────────────

  const handleSlipFile = (file: File) => {
    setSlipError(null);
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setSlipError("รองรับเฉพาะ JPG และ PNG เท่านั้น");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSlipError("ขนาดไฟล์ไม่เกิน 5MB");
      return;
    }
    setSlipFile(file);
    const reader = new FileReader();
    reader.onload = () => setSlipPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmitSlip = async () => {
    setError(null);
    if (!course) return;

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("กรุณากรอกชื่อ นามสกุล และอีเมล");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("กรุณากรอกอีเมลที่ถูกต้อง");
      return;
    }
    if (!slipFile) {
      setError("กรุณาอัพโหลดสลิปการชำระเงิน");
      return;
    }

    setSubmitting(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(slipFile);
      });

      const res = await fetch(`${apiBase}/checkout/verify-slip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slipImage: base64,
          courseId: course.id,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          ...(lineId.trim() ? { lineId: lineId.trim() } : {}),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSlipResult(data);
      } else {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setSubmitting(false);
    }
  };

  // ── ChillPay handler (เดิม — ไม่แตะ) ──────────

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
          ...(isInstallment && installmentMonths ? { installmentMonths } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ────────────────────────────────────

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

  if (fetchError || !course) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="text-red-400">{fetchError || "ไม่พบข้อมูลคอร์ส"}</p>
        </div>
      </section>
    );
  }

  // ── Slip result page ───────────────────────────

  if (slipResult) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          {slipResult.status === "paid" ? (
            <>
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-2">ชำระเงินสำเร็จ!</h2>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-2xl font-bold text-white mb-2">รับสลิปแล้ว</h2>
            </>
          )}
          <p className="text-gray-400 mb-6">{slipResult.message}</p>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-sm mb-1">รหัสลูกค้าของคุณ</p>
            <p className="text-yellow-400 font-mono text-xl font-bold">{slipResult.customerCode}</p>
            <p className="text-gray-600 text-xs mt-1">{slipResult.orderNo}</p>
          </div>
          <button
            onClick={() => { window.location.href = `/survey?buc=${slipResult.customerCode}`; }}
            className="w-full py-4 rounded-xl text-base font-bold bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-200 mb-4"
          >
            กรอกแบบสอบถาม →
          </button>
          <p className="text-gray-600 text-xs">
            กรุณาเก็บรหัสนี้ไว้ หากมีปัญหากรุณาแจ้งแอดมินพร้อมรหัสนี้
          </p>
        </div>
      </section>
    );
  }

  // ── Channel grouping ───────────────────────────

  const VISIBLE_CHANNELS = new Set([
    "bank_qrcode", "creditcard",
  ]);

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    channels: course.enabledChannels.filter(
      (ch) => VISIBLE_CHANNELS.has(ch) && (CHANNEL_LABELS[ch]?.group || "other") === group
    ),
  })).filter((g) => g.channels.length > 0);

  const promptpayPayload = bankInfo
    ? generatePayload(bankInfo.accountNumber, { amount: course.price })
    : "";

  // ── Main form ──────────────────────────────────

  return (
    <section id="checkout" className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <a href="/bank-uncensored" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6">
          ← กลับ
        </a>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">สมัครเรียน</h2>
          <p className="text-gray-400">{course.title}</p>
          <p className="text-yellow-400 text-2xl font-bold mt-3">{formatPrice(course.price)}</p>
        </div>

        <div className="space-y-8">
          {/* 1. Payment channel */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300 block">เลือกวิธีชำระเงิน</label>
            {grouped.map((g) => (
              <div key={g.group}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{g.label}</p>
                <div className={`grid gap-2 ${g.channels.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
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

          {/* 2. Installment months (ChillPay only) */}
          {isInstallment && availableMonths.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 block">จำนวนงวด</label>
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
                  ≈ {formatPrice(Math.ceil(course.price / installmentMonths))} / เดือน
                </p>
              )}
            </div>
          )}

          {/* 3. Bank info + QR + Slip upload (slip channels only) */}
          {isSlipChannel && bankInfo && (
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">ชำระเงินมาที่บัญชี</p>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-3 rounded-xl">
                    <QRCodeSVG value={promptpayPayload} size={160} />
                  </div>
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ชื่อบัญชี</span>
                      <span className="text-white font-medium">{bankInfo.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">เลขบัญชี</span>
                      <span className="text-white font-mono font-bold">{bankInfo.accountNumber}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-700 pt-2">
                      <span className="text-gray-500">ยอดชำระ</span>
                      <span className="text-yellow-400 font-bold text-base">{formatPrice(course.price)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">อัพโหลดสลิปการชำระเงิน</p>
                <div
                  onClick={() => document.getElementById("slip-input")?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    slipFile ? "border-yellow-500/50 bg-yellow-500/5" : "border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {slipPreview ? (
                    <div className="relative">
                      <img src={slipPreview} alt="slip" className="max-h-48 mx-auto rounded-lg object-contain" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSlipFile(null);
                          setSlipPreview(null);
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm">คลิกหรือลากไฟล์สลิปมาวาง</p>
                      <p className="text-gray-600 text-xs">JPG, PNG ไม่เกิน 5MB</p>
                    </div>
                  )}
                </div>
                <input
                  id="slip-input"
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) handleSlipFile(e.target.files[0]); }}
                />
                {slipError && <p className="text-red-400 text-xs mt-2">{slipError}</p>}
              </div>
            </div>
          )}

          {/* 4. Customer info */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300 block">ข้อมูลผู้สมัคร</label>
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
            <p className="text-xs text-gray-600 -mt-1 px-1">อีเมลใช้สำหรับส่งข้อมูลการเข้าเรียนเท่านั้น</p>
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

          {/* 5. Submit */}
          <button
            onClick={isSlipChannel ? handleSubmitSlip : handleSubmit}
            disabled={submitting || (isSlipChannel && !slipFile)}
            className={`w-full py-4 rounded-xl text-base font-bold transition-all duration-200 ${
              submitting || (isSlipChannel && !slipFile)
                ? "bg-yellow-500/50 text-black/50 cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02]"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                กำลังดำเนินการ...
              </span>
            ) : isSlipChannel ? (
              "ยืนยันการชำระเงิน"
            ) : (
              `ชำระเงิน ${formatPrice(course.price)}`
            )}
          </button>

          <p className="text-center text-gray-600 text-xs">
            {isSlipChannel
              ? "หลังยืนยันการชำระเงิน ระบบจะตรวจสอบและส่งอีเมลยืนยันภายใน 24 ชั่วโมง"
              : "หลังชำระเงินสำเร็จ ระบบจะส่งอีเมลยืนยันพร้อมรหัสเข้าเรียนอัตโนมัติ"}
          </p>
        </div>
      </div>
    </section>
  );
}
