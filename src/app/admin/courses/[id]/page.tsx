"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  description: string | null;
  video_id: string | null;
  duration: number;
  order: number;
  is_free: boolean;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface CourseContent {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  chapters: Chapter[];
}

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function CourseEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverUrl, setCoverUrl] = useState("");
  const [savingCover, setSavingCover] = useState(false);

  // Modal state
  const [modal, setModal] = useState<"chapter" | "lesson" | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [forChapterId, setForChapterId] = useState("");

  // Form state
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterOrder, setChapterOrder] = useState(0);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoId: "",
    duration: 0,
    order: 0,
    isFree: false,
  });
  const [saving, setSaving] = useState(false);

  const reload = useCallback(() => {
    fetch(`${LMS_API}/admin/courses/${id}/content`)
      .then((r) => r.json())
      .then((data) => {
        setCourse(data);
        setCoverUrl(data.coverUrl || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { reload(); }, [reload]);

  // === Cover ===
  const saveCover = async () => {
    setSavingCover(true);
    await fetch(`${LMS_API}/admin/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverUrl }),
    });
    setSavingCover(false);
    reload();
  };

  // === Chapter CRUD ===
  const openChapterModal = (ch?: Chapter) => {
    setEditingChapter(ch || null);
    setChapterTitle(ch?.title || "");
    setChapterOrder(ch?.order || (course?.chapters.length ?? 0) + 1);
    setModal("chapter");
  };

  const saveChapter = async () => {
    setSaving(true);
    if (editingChapter) {
      await fetch(`${LMS_API}/admin/chapters/${editingChapter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: chapterTitle, order: chapterOrder }),
      });
    } else {
      await fetch(`${LMS_API}/admin/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: id, title: chapterTitle, order: chapterOrder }),
      });
    }
    setSaving(false);
    setModal(null);
    reload();
  };

  const deleteChapter = async (chId: string) => {
    if (!confirm("ลบบทนี้และบทเรียนทั้งหมดในบท?")) return;
    await fetch(`${LMS_API}/admin/chapters/${chId}`, { method: "DELETE" });
    reload();
  };

  // === Lesson CRUD ===
  const openLessonModal = (chapterId: string, lesson?: Lesson) => {
    setForChapterId(chapterId);
    setEditingLesson(lesson || null);
    setLessonForm({
      title: lesson?.title || "",
      description: lesson?.description || "",
      videoId: lesson?.video_id || "",
      duration: lesson?.duration || 0,
      order: lesson?.order || 0,
      isFree: lesson?.is_free || false,
    });
    setModal("lesson");
  };

  const saveLesson = async () => {
    setSaving(true);
    if (editingLesson) {
      await fetch(`${LMS_API}/admin/lessons/${editingLesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonForm),
      });
    } else {
      await fetch(`${LMS_API}/admin/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lessonForm, chapterId: forChapterId, courseId: id }),
      });
    }
    setSaving(false);
    setModal(null);
    reload();
  };

  const deleteLesson = async (lessonId: string) => {
    if (!confirm("ลบบทเรียนนี้?")) return;
    await fetch(`${LMS_API}/admin/lessons/${lessonId}`, { method: "DELETE" });
    reload();
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  if (!course) {
    return <p className="py-10 text-center text-red-400">ไม่พบคอร์ส</p>;
  }

  return (
    <div>
      {/* Header */}
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-accent">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        คอร์สทั้งหมด
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{course.title}</h1>

      {/* Cover URL */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <label className="mb-2 block text-sm font-medium text-gray-400">Cover Image URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/50 focus:outline-none"
          />
          <button
            onClick={saveCover}
            disabled={savingCover}
            className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            {savingCover ? "..." : "บันทึก"}
          </button>
        </div>
        {coverUrl && (
          <img src={coverUrl} alt="Cover preview" className="mt-3 h-32 rounded-lg object-cover" />
        )}
      </div>

      {/* Add Chapter button */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">เนื้อหาคอร์ส</h2>
        <button
          onClick={() => openChapterModal()}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-gray-300 transition hover:bg-white/20"
        >
          + เพิ่มบท
        </button>
      </div>

      {/* Chapters + Lessons */}
      <div className="space-y-4">
        {course.chapters.map((ch) => (
          <div key={ch.id} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {/* Chapter header */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <span className="text-sm font-semibold">{ch.title}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openChapterModal(ch)}
                  className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteChapter(ch.id)}
                  className="rounded px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                >
                  ลบ
                </button>
              </div>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-white/5">
              {ch.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="w-6 text-center text-xs text-gray-600">{lesson.order}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-200 truncate">{lesson.title}</span>
                      {lesson.is_free && (
                        <span className="shrink-0 rounded bg-yellow-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-accent">ฟรี</span>
                      )}
                      {lesson.video_id && (
                        <span className="shrink-0 rounded bg-green-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-green-400">มีวิดีโอ</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{formatDuration(lesson.duration)}</span>
                  <button
                    onClick={() => openLessonModal(ch.id, lesson)}
                    className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="rounded px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>

            {/* Add lesson */}
            <button
              onClick={() => openLessonModal(ch.id)}
              className="w-full border-t border-white/5 px-4 py-2 text-left text-xs text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
            >
              + เพิ่มบทเรียน
            </button>
          </div>
        ))}

        {course.chapters.length === 0 && (
          <p className="py-10 text-center text-gray-500">ยังไม่มีเนื้อหา กดปุ่ม "เพิ่มบท" เพื่อเริ่มต้น</p>
        )}
      </div>

      {/* === MODALS === */}

      {/* Chapter Modal */}
      {modal === "chapter" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E] p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold">
              {editingChapter ? "แก้ไขบท" : "เพิ่มบทใหม่"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="ชื่อบท เช่น บทที่ 1: พื้นฐานการเงิน"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/50 focus:outline-none"
              />
              <div>
                <label className="mb-1 block text-xs text-gray-500">ลำดับ</label>
                <input
                  type="number"
                  value={chapterOrder}
                  onChange={(e) => setChapterOrder(Number(e.target.value))}
                  className="w-20 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-200 focus:border-yellow-accent/50 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white">ยกเลิก</button>
              <button
                onClick={saveChapter}
                disabled={!chapterTitle || saving}
                className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
              >
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {modal === "lesson" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1C1C1E] p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-semibold">
              {editingLesson ? "แก้ไขบทเรียน" : "เพิ่มบทเรียน"}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="ชื่อบทเรียน"
                value={lessonForm.title}
                onChange={(e) => setLessonForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/50 focus:outline-none"
              />
              <textarea
                placeholder="คำอธิบาย (ไม่จำเป็น)"
                value={lessonForm.description}
                onChange={(e) => setLessonForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/50 focus:outline-none resize-none"
              />
              <div>
                <label className="mb-1 block text-xs text-gray-500">Cloudflare Stream Video ID</label>
                <input
                  type="text"
                  placeholder="เช่น ea95132c15732412d22c1476fa83f27a"
                  value={lessonForm.videoId}
                  onChange={(e) => setLessonForm((f) => ({ ...f, videoId: e.target.value }))}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-gray-200 font-mono placeholder:text-gray-600 focus:border-yellow-accent/50 focus:outline-none"
                />
              </div>
              <div className="flex gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">ความยาว (วินาที)</label>
                  <input
                    type="number"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm((f) => ({ ...f, duration: Number(e.target.value) }))}
                    className="w-28 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-200 focus:border-yellow-accent/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">ลำดับ</label>
                  <input
                    type="number"
                    value={lessonForm.order}
                    onChange={(e) => setLessonForm((f) => ({ ...f, order: Number(e.target.value) }))}
                    className="w-20 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-gray-200 focus:border-yellow-accent/50 focus:outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lessonForm.isFree}
                  onChange={(e) => setLessonForm((f) => ({ ...f, isFree: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">เปิดให้ดูฟรี (Preview)</span>
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white">ยกเลิก</button>
              <button
                onClick={saveLesson}
                disabled={!lessonForm.title || saving}
                className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
              >
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
