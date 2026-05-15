# QA Dev Instructions: 8 Remaining Bugs
**Date:** 2026-05-15
**Priority:** แก้ให้ครบก่อน deploy ถัดไป
**Effort รวม:** ~30 นาที

---

## BUG-01: Community operations ไม่มี try/catch (HIGH — 10 จุด)

### ปัญหา
ทุก learnPost/learnPut/learnDelete ใน community ไม่มี error handling
ถ้า API fail (401, 500, network) → operation fail เงียบ user ไม่รู้

### ไฟล์ 1: `src/app/learn/community/page.tsx`

**Line 85-90 — handlePost:**
```typescript
// BEFORE:
const handlePost = async () => {
  if (!newPost.trim()) return;
  setPosting(true);
  await learnPost("/community/posts", { content: newPost, category: postCategory });
  setNewPost(""); setPosting(false); loadPosts();
};

// AFTER:
const handlePost = async () => {
  if (!newPost.trim()) return;
  setPosting(true);
  try {
    const res = await learnPost("/community/posts", { content: newPost, category: postCategory });
    if (!res.ok) throw new Error("โพสต์ไม่สำเร็จ");
    setNewPost(""); loadPosts();
  } catch { alert("โพสต์ไม่สำเร็จ กรุณาลองใหม่"); }
  finally { setPosting(false); }
};
```

**Line 92-95 — handleLike:**
```typescript
// BEFORE:
const handleLike = async (postId: string) => {
  await learnPost(`/community/posts/${postId}/like`, {});
  loadPosts();
};

// AFTER:
const handleLike = async (postId: string) => {
  try {
    await learnPost(`/community/posts/${postId}/like`, {});
    loadPosts();
  } catch { console.error("Like failed"); }
};
```

**Line 97-100 — handlePin:**
```typescript
// BEFORE:
const handlePin = async (postId: string, pinned: boolean) => {
  await learnPut(`/admin/community/posts/${postId}/pin`, { pinned });
  loadPosts();
};

// AFTER:
const handlePin = async (postId: string, pinned: boolean) => {
  try {
    await learnPut(`/admin/community/posts/${postId}/pin`, { pinned });
    loadPosts();
  } catch { alert("ปักหมุดไม่สำเร็จ"); }
};
```

**Line 102-105 — handleAnnouncement:**
```typescript
// BEFORE:
const handleAnnouncement = async (postId: string, announcement: boolean) => {
  await learnPut(`/admin/community/posts/${postId}/announcement`, { announcement });
  loadPosts();
};

// AFTER:
const handleAnnouncement = async (postId: string, announcement: boolean) => {
  try {
    await learnPut(`/admin/community/posts/${postId}/announcement`, { announcement });
    loadPosts();
  } catch { alert("ตั้งประกาศไม่สำเร็จ"); }
};
```

**Line 107-111 — handleDeletePost:**
```typescript
// BEFORE:
const handleDeletePost = async (postId: string) => {
  if (!confirm("ลบโพสต์นี้?")) return;
  await learnDelete(`/community/posts/${postId}`);
  loadPosts();
};

// AFTER:
const handleDeletePost = async (postId: string) => {
  if (!confirm("ลบโพสต์นี้?")) return;
  try {
    await learnDelete(`/community/posts/${postId}`);
    loadPosts();
  } catch { alert("ลบไม่สำเร็จ กรุณาลองใหม่"); }
};
```

**Line 113-120 — handleOnboard:**
```typescript
// BEFORE:
const handleOnboard = async () => {
  const content = `...`;
  await learnPost("/community/posts", { content, category: "introduction" });
  await learnPut("/community/me", { displayName: onboardForm.name, businessName: onboardForm.business, province: onboardForm.province });
  localStorage.setItem("community-onboarded", "true");
  setShowOnboarding(false); loadPosts();
};

// AFTER:
const handleOnboard = async () => {
  const content = `👋 สวัสดีครับ/ค่ะ!\n\nชื่อ: ${onboardForm.name}\nธุรกิจ: ${onboardForm.business}\nจังหวัด: ${onboardForm.province}\nเป้าหมายปีนี้: ${onboardForm.goal}`;
  try {
    await learnPost("/community/posts", { content, category: "introduction" });
    await learnPut("/community/me", { displayName: onboardForm.name, businessName: onboardForm.business, province: onboardForm.province });
    localStorage.setItem("community-onboarded", "true");
    setShowOnboarding(false); loadPosts();
  } catch { alert("โพสต์แนะนำตัวไม่สำเร็จ กรุณาลองใหม่"); }
};
```

