"use client";
import { useState, useEffect } from "react";

interface Props {
  apiBase?: string;
}

interface RegInfo {
  id: string;
  customerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  courseTitle: string;
  hasSurvey: boolean;
}

const SOURCES = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "friend", label: "เพื่อนแนะนำ" },
  { value: "google", label: "Google" },
  { value: "other", label: "อื่นๆ" },
];

const SKILL_LEVELS = [
  { value: "beginner", label: "พึ่งเริ่มวางระบบ", desc: "เน้นทำธุรกิจแต่ยังไม่ได้วางระบบการเงินชัดเจน" },
  { value: "basic", label: "พอมีพื้นฐาน", desc: "พอเข้าใจตัวเลขเบื้องต้น แต่บริหารจัดการเองไม่ได้ทั้งหมด" },
  { value: "intermediate", label: "ระดับจัดการ", desc: "มีระบบบัญชีอยู่แล้ว แต่อยากเพิ่มประสิทธิภาพ" },
  { value: "advanced", label: "ระดับเชี่ยวชาญ", desc: "เข้าใจโครงสร้างดี แต่อยากได้กลยุทธ์เชิงลึก" },
];

const GOALS = [
  { value: "scale_up", label: "Scale Up", desc: "วางแผนโครงสร้างการเงินเพื่อขยายสาขา/กิจการ" },
  { value: "fundraising", label: "Fundraising / Loan", desc: "เตรียมความพร้อมเพื่อขออนุมัติวงเงินจากธนาคาร" },
  { value: "profit", label: "Profit Optimization", desc: "ปรับปรุงระบบต้นทุนและกระแสเงินสดเพื่อให้มีกำไรจริง" },
  { value: "risk", label: "Risk Management", desc: "แก้ไขปัญหาการเงินหรือหนี้สินเพื่อให้ธุรกิจกลับมาแข็งแรง" },
  { value: "legacy", label: "Legacy / System", desc: "สร้างระบบการเงินที่อยู่ตัว" },
];

const inputCls = "w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors text-sm";

