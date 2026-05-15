# QA Re-Test Report: WinWin Learn System
**Date:** 2026-05-15
**Reviewed by:** Senior QA Agent
**Scope:** Verification of previously reported fixes + new bug discovery
**Method:** Line-by-line source code review

---

## Fix Verification Summary

| # | Bug | Status | Evidence |
|---|-----|--------|----------|
| 1 | Bunny API Key ย้ายไป backend | PASS | admin/courses/[id]:239-267 ใช้ backend proxy |
| 2 | Google login deny เมื่อ fail | PASS | auth.ts:61-68 return false on !res.ok + catch |
| 3 | Session maxAge 24h | PASS | auth.ts:35-37 maxAge: 86400 |
| 4 | 401 auto-redirect | PASS | fetch-utils.ts:28-31 redirect to /learn/login |
| 5 | Blob URL revoked | PASS | admin/courses/[id]:95-96 useEffect cleanup |
| 6 | Confirm publish/unpublish | PASS | admin/courses/[id]:145-153 window.confirm() |
| 7 | ESC ปิด modal | PASS | admin/courses/[id]:86-91 keydown listener |
| 8 | Theme flash prevention | PASS | layout.tsx:37-39 inline script |
| 9 | fetch-utils timeout+abort | PASS | fetch-utils.ts:6-39 AbortController+setTimeout |
| 10 | Input trimming (auth) | PASS | register:52, forgot-password:23 .trim() |
| 11 | Video file size 500MB | PASS | admin/courses/[id]:224 size check |
| 12 | Cover image 2MB | PASS | admin/courses/[id]:133 size check |
| **13** | **Video iframe URL allowlist** | **FAIL** | **isValidVideoUrl() defined แต่ไม่เคยถูกเรียกใช้** |
| **14** | **Attachment file size 20MB** | **FAIL** | **uploadAttachment() ไม่มี size check** |
| **15** | **Survey receipt validation** | **PARTIAL** | **receiptEmail + withholdingContact ไม่ validate** |

**Result: 12 PASS, 2 FAIL, 1 PARTIAL**

---

## Remaining Bugs (ยังต้องแก้)

### RETEST-01: isValidVideoUrl() ถูก define แต่ไม่ถูกเรียกใช้ (CRITICAL)
- **File:** `src/app/admin/courses/[id]/page.tsx:40-43, 563-575`
- **สาเหตุ:** Function `isValidVideoUrl()` ถูกสร้างไว้แล้วที่ line 40-43 แต่ไม่มี code ไหนเรียกใช้
- **ปัญหาปัจจุบัน:**
  - Line 563: ใช้ `.includes("mediadelivery.net")` แทน → URL อย่าง `https://evil.com?x=mediadelivery.net` ผ่านได้
  - Line 565: render `<iframe src={lessonForm.videoId}>` โดยตรง
- **ยังเป็น XSS risk**
- **Fix:**
  ```typescript
  // ใน saveLesson() (around line 189-196) เพิ่มก่อน save:
  if (lessonForm.videoId?.trim() && !isValidVideoUrl(lessonForm.videoId.trim())) {
    show("URL วิดีโอไม่ถูกต้อง — รองรับเฉพาะ Bunny Stream และ YouTube");
    return;
  }

  // ใน render section (around line 563) แก้:
  // BEFORE:
  if (lessonForm.videoId && lessonForm.videoId.includes("mediadelivery.net")) {
  // AFTER:
  if (lessonForm.videoId && isValidVideoUrl(lessonForm.videoId)) {
  ```

### RETEST-02: Attachment upload ไม่มี file size validation (HIGH)
- **File:** `src/app/admin/courses/[id]/page.tsx:203-215`
- **ปัญหา:** UI บอก "สูงสุด 20MB" แต่ code ไม่ได้เช็ค → upload ไฟล์ใหญ่ได้ไม่จำกัด
- **ครอบคลุม 2 จุด:**
  1. `uploadAttachment()` function (line 203-215)
  2. New lesson via file (line 621-643)
- **Fix:**
  ```typescript
  const uploadAttachment = async (file: File) => {
    if (!editingLesson) return;

    // ADD THIS:
    const MAX_ATTACHMENT = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_ATTACHMENT) {
      show("ไฟล์แนบต้องไม่เกิน 20MB");
      return;
    }

    setUploadingFile(true);
    // ... existing code
  };
  ```
  ทำเช่นเดียวกันใน new lesson via file section