---

### ไฟล์ 2: `src/app/learn/community/post/[id]/page.tsx`

**Line 49-54 — handleComment:**
```typescript
// BEFORE:
const handleComment = async () => {
  if (!comment.trim()) return;
  setCommenting(true);
  await learnPost(`/community/posts/${id}/comments`, { content: comment });
  setComment(""); setCommenting(false); loadPost();
};

// AFTER:
const handleComment = async () => {
  if (!comment.trim()) return;
  setCommenting(true);
  try {
    const res = await learnPost(`/community/posts/${id}/comments`, { content: comment });
    if (!res.ok) throw new Error();
    setComment(""); loadPost();
  } catch { alert("ส่งความคิดเห็นไม่สำเร็จ กรุณาลองใหม่"); }
  finally { setCommenting(false); }
};
```

**Line 61-64 — handleLikePost:**
```typescript
// BEFORE:
const handleLikePost = async () => {
  await learnPost(`/community/posts/${id}/like`, {});
  loadPost();
};

// AFTER:
const handleLikePost = async () => {
  try {
    await learnPost(`/community/posts/${id}/like`, {});
    loadPost();
  } catch { console.error("Like failed"); }
};
```

**Line 66-69 — handleLikeComment:**
```typescript
// BEFORE:
const handleLikeComment = async (commentId: string) => {
  await learnPost(`/community/comments/${commentId}/like`, {});
  loadPost();
};

// AFTER:
const handleLikeComment = async (commentId: string) => {
  try {
    await learnPost(`/community/comments/${commentId}/like`, {});
    loadPost();
  } catch { console.error("Comment like failed"); }
};
```

---

## BUG-02: adminFetch ไม่มี timeout (HIGH)

### ปัญหา
`admin-fetch.ts` ใช้ raw `fetch()` ไม่มี timeout — admin รอ API ค้างได้ไม่มีที่สิ้นสุด
(`learn-fetch.ts` ใช้ `fetchWithTimeout` ถูกต้องแล้ว แต่ `admin-fetch.ts` ยังไม่ได้ใช้)

### ไฟล์: `src/lib/admin-fetch.ts`

```typescript
// BEFORE (ทั้งไฟล์):
const LMS_API = "https://checkout.winwinwealth.co/api";

export function getAdminEmail(): string {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin-email") || "";
  }
  return "";
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const email = getAdminEmail();
  const headers = new Headers(init?.headers);
  if (email) headers.set("x-admin-email", email);
  return fetch(`${LMS_API}${path}`, { ...init, headers });
}
// ... adminPost, adminPut, adminDelete ใช้ adminFetch (OK)

export async function adminUpload(path: string, file: File): Promise<Response> {
  const email = getAdminEmail();
  const fd = new FormData();
  fd.append("file", file);
  const headers: Record<string, string> = {};
  if (email) headers["x-admin-email"] = email;
  return fetch(`${LMS_API}${path}`, { method: "POST", headers, body: fd });
}

// AFTER (ทั้งไฟล์):
import { fetchWithTimeout, LMS_API } from "./fetch-utils";

export function getAdminEmail(): string {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("admin-email") || "";
  }
  return "";
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const email = getAdminEmail();
  const headers = new Headers(init?.headers);
  if (email) headers.set("x-admin-email", email);
  return fetchWithTimeout(`${LMS_API}${path}`, { ...init, headers });
}

export async function adminPost(path: string, body: any): Promise<Response> {
  return adminFetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function adminPut(path: string, body: any): Promise<Response> {
  return adminFetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function adminDelete(path: string): Promise<Response> {
  return adminFetch(path, { method: "DELETE" });
}

export async function adminUpload(path: string, file: File): Promise<Response> {
  const email = getAdminEmail();
  const fd = new FormData();
  fd.append("file", file);
  const headers: Record<string, string> = {};
  if (email) headers["x-admin-email"] = email;
  return fetchWithTimeout(`${LMS_API}${path}`, { method: "POST", headers, body: fd }, 60000);
  // ↑ upload ใช้ timeout 60 วินาที (ไฟล์ใหญ่)
}

export { LMS_API };
```

