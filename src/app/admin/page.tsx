"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

interface Stats {
  users: { total: number; today: number; week: number };
  courses: { total: number; published: number };
  enrollments: { total: number; completed: number; avgProgress: number };
  content: { lessons: number; totalMinutes: number };
  topCourses: { title: string; slug: string; enrolled: number; lessons: number }[];
  recentUsers: { email: string; displayName: string | null; createdAt: string; hasGoogle: boolean }[];
  weeklySignups: { date: string; count: number }[];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}

function formatHours(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} ชม. ${m} น.` : `${m} นาที`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${LMS_API}/admin/dashboard-stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--lms-accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!stats) return <p className="py-10 text-center" style={{ color: "var(--lms-text-muted)" }}>ไม่สามารถโหลดข้อมูลได้</p>;

  const cards = [
    { label: "ผู้ใช้ทั้งหมด", value: stats.users.total, sub: `วันนี้ +${stats.users.today} / สัปดาห์ +${stats.users.week}`, color: "#3b82f6" },
    { label: "ลงทะเบียนเรียน", value: stats.enrollments.total, sub: `เรียนจบ ${stats.enrollments.completed} คน`, color: "#22c55e" },
    { label: "ความคืบหน้าเฉลี่ย", value: `${stats.enrollments.avgProgress}%`, sub: `${stats.content.lessons} บทเรียน`, color: "#f59e0b" },
    { label: "เนื้อหาทั้งหมด", value: stats.content.lessons, sub: formatHours(stats.content.totalMinutes), color: "#8b5cf6" },
  ];

  // Chart: find max for scaling
  const maxSignup = Math.max(...stats.weeklySignups.map((d) => d.count), 1);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">ภาพรวม</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl p-4" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
            <p className="text-xs mb-1" style={{ color: "var(--lms-text-muted)" }}>{card.label}</p>
            <p className="text-2xl font-bold tabular-nums" style={{ color: card.color }}>{card.value}</p>
            <p className="text-[11px] mt-1" style={{ color: "var(--lms-text-faint)" }}>{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Signups Chart */}
        <div className="rounded-xl p-5" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
          <h2 className="text-sm font-medium mb-4" style={{ color: "var(--lms-text-secondary)" }}>สมัครสมาชิกรายวัน (30 วัน)</h2>
          {stats.weeklySignups.length === 0 ? (
            <p className="py-8 text-center text-sm" style={{ color: "var(--lms-text-faint)" }}>ยังไม่มีข้อมูล</p>
          ) : (
            <div className="flex items-end gap-[3px] h-32">
              {stats.weeklySignups.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div className="w-full rounded-t transition-all" style={{ height: `${Math.max((d.count / maxSignup) * 100, 4)}%`, background: "var(--lms-accent)", opacity: 0.8 }} />
                  {/* Tooltip */}
                  <div className="absolute -top-8 hidden group-hover:block rounded px-2 py-1 text-[10px] whitespace-nowrap z-10" style={{ background: "var(--lms-text)", color: "var(--lms-bg)" }}>
                    {formatDate(d.date)}: {d.count} คน
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-2 text-[10px]" style={{ color: "var(--lms-text-faint)" }}>
            {stats.weeklySignups.length > 0 && (
              <>
                <span>{formatDate(stats.weeklySignups[0].date)}</span>
                <span>{formatDate(stats.weeklySignups[stats.weeklySignups.length - 1].date)}</span>
              </>
            )}
          </div>
        </div>

        {/* Top Courses */}
        <div className="rounded-xl p-5" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
          <h2 className="text-sm font-medium mb-4" style={{ color: "var(--lms-text-secondary)" }}>คอร์สยอดนิยม</h2>
          {stats.topCourses.length === 0 ? (
            <p className="py-8 text-center text-sm" style={{ color: "var(--lms-text-faint)" }}>ยังไม่มีคอร์ส</p>
          ) : (
            <div className="space-y-3">
              {stats.topCourses.map((course, i) => (
                <Link key={course.slug} href={`/admin/courses`} className="flex items-center gap-3 group">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate group-hover:underline" style={{ color: "var(--lms-text)" }}>{course.title}</p>
                    <p className="text-[11px]" style={{ color: "var(--lms-text-faint)" }}>{course.lessons} บทเรียน</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--lms-text-secondary)" }}>{course.enrolled} คน</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Users */}
      <div className="mt-6 rounded-xl p-5" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium" style={{ color: "var(--lms-text-secondary)" }}>สมัครล่าสุด</h2>
          <Link href="/admin/students" className="text-xs hover:underline" style={{ color: "var(--lms-accent-text)" }}>ดูทั้งหมด</Link>
        </div>
        <div className="space-y-2">
          {stats.recentUsers.map((user) => (
            <div key={user.email} className="flex items-center gap-3 rounded-lg p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}>
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: "var(--lms-text)" }}>{user.displayName || user.email.split("@")[0]}</p>
                <p className="text-[11px] truncate" style={{ color: "var(--lms-text-faint)" }}>{user.email}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px]" style={{ color: "var(--lms-text-faint)" }}>{formatDate(user.createdAt)}</p>
                {user.hasGoogle && <p className="text-[10px]" style={{ color: "var(--lms-text-faint)" }}>Google</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