export default function SurveyForm({ apiBase = "https://checkout.winwinwealth.co/api" }: Props) {
  const [bucCode, setBucCode] = useState("");
  const [regInfo, setRegInfo] = useState<RegInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [source, setSource] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [goal, setGoal] = useState<string[]>([]);
  const [interestedTopics, setInterestedTopics] = useState("");
  const [needsReceipt, setNeedsReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState("individual");
  const [receiptName, setReceiptName] = useState("");
  const [receiptAddress, setReceiptAddress] = useState("");
  const [receiptTaxId, setReceiptTaxId] = useState("");
  const [receiptEmail, setReceiptEmail] = useState("");
  const [needsWithholding, setNeedsWithholding] = useState(false);
  const [withholdingContact, setWithholdingContact] = useState("");
  const [withholdingAcknowledged, setWithholdingAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Read buc from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("buc");
    if (code) {
      setBucCode(code);
      fetchInfo(code);
    }
  }, []);

  const fetchInfo = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/survey/${code}`);
      if (!res.ok) throw new Error("ไม่พบรหัสนี้");
      const data: RegInfo = await res.json();
      if (data.hasSurvey) {
        setSubmitted(true);
      }
      setRegInfo(data);
    } catch {
      setError("ไม่พบรหัสนี้ในระบบ");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = () => {
    if (bucCode.trim()) fetchInfo(bucCode.trim());
  };

  const handleSubmit = async () => {
    if (!regInfo) return;
    if (needsReceipt) {
      if (!receiptName?.trim()) { alert("กรุณากรอกชื่อสำหรับใบเสร็จ"); return; }
      if (!receiptAddress?.trim()) { alert("กรุณากรอกที่อยู่สำหรับใบเสร็จ"); return; }
      if (receiptTaxId && !/^\d{13}$/.test(receiptTaxId.trim())) { alert("เลขประจำตัวผู้เสียภาษีต้องเป็น 13 หลัก"); return; }
      if (receiptEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail.trim())) { alert("อีเมลรับใบเสร็จไม่ถูกต้อง"); return; }
    }
    if (needsWithholding) {
      if (!withholdingContact?.trim()) { alert("กรุณากรอกเบอร์ติดต่อสำหรับหัก ณ ที่จ่าย"); return; }
      if (!withholdingAcknowledged) { alert("กรุณายืนยันรับทราบเงื่อนไขหัก ณ ที่จ่าย"); return; }
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/survey/${regInfo.customerCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source, skill_level: skillLevel, goal, interested_topics: interestedTopics,
          needs_receipt: needsReceipt, receipt_type: receiptType, receipt_name: receiptName,
          receipt_address: receiptAddress, receipt_tax_id: receiptTaxId, receipt_email: receiptEmail,
          needs_withholding: needsWithholding, withholding_contact: withholdingContact,
          withholding_acknowledged: withholdingAcknowledged,
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message || "error"); }
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "https://community.winwinwealth.co/community/login";
      }, 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const chipCls = (active: boolean) =>
    `py-2.5 px-4 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer text-left ${active ? "bg-yellow-500/10 text-yellow-400 border-yellow-500" : "bg-zinc-900 text-gray-300 border-zinc-700 hover:border-zinc-500"}`;

  // No BUC code — show lookup
  if (!regInfo && !loading) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">แบบสอบถาม</h2>
          <p className="text-gray-400 mb-8">กรอกรหัส BUC ของคุณเพื่อเริ่มต้น</p>
          <div className="flex gap-2">
            <input value={bucCode} onChange={e => setBucCode(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLookup()} placeholder="เช่น BUC041" className={inputCls + " flex-1"} />
            <button onClick={handleLookup} className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all">ค้นหา</button>
          </div>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">กำลังตรวจสอบ...</p>
        </div>
      </section>
    );
  }

  // Already submitted
  if (submitted) {
    return (
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">ส่งแบบสอบถามเรียบร้อย!</h2>
          <p className="text-gray-400 mb-2">ขอบคุณ คุณ{regInfo?.firstName} ที่สละเวลากรอกแบบสอบถาม</p>
          <p className="text-gray-500 text-sm mb-6">กำลังพาไปหน้า Community...</p>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-6 max-w-xs mx-auto">
            <div className="h-full bg-green-500 rounded-full" style={{ animation: "progressFill 3s linear forwards" }} />
          </div>
          <style>{`@keyframes progressFill { from { width: 0%; } to { width: 100%; } }`}</style>
          <a href="https://community.winwinwealth.co/community/login" className="inline-block px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all">เข้าสู่ Community เลย →</a>
        </div>
      </section>
    );
  }

  if (!regInfo) return null;

  const totalSteps = 3;

  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-24">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">แบบสอบถาม</h2>
          <p className="text-gray-400 text-sm">{regInfo.courseTitle}</p>
          <div className="inline-flex items-center gap-2 mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5">
            <span className="text-yellow-400 text-xs font-mono font-bold">{regInfo.customerCode}</span>
            <span className="text-gray-400 text-xs">— คุณ{regInfo.firstName}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-yellow-500" : "bg-zinc-800"}`} />
          ))}
        </div>

        {/* Step 1: ช่องทาง + ประสบการณ์ */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">รู้จักเราจากช่องทางไหน</p>
              <div className="grid grid-cols-2 gap-2">
                {SOURCES.map(s => (
                  <button key={s.value} onClick={() => toggleArray(source, s.value, setSource)} className={chipCls(source.includes(s.value))}>{s.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">ประสบการณ์การจัดการทางการเงิน</p>
              <div className="space-y-2">
                {SKILL_LEVELS.map(s => (
                  <button key={s.value} onClick={() => setSkillLevel(s.value)} className={chipCls(skillLevel === s.value) + " w-full"}>
                    <span className="font-semibold">{s.label}</span>
                    <span className="text-gray-500 text-xs block mt-0.5">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: เป้าหมาย */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">ผลลัพธ์ทางธุรกิจที่คุณต้องการ (เลือกได้หลายข้อ)</p>
              <div className="space-y-2">
                {GOALS.map(g => (
                  <button key={g.value} onClick={() => toggleArray(goal, g.value, setGoal)} className={chipCls(goal.includes(g.value)) + " w-full"}>
                    <span className="font-semibold">{g.label}</span>
                    <span className="text-gray-500 text-xs block mt-0.5">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">หัวข้อหรือคอร์สอื่นที่สนใจ</p>
              <textarea value={interestedTopics} onChange={e => setInterestedTopics(e.target.value)} placeholder="ระบุหัวข้อที่สนใจ (ไม่บังคับ)" rows={3} className={inputCls + " resize-none"} />
            </div>
          </div>
        )}

        {/* Step 3: ใบกำกับภาษี */}
        {step === 3 && (
          <div className="space-y-6">
            {/* ใบเสร็จ */}
            <div className="rounded-xl border border-zinc-700 overflow-hidden">
              <button onClick={() => setNeedsReceipt(!needsReceipt)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-sm text-white font-medium">ต้องการใบเสร็จ / ใบกำกับภาษี</span>
                <div className={`w-10 h-6 rounded-full transition-all ${needsReceipt ? "bg-yellow-500" : "bg-zinc-700"} flex items-center`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${needsReceipt ? "ml-5" : "ml-1"}`} />
                </div>
              </button>
              {needsReceipt && (
                <div className="p-4 pt-0 space-y-3 border-t border-zinc-800">
                  <div className="flex gap-4 mb-2">
                    {[{ v: "individual", l: "บุคคลธรรมดา" }, { v: "company", l: "นิติบุคคล" }].map(o => (
                      <label key={o.v} className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                        <input type="radio" name="rtype" checked={receiptType === o.v} onChange={() => setReceiptType(o.v)} className="accent-yellow-500" />{o.l}
                      </label>
                    ))}
                  </div>
                  <input value={receiptName} onChange={e => setReceiptName(e.target.value)} placeholder={receiptType === "company" ? "ชื่อบริษัท *" : "ชื่อ-นามสกุล *"} className={inputCls} />
                  <textarea value={receiptAddress} onChange={e => setReceiptAddress(e.target.value)} placeholder="ที่อยู่เต็ม *" rows={2} className={inputCls + " resize-none"} />
                  <input value={receiptTaxId} onChange={e => setReceiptTaxId(e.target.value)} placeholder="เลขประจำตัวผู้เสียภาษี 13 หลัก *" className={inputCls} />
                  <input value={receiptEmail} onChange={e => setReceiptEmail(e.target.value)} placeholder="อีเมลรับใบเสร็จ *" type="email" className={inputCls} />
                </div>
              )}
            </div>

            {/* หัก ณ ที่จ่าย */}
            <div className="rounded-xl border border-zinc-700 overflow-hidden">
              <button onClick={() => setNeedsWithholding(!needsWithholding)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-sm text-white font-medium">ต้องการหัก ณ ที่จ่าย 3%</span>
                <div className={`w-10 h-6 rounded-full transition-all ${needsWithholding ? "bg-yellow-500" : "bg-zinc-700"} flex items-center`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${needsWithholding ? "ml-5" : "ml-1"}`} />
                </div>
              </button>
              {needsWithholding && (
                <div className="p-4 pt-0 space-y-3 border-t border-zinc-800">
                  <div className="bg-zinc-900 rounded-xl p-4 text-xs text-gray-400 space-y-2">
                    <p className="font-semibold text-white text-sm">ที่อยู่สำหรับออกใบหัก ณ ที่จ่าย:</p>
                    <p>บริษัท วิน วิน เวลธ์ ครีเอชั่น จำกัด สำนักงานใหญ่</p>
                    <p>888/122 หมู่15 ต.ราชาเทวะ อ.บางพลี จ.สมุทรปราการ 10540</p>
                    <p>เลขนิติ: 0115565028387</p>
                    <div className="mt-2 pt-2 border-t border-zinc-800 space-y-1">
                      <p>📧 ส่ง PDF มาที่: winwin.wealth.creation@gmail.com</p>
                      <p>📅 จัดส่งใบเสร็จภายใน 7-10 วัน</p>
                      <p>📞 ติดต่อฝ่ายบัญชี: คุณกีกี้ 082-338-3725</p>
                    </div>
                  </div>
                  <input value={withholdingContact} onChange={e => setWithholdingContact(e.target.value)} placeholder="เบอร์ติดต่อผู้รับผิดชอบฝ่ายบัญชี *" className={inputCls} />
                  <label className="flex items-start gap-2 text-sm text-gray-400 cursor-pointer">
                    <input type="checkbox" checked={withholdingAcknowledged} onChange={e => setWithholdingAcknowledged(e.target.checked)} className="accent-yellow-500 mt-1" />
                    <span>รับทราบและยืนยันจะส่งเอกสารใบหัก ณ ที่จ่าย ภายใน 7-10 วัน</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

        {/* Navigation */}
        <div className={`flex mt-8 pt-6 border-t border-zinc-800 ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 rounded-xl text-gray-400 border border-zinc-700 hover:border-zinc-500 transition-all text-sm">ย้อนกลับ</button>
          )}
          {step < totalSteps ? (
            <button onClick={() => setStep(s => s + 1)} className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all text-sm">ถัดไป</button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${submitting ? "bg-yellow-500/50 text-black/50 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}>
              {submitting ? "กำลังส่ง..." : "ยืนยันส่งแบบสอบถาม"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
