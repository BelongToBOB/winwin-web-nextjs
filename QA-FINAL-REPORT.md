# QA Final Report: WinWin Learn System
**Date:** 2026-05-15
**Round:** Full System Re-Test (Round 6 — Final)
**Reviewed by:** Senior QA Agent
**Scope:** Auth, Admin, Learn, Checkout, API — ทั้งระบบ

---

## Executive Summary

จาก QA ทั้งหมด 6 รอบ:
- **รอบ 1:** พบ 109 bugs
- **รอบ 2-5:** ตรวจ fix + พบ regression → แก้ครบ
- **รอบ 6 (Final):** เหลือ **9 bugs** (0 Critical, 2 High, 5 Medium, 2 Low)

**ไม่พบ Critical bugs แล้ว** — ระบบพร้อมใช้งาน production ได้

---

## Previously Fixed (ยืนยันว่าแก้แล้ว)

| # | Bug | Status |
|---|-----|--------|
| 1 | Bunny API Key ย้ายไป backend | PASS |
| 2 | Google OAuth deny on fail | PASS |
| 3 | Session maxAge 24h | PASS |
| 4 | 401 auto-redirect (fetch-utils) | PASS |
| 5 | Blob URL revoked on cleanup | PASS |
| 6 | Confirm before publish/unpublish | PASS |
| 7 | ESC closes modals | PASS |
| 8 | Theme flash prevention (inline script) | PASS |
| 9 | fetch-utils timeout + abort | PASS |
| 10 | Input trimming (auth forms) | PASS |
| 11 | Video file size 500MB | PASS |
| 12 | Cover image 2MB | PASS |
| 13 | Attachment file size 20MB | PASS |
| 14 | isValidVideoUrl() in saveLesson + render | PASS |
| 15 | enrollEmail.trim() | PASS |
| 16 | Survey receipt validation (all fields required) | PASS |
| 17 | Survey withholding validation (contact + checkbox) | PASS |
| 18 | String interpolation (backticks) ใน community | PASS |
| 19 | Learn pages ใช้ learnFetch | PASS |
| 20 | learnFetch.ts สร้างถูกต้อง (timeout, 401, headers) | PASS |
| 21 | Silent .catch(() => {}) ใน learn pages หลัก | PASS |
| 22 | Middleware route protection (/learn, /admin) | PASS |
| 23 | Turnstile CAPTCHA on login + register | PASS |

---

## Remaining Bugs (9 ข้อ)

### HIGH (2 ข้อ)

#### BUG-01: Community operations ไม่มี error handling (HIGH)
- **Files:**
  - `src/app/learn/community/page.tsx:88,93,98,103,109,115,117`
  - `src/app/learn/community/post/[id]/page.tsx:52,62,67`
- **ปัญหา:** learnPost/learnPut/learnDelete สำหรับ like, pin, announcement, delete, comment ไม่มี try/catch → ถ้า API fail (401, 500, network error) จะ fail เงียบ user ไม่รู้
- **ผลกระทบ:** กดไลค์/คอมเมนต์/ปักหมุด แล้วไม่สำเร็จ แต่ user ไม่เห็น error
- **Fix:**
  ```typescript
  // ตัวอย่างสำหรับ handleLike
  const handleLike = async (postId: number) => {
    try {
      await learnPost(`/community/posts/${postId}/like`, {});
      loadPosts();
    } catch (err) {
      alert("ไม่สามารถกดไลค์ได้ กรุณาลองใหม่");
    }
  };
  // ทำเช่นเดียวกันกับ pin, announcement, delete, comment, comment-like
  ```

