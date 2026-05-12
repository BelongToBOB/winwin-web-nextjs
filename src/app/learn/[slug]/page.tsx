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
      <div className="mx-auto max-w-4xl px-4 py-10 text-center">
        <p className="text-red-400">{error || "ไม่พบคอร์ส"}</p>
        <Link href="/learn" className="mt-4 inline-block text-sm text-yellow-accent hover:underline">
          กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedLessons = course.chapters.reduce(
    (sum, ch) => sum + ch.lessons.filter((l) => l.completed).length,
    0
  );
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Back */}
      <Link href="/learn" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-yellow-accent">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        คอร์สของฉัน
      </Link>

      {/* Header */}
      <h1 className="mb-2 text-2xl font-bold">{course.title}</h1>
      {course.description && (
        <p className="mb-4 text-sm text-gray-400">{course.description}</p>
      )}

      {/* Progress */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            เรียนแล้ว {completedLessons}/{totalLessons} บทเรียน
          </span>
          <span className="font-semibold text-yellow-accent">{percent}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-yellow-accent transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {course.chapters.map((chapter) => (
          <div key={chapter.id}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              {chapter.title}
            </h2>
            <div className="divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.03]">
              {chapter.lessons.map((lesson, i) => (
                <Link
                  key={lesson.id}
                  href={`/learn/${slug}/${lesson.id}`}
                  className="flex items-center gap-4 px-4 py-3 transition hover:bg-white/5"
                >
                  {/* Status icon */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10">
                    {lesson.completed ? (
                      <svg className="h-4 w-4 text-yellow-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-xs text-gray-500">{i + 1}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-200 truncate">
                        {lesson.title}
                      </span>
                      {lesson.is_free && (
                        <span className="shrink-0 rounded bg-yellow-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-accent">
                          ฟรี
                        </span>
                      )}
                    </div>
                    {lesson.description && (
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {lesson.description}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <span className="shrink-0 text-xs text-gray-500">
                    {formatDuration(lesson.duration)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