### RETEST-03: Survey — receiptEmail ไม่ validate (MEDIUM)
- **File:** `src/components/ui/SurveyForm.tsx:102-109`
- **ปัญหา:** เมื่อ `needsReceipt=true`:
  - `receiptName` + `receiptAddress` → validate แล้ว
  - `receiptTaxId` → validate format แล้ว (ถ้ากรอก)
  - `receiptEmail` → **ไม่ validate เลย** ส่งเปล่าได้
- **Fix:** เพิ่มใน handleSubmit() หลัง receiptTaxId check:
  ```typescript
  if (needsReceipt) {
    // ... existing checks ...
    if (!receiptEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail.trim())) {
      alert("กรุณากรอกอีเมลรับใบเสร็จที่ถูกต้อง");
      return;
    }
  }
  ```

### RETEST-04: Survey — withholdingContact ไม่ validate (MEDIUM)
- **File:** `src/components/ui/SurveyForm.tsx:102-109`
- **ปัญหา:** เมื่อ `needsWithholding=true`:
  - `withholdingAcknowledged` checkbox → validate แล้ว
  - `withholdingContact` (เบอร์ติดต่อ) → **ไม่ validate** ส่งเปล่าได้
- **Fix:**
  ```typescript
  if (needsWithholding) {
    if (!withholdingContact?.trim()) {
      alert("กรุณากรอกเบอร์ติดต่อสำหรับหัก ณ ที่จ่าย");
      return;
    }
    if (!withholdingAcknowledged) {
      alert("กรุณายืนยันรับทราบเงื่อนไขหัก ณ ที่จ่าย");
      return;
    }
  }
  ```

### RETEST-05: Survey — Tax ID ไม่บังคับเมื่อเป็นบริษัท (MEDIUM)
- **File:** `src/components/ui/SurveyForm.tsx:105`
- **ปัญหา:** Tax ID validate format ก็ต่อเมื่อ user กรอกมา (`if (receiptTaxId && ...)`) แต่ไม่บังคับกรอก — บริษัทส่งใบเสร็จโดยไม่มีเลขภาษีได้
- **Fix:**
  ```typescript
  if (needsReceipt) {
    // ... name, address checks ...
    if (!receiptTaxId?.trim() || !/^\d{13}$/.test(receiptTaxId.trim())) {
      alert("กรุณากรอกเลขประจำตัวผู้เสียภาษี 13 หลัก");
      return;
    }
  }
  ```

---

## New Bugs Found (ค้นพบใหม่)

### NEW-01: Community pages ไม่มี 401 redirect (HIGH)
- **Files:**
  - `src/app/learn/community/page.tsx:67-68`
  - `src/app/learn/community/post/[id]/page.tsx:42`
  - `src/app/learn/community/members/page.tsx:32`
- **ปัญหา:** ใช้ `fetch()` ตรงๆ แทน `apiFetch()` → session หมดอายุแล้วไม่ redirect ไป login
- **Code ปัจจุบัน:**
  ```typescript
  fetch(`${LMS_API}/community/posts?...`, { headers })
    .then(r => r.json()).then(d => setPosts(...)).catch(e => console.error(...))
  ```
- **Fix:** เปลี่ยนเป็น `apiFetch()` จาก fetch-utils.ts:
  ```typescript
  import { apiFetch } from "@/lib/fetch-utils";

  apiFetch(`/community/posts?category=${category}&limit=30`, { headers })
    .then(d => setPosts(Array.isArray(d) ? d : []))
    .catch(e => {
      console.error("API error:", e);
      setError("ไม่สามารถโหลดข้อมูลได้");
    });
  ```

### NEW-02: apiFetch ไม่ถูกใช้อย่างสม่ำเสมอ (HIGH)
- **Files ที่ยังใช้ `fetch()` ตรงๆ:**
  - `src/app/learn/layout.tsx:54` (sidebar courses)
  - `src/app/learn/[slug]/page.tsx:56-63` (course detail)
  - `src/app/learn/[slug]/[lessonId]/page.tsx:51` (lesson)
  - `src/app/learn/profile/page.tsx:57,65,84,89,108` (profile)
  - `src/app/learn/community/*` (ทุกหน้า community)
- **ผลกระทบ:** หน้าเหล่านี้ไม่มี timeout, ไม่มี 401 redirect, ไม่มี centralized error handling
- **Fix:** Replace ทุก `fetch(LMS_API + ...)` ด้วย `apiFetch(...)` ยกเว้นหน้าที่ต้องการ handle response status เอง (เช่น 403 check)

### NEW-03: Community pages ไม่มี error UI (MEDIUM)
- **Files:** community/page.tsx, post/[id]/page.tsx, members/page.tsx
- **ปัญหา:** API fail → `console.error()` อย่างเดียว → user เห็น loading spinner ค้าง หรือหน้าเปล่า
- **Fix:** เพิ่ม error state:
  ```typescript
  const [error, setError] = useState<string | null>(null);

  // ใน catch:
  .catch(e => {
    console.error("API error:", e);
    setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่");
  });

  // ใน render:
  {error && <div className="text-center text-red-400 py-8">{error}</div>}
  ```

