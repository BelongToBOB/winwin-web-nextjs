"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface Attachment { id: string; file_url: string; file_name: string; file_size: number; }
interface Lesson {
  id: string; chapter_id: string; title: string; description: string | null;
  video_id: string | null; duration: number; order: number; is_free: boolean;
  type: string; content: string | null;
}
interface Chapter { id: string; title: string; order: number; lessons: Lesson[]; }
interface CourseContent {
  id: string; slug: string; title: string; description: string | null;
  coverUrl: string | null; is_active: boolean; price: string; chapters: Chapter[];
}
interface Student {
  id: string; email: string; first_name: string; last_name: string;
  customer_code: string; status: string; enrolled_at: string | null;
  display_name: string | null; completed_lessons: number;
}

function minutesToSeconds(min: number) { return Math.round(min * 60); }
function secondsToMinutes(sec: number) { return Math.round((sec / 60) * 10) / 10; }
function formatDuration(s: number) { const m = Math.floor(s / 60); return `${m}:${(s % 60).toString().padStart(2, "0")}`; }
function formatBytes(b: number) { if (b < 1024) return b + " B"; if (b < 1048576) return (b / 1024).toFixed(0) + " KB"; return (b / 1048576).toFixed(1) + " MB"; }
function getYoutubeId(url: string) { return url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]; }

const LESSON_TYPES = [
  { value: "video", label: "วิดีโอ" },
  { value: "text", label: "บทความ" },
  { value: "file", label: "ไฟล์/เอกสาร" },
];

