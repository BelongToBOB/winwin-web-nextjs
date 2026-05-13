"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  order: number;
  is_free: boolean;
  completed: boolean;
  type: string;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  chapters: Chapter[];
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: session, status } = useSession();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) return;

    fetch(`${LMS_API}/learn/courses/${slug}`, {
      headers: { "x-user-email": session.user.email },
    })
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลคอร์สได้");
        return res.json();
      })
      .then(setCourse)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, session?.user?.email, status]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{error || "ไม่พบคอร์ส"}</p>
          <Link href="/learn" className="mt-3 inline-block text-sm text-yellow-accent hover:underline">กลับหน้าหลัก</Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.filter((l) => l.completed).length, 0);
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find first incomplete lesson for "continue" button
  let continueLesson: { id: string; title: string } | null = null;
  for (const ch of course.chapters) {
    for (const l of ch.lessons) {
      if (!l.completed) { continueLesson = { id: l.id, title: l.title }; break; }
    }
    if (continueLesson) break;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Cover */}
      {course.coverUrl && (
        <img src={course.coverUrl} alt="" className="mb-6 w-full rounded-xl" />
      )}

      {/* Header */}
      <h1 className="mb-2 text-2xl font-bold">{course.title}</h1>
      {course.description && (
        <p className="mb-5 text-sm text-gray-400 leading-relaxed">{course.description}</p>
      )}

      {/* Progress + Continue */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">
            เรียนแล้ว {completedLessons} จาก {totalLessons} บทเรียน
          </span>
          <span className="text-sm font-semibold text-yellow-accent">{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10 mb-4">
          <div className="h-full rounded-full bg-yellow-accent transition-all" style={{ width: `${percent}%` }} />
        </div>
        {continueLesson && (
          <Link
            href={`/learn/${slug}/${continueLesson.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
          >
            {completedLessons === 0 ? "เริ่มเรียน" : "เรียนต่อ"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
        {!continueLesson && totalLessons > 0 && (
          <div className="flex items-center gap-2 text-sm text-yellow-accent">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            เรียนจบครบทุกบทแล้ว
          </div>
        )}
      </div>

      {/* Chapters */}
      <h2 className="mb-4 text-lg font-semibold">เนื้อหาทั้งหมด</h2>
      <div className="space-y-5">
        {course.chapters.map((chapter) => {
          const chCompleted = chapter.lessons.filter(l => l.completed).length;
          return (
            <div key={chapter.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-300">{chapter.title}</h3>
                <span className="text-xs text-gray-600">{chCompleted}/{chapter.lessons.length}</span>
              </div>
              <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                {chapter.lessons.map((lesson, i) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${slug}/${lesson.id}`}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.04]"
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                      lesson.completed
                        ? "border-yellow-accent/40 bg-yellow-accent/10"
                        : "border-white/10"
                    }`}>
                      {lesson.completed ? (
                        <svg className="h-3.5 w-3.5 text-yellow-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-[11px] text-gray-500">{i + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm truncate ${lesson.completed ? "text-gray-400" : "text-gray-200"}`}>
                          {lesson.title}
                        </span>
                        {lesson.type === "text" && (
                          <span className="shrink-0 rounded bg-blue-400/15 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">บทความ</span>
                        )}
                        {lesson.type === "file" && (
                          <span className="shrink-0 rounded bg-orange-400/15 px-1.5 py-0.5 text-[10px] font-medium text-orange-400">ไฟล์</span>
                        )}
                        {lesson.is_free && (
                          <span className="shrink-0 rounded bg-yellow-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-accent/80">ฟรี</span>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-xs tabular-nums text-gray-600">{formatDuration(lesson.duration)}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