**การเปลี่ยนแปลง:**
1. import `fetchWithTimeout` + `LMS_API` จาก `fetch-utils.ts` (ลบ hardcoded URL)
2. `adminFetch()` line 16: `fetch()` → `fetchWithTimeout()`
3. `adminUpload()` line 45: `fetch()` → `fetchWithTimeout(..., 60000)` (timeout 60s สำหรับ upload)

---

## BUG-03: Lesson progress — silent catch (MEDIUM)

### ปัญหา
Line 93: `} catch {} finally { setMarking(false); }` — กด "เรียนจบแล้ว" แต่ fail → user ไม่รู้

### ไฟล์: `src/app/learn/[slug]/[lessonId]/page.tsx`

**Line 79-94:**
```typescript
// BEFORE:
const handleMarkComplete = async () => {
  if (!session?.user?.email || marking || completed) return;
  setMarking(true);
  try {
    const res = await learnPost("/learn/progress", { lessonId, completed: true });
    if (res.ok) {
      setCompleted(true);
      if (nextLessonId) {
        router.push(`/learn/${slug}/${nextLessonId}`);
        return;
      }
      router.refresh();
    }
  } catch {} finally { setMarking(false); }
};

// AFTER:
const handleMarkComplete = async () => {
  if (!session?.user?.email || marking || completed) return;
  setMarking(true);
  try {
    const res = await learnPost("/learn/progress", { lessonId, completed: true });
    if (res.ok) {
      setCompleted(true);
      if (nextLessonId) {
        router.push(`/learn/${slug}/${nextLessonId}`);
        return;
      }
      router.refresh();
    } else {
      alert("บันทึกความก้าวหน้าไม่สำเร็จ กรุณาลองใหม่");
    }
  } catch {
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  } finally { setMarking(false); }
};
```

---

## BUG-04: Profile — res.ok checked after .json() (MEDIUM)

### ปัญหา
`res.json()` ถูกเรียกก่อน `res.ok` check — ถ้า server ส่ง non-JSON response (เช่น 502 HTML error page)
→ `.json()` throw → catch block แสดง "ไม่สามารถเชื่อมต่อได้" ซึ่งไม่ตรงกับปัญหาจริง

### ไฟล์: `src/app/learn/profile/page.tsx`

**Line 81-93 — handleSaveName:**
```typescript
// BEFORE:
const handleSaveName = async () => {
  if (!session?.user?.email) return;
  setSaving(true); setError("");
  try {
    const res = await learnPost("/auth/update-profile", { email: session.user.email, displayName, phone, lineId });
    await learnPut("/community/me", { displayName, bio, businessName, industry, province });
    const data = await res.json();       // ← อาจ throw ถ้า non-JSON
    if (!res.ok) { setError(data.message); return; }  // ← เช็คทีหลัง
    show("บันทึกชื่อแล้ว");
  } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
  finally { setSaving(false); }
};

// AFTER:
const handleSaveName = async () => {
  if (!session?.user?.email) return;
  setSaving(true); setError("");
  try {
    const res = await learnPost("/auth/update-profile", { email: session.user.email, displayName, phone, lineId });
    if (!res.ok) {                          // ← เช็คก่อน
      const err = await res.json().catch(() => ({}));
      setError(err.message || "บันทึกไม่สำเร็จ");
      return;
    }
    await learnPut("/community/me", { displayName, bio, businessName, industry, province });
    show("บันทึกแล้ว");
  } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
  finally { setSaving(false); }
};
```

