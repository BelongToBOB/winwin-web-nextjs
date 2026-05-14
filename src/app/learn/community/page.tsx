"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const LMS_API = "https://checkout.winwinwealth.co/api";

const CATEGORIES = [
  { value: "all", label: "ทั้งหมด" },
  { value: "introduction", label: "แนะนำตัว" },
  { value: "general", label: "ทั่วไป" },
  { value: "bank-uncensored", label: "Bank Uncensored" },
  { value: "bhc", label: "Business Health Check" },
];

const LEVEL_COLORS: Record<number, string> = {
  1: "bg-zinc-700 text-zinc-300", 2: "bg-zinc-700 text-zinc-300",
  3: "bg-blue-500/20 text-blue-300", 4: "bg-blue-500/20 text-blue-300",
  5: "bg-purple-500/20 text-purple-300", 6: "bg-purple-500/20 text-purple-300",
  7: "bg-yellow-500/20 text-yellow-300", 8: "bg-yellow-500/20 text-yellow-300",
  9: "bg-gradient-to-r from-yellow-400 to-pink-500 text-white",
};

function LevelBadge({ level }: { level: number }) {
  return <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${LEVEL_COLORS[level] || LEVEL_COLORS[1]}`}>Lv.{level}</span>;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "เมื่อสักครู่";
  if (m < 60) return `${m} น.`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ชม.`;
  const d = Math.floor(h / 24);
  return `${d} วัน`;
}

interface Post {
  id: string; content: string; imageUrl: string | null; category: string;
  isPinned: boolean; isAnnouncement: boolean; createdAt: string;
  author: { id: string; email: string; name: string; businessName: string | null; industry: string | null; level: number };
  likeCount: number; commentCount: number; isLiked: boolean;
}

interface LeaderboardUser { rank: number; name: string; level: number; points: number; }