### NEW-04: Email enroll ไม่ trim (MEDIUM)
- **File:** `src/app/admin/courses/[id]/page.tsx:274`
- **ปัญหา:** `{ email: enrollEmail }` ส่งค่าพร้อม whitespace → regex pass แต่ backend อาจ reject
- **Fix:**
  ```typescript
  const res = await adminPost(`/admin/courses/${id}/enroll`, {
    email: enrollEmail.trim()
  });
  ```

### NEW-05: Profile page — res.ok checked after .json() (MEDIUM)
- **File:** `src/app/learn/profile/page.tsx:84-94`
- **ปัญหา:** `res.json()` อาจ throw ถ้า response ไม่ใช่ JSON (เช่น 502 HTML error page)
- **Fix:**
  ```typescript
  const res = await fetch(...);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    setError(err.message || "เกิดข้อผิดพลาด");
    return;
  }
  const data = await res.json();
  ```

### NEW-06: Reset password — res.ok checked after .json() (MEDIUM)
- **File:** `src/app/learn/reset-password/page.tsx:33-34`
- **ปัญหา:** เดียวกับ NEW-05
- **Fix:** เดียวกัน — เช็ค `res.ok` ก่อน `.json()`

### NEW-07: Lesson page ไม่แยก 403 (not enrolled) vs error อื่น (LOW)
- **File:** `src/app/learn/[slug]/[lessonId]/page.tsx:51-60`
- **ปัญหา:** User เข้า lesson โดยตรงโดยไม่ enroll → เห็น "ไม่สามารถโหลดบทเรียนได้" แทนที่จะเป็น "กรุณาลงทะเบียนก่อน"
- **Fix:**
  ```typescript
  .then((res) => {
    if (res.status === 403) {
      router.push(`/learn/${slug}`); // redirect ไปหน้า course detail
      return null;
    }
    if (!res.ok) throw new Error("ไม่สามารถโหลดบทเรียนได้");
    return res.json();
  })
  ```

### NEW-08: ThemeCtx.Provider value ไม่ memoize (LOW)
- **File:** `src/app/learn/layout.tsx:27`
- **ปัญหา:** `value={{ theme, toggle }}` สร้าง object ใหม่ทุก render → consumers re-render โดยไม่จำเป็น
- **Fix:**
  ```typescript
  const themeValue = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeCtx.Provider value={themeValue}>{children}</ThemeCtx.Provider>;
  ```

---

## Action Plan (ลำดับการแก้แนะนำ)

### Batch 1 — แก้ทันที (30 นาที)
| ID | Issue | Effort |
|----|-------|--------|
| RETEST-01 | เรียกใช้ isValidVideoUrl() ใน save + render | 5 min |
| RETEST-02 | เพิ่ม attachment size check 20MB | 5 min |
| NEW-04 | trim enrollEmail | 1 min |

### Batch 2 — แก้วันนี้ (1-2 ชม.)
| ID | Issue | Effort |
|----|-------|--------|
| NEW-01, NEW-02 | เปลี่ยน fetch → apiFetch ทุกหน้า learn | 45 min |
| NEW-03 | เพิ่ม error UI ใน community pages | 20 min |
| RETEST-03,04,05 | เพิ่ม validation ใน SurveyForm | 15 min |
| NEW-05, NEW-06 | แก้ res.ok order ใน profile + reset-password | 10 min |

### Batch 3 — แก้ Sprint นี้
| ID | Issue | Effort |
|----|-------|--------|
| NEW-07 | Lesson 403 redirect | 10 min |
| NEW-08 | useMemo ThemeCtx | 5 min |

---

## Grep Commands สำหรับ Dev

```bash
# หาหน้าที่ยังใช้ fetch() ตรงๆ แทน apiFetch()
rg "fetch\(\`\$\{LMS_API\}" src/app/learn/

# หาจุดที่ .json() ถูกเรียกก่อน res.ok
rg "\.json\(\)" src/app/learn/ --type tsx

# เช็คว่า isValidVideoUrl ถูกเรียกใช้จริงหรือยัง
rg "isValidVideoUrl" src/

# หา .catch(() => {}) หรือ .catch(() => "") ที่เหลือ
rg "\.catch\(\(\)" src/

# หา uploadAttachment ที่ยังไม่มี size check
rg "uploadAttachment|adminUpload" src/app/admin/
```