**Line 95-110 — handleChangePassword:**
```typescript
// BEFORE:
const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!session?.user?.email) return;
  setError("");
  if (newPassword !== confirmPassword) { setError("รหัสผ่านใหม่ไม่ตรงกัน"); return; }
  if (newPassword.length < 6) { setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร"); return; }
  setSaving(true);
  try {
    const res = await learnPost("/auth/update-profile", { email: session.user.email, currentPassword, newPassword });
    const data = await res.json();       // ← อาจ throw
    if (!res.ok) { setError(data.message); return; }
    show("เปลี่ยนรหัสผ่านสำเร็จ");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
  finally { setSaving(false); }
};

// AFTER:
const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!session?.user?.email) return;
  setError("");
  if (newPassword !== confirmPassword) { setError("รหัสผ่านใหม่ไม่ตรงกัน"); return; }
  if (newPassword.length < 6) { setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร"); return; }
  setSaving(true);
  try {
    const res = await learnPost("/auth/update-profile", { email: session.user.email, currentPassword, newPassword });
    if (!res.ok) {                          // ← เช็คก่อน
      const err = await res.json().catch(() => ({}));
      setError(err.message || "เปลี่ยนรหัสผ่านไม่สำเร็จ");
      return;
    }
    show("เปลี่ยนรหัสผ่านสำเร็จ");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  } catch { setError("ไม่สามารถเชื่อมต่อได้"); }
  finally { setSaving(false); }
};
```

---

## BUG-05: File upload path ไม่ trim (MEDIUM)

### ปัญหา
สร้าง lesson ผ่าน file upload (line 629) ไม่ trim title/description/content
แต่ save ปกติ (line 196) trim ถูกต้อง → inconsistency

### ไฟล์: `src/app/admin/courses/[id]/page.tsx`

**Line 629:**
```typescript
// BEFORE:
const payload = {
  title: lessonForm.title || file.name,
  description: lessonForm.description || null,
  videoId: lessonForm.videoId || null,
  duration: durTotalFile,
  order: Number(lessonForm.order) || 0,
  isFree: lessonForm.isFree,
  type: lessonForm.type,
  content: lessonForm.content || null,
  chapterId: forChapterId,
  courseId: id
};

// AFTER:
const payload = {
  title: (lessonForm.title || file.name).trim(),
  description: lessonForm.description?.trim() || null,
  videoId: lessonForm.videoId?.trim() || null,
  duration: durTotalFile,
  order: Math.max(1, Number(lessonForm.order) || 1),
  isFree: lessonForm.isFree,
  type: lessonForm.type,
  content: lessonForm.content?.trim() || null,
  chapterId: forChapterId,
  courseId: id
};
```

**เปลี่ยน 4 จุด:**
1. `title` → `.trim()`
2. `description` → `?.trim()`
3. `videoId` → `?.trim()`
4. `content` → `?.trim()`
5. `order` → `Math.max(1, ...)` ให้ตรงกับ saveLesson() ที่ line 196

---

## BUG-06: Admin raw fetch สำหรับ attachments (MEDIUM)

### ปัญหา
Line 184 ใช้ raw `fetch()` โหลด lesson attachments ขาด admin header + timeout

### ไฟล์: `src/app/admin/courses/[id]/page.tsx`

**Line 184:**
```typescript
// BEFORE:
fetch(`${LMS_API}/learn/lessons/${lesson.id}`, { headers: { "x-user-email": "admin" } })
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d?.attachments) setLessonAttachments(d.attachments.map((a: any) => ({ id: a.id, file_url: a.url, file_name: a.name, file_size: a.size }))); })
  .catch(e => console.error("API error:", e));

// AFTER:
adminFetch(`/learn/lessons/${lesson.id}`)
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d?.attachments) setLessonAttachments(d.attachments.map((a: any) => ({ id: a.id, file_url: a.url, file_name: a.name, file_size: a.size }))); })
  .catch(e => console.error("API error:", e));
```

