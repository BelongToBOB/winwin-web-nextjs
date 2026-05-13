"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface LessonDetail {
  id: string;
  chapterId: string;
  courseId: string;
  title: string;
  description: string | null;
  type: string;
  content: string | null;
  videoUrl: string | null;
  duration: number;
  order: number;
  isFree: boolean;
  attachments: { id: string; url: string; name: string; size: number }[];
}

function formatBytes(b: number) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(0) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) return;
    setLoading(true);
    setCompleted(false);

    const email = session.user.email;

    fetch(`${LMS_API}/learn/lessons/${lessonId}`, {
      headers: { "x-user-email": email },
    })
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถโหลดบทเรียนได้");
        return res.json();
      })
      .then(setLesson)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // Get next lesson for auto-advance
    fetch(`${LMS_API}/learn/courses/${slug}`, { headers: { "x-user-email": email } })
      .then((r) => r.json())
      .then((course) => {
        const all: { id: string; completed: boolean }[] = [];
        course.chapters?.forEach((ch: any) => ch.lessons?.forEach((l: any) => all.push({ id: l.id, completed: l.completed })));
        const idx = all.findIndex((l) => l.id === lessonId);
        setNextLessonId(idx < all.length - 1 ? all[idx + 1].id : null);
        if (all[idx]?.completed) setCompleted(true);
      })
      .catch(() => {});
  }, [slug, lessonId, session?.user?.email, status]);

  const handleMarkComplete = async () => {
    if (!session?.user?.email) return;
    setMarking(true);
    try {
      const res = await fetch(`${LMS_API}/learn/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-email": session.user.email },
        body: JSON.stringify({ lessonId, completed: true }),
      });
      if (res.ok) {
        setCompleted(true);
        if (nextLessonId) {
          setTimeout(() => router.push(`/learn/${slug}/${nextLessonId}`), 600);
        }
      }
    } catch {} finally { setMarking(false); }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{error || "ไม่พบบทเรียน"}</p>
          <Link href={`/learn/${slug}`} className="mt-3 inline-block text-sm text-yellow-accent hover:underline">กลับหน้าคอร์ส</Link>
        </div>
      </div>
    );
  }

  const ytMatch = lesson.videoUrl?.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

  return (
    <div className="flex flex-col h-full">
      {/* Video / Content Area */}
      {(lesson.type === "video" || lesson.videoUrl) && (
        <div className="w-full bg-[#0A0A0A]">
          <div className="mx-auto max-w-5xl">
            <div className="aspect-video w-full overflow-hidden">
              {lesson.videoUrl?.includes("mediadelivery.net") ? (
                <iframe
                  src={lesson.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : ytMatch ? (
                <iframe
                  src={`https://www.youtube.com/embed/${ytMatch[1]}?rel=0`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : lesson.videoUrl ? (
                <video src={lesson.videoUrl} controls className="h-full w-full" controlsList="nodownload" />
              ) : (
                <div className="flex h-full items-center justify-center bg-white/[0.02] text-gray-600">
                  <p className="text-sm">วิดีโอกำลังเตรียมพร้อม</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lesson Info */}
      <div className="mx-auto w-full max-w-3xl px-6 py-6">
        {/* Title + Mark complete */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold leading-snug">{lesson.title}</h1>
            {lesson.description && (
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{lesson.description}</p>
            )}
          </div>

          {/* Compact complete button */}
          {completed ? (
            <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-yellow-accent/10 px-3 py-1.5">
              <svg className="h-4 w-4 text-yellow-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-yellow-accent">เรียนแล้ว</span>
            </div>
          ) : (
            <button
              onClick={handleMarkComplete}
              disabled={marking}
              className="shrink-0 rounded-lg bg-yellow-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >
              {marking ? "..." : "เรียนจบแล้ว"}
            </button>
          )}
        </div>

        <div className="h-px bg-white/10 mb-5" />

        {/* Text content */}
        {lesson.type === "text" && lesson.content && (
          <div className="mb-6 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
            {lesson.content}
          </div>
        )}

        {/* Attachments */}
        {lesson.attachments && lesson.attachments.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-400">ไฟล์ประกอบการเรียน</h3>
            <div className="space-y-2">
              {lesson.attachments.map((att) => (
                <a
                  key={att.id}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.05]"
                >
                  <svg className="h-5 w-5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate text-sm text-gray-200">{att.name}</span>
                    <span className="text-[11px] text-gray-600">{formatBytes(att.size)}</span>
                  </div>
                  <span className="shrink-0 rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-400 transition hover:bg-white/10">
                    ดาวน์โหลด
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
