"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface MyCourse {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  progress: { total: number; completed: number; percent: number };
}

interface CatalogCourse {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  price: number;
}

export default function LearnPage() {
  const { data: session, status } = useSession();
  const [myCourses, setMyCourses] = useState<MyCourse[]>([]);
  const [catalog, setCatalog] = useState<CatalogCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    const email = session?.user?.email;

    // Fetch catalog (all published courses)
    const catalogP = fetch(`${LMS_API}/learn/catalog`)
      .then((r) => r.json())
      .then((data) => setCatalog(Array.isArray(data) ? data : []))
      .catch(() => {});

    // Fetch my courses (enrolled)
    const myP = email
      ? fetch(`${LMS_API}/learn/my-courses`, { headers: { "x-user-email": email } })
          .then((r) => r.json())
          .then((data) => setMyCourses(Array.isArray(data) ? data : []))
          .catch(() => {})
      : Promise.resolve();

    Promise.all([catalogP, myP]).finally(() => setLoading(false));
  }, [session?.user?.email, status]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-accent border-t-transparent" />
      </div>
    );
  }

  const enrolledSlugs = new Set(myCourses.map((c) => c.slug));
  const lockedCourses = catalog.filter((c) => !enrolledSlugs.has(c.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="mb-1 text-xl font-bold">
        สวัสดี, {session?.user?.name ?? "คุณ"}
      </h1>
      <p className="mb-6 text-sm text-gray-500">คอร์สเรียนของคุณ</p>

      {/* Enrolled courses */}
      {myCourses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {myCourses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${course.slug}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-yellow-accent/30 hover:bg-white/10"
            >
              {course.coverUrl && (
                <img src={course.coverUrl} alt="" className="w-full object-cover aspect-[16/9]" />
              )}
              <div className="p-5">
                <h2 className="text-base font-semibold group-hover:text-yellow-accent">
                  {course.title}
                </h2>
                {course.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-400">{course.description}</p>
                )}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>ความคืบหน้า</span>
                    <span>{course.progress.percent}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-yellow-accent transition-all" style={{ width: `${course.progress.percent}%` }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Locked courses */}
      {lockedCourses.length > 0 && (
        <>
          <h2 className="mb-4 text-sm font-medium text-gray-500">คอร์สทั้งหมด</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {lockedCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative">
                  {course.coverUrl && (
                    <img src={course.coverUrl} alt="" className="w-full object-cover aspect-[16/9] opacity-60" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg className="h-8 w-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-base font-semibold text-gray-300">{course.title}</h2>
                  {course.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{course.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-yellow-accent">
                      {course.price > 0 ? `฿${course.price.toLocaleString()}` : "ฟรี"}
                    </span>
                    <Link
                      href="/checkout"
                      className="rounded-lg bg-yellow-accent/10 px-4 py-1.5 text-xs font-medium text-yellow-accent transition hover:bg-yellow-accent/20"
                    >
                      ซื้อคอร์ส
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {myCourses.length === 0 && lockedCourses.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-gray-400">ยังไม่มีคอร์สในระบบ</p>
        </div>
      )}
    </div>
  );
}
