"use client";

import { useEffect, useState } from "react";
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${LMS_API}/admin/courses`)
      .then((r) => r.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">จัดการคอร์ส</h1>

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
              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-white/5 text-2xl">
                📚
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
          <p className="py-10 text-center text-gray-500">ยังไม่มีคอร์ส</p>
        )}
      </div>
    </div>
  );
}