export default function CourseEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState<"content" | "students">("content");

  // Course info
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [savingInfo, setSavingInfo] = useState(false);

  // Cover
  const coverRef = useRef<HTMLInputElement>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Students
  const [students, setStudents] = useState<Student[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [enrollEmail, setEnrollEmail] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  // Modals
  const [modal, setModal] = useState<"chapter" | "lesson" | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [forChapterId, setForChapterId] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterOrder, setChapterOrder] = useState(0);
  const [lessonForm, setLessonForm] = useState({ title: "", description: "", videoId: "", durationMin: 0, order: 0, isFree: false, type: "video", content: "" });
  const [lessonAttachments, setLessonAttachments] = useState<Attachment[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const setL = (key: string, value: any) => setLessonForm((f) => ({ ...f, [key]: value }));

  const reload = useCallback(() => {
    fetch(`${LMS_API}/admin/courses/${id}/content`).then(r => r.json()).then(d => {
      setCourse(d);
      setCourseTitle(d.title || "");
      setCourseDesc(d.description || "");
      setCoursePrice(Number(d.price) || 0);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const loadStudents = useCallback(() => {
    setStudentsLoading(true);
    fetch(`${LMS_API}/admin/courses/${id}/students`).then(r => r.json()).then(d => {
      setStudents(d.students || []);
      setTotalLessons(d.totalLessons || 0);
    }).catch(() => {}).finally(() => setStudentsLoading(false));
  }, [id]);

  useEffect(() => { reload(); }, [reload]);
  useEffect(() => { if (tab === "students") loadStudents(); }, [tab, loadStudents]);

  // === Course Info ===
  const saveCourseInfo = async () => {
    setSavingInfo(true);
    await fetch(`${LMS_API}/admin/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: courseTitle, description: courseDesc, price: coursePrice }),
    });
    setSavingInfo(false);
    show("บันทึกข้อมูลคอร์สแล้ว");
    reload();
  };

  // === Cover ===
  const uploadCover = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) { show("ไฟล์ใหญ่เกิน 2MB"); return; }
    setUploadingCover(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const r = await fetch(`${LMS_API}/admin/upload`, { method: "POST", body: fd });
      const { url } = await r.json();
      await fetch(`${LMS_API}/admin/courses/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ coverUrl: `https://checkout.winwinwealth.co${url}` }) });
      show("บันทึกรูปปกแล้ว"); reload();
    } catch { show("อัพโหลดไม่สำเร็จ"); }
    finally { setUploadingCover(false); }
  };

  // === Publish/Draft ===
  const togglePublish = async () => {
    if (!course) return;
    const next = !course.is_active;
    await fetch(`${LMS_API}/admin/courses/${id}/publish`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: next }) });
    show(next ? "เผยแพร่คอร์สแล้ว" : "ซ่อนคอร์สแล้ว (Draft)");
    reload();
  };

  // === Chapter ===
  const openChapter = (ch?: Chapter) => {
    setEditingChapter(ch || null); setChapterTitle(ch?.title || ""); setChapterOrder(ch?.order || (course?.chapters.length ?? 0) + 1); setModal("chapter");
  };
  const saveChapter = async () => {
    setSaving(true);
    if (editingChapter) await fetch(`${LMS_API}/admin/chapters/${editingChapter.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: chapterTitle, order: chapterOrder }) });
    else await fetch(`${LMS_API}/admin/chapters`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: id, title: chapterTitle, order: chapterOrder }) });
    setSaving(false); setModal(null); show("บันทึกแล้ว"); reload();
  };
  const deleteChapter = async (chId: string, title: string) => {
    if (!confirm(`ลบ "${title}" และบทเรียนทั้งหมด?`)) return;
    await fetch(`${LMS_API}/admin/chapters/${chId}`, { method: "DELETE" }); show("ลบแล้ว"); reload();
  };

  // === Lesson ===
  const openLesson = (chapterId: string, lesson?: Lesson) => {
    setForChapterId(chapterId); setEditingLesson(lesson || null);
    const chLessons = course?.chapters.find(c => c.id === chapterId)?.lessons || [];
    setLessonForm({ title: lesson?.title || "", description: lesson?.description || "", videoId: lesson?.video_id || "", durationMin: lesson ? secondsToMinutes(lesson.duration) : 0, order: lesson?.order || chLessons.length + 1, isFree: lesson?.is_free || false, type: lesson?.type || "video", content: lesson?.content || "" });
    setLessonAttachments([]);
    if (lesson) {
      // Load attachments
      fetch(`${LMS_API}/learn/lessons/${lesson.id}`, { headers: { "x-user-email": "admin" } })
        .then(r => r.ok ? r.json() : null).then(d => { if (d?.attachments) setLessonAttachments(d.attachments.map((a: any) => ({ id: a.id, file_url: a.url, file_name: a.name, file_size: a.size }))); }).catch(() => {});
    }
    setModal("lesson");
  };
  const saveLesson = async () => {
    setSaving(true);
    const payload = { title: lessonForm.title, description: lessonForm.description || null, videoId: lessonForm.videoId || null, duration: minutesToSeconds(lessonForm.durationMin), order: lessonForm.order, isFree: lessonForm.isFree, type: lessonForm.type, content: lessonForm.content || null };
    if (editingLesson) await fetch(`${LMS_API}/admin/lessons/${editingLesson.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    else await fetch(`${LMS_API}/admin/lessons`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, chapterId: forChapterId, courseId: id }) });
    setSaving(false); setModal(null); show("บันทึกแล้ว"); reload();
  };
  const deleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`ลบบทเรียน "${title}"?`)) return;
    await fetch(`${LMS_API}/admin/lessons/${lessonId}`, { method: "DELETE" }); show("ลบแล้ว"); reload();
  };

  // === Attachments ===
  const uploadAttachment = async (file: File) => {
    if (!editingLesson) return;
    setUploadingFile(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const r = await fetch(`${LMS_API}/admin/upload`, { method: "POST", body: fd });
      const { url } = await r.json();
      const fullUrl = `https://checkout.winwinwealth.co${url}`;
      const att = await fetch(`${LMS_API}/admin/lessons/${editingLesson.id}/attachments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileUrl: fullUrl, fileName: file.name, fileSize: file.size }) }).then(r => r.json());
      setLessonAttachments(prev => [...prev, { id: att.id, file_url: att.file_url, file_name: att.file_name, file_size: att.file_size }]);
      show("เพิ่มไฟล์แล้ว");
    } catch { show("อัพโหลดไม่สำเร็จ"); }
    finally { setUploadingFile(false); }
  };
  const removeAttachment = async (attId: string) => {
    await fetch(`${LMS_API}/admin/attachments/${attId}`, { method: "DELETE" });
    setLessonAttachments(prev => prev.filter(a => a.id !== attId));
    show("ลบไฟล์แล้ว");
  };

  // === Video Upload ===
  const uploadVideo = async (file: File) => {
    setUploadingVideo(true);
    setVideoProgress(0);
    try {
      // 1. Create video on Bunny
      const createRes = await fetch(`${LMS_API}/admin/video/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: lessonForm.title || file.name }),
      });
      const videoData = await createRes.json();

      // 2. Upload file directly to Bunny
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `https://video.bunnycdn.com/library/659470/videos/${videoData.videoId}`, true);
      xhr.setRequestHeader("AccessKey", "e03fd3d9-f4a9-4aee-8bb6976287e1-32bf-4166");
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setVideoProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setL("videoId", videoData.iframeUrl);
          show("อัพโหลดวิดีโอสำเร็จ รอ Bunny ประมวลผลสักครู่");
        } else {
          show("อัพโหลดวิดีโอไม่สำเร็จ");
        }
        setUploadingVideo(false);
      };
      xhr.onerror = () => { show("อัพโหลดวิดีโอไม่สำเร็จ"); setUploadingVideo(false); };
      xhr.send(file);
    } catch {
      show("อัพโหลดวิดีโอไม่สำเร็จ");
      setUploadingVideo(false);
    }
  };

  // === Enroll ===
  const handleEnroll = async () => {
    if (!enrollEmail) return;
    setEnrolling(true);
    const res = await fetch(`${LMS_API}/admin/courses/${id}/enroll`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: enrollEmail }) });
    const data = await res.json();
    show(data.success ? "เพิ่มนักเรียนแล้ว" : data.message || "ไม่สำเร็จ");
    setEnrollEmail(""); setEnrolling(false); loadStudents();
  };
  const handleUnenroll = async (regId: string, email: string) => {
    if (!confirm(`ยกเลิกการลงทะเบียนของ ${email}?`)) return;
    await fetch(`${LMS_API}/admin/courses/${id}/unenroll`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ registrationId: regId }) });
    show("ยกเลิกแล้ว"); loadStudents();
  };

  if (loading) return <div className="flex min-h-[40vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" /></div>;
  if (!course) return <p className="py-10 text-center text-red-400">ไม่พบคอร์ส</p>;

  const ytId = getYoutubeId(lessonForm.videoId);

  return (
    <div>
      {toast && <div className="fixed top-4 right-4 z-50 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm text-gray-200">{toast}</div>}

      {/* Header */}
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-accent">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        คอร์สทั้งหมด
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{course.slug}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${course.is_active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-gray-400"}`}>
            {course.is_active ? "เผยแพร่แล้ว" : "Draft"}
          </span>
          <button onClick={togglePublish} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${course.is_active ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-green-600 text-white hover:bg-green-500"}`}>
            {course.is_active ? "ซ่อนคอร์ส" : "เผยแพร่คอร์ส"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-white/10">
        {([["content", "เนื้อหา"], ["students", "นักเรียน"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${tab === key ? "border-yellow-accent text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            {label}
            {key === "students" && students.length > 0 && <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{students.length}</span>}
          </button>
        ))}
      </div>

      {/* ====== CONTENT TAB ====== */}
      {tab === "content" && (
        <>
          {/* Cover */}
          <div className="mb-8">
            <h2 className="mb-2 text-sm font-medium text-gray-400">รูปปก</h2>
            <p className="mb-3 text-xs text-gray-600">แนะนำ 1200 x 630 px, JPG/PNG/WebP, ไม่เกิน 2MB</p>
            <input ref={coverRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => { if (e.target.files?.[0]) uploadCover(e.target.files[0]); }} />
            {course.coverUrl ? (
              <div className="relative group">
                <img src={course.coverUrl} alt="" className="w-full rounded-xl border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 opacity-0 transition group-hover:opacity-100 cursor-pointer" onClick={() => coverRef.current?.click()}>
                  <span className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white">เปลี่ยนรูป</span>
                </div>
                {uploadingCover && <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/70"><div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" /></div>}
              </div>
            ) : (
              <div className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${dragOver ? "border-yellow-accent bg-yellow-accent/5" : "border-white/20 bg-white/[0.02] hover:border-white/30"}`}
                onClick={() => coverRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) uploadCover(e.dataTransfer.files[0]); }}>
                {uploadingCover ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" /> : (
                  <><svg className="mb-2 h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-sm text-gray-500">ลากรูปมาวางที่นี่ หรือกดเพื่อเลือกไฟล์</p></>
                )}
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="mb-4 text-sm font-medium text-gray-400">ข้อมูลคอร์ส</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">ชื่อคอร์ส</label>
                <input type="text" value={courseTitle} onChange={e => setCourseTitle(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">คำอธิบาย</label>
                <textarea value={courseDesc} onChange={e => setCourseDesc(e.target.value)} rows={2}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none resize-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">ราคา (บาท)</label>
                <input type="number" min="0" value={coursePrice} onChange={e => setCoursePrice(Number(e.target.value))}
                  className="w-36 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" />
              </div>
              <button onClick={saveCourseInfo} disabled={savingInfo}
                className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-50">
                {savingInfo ? "กำลังบันทึก..." : "บันทึกข้อมูลคอร์ส"}
              </button>
            </div>
          </div>

          {/* Chapters + Lessons */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">เนื้อหาคอร์ส</h2>
            <button onClick={() => openChapter()} className="rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300">+ เพิ่มบท</button>
          </div>
          <div className="space-y-4">
            {course.chapters.map(ch => (
              <div key={ch.id} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-medium text-gray-400">{ch.order}</span>
                    <span className="font-medium">{ch.title}</span>
                    <span className="text-xs text-gray-600">{ch.lessons.length} บทเรียน</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openChapter(ch)} className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white">แก้ไข</button>
                    <button onClick={() => deleteChapter(ch.id, ch.title)} className="rounded-lg px-3 py-1.5 text-xs text-red-400/60 hover:bg-red-500/10 hover:text-red-400">ลบ</button>
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {ch.lessons.map(lesson => {
                    const typeLabel = LESSON_TYPES.find(t => t.value === lesson.type)?.label || lesson.type;
                    return (
                      <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03]">
                        <span className="w-6 text-center text-xs text-gray-600">{lesson.order}</span>
                        <span className={`h-2 w-2 shrink-0 rounded-full ${lesson.video_id ? "bg-green-500" : lesson.type === "text" ? "bg-blue-400" : lesson.type === "file" ? "bg-orange-400" : "bg-white/20"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-200 truncate">{lesson.title}</span>
                            <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">{typeLabel}</span>
                            {lesson.is_free && <span className="shrink-0 rounded bg-yellow-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-accent/80">ฟรี</span>}
                          </div>
                        </div>
                        <span className="text-xs tabular-nums text-gray-600">{formatDuration(lesson.duration)}</span>
                        <button onClick={() => openLesson(ch.id, lesson)} className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white">แก้ไข</button>
                        <button onClick={() => deleteLesson(lesson.id, lesson.title)} className="rounded-lg px-3 py-1.5 text-xs text-red-400/60 hover:bg-red-500/10 hover:text-red-400">ลบ</button>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => openLesson(ch.id)} className="w-full border-t border-white/5 px-5 py-2.5 text-left text-sm text-gray-500 hover:bg-white/[0.03] hover:text-gray-300">+ เพิ่มบทเรียน</button>
              </div>
            ))}
            {course.chapters.length === 0 && <div className="rounded-xl border border-dashed border-white/10 py-16 text-center"><p className="text-gray-500">ยังไม่มีเนื้อหา</p></div>}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-500" /> วิดีโอ</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-400" /> บทความ</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orange-400" /> ไฟล์</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /> ยังไม่มีเนื้อหา</span>
          </div>
        </>
      )}

      {/* ====== STUDENTS TAB ====== */}
      {tab === "students" && (
        <>
          {/* Enroll new */}
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-400">เพิ่มนักเรียน</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="อีเมลนักเรียน" value={enrollEmail} onChange={e => setEnrollEmail(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none" />
              <button onClick={handleEnroll} disabled={!enrollEmail || enrolling}
                className="rounded-lg bg-yellow-accent px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50 hover:bg-yellow-300">
                {enrolling ? "..." : "เพิ่ม"}
              </button>
            </div>
          </div>

          {/* Students list */}
          {studentsLoading ? (
            <div className="flex py-10 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" /></div>
          ) : students.length === 0 ? (
            <p className="py-10 text-center text-gray-500">ยังไม่มีนักเรียน</p>
          ) : (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">ชื่อ / อีเมล</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">รหัส</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">ความคืบหน้า</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">สถานะ</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map(s => {
                    const pct = totalLessons > 0 ? Math.round((s.completed_lessons / totalLessons) * 100) : 0;
                    return (
                      <tr key={s.id} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <div className="text-gray-200">{s.display_name || `${s.first_name} ${s.last_name}`.trim() || s.email}</div>
                          <div className="text-xs text-gray-500">{s.email}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.customer_code}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full rounded-full bg-yellow-accent" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs tabular-nums text-gray-500">{s.completed_lessons}/{totalLessons}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${s.status === "ACTIVE" ? "bg-green-500/15 text-green-400" : s.status === "VIP_GRANT" ? "bg-orange-500/15 text-orange-400" : "bg-white/10 text-gray-400"}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleUnenroll(s.id, s.email)} className="text-xs text-red-400/60 hover:text-red-400">ยกเลิก</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ====== CHAPTER MODAL ====== */}
      {modal === "chapter" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1C1E] p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-5 text-lg font-semibold">{editingChapter ? "แก้ไขบท" : "เพิ่มบทใหม่"}</h3>
            <div className="space-y-4">
              <div><label className="mb-1.5 block text-sm text-gray-400">ชื่อบท</label>
                <input type="text" placeholder="เช่น บทที่ 1: พื้นฐานการเงิน" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} autoFocus
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none" /></div>
              <div><label className="mb-1.5 block text-sm text-gray-400">ลำดับ</label>
                <input type="number" value={chapterOrder} onChange={e => setChapterOrder(Number(e.target.value))}
                  className="w-24 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" /></div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg px-5 py-2.5 text-sm text-gray-400 hover:text-white">ยกเลิก</button>
              <button onClick={saveChapter} disabled={!chapterTitle || saving} className="rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50 hover:bg-yellow-300">{saving ? "กำลังบันทึก..." : "บันทึก"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ====== LESSON MODAL ====== */}
      {modal === "lesson" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1C1C1E] p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-5 text-lg font-semibold">{editingLesson ? "แก้ไขบทเรียน" : "เพิ่มบทเรียน"}</h3>
            <div className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">ประเภท</label>
                <div className="flex gap-2">
                  {LESSON_TYPES.map(t => (
                    <button key={t.value} onClick={() => setL("type", t.value)}
                      className={`rounded-lg px-4 py-2 text-sm transition ${lessonForm.type === t.value ? "bg-yellow-accent text-black font-medium" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div><label className="mb-1.5 block text-sm text-gray-400">ชื่อบทเรียน</label>
                <input type="text" placeholder="เช่น แนะนำคอร์ส" value={lessonForm.title} onChange={e => setL("title", e.target.value)} autoFocus
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none" /></div>

              <div><label className="mb-1.5 block text-sm text-gray-400">คำอธิบาย</label>
                <textarea placeholder="อธิบายสั้นๆ" value={lessonForm.description} onChange={e => setL("description", e.target.value)} rows={2}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none resize-none" /></div>

              {/* Video field */}
              {lessonForm.type === "video" && (
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">วิดีโอ</label>
                  <input ref={videoInputRef} type="file" accept="video/*" className="hidden"
                    onChange={e => { if (e.target.files?.[0]) uploadVideo(e.target.files[0]); }} />

                  {/* Current video preview */}
                  {lessonForm.videoId && lessonForm.videoId.includes("mediadelivery.net") ? (
                    <div className="mb-3">
                      <iframe src={lessonForm.videoId} className="aspect-video w-full rounded-lg border border-white/10" allowFullScreen
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" />
                    </div>
                  ) : lessonForm.videoId && ytId ? (
                    <div className="mb-3">
                      <iframe src={`https://www.youtube.com/embed/${ytId}`} className="aspect-video w-full rounded-lg border border-white/10" allowFullScreen />
                    </div>
                  ) : lessonForm.videoId ? (
                    <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-400 break-all">
                      {lessonForm.videoId}
                    </div>
                  ) : null}

                  {/* Upload progress */}
                  {uploadingVideo && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>กำลังอัพโหลด...</span>
                        <span>{videoProgress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-yellow-accent transition-all" style={{ width: `${videoProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button type="button" onClick={() => videoInputRef.current?.click()} disabled={uploadingVideo}
                      className="flex-1 rounded-lg border border-dashed border-white/20 px-4 py-2.5 text-sm text-gray-400 transition hover:border-white/30 hover:text-gray-300 disabled:opacity-50">
                      {uploadingVideo ? "กำลังอัพโหลด..." : lessonForm.videoId ? "เปลี่ยนวิดีโอ" : "อัพโหลดวิดีโอ"}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-600">หรือวาง URL ด้านล่าง (YouTube, Bunny Stream, direct link)</p>
                  <input type="text" placeholder="วาง URL วิดีโอ" value={lessonForm.videoId} onChange={e => setL("videoId", e.target.value)}
                    className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-gray-300 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none font-mono" />
                </div>
              )}

              {/* Text content */}
              {lessonForm.type === "text" && (
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">เนื้อหาบทความ</label>
                  <textarea value={lessonForm.content} onChange={e => setL("content", e.target.value)} rows={8} placeholder="เขียนเนื้อหาบทเรียนที่นี่..."
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-yellow-accent/40 focus:outline-none resize-y" />
                </div>
              )}

              {/* File attachments — all types */}
              <div>
                <label className="mb-1.5 block text-sm text-gray-400">
                  {lessonForm.type === "file" ? "ไฟล์หลัก" : "ไฟล์แนบ"}
                </label>
                <input ref={fileInputRef} type="file" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // If new lesson, save first then upload
                  if (!editingLesson) {
                    setSaving(true);
                    const payload = { title: lessonForm.title || file.name, description: lessonForm.description || null, videoId: lessonForm.videoId || null, duration: minutesToSeconds(lessonForm.durationMin), order: lessonForm.order, isFree: lessonForm.isFree, type: lessonForm.type, content: lessonForm.content || null, chapterId: forChapterId, courseId: id };
                    const res = await fetch(`${LMS_API}/admin/lessons`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                    const created = await res.json();
                    setSaving(false);
                    if (!created.id) { show("สร้างบทเรียนไม่สำเร็จ"); return; }
                    setEditingLesson({ ...created, chapter_id: forChapterId, description: null, video_id: null, duration: 0, is_free: false, type: lessonForm.type, content: null } as any);
                    // Now upload attachment to the new lesson
                    setUploadingFile(true);
                    const fd = new FormData(); fd.append("file", file);
                    const upRes = await fetch(`${LMS_API}/admin/upload`, { method: "POST", body: fd });
                    const { url } = await upRes.json();
                    const fullUrl = `https://checkout.winwinwealth.co${url}`;
                    const att = await fetch(`${LMS_API}/admin/lessons/${created.id}/attachments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileUrl: fullUrl, fileName: file.name, fileSize: file.size }) }).then(r => r.json());
                    setLessonAttachments([{ id: att.id, file_url: att.file_url, file_name: att.file_name, file_size: att.file_size }]);
                    setUploadingFile(false);
                    show("สร้างบทเรียนและอัพโหลดไฟล์แล้ว");
                    reload();
                  } else {
                    uploadAttachment(file);
                  }
                }} />
                {lessonAttachments.length > 0 && (
                  <div className="mb-2 space-y-1.5">
                    {lessonAttachments.map(att => (
                      <div key={att.id} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
                        <svg className="h-4 w-4 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        <span className="flex-1 truncate text-sm text-gray-300">{att.file_name}</span>
                        <span className="text-xs text-gray-600">{formatBytes(att.file_size)}</span>
                        <button onClick={() => removeAttachment(att.id)} className="text-xs text-red-400/60 hover:text-red-400">ลบ</button>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => fileInputRef.current?.click()} disabled={uploadingFile || saving}
                  className={`rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-gray-500 hover:border-white/30 hover:text-gray-300 disabled:opacity-50 ${lessonForm.type === "file" ? "w-full" : ""}`}>
                  {uploadingFile ? "กำลังอัพโหลด..." : saving ? "กำลังสร้างบทเรียน..." : lessonAttachments.length > 0 ? "+ เพิ่มไฟล์" : "+ อัพโหลดไฟล์ (PDF, เอกสาร, รูปภาพ สูงสุด 20MB)"}
                </button>
              </div>

              <div className="flex gap-4">
                {lessonForm.type !== "file" && (
                  <div><label className="mb-1.5 block text-sm text-gray-400">{lessonForm.type === "text" ? "เวลาอ่าน (นาที)" : "ความยาว (นาที)"}</label>
                    <input type="number" step="0.5" min="0" value={lessonForm.durationMin} onChange={e => setL("durationMin", Number(e.target.value))}
                      className="w-28 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" /></div>
                )}
                <div><label className="mb-1.5 block text-sm text-gray-400">ลำดับ</label>
                  <input type="number" min="1" value={lessonForm.order} onChange={e => setL("order", Number(e.target.value))}
                    className="w-24 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-200 focus:border-yellow-accent/40 focus:outline-none" /></div>
              </div>

              <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 cursor-pointer hover:bg-white/[0.04]">
                <input type="checkbox" checked={lessonForm.isFree} onChange={e => setL("isFree", e.target.checked)} className="h-4 w-4 rounded" />
                <div><span className="text-sm text-gray-200">เปิดให้ดูฟรี</span><p className="text-xs text-gray-500">ผู้ที่ยังไม่ได้ซื้อคอร์สสามารถดูบทเรียนนี้ได้</p></div>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-lg px-5 py-2.5 text-sm text-gray-400 hover:text-white">ยกเลิก</button>
              <button onClick={saveLesson} disabled={!lessonForm.title || saving} className="rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50 hover:bg-yellow-300">{saving ? "กำลังบันทึก..." : "บันทึก"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
