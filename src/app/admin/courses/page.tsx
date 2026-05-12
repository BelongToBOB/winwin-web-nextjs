"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface Course {
  id: string;
  slug: string;
  title: string;
  price: string;
  cover_url: string | null;
  is_active: boolean;
  chapter_count: number;
  lesson_count: number;
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: 0,
  });

  const loadCourses = () => {
    fetch(`${LMS_API}/admin/courses`)
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCourses(); }, []);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setForm((f) => ({ ...f, title, slug }));
  };

  const handleCreate = async () => {
    setError("");
    if (!form.title || !form.slug) {
      setError("กรุณากรอกชื่อคอร์สและ slug");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${LMS_API}/admin/courses/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "สร้างคอร์สไม่สำเร็จ");
        return;
      }
      setShowModal(false);
      setForm({ title: "", slug: "", description: "", price: 0 });
      router.push(`/admin/courses/${data.id}`);
    } catch {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">จัดการคอร์ส</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          + สร้างคอร์สใหม่
        </button>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/courses/${course.id}`}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-accent/30 hover:bg-white/5"
          >
            {course.cover_url ? (
              <img src={course.cover_url} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
            ) : (
              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <h2 className="font-semibold">{course.title}</h2>
              <p className="mt-1 text-xs text-gray-500">
                {course.chapter_count} บท · {course.lesson_count} บทเรียน · ฿{Number(course.price).toLocaleString()}
              </p>
            </div>
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
        {courses.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
            <p className="text-gray-500">ยังไม่มีคอร์ส</p>
            <p className="mt-1 text-sm text-gray-600">กดปุ่ม "สร้างคอร์สใหม่" เพื่อเริ่มต้น</p>
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-5 text-lg font-semibold">สร้างคอร์สใหม่</h3>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ชื่อคอร์ส</label>
                <input
                  type="text"
                  placeholder="เช่น Bank Uncensored 2026"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  autoFocus
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">Slug (URL)</label>
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-1.5">
                  <span>programs.winwinwealth.co/learn/</span>
                  <span className="text-yellow-accent">{form.slug || "..."}</span>
                </div>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 font-mono placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">คำอธิบาย</label>
                <textarea
                  placeholder="อธิบายสั้นๆ เกี่ยวกับคอร์สนี้"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ราคา (บาท)</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  className="w-36 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="rounded-lg px-5 py-2.5 text-sm text-gray-400 transition hover:text-white">
                ยกเลิก
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.title || !form.slug || saving}
                className="rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
              >
                {saving ? "กำลังสร้าง..." : "สร้างคอร์ส"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
