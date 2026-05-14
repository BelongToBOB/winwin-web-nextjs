"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";

interface CourseProgress {
  regId: string;
  courseTitle: string;
  courseSlug: string;
  customerCode: string;
  status: string;
  enrolledAt: string | null;
  totalLessons: number;
  completedLessons: number;
  percent: number;
}

interface Student {
  id: string;
  email: string;
  displayName: string | null;
  phone: string | null;
  lineId: string | null;
  hasGoogle: boolean;
  createdAt: string;
  courses: CourseProgress[];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);

  useEffect(() => {
    adminFetch("/admin/all-students")
      .then((r) => r.json())
      .then((d) => setStudents(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.email.toLowerCase().includes(q) ||
      (s.displayName || "").toLowerCase().includes(q) ||
      s.courses.some((c) => c.customerCode.toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--lms-accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">นักเรียนทั้งหมด</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--lms-text-muted)" }}>{students.length} คน</p>
        </div>
        <input
          type="text"
          placeholder="ค้นหาชื่อ, อีเมล, รหัส..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 rounded-lg px-4 py-2.5 text-sm lms-input"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--lms-border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--lms-bg-card)", borderBottom: "1px solid var(--lms-border)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium" style={{ color: "var(--lms-text-muted)" }}>นักเรียน</th>
                <th className="px-4 py-3 text-left text-xs font-medium hidden sm:table-cell" style={{ color: "var(--lms-text-muted)" }}>คอร์สที่เรียน</th>
                <th className="px-4 py-3 text-left text-xs font-medium hidden md:table-cell" style={{ color: "var(--lms-text-muted)" }}>ความคืบหน้า</th>
                <th className="px-4 py-3 text-left text-xs font-medium hidden lg:table-cell" style={{ color: "var(--lms-text-muted)" }}>สมัครเมื่อ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => {
                const totalPercent =
                  student.courses.length > 0
                    ? Math.round(student.courses.reduce((sum, c) => sum + c.percent, 0) / student.courses.length)
                    : 0;
                return (
                  <tr
                    key={student.id}
                    onClick={() => setSelected(student)}
                    className="cursor-pointer transition"
                    style={{ borderBottom: "1px solid var(--lms-border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--lms-bg-card-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                          style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}
                        >
                          {(student.displayName || student.email)[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium" style={{ color: "var(--lms-text)" }}>
                            {student.displayName || student.email.split("@")[0]}
                          </p>
                          <p className="truncate text-xs" style={{ color: "var(--lms-text-muted)" }}>
                            {student.email}
                            {student.hasGoogle && (
                              <span className="ml-1.5 text-[10px]" style={{ color: "var(--lms-text-faint)" }}>G</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {student.courses.length === 0 ? (
                        <span className="text-xs" style={{ color: "var(--lms-text-faint)" }}>
                          ยังไม่ได้ลงทะเบียน
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {student.courses.map((c) => (
                            <span
                              key={c.regId}
                              className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                              style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}
                            >
                              {c.courseTitle}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {student.courses.length > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full overflow-hidden" style={{ background: "var(--lms-border)" }}>
                            <div className="h-full rounded-full" style={{ width: `${totalPercent}%`, background: "var(--lms-accent)" }} />
                          </div>
                          <span className="text-xs tabular-nums" style={{ color: "var(--lms-text-muted)" }}>{totalPercent}%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs" style={{ color: "var(--lms-text-muted)" }}>{formatDate(student.createdAt)}</span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center" style={{ color: "var(--lms-text-muted)" }}>
                    ไม่พบนักเรียน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ background: "var(--lms-bg-overlay)" }} onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-lg rounded-2xl p-6 shadow-2xl mx-4"
            style={{ background: "var(--lms-bg-secondary)", border: "1px solid var(--lms-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
                style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}
              >
                {(selected.displayName || selected.email)[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold" style={{ color: "var(--lms-text)" }}>
                  {selected.displayName || selected.email.split("@")[0]}
                </h3>
                <p className="text-sm" style={{ color: "var(--lms-text-muted)" }}>{selected.email}</p>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--lms-text-faint)" }}>
              <span>สมัคร: {formatDate(selected.createdAt)}</span>
              {selected.hasGoogle && <span>Google linked</span>}
              {selected.phone && <span>Tel: {selected.phone}</span>}
              {selected.lineId && <span>Line: {selected.lineId}</span>}
            </div>

            <div style={{ borderTop: "1px solid var(--lms-border)" }} className="pt-4">
              <h4 className="mb-3 text-sm font-medium" style={{ color: "var(--lms-text-secondary)" }}>
                คอร์สที่ลงทะเบียน ({selected.courses.length})
              </h4>

              {selected.courses.length === 0 ? (
                <p className="text-sm py-4 text-center" style={{ color: "var(--lms-text-faint)" }}>ยังไม่ได้ลงทะเบียนคอร์สใดๆ</p>
              ) : (
                <div className="space-y-3">
                  {selected.courses.map((c) => (
                    <div key={c.regId} className="rounded-lg p-3" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: "var(--lms-text)" }}>{c.courseTitle}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            background: c.status === "ACTIVE" ? "rgba(34,197,94,0.15)" : "var(--lms-border)",
                            color: c.status === "ACTIVE" ? "var(--lms-green)" : "var(--lms-text-muted)",
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1" style={{ color: "var(--lms-text-muted)" }}>
                        <span>เรียนแล้ว {c.completedLessons}/{c.totalLessons} บท</span>
                        <span className="font-medium" style={{ color: "var(--lms-accent-text)" }}>{c.percent}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--lms-border)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${c.percent}%`, background: "var(--lms-accent)" }} />
                      </div>
                      <div className="mt-2 flex gap-3 text-[11px]" style={{ color: "var(--lms-text-faint)" }}>
                        <span>รหัส: {c.customerCode}</span>
                        {c.enrolledAt && <span>ลงทะเบียน: {formatDate(c.enrolledAt)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelected(null)} className="rounded-lg px-5 py-2 text-sm transition" style={{ color: "var(--lms-text-secondary)" }}>
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
