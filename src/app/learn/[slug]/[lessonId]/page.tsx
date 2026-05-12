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

interface SiblingLesson {
  id: string;
  title: string;
}

interface CourseNav {
  lessons: { id: string; title: string; chapter_id: string }[];
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

  // Navigation: prev/next lessons
  const [prevLesson, setPrevLesson] = useState<SiblingLesson | null>(null);
  const [nextLesson, setNextLesson] = useState<SiblingLesson | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) return;

    const email = session.user.email;

    // Fetch lesson detail
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

    // Fetch course overview for prev/next navigation
    fetch(`${LMS_API}/learn/courses/${slug}`, {
      headers: { "x-user-email": email },
    })
      .then((res) => res.json())
      .then((course) => {
        const allLessons: { id: string; title: string }[] = [];
        course.chapters?.forEach((ch: any) => {
          ch.lessons?.forEach((l: any) => {
            allLessons.push({ id: l.id, title: l.title });
          });
        });

        const idx = allLessons.findIndex((l) => l.id === lessonId);
        setPrevLesson(idx > 0 ? allLessons[idx - 1] : null);
        setNextLesson(idx < allLessons.length - 1 ? allLessons[idx + 1] : null);

        // Check if current lesson is completed
        const currentChapter = course.chapters?.find((ch: any) =>
          ch.lessons?.some((l: any) => l.id === lessonId)
        );
        const currentLesson = currentChapter?.lessons?.find(
          (l: any) => l.id === lessonId
        );
        if (currentLesson?.completed) setCompleted(true);
      })
      .catch(() => {});
  }, [slug, lessonId, session?.user?.email, status]);

  const handleMarkComplete = async () => {
    if (!session?.user?.email) return;
    setMarking(true);
    try {
      const res = await fetch(`${LMS_API}/learn/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": session.user.email,
        },
        body: JSON.stringify({ lessonId, completed: true }),
      });
      if (res.ok) {
        setCompleted(true);
        // Auto-navigate to next lesson after short delay
        if (nextLesson) {
          setTimeout(() => router.push(`/learn/${slug}/${nextLesson.id}`), 800);
        }
      }
    } catch {
      // silent fail
    } finally {
      setMarking(false);
    }
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
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <p className="text-red-400">{error || "ไม่พบบทเรียน"}</p>
        <Link
          href={`/learn/${slug}`}
          className="mt-4 inline-block text-sm text-yellow-accent hover:underline"
        >
          กลับหน้าคอร์ส
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Back to course */}
      <Link
        href={`/learn/${slug}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-accent"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        กลับหน้าคอร์ส
      </Link>

      {/* Video Player (only for video type or if videoUrl exists) */}
      {(lesson.type === "video" || lesson.videoUrl) && (
        <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {lesson.videoUrl && lesson.videoUrl.match(/youtube\.com|youtu\.be/) ? (
            <iframe
              src={`https://www.youtube.com/embed/${lesson.videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : lesson.videoUrl ? (
            <video src={lesson.videoUrl} controls className="h-full w-full" controlsList="nodownload" />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p className="text-sm">วิดีโอกำลังเตรียมพร้อม</p>
            </div>
          )}
        </div>
      )}

      {/* Lesson Info */}
      <h1 className="mb-2 text-xl font-bold">{lesson.title}</h1>
      {lesson.description && (
        <p className="mb-4 text-sm text-gray-400">{lesson.description}</p>
      )}

      {/* Text Content (for text type) */}
      {lesson.type === "text" && lesson.content && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
          {lesson.content}
        </div>
      )}

      {/* Attachments */}
      {lesson.attachments && lesson.attachments.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium text-gray-400">ไฟล์ประกอบการเรียน</h3>
          <div className="space-y-2">
            {lesson.attachments.map((att) => (
              <a
                key={att.id}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
              >
                <svg className="h-5 w-5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="flex-1 truncate text-sm text-gray-200">{att.name}</span>
                <span className="text-xs text-gray-500">ดาวน์โหลด</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mark Complete */}
      <div className="mb-6">
        {completed ? (
          <div className="flex items-center gap-2 rounded-xl border border-yellow-accent/20 bg-yellow-accent/5 px-4 py-3">
            <svg className="h-5 w-5 text-yellow-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-yellow-accent">เรียนจบแล้ว</span>
          </div>
        ) : (
          <button
            onClick={handleMarkComplete}
            disabled={marking}
            className="w-full rounded-xl bg-yellow-accent py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
          >
            {marking ? "กำลังบันทึก..." : "เรียนจบบทนี้แล้ว"}
          </button>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${slug}/${prevLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:border-white/20 hover:text-gray-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="max-w-[150px] truncate">{prevLesson.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/learn/${slug}/${nextLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-400 transition hover:border-white/20 hover:text-gray-200"
          >
            <span className="max-w-[150px] truncate">{nextLesson.title}</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