**เปลี่ยน 1 จุด:** `fetch(\`${LMS_API}/learn/lessons/...\`, { headers: ... })` → `adminFetch(\`/learn/lessons/...\`)`
(adminFetch จะใส่ x-admin-email header + timeout ให้อัตโนมัติ)

---

## BUG-07: Bank-info silent catch (LOW)

### ปัญหา
Line 126: `.catch(() => {})` — ถ้า bank-info API fail → QR code ไม่แสดง แต่ไม่มี log

### ไฟล์: `src/components/ui/CheckoutForm.tsx`

**Line 123-126:**
```typescript
// BEFORE:
fetch(`${apiBase}/checkout/bank-info`)
  .then((r) => r.json())
  .then(setBankInfo)
  .catch(() => {});

// AFTER:
fetch(`${apiBase}/checkout/bank-info`)
  .then((r) => r.json())
  .then(setBankInfo)
  .catch((err) => console.error("Failed to load bank info:", err));
```

---

## BUG-08: Reset-password res.ok order (LOW)

### ปัญหา
Line 33-34: `res.json()` ก่อน `res.ok` — ถ้า 502 HTML response → .json() throw → catch แสดง "เชื่อมต่อไม่ได้"
ทำงานได้แต่ error message ไม่ตรงจุด

### ไฟล์: `src/app/learn/reset-password/page.tsx`

**Line 27-40:**
```typescript
// BEFORE:
try {
  const res = await fetch(`${LMS_API}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json();                    // ← อาจ throw
  if (!res.ok) { setError(data.message || "ไม่สำเร็จ"); return; }
  setSuccess(true);
} catch {
  setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
} finally {
  setLoading(false);
}

// AFTER:
try {
  const res = await fetch(`${LMS_API}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  if (!res.ok) {                                     // ← เช็คก่อน
    const err = await res.json().catch(() => ({}));
    setError(err.message || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
    return;
  }
  setSuccess(true);
} catch {
  setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
} finally {
  setLoading(false);
}
```

---

## Checklist สำหรับ Dev

```
[ ] BUG-01: community/page.tsx — เพิ่ม try/catch ใน 7 functions
[ ] BUG-01: community/post/[id]/page.tsx — เพิ่ม try/catch ใน 3 functions
[ ] BUG-02: admin-fetch.ts — import fetchWithTimeout, แก้ adminFetch + adminUpload
[ ] BUG-03: [lessonId]/page.tsx:93 — เพิ่ม error message ใน catch + else
[ ] BUG-04: profile.tsx:88-89 — สลับ res.ok ก่อน res.json (handleSaveName)
[ ] BUG-04: profile.tsx:103-105 — สลับ res.ok ก่อน res.json (handleChangePassword)
[ ] BUG-05: admin/courses/[id]/page.tsx:629 — เพิ่ม .trim() ใน file upload payload
[ ] BUG-06: admin/courses/[id]/page.tsx:184 — เปลี่ยน fetch → adminFetch
[ ] BUG-07: CheckoutForm.tsx:126 — เพิ่ม console.error ใน catch
[ ] BUG-08: reset-password/page.tsx:33-34 — สลับ res.ok ก่อน res.json
```

## Test หลังแก้

```bash
# ตรวจว่าไม่มี bare await learnPost/learnPut/learnDelete ที่ไม่มี try/catch
rg "await learnPost|await learnPut|await learnDelete" src/app/learn/community/ | grep -v "try"

# ตรวจว่า admin-fetch ใช้ fetchWithTimeout
rg "fetchWithTimeout" src/lib/admin-fetch.ts

# ตรวจว่าไม่มี silent catch เหลือ
rg "catch\s*\(\s*\)\s*\{?\s*\}|catch\s*\{\s*\}" src/app/learn/

# ตรวจว่า .json() ไม่ถูกเรียกก่อน res.ok ใน profile + reset
rg -A1 "res.json\(\)" src/app/learn/profile/page.tsx src/app/learn/reset-password/page.tsx
```