export default function CommunityPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [newPost, setNewPost] = useState("");
  const [postCategory, setPostCategory] = useState("general");
  const [posting, setPosting] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardForm, setOnboardForm] = useState({ name: "", business: "", province: "", goal: "" });

  const email = session?.user?.email || "";
  const headers = { "x-user-email": email };

  const loadPosts = useCallback(() => {
    if (!email) return;
    fetch(`${LMS_API}/community/posts?category=${category}&limit=30`, { headers })
      .then(r => r.json()).then(d => setPosts(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, [email, category]);

  useEffect(() => { if (status !== "loading") loadPosts(); }, [loadPosts, status]);

  useEffect(() => {
    if (!email) return;
    fetch(`${LMS_API}/community/leaderboard?period=7d`, { headers })
      .then(r => r.json()).then(d => setLeaderboard(Array.isArray(d) ? d : [])).catch(() => {});
  }, [email]);

  // Check onboarding
  useEffect(() => {
    if (!email) return;
    const done = localStorage.getItem("community-onboarded");
    if (!done) setShowOnboarding(true);
  }, [email]);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setPosting(true);
    await fetch(`${LMS_API}/community/posts`, {
      method: "POST", headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ content: newPost, category: postCategory }),
    });
    setNewPost(""); setPosting(false); loadPosts();
  };

  const handleLike = async (postId: string) => {
    await fetch(`${LMS_API}/community/posts/${postId}/like`, { method: "POST", headers });
    loadPosts();
  };

  const handleOnboard = async () => {
    const content = `👋 สวัสดีครับ/ค่ะ!\n\nชื่อ: ${onboardForm.name}\nธุรกิจ: ${onboardForm.business}\nจังหวัด: ${onboardForm.province}\nเป้าหมายปีนี้: ${onboardForm.goal}`;
    await fetch(`${LMS_API}/community/posts`, {
      method: "POST", headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ content, category: "introduction" }),
    });
    // Update profile
    await fetch(`${LMS_API}/community/me`, {
      method: "PUT", headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: onboardForm.name, businessName: onboardForm.business, province: onboardForm.province }),
    });
    localStorage.setItem("community-onboarded", "true");
    setShowOnboarding(false); loadPosts();
  };

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--lms-accent)", borderTopColor: "transparent" }} /></div>;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold mb-4">Community</h1>

          {/* Category Filter */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {CATEGORIES.map(c => (
              <button key={c.value} onClick={() => setCategory(c.value)}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm transition"
                style={{ background: category === c.value ? "var(--lms-accent)" : "var(--lms-bg-card)", color: category === c.value ? "#000" : "var(--lms-text-secondary)", border: `1px solid ${category === c.value ? "var(--lms-accent)" : "var(--lms-border)"}` }}>
                {c.label}
              </button>
            ))}
          </div>

          {/* Compose */}
          <div className="rounded-xl p-4 mb-5" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)} rows={3} placeholder="มีอะไรอยากแชร์..."
              className="w-full rounded-lg px-4 py-3 text-sm resize-none lms-input" />
            <div className="flex items-center justify-between mt-2">
              <select value={postCategory} onChange={e => setPostCategory(e.target.value)}
                className="rounded-lg px-3 py-1.5 text-xs lms-input">
                {CATEGORIES.filter(c => c.value !== "all").map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <button onClick={handlePost} disabled={!newPost.trim() || posting}
                className="rounded-lg px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
                style={{ background: "var(--lms-accent)" }}>
                {posting ? "..." : "โพสต์"}
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="rounded-xl p-4" style={{ background: "var(--lms-bg-card)", border: `1px solid ${post.isPinned ? "var(--lms-accent)" : "var(--lms-border)"}`, boxShadow: "var(--lms-shadow)" }}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold" style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}>
                    {(post.author.name || post.author.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate" style={{ color: "var(--lms-text)" }}>{post.author.name || post.author.email.split("@")[0]}</span>
                      <LevelBadge level={post.author.level} />
                      {post.isAnnouncement && <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-red-500/20 text-red-300">ประกาศ</span>}
                      {post.isPinned && <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-yellow-500/20 text-yellow-300">ปักหมุด</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--lms-text-faint)" }}>
                      {post.author.businessName && <span>{post.author.businessName}</span>}
                      {post.author.businessName && <span>·</span>}
                      <span>{timeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm whitespace-pre-wrap mb-3" style={{ color: "var(--lms-text)" }}>{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="" className="rounded-lg w-full mb-3" />}

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--lms-text-muted)" }}>
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-1 transition hover:opacity-80">
                    <svg className="h-4 w-4" fill={post.isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" style={{ color: post.isLiked ? "var(--lms-red)" : "inherit" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likeCount > 0 && <span>{post.likeCount}</span>}
                  </button>
                  <Link href={`/learn/community/post/${post.id}`} className="flex items-center gap-1 transition hover:opacity-80">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.commentCount > 0 && <span>{post.commentCount}</span>}
                  </Link>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="rounded-xl p-10 text-center" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)" }}>
                <p style={{ color: "var(--lms-text-muted)" }}>ยังไม่มีโพสต์ เป็นคนแรกที่แชร์!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Leaderboard */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="rounded-xl p-4 sticky top-20" style={{ background: "var(--lms-bg-card)", border: "1px solid var(--lms-border)", boxShadow: "var(--lms-shadow)" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: "var(--lms-text)" }}>Leaderboard</h3>
              <Link href="/learn/community/members" className="text-[11px] hover:underline" style={{ color: "var(--lms-accent-text)" }}>ดูทั้งหมด</Link>
            </div>
            {leaderboard.length === 0 ? (
              <p className="text-xs py-4 text-center" style={{ color: "var(--lms-text-faint)" }}>ยังไม่มีข้อมูล</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map(user => (
                  <div key={user.rank} className="flex items-center gap-2">
                    <span className="w-5 text-center text-xs font-bold" style={{ color: user.rank <= 3 ? "var(--lms-accent)" : "var(--lms-text-faint)" }}>{user.rank}</span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: "var(--lms-accent-bg)", color: "var(--lms-accent-text)" }}>
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: "var(--lms-text)" }}>{user.name}</p>
                    </div>
                    <LevelBadge level={user.level} />
                    <span className="text-[10px] tabular-nums" style={{ color: "var(--lms-text-faint)" }}>{user.points}pt</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "var(--lms-bg-overlay)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "var(--lms-bg-secondary)", border: "1px solid var(--lms-border)" }}>
            <h3 className="text-lg font-bold mb-1" style={{ color: "var(--lms-text)" }}>ยินดีต้อนรับ!</h3>
            <p className="text-sm mb-5" style={{ color: "var(--lms-text-muted)" }}>แนะนำตัวให้เพื่อนสมาชิกรู้จัก</p>
            <div className="space-y-3">
              <input type="text" placeholder="ชื่อ" value={onboardForm.name} onChange={e => setOnboardForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-lg px-4 py-3 text-sm lms-input" />
              <input type="text" placeholder="ชื่อธุรกิจ" value={onboardForm.business} onChange={e => setOnboardForm(f => ({ ...f, business: e.target.value }))} className="w-full rounded-lg px-4 py-3 text-sm lms-input" />
              <input type="text" placeholder="จังหวัด" value={onboardForm.province} onChange={e => setOnboardForm(f => ({ ...f, province: e.target.value }))} className="w-full rounded-lg px-4 py-3 text-sm lms-input" />
              <input type="text" placeholder="เป้าหมายปีนี้" value={onboardForm.goal} onChange={e => setOnboardForm(f => ({ ...f, goal: e.target.value }))} className="w-full rounded-lg px-4 py-3 text-sm lms-input" />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => { setShowOnboarding(false); localStorage.setItem("community-onboarded", "true"); }} className="text-sm" style={{ color: "var(--lms-text-muted)" }}>ข้ามไปก่อน</button>
              <button onClick={handleOnboard} disabled={!onboardForm.name}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50" style={{ background: "var(--lms-accent)" }}>
                โพสต์แนะนำตัว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
