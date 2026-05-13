"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const LMS_API = "https://checkout.winwinwealth.co/api";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [displayName, setDisplayName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleSaveName = async () => {
    if (!session?.user?.email) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${LMS_API}/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, displayName }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      show("บันทึกชื่อแล้ว");
    } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    setError("");
    if (newPassword !== confirmPassword) { setError("รหัสผ่านใหม่ไม่ตรงกัน"); return; }
    if (newPassword.length < 6) { setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร"); return; }

    setSaving(true);
    try {
      const res = await fetch(`${LMS_API}/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      show("เปลี่ยนรหัสผ่านสำเร็จ");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
    finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-6 sm:py-10">
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500/20 border border-green-500/30 px-4 py-2 text-sm text-green-400">
          {toast}
        </div>
      )}

      <h1 className="mb-8 text-xl font-bold">โปรไฟล์</h1>

      {/* Display Name */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="mb-4 text-sm font-medium text-gray-400">ข้อมูลทั่วไป</h2>
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">อีเมล</label>
            <p className="text-sm text-gray-300">{session?.user?.email}</p>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">ชื่อที่แสดง</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none"
            />
          </div>
          <button onClick={handleSaveName} disabled={saving}
            className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-50">
            {saving ? "..." : "บันทึก"}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="mb-4 text-sm font-medium text-gray-400">เปลี่ยนรหัสผ่าน</h2>

        {error && (
          <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">รหัสผ่านปัจจุบัน</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">รหัสผ่านใหม่</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="อย่างน้อย 6 ตัวอักษร"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">ยืนยันรหัสผ่านใหม่</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" />
          </div>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-50">
            {saving ? "..." : "เปลี่ยนรหัสผ่าน"}
          </button>
        </form>
      </div>
    </div>
  );
}
