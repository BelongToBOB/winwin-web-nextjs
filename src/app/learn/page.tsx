"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  customerCode: string;
  enrolledAt: string;
  coverUrl: string | null;
  progress: { total: number; completed: number; percent: number };
}

export default function LearnPage() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    fetch("https://checkout.winwinwealth.co/api/learn/my-courses", {
      headers: { "x-user-email": session.user.email },
    })
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [session?.user?.email, status]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold">
        สวัสดี, {session?.user?.name ?? "คุณ"}
      </h1>
      <p className="mb-8 text-sm text-gray-400">คอร์สเรียนของคุณ</p>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-lg text-gray-300">
            คอร์สกำลังเตรียมพร้อม เร็วๆ นี้
          </p>
          <p className="mt-2 text-sm text-gray-500">
            เนื้อหาจะปรากฏที่นี่เมื่อพร้อม
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${course.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-yellow-accent/30 hover:bg-white/10"
            >
              {course.coverUrl && (
                <img
                  src={course.coverUrl}
                  alt=""
                  className="h-36 w-full object-cover"
                />
              )}
              <div className="p-6">
              <h2 className="text-lg font-semibold group-hover:text-yellow-accent">
                {course.title}
              </h2>
              {course.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                  {course.description}
                </p>
              )}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>ความคืบหน้า</span>
                  <span>{course.progress.percent}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-yellow-accent transition-all"
                    style={{ width: `${course.progress.percent}%` }}
                  />
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
