"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

function minutesToSeconds(min: number) {
  return Math.round(min * 60);
}
function secondsToMinutes(sec: number) {
  return Math.round((sec / 60) * 10) / 10;
}
function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// Detect video type and return embed-friendly URL
function getVideoEmbed(url: string): { type: "youtube" | "direct"; src: string } | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { type: "youtube", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  // Direct URL
  return { type: "direct", src: url };
}

export default function CourseEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // Cover upload
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Modals
  const [modal, setModal] = useState<"chapter" | "lesson" | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [forChapterId, setForChapterId] = useState("");

  // Chapter form
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterOrder, setChapterOrder] = useState(0);

  // Lesson form
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoId: "",
    durationMin: 0,
    order: 0,
    isFree: false,
  });
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const reload = useCallback(() => {
    fetch(`${LMS_API}/admin/courses/${id}/content`)
      .then((r) => r.json())
      .then(setCourse)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { reload(); }, [reload]);

  // === Cover Upload ===
  const uploadCover = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      showToast("ไฟล์ใหญ่เกิน 2MB");
      return;
    }
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      showToast("รองรับเฉพาะ JPG, PNG, WebP");
      return;
    }

    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch(`${LMS_API}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const { url } = await uploadRes.json();
      const fullUrl = `https://checkout.winwinwealth.co${url}`;

      await fetch(`${LMS_API}/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverUrl: fullUrl }),
      });
      showToast("บันทึกรูปปกแล้ว");
      reload();
    } catch {
      showToast("อัพโหลดไม่สำเร็จ");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadCover(file);
  };

  // === Chapter ===
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
    showToast("บันทึกแล้ว");
    reload();
  };

  const deleteChapter = async (chId: string, title: string) => {
    if (!confirm(`ลบ "${title}" และบทเรียนทั้งหมดในบทนี้?`)) return;
    await fetch(`${LMS_API}/admin/chapters/${chId}`, { method: "DELETE" });
    showToast("ลบแล้ว");
    reload();
  };

  // === Lesson ===
  const openLessonModal = (chapterId: string, lesson?: Lesson) => {
    setForChapterId(chapterId);
    setEditingLesson(lesson || null);
    const chapterLessons = course?.chapters.find(c => c.id === chapterId)?.lessons || [];
    setLessonForm({
      title: lesson?.title || "",
      description: lesson?.description || "",
      videoId: lesson?.video_id || "",
      durationMin: lesson ? secondsToMinutes(lesson.duration) : 0,
      order: lesson?.order || chapterLessons.length + 1,
      isFree: lesson?.is_free || false,
    });
    setModal("lesson");
  };

  const saveLesson = async () => {
    setSaving(true);
    const payload = {
      title: lessonForm.title,
      description: lessonForm.description || null,
      videoId: lessonForm.videoId || null,
      duration: minutesToSeconds(lessonForm.durationMin),
      order: lessonForm.order,
      isFree: lessonForm.isFree,
    };
    if (editingLesson) {
      await fetch(`${LMS_API}/admin/lessons/${editingLesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${LMS_API}/admin/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, chapterId: forChapterId, courseId: id }),
      });
    }
    setSaving(false);
    setModal(null);
    showToast("บันทึกแล้ว");
    reload();
  };

  const deleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`ลบบทเรียน "${title}"?`)) return;
    await fetch(`${LMS_API}/admin/lessons/${lessonId}`, { method: "DELETE" });
    showToast("ลบแล้ว");
    reload();
  };

  const setL = (key: string, value: any) =>
    setLessonForm((f) => ({ ...f, [key]: value }));

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  if (!course) return <p className="py-10 text-center text-red-400">ไม่พบคอร์ส</p>;

  const videoEmbed = getVideoEmbed(lessonForm.videoId);

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm text-gray-200">
          {toast}
        </div>
      )}

      {/* Header */}
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-accent">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        คอร์สทั้งหมด
      </Link>
      <h1 className="mb-8 text-2xl font-bold">{course.title}</h1>

      {/* Cover Upload Zone */}
      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-gray-400">รูปปกคอร์ส</h2>
        <p className="mb-3 text-xs text-gray-600">แนะนำ 1200 x 630 px (อัตราส่วน 16:9) ไฟล์ JPG, PNG หรือ WebP ไม่เกิน 2MB</p>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadCover(file);
          }}
        />

        {course.coverUrl ? (
          <div className="relative group">
            <img
              src={course.coverUrl}
              alt="Cover"
              className="h-48 w-full rounded-xl object-cover border border-white/10"
            />
            <div
              className="absolute inset-0 flex items-center justify-center gap-3 rounded-xl bg-black/60 opacity-0 transition group-hover:opacity-100 cursor-pointer"
              onClick={() => coverInputRef.current?.click()}
            >
              <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white">
                เปลี่ยนรูป
              </span>
            </div>
            {uploadingCover && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/70">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
              dragOver
                ? "border-yellow-accent bg-yellow-accent/5"
                : "border-white/20 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
            }`}
            onClick={() => coverInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {uploadingCover ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
            ) : (
              <>
                <svg className="mb-2 h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">ลากรูปมาวางที่นี่ หรือกดเพื่อเลือกไฟล์</p>
                <p className="mt-1 text-xs text-gray-600">1200 x 630 px, สูงสุด 2MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">เนื้อหาคอร์ส</h2>
        <button
          onClick={() => openChapterModal()}
          className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          + เพิ่มบท
        </button>
      </div>

      <div className="space-y-4">
        {course.chapters.map((ch) => (
          <div key={ch.id} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {/* Chapter header */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-medium text-gray-400">
                  {ch.order}
                </span>
                <span className="font-medium">{ch.title}</span>
                <span className="text-xs text-gray-600">{ch.lessons.length} บทเรียน</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openChapterModal(ch)}
                  className="rounded-lg px-3 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteChapter(ch.id, ch.title)}
                  className="rounded-lg px-3 py-1.5 text-xs text-red-400/60 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  ลบ
                </button>
              </div>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-white/5">
              {ch.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-white/[0.03]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs text-gray-600">
                    {lesson.order}
                  </span>

                  {/* Video status indicator */}
                  <span className={`h-2 w-2 shrink-0 rounded-full ${lesson.video_id ? "bg-green-500" : "bg-white/20"}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-200 truncate">{lesson.title}</span>
                      {lesson.is_free && (
                        <span className="shrink-0 rounded bg-yellow-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-accent/80">
                          ฟรี
                        </span>
                      )}
                    </div>
                    {lesson.description && (
                      <p className="mt-0.5 truncate text-xs text-gray-600">{lesson.description}</p>
                    )}
                  </div>

                  <span className="shrink-0 text-xs tabular-nums text-gray-600">
                    {formatDuration(lesson.duration)}
                  </span>

                  <button
                    onClick={() => openLessonModal(ch.id, lesson)}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => deleteLesson(lesson.id, lesson.title)}
                    className="rounded-lg px-3 py-1.5 text-xs text-red-400/60 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>

            {/* Add lesson */}
            <button
              onClick={() => openLessonModal(ch.id)}
              className="w-full border-t border-white/5 px-5 py-2.5 text-left text-sm text-gray-500 transition hover:bg-white/[0.03] hover:text-gray-300"
            >
              + เพิ่มบทเรียน
            </button>
          </div>
        ))}

        {course.chapters.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
            <p className="text-gray-500">ยังไม่มีเนื้อหา</p>
            <p className="mt-1 text-sm text-gray-600">กดปุ่ม "เพิ่มบท" ด้านบนเพื่อเริ่มต้น</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" /> มีวิดีโอ
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" /> ยังไม่มีวิดีโอ
        </span>
      </div>

      {/* === Chapter Modal === */}
      {modal === "chapter" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-5 text-lg font-semibold">
              {editingChapter ? "แก้ไขบท" : "เพิ่มบทใหม่"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ชื่อบท</label>
                <input
                  type="text"
                  placeholder="เช่น บทที่ 1: พื้นฐานการเงิน"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  autoFocus
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ลำดับ</label>
                <input
                  type="number"
                  value={chapterOrder}
                  onChange={(e) => setChapterOrder(Number(e.target.value))}
                  className="w-24 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg px-5 py-2.5 text-sm text-gray-400 transition hover:text-white">
                ยกเลิก
              </button>
              <button
                onClick={saveChapter}
                disabled={!chapterTitle || saving}
                className="rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
              >
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Lesson Modal === */}
      {modal === "lesson" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1C1C1E] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-5 text-lg font-semibold">
              {editingLesson ? "แก้ไขบทเรียน" : "เพิ่มบทเรียน"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ชื่อบทเรียน</label>
                <input
                  type="text"
                  placeholder="เช่น แนะนำคอร์ส"
                  value={lessonForm.title}
                  onChange={(e) => setL("title", e.target.value)}
                  autoFocus
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">คำอธิบาย</label>
                <textarea
                  placeholder="อธิบายสั้นๆ เกี่ยวกับบทเรียนนี้"
                  value={lessonForm.description}
                  onChange={(e) => setL("description", e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">วิดีโอ URL</label>
                <input
                  type="text"
                  placeholder="วาง YouTube URL หรือลิงก์วิดีโอ"
                  value={lessonForm.videoId}
                  onChange={(e) => setL("videoId", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none"
                />
                {/* Video Preview */}
                {videoEmbed && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                    {videoEmbed.type === "youtube" ? (
                      <iframe
                        src={videoEmbed.src}
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video src={videoEmbed.src} controls className="aspect-video w-full" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">ความยาว (นาที)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={lessonForm.durationMin}
                    onChange={(e) => setL("durationMin", Number(e.target.value))}
                    className="w-28 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">ลำดับ</label>
                  <input
                    type="number"
                    min="1"
                    value={lessonForm.order}
                    onChange={(e) => setL("order", Number(e.target.value))}
                    className="w-24 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 cursor-pointer transition hover:bg-white/[0.04]">
                <input
                  type="checkbox"
                  checked={lessonForm.isFree}
                  onChange={(e) => setL("isFree", e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-white/5"
                />
                <div>
                  <span className="text-sm text-gray-200">เปิดให้ดูฟรี</span>
                  <p className="text-xs text-gray-500">ผู้ที่ยังไม่ได้ซื้อคอร์สสามารถดูบทเรียนนี้ได้</p>
                </div>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg px-5 py-2.5 text-sm text-gray-400 transition hover:text-white">
                ยกเลิก
              </button>
              <button
                onClick={saveLesson}
                disabled={!lessonForm.title || saving}
                className="rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
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