#### BUG-02: adminFetch ไม่มี timeout protection (HIGH)
- **File:** `src/lib/admin-fetch.ts:16,45`
- **ปัญหา:** `adminFetch()` และ `adminUpload()` ใช้ raw `fetch()` ไม่มี timeout — ถ้า API ค้าง admin จะรอไม่มีที่สิ้นสุด
- **เปรียบเทียบ:** `learn-fetch.ts` ใช้ `fetchWithTimeout` ถูกต้องแล้ว แต่ `admin-fetch.ts` ไม่ได้ใช้
- **Fix:**
  ```typescript
  // admin-fetch.ts — เปลี่ยน fetch → fetchWithTimeout
  import { fetchWithTimeout } from "./fetch-utils";

  export async function adminFetch(path: string, init?: RequestInit) {
    const email = getAdminEmail();
    const headers = new Headers(init?.headers);
    if (email) headers.set("x-admin-email", email);
    return fetchWithTimeout(`${LMS_API}${path}`, { ...init, headers });
  }
  ```

---

### MEDIUM (5 ข้อ)

#### BUG-03: Lesson progress — silent catch (MEDIUM)
- **File:** `src/app/learn/[slug]/[lessonId]/page.tsx:92`
- **ปัญหา:** `} catch {} finally { setMarking(false); }` — error ถูกกลืน ถ้า mark complete fail user ไม่รู้
- **Fix:**
  ```typescript
  } catch (err) {
    console.error("Progress update failed:", err);
    alert("ไม่สามารถบันทึกความก้าวหน้าได้ กรุณาลองใหม่");
  } finally { setMarking(false); }
  ```

#### BUG-04: Profile — res.ok checked after .json() (MEDIUM)
- **File:** `src/app/learn/profile/page.tsx:88-89, 103-105`
- **ปัญหา:** `res.json()` ถูกเรียกก่อน `res.ok` check — ถ้า server ส่ง non-JSON error (เช่น 502 HTML) จะ throw JSON parse error
- **Fix:**
  ```typescript
  const res = await learnPost("/auth/update-profile", payload);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    setError(err.message || "เกิดข้อผิดพลาด");
    return;
  }
  const data = await res.json();
  ```

#### BUG-05: Admin course editor — file upload path ไม่ trim (MEDIUM)
- **File:** `src/app/admin/courses/[id]/page.tsx:629`
- **ปัญหา:** สร้าง lesson ผ่าน file upload ใช้ `title: lessonForm.title || file.name` ไม่ trim
- **เปรียบเทียบ:** save ปกติ (line 196) ใช้ `title: lessonForm.title.trim()` ถูกต้อง
- **Fix:**
  ```typescript
  // line 629 — เพิ่ม .trim()
  title: (lessonForm.title || file.name).trim(),
  description: lessonForm.description?.trim() || null,
  content: lessonForm.content?.trim() || null,
  ```

#### BUG-06: Admin course editor — raw fetch for attachments (MEDIUM)
- **File:** `src/app/admin/courses/[id]/page.tsx:184`
- **ปัญหา:** ใช้ raw `fetch()` โหลด lesson attachments แทน `adminFetch()` → ขาด admin email header + timeout
- **Fix:**
  ```typescript
  // เปลี่ยนจาก:
  fetch(`${LMS_API}/learn/lessons/${lesson.id}`, { ... })
  // เป็น:
  adminFetch(`/learn/lessons/${lesson.id}`)
  ```

#### BUG-07: Bank-info fetch silent fail (MEDIUM)
- **File:** `src/components/ui/CheckoutForm.tsx:126`
- **ปัญหา:** `.catch(() => {})` ถ้า bank-info API fail → QR code + bank details ไม่แสดง แต่ user ไม่รู้สาเหตุ
- **Fix:**
  ```typescript
  .catch(() => {
    console.error("Failed to load bank info");
    // bank info is optional, form still works
  })
  ```

---

### LOW (2 ข้อ)

#### BUG-08: Forgot-password ไม่เช็ค res.ok (LOW)
- **File:** `src/app/learn/forgot-password/page.tsx:20-26`
- **ปัญหา:** ส่ง request แล้ว show success ทุกกรณี แม้ server error
- **หมายเหตุ:** อาจจงใจ (ไม่ leak ว่า email มีในระบบ) แต่ควรแยก server error vs success
- **Fix:**
  ```typescript
  const res = await fetch(...);
  if (res.status >= 500) {
    setError("เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง");
    return;
  }
  setShowSuccess(true); // 200 หรือ 404 ก็แสดง success (ป้องกัน email enumeration)
  ```

#### BUG-09: Reset-password res.ok order (LOW)
- **File:** `src/app/learn/reset-password/page.tsx:33-34`
- **ปัญหา:** เดียวกับ BUG-04 — `.json()` ก่อน `.ok` check
- **Fix:** เดียวกับ BUG-04

---

## Files That PASS (ไม่พบ bug)

| File | Status |
|------|--------|
| src/auth.ts | PASS — Google deny, session config ถูกต้อง |
| src/middleware.ts | PASS — route protection ครบ |
| src/lib/fetch-utils.ts | PASS — timeout, abort, 401 redirect |
| src/lib/learn-fetch.ts | PASS — uses fetchWithTimeout, sends headers |
| src/app/learn/login/page.tsx | PASS — validation, Turnstile, error handling |
| src/app/learn/register/page.tsx | PASS — validation, trim, res.ok, Turnstile |
| src/app/learn/layout.tsx | PASS — theme, sidebar, learnFetch |
| src/app/learn/page.tsx | PASS — learnFetch, error handling |
| src/app/learn/[slug]/page.tsx | PASS — learnFetch, 403 handling |
| src/app/learn/community/members/page.tsx | PASS — learnFetch |
| src/app/admin/layout.tsx | PASS — session, admin email |
| src/app/admin/page.tsx | PASS — dashboard |
| src/app/admin/courses/page.tsx | PASS — validation, trim |
| src/app/admin/students/page.tsx | PASS |
| src/components/ui/SurveyForm.tsx | PASS — all validation complete |
| src/components/ui/PaymentResult.tsx | PASS — status handling |

---

## Action Plan

### Batch 1 — แก้ทันที (15 นาที)
| # | Bug | Effort |
|---|-----|--------|
| BUG-01 | เพิ่ม try/catch ใน community operations (10 จุด) | 10 min |
| BUG-03 | เพิ่ม error message ใน lesson progress catch | 2 min |
| BUG-05 | เพิ่ม .trim() ใน file upload path | 2 min |

### Batch 2 — แก้วันนี้ (15 นาที)
| # | Bug | Effort |
|---|-----|--------|
| BUG-02 | เปลี่ยน adminFetch ใช้ fetchWithTimeout | 5 min |
| BUG-04 | แก้ res.ok order ใน profile (2 จุด) | 5 min |
| BUG-06 | เปลี่ยน raw fetch → adminFetch ใน attachments | 2 min |
| BUG-07 | เพิ่ม console.error ใน bank-info catch | 1 min |

### Batch 3 — ถ้ามีเวลา
| # | Bug | Effort |
|---|-----|--------|
| BUG-08 | Forgot-password แยก server error | 3 min |
| BUG-09 | Reset-password res.ok order | 3 min |

---

## Risk Assessment

| ระดับ | สถานะ |
|-------|-------|
| Security (XSS, auth bypass) | ไม่พบ — แก้หมดแล้ว |
| Data integrity | ไม่พบ — validation ครบ |
| Payment flow | ไม่พบ — ทำงานปกติ |
| User-facing errors | **9 จุดที่ error ถูกกลืน** — ไม่ทำให้ระบบพัง แต่ user ไม่เห็น feedback |

**สรุป:** ระบบ **ปลอดภัยและทำงานถูกต้อง** bugs ที่เหลือเป็นเรื่อง error feedback ที่ไม่แสดงให้ user เห็น — ไม่มีผลต่อ data หรือ security
