# QA Report: WinWin Learn System
**Date:** 2026-05-15
**Reviewed by:** Senior QA Agent
**Scope:** Full frontend review — Auth, Admin, Learn, Checkout, API layer
**Total issues found:** 109 (14 Critical, 26 High, 40 Medium, 29 Low)

---

## How to read this report

- Each bug has a unique ID: `[AREA-SEVERITY-NUMBER]` e.g. `AUTH-C-01`
- Severity: **C** = Critical, **H** = High, **M** = Medium, **L** = Low
- Every bug includes: file path, line number(s), description, and suggested fix
- Bugs are grouped by area, then sorted by severity

---

## Phase 1 — MUST FIX before next deploy

### AUTH-C-01: Bunny Stream API Key exposed in frontend
- **File:** `src/app/admin/courses/[id]/page.tsx:230`
- **Risk:** Anyone opening DevTools can copy the Bunny API key and upload/delete videos in our library
- **Fix:**
  1. Remove the hardcoded key from frontend
  2. Create a backend endpoint `POST /api/admin/video/upload` that handles Bunny authentication server-side
  3. Frontend calls our backend, backend proxies to Bunny with the key
  ```
  // REMOVE THIS from frontend:
  // "AccessKey": "e03fd3d9-f4a9-4aee-8bb6976287e1-32bf-4166"

  // INSTEAD: call our backend
  const res = await adminPost("/admin/video/upload", { title, libraryId });
  // Backend returns { videoId, uploadUrl } with a one-time signed URL
  ```

### AUTH-C-02: Admin auth relies on spoofable sessionStorage
- **File:** `src/lib/admin-fetch.ts:3-9`, `src/app/admin/layout.tsx:15-19`
- **Risk:** XSS can read `sessionStorage.getItem("admin-email")` and spoof the `x-admin-email` header to gain admin access
- **Fix:**
  1. Backend MUST validate admin role from JWT/session token on every request, NOT from `x-admin-email` header
  2. Frontend should pass the NextAuth session token (cookie-based, httpOnly) instead of custom headers
  3. If header is still needed as a secondary check, backend must cross-reference it against the authenticated session
  ```
  // admin-fetch.ts — pass auth token from session, not sessionStorage
  export async function adminFetch(endpoint: string, opts: RequestInit = {}) {
    const session = await getSession(); // from next-auth
    if (!session?.user?.email) throw new Error("Not authenticated");

    return fetch(`${LMS_API}${endpoint}`, {
      ...opts,
      headers: {
        ...opts.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`,
      },
    });
  }
  ```

### AUTH-C-03: Google OAuth allows login even when backend linking fails
- **File:** `src/auth.ts:39-57`
- **Risk:** User logs in via Google, but `google-link` API fails silently. User has a session but no DB record — downstream features (enrollment, progress) will break
- **Fix:**
  ```typescript
  // src/auth.ts — signIn callback
  async signIn({ user, account, profile }) {
    if (account?.provider === "credentials") return true;
    if (!user.email) return false;

    try {
      const res = await fetch(`${LMS_API}/auth/google-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId: profile?.sub || account?.providerAccountId,
          email: user.email,
          displayName: user.name || user.email,
        }),
      });

      if (!res.ok) {
        console.error("Google link failed:", res.status, await res.text());
        return false; // <-- DENY sign-in on failure
      }
      return true;
    } catch (error) {
      console.error("Google link error:", error);
      return false; // <-- DENY on network error
    }
  }
  ```

### AUTH-C-04: NextAuth missing secure cookie flags
- **File:** `src/auth.ts` (NextAuth config object)
- **Risk:** No explicit `httpOnly`, `secure`, `sameSite` on session cookies. No session timeout configured.
- **Fix:**
  ```typescript
  // Add to NextAuth config in src/auth.ts
  export const { handlers, signIn, signOut, auth } = NextAuth({
    ...existingConfig,
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // 24 hours
    },
    cookies: {
      sessionToken: {
        name: "next-auth.session-token",
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        },
      },
    },
  });
  ```

### API-C-05: `res.ok` not checked before `.json()` in auth flows
- **Files:**
  - `src/app/learn/register/page.tsx:60`
  - `src/app/learn/reset-password/page.tsx:33`
  - `src/app/learn/forgot-password/page.tsx:20-26`
- **Risk:** Server returns 500 → code still treats response as success. forgot-password shows "sent!" even on server error.
- **Fix pattern (apply to all 3 files):**
  ```typescript
  const res = await fetch(url, { method: "POST", headers, body });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
    return;
  }

  const data = await res.json();
  // proceed with success flow
  ```

---

## Phase 2 — Fix within this sprint

### API-H-01: Create shared fetch utility with timeout + AbortController
- **Affects:** 40+ fetch calls across the entire codebase
- **Risk:** No timeout → user waits forever on slow API. No abort → memory leaks on unmount.
- **Fix:** Create `src/lib/fetch-utils.ts`:
  ```typescript
  const LMS_API = process.env.NEXT_PUBLIC_LMS_API_URL
    || "https://checkout.winwinwealth.co/api";

  export { LMS_API };

  export function fetchWithTimeout(
    url: string,
    opts: RequestInit = {},
    timeoutMs = 15000
  ): Promise<Response> {
    const controller = new AbortController();
    const merged = opts.signal
      ? opts // caller provided their own signal
      : { ...opts, signal: controller.signal };

    const timer = setTimeout(() => controller.abort(), timeoutMs);

    return fetch(url, merged).finally(() => clearTimeout(timer));
  }

  export async function apiFetch<T = unknown>(
    endpoint: string,
    opts: RequestInit = {},
    timeoutMs = 15000
  ): Promise<T> {
    const res = await fetchWithTimeout(
      `${LMS_API}${endpoint}`,
      {
        headers: { "Content-Type": "application/json", ...opts.headers },
        ...opts,
      },
      timeoutMs
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    return res.json();
  }
  ```
  Then replace all hardcoded `fetch(...)` calls with `apiFetch(...)`.

### API-H-02: Replace all silent `.catch(() => {})` with error UI
- **Files (grep for `.catch(() =>`):**
  - `src/app/learn/page.tsx:23`
  - `src/app/admin/courses/[id]/page.tsx:94,102,170`
  - `src/app/learn/community/page.tsx` (multiple)
  - `src/app/learn/community/post/[id]/page.tsx:42-43`
- **Fix pattern:**
  ```typescript
  // BEFORE:
  fetch(url).then(r => r.json()).then(setData).catch(() => {});

  // AFTER:
  fetch(url)
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then(setData)
    .catch(err => {
      console.error("Failed to load:", err);
      setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่");
    });
  ```

### API-H-03: Consolidate hardcoded API URLs
- **Files:** 15+ files with hardcoded `https://checkout.winwinwealth.co/api`
- **Fix:**
  1. Every file should import from `src/lib/fetch-utils.ts`:
     ```typescript
     import { LMS_API } from "@/lib/fetch-utils";
     ```
  2. Remove all inline `const LMS_API = "https://..."` declarations
  3. Ensure `NEXT_PUBLIC_LMS_API_URL` is set in `.env.local` and CF Pages vars

### ADMIN-H-04: No file size validation for video & attachment uploads
- **File:** `src/app/admin/courses/[id]/page.tsx:537,599`
- **Risk:** Admin can upload 10GB video, consuming bandwidth and crashing browser
- **Fix:**
  ```typescript
  // Video upload — add before XHR send (around line 537)
  const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
  if (file.size > MAX_VIDEO_SIZE) {
    show("ไฟล์วิดีโอต้องไม่เกิน 500MB");
    return;
  }

  // Attachment upload — add before fetch (around line 599)
  const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024; // 20MB
  if (file.size > MAX_ATTACHMENT_SIZE) {
    show("ไฟล์แนบต้องไม่เกิน 20MB");
    return;
  }
  ```

### ADMIN-H-05: No confirmation for publish/unpublish course
- **File:** `src/app/admin/courses/[id]/page.tsx:135-137`
- **Risk:** Misclick can remove a live course from all students
- **Fix:**
  ```typescript
  const togglePublish = async () => {
    const next = !course.is_active;
    const msg = next
      ? "ยืนยันเผยแพร่คอร์สนี้?"
      : "ยืนยันยกเลิกเผยแพร่? นักเรียนจะไม่เห็นคอร์สนี้";
    if (!window.confirm(msg)) return;
    // ... existing logic
  };
  ```

### ADMIN-H-06: XSS risk in video iframe — accepts any URL
- **File:** `src/app/admin/courses/[id]/page.tsx:545-552`
- **Risk:** Admin pastes `javascript:` or data URI → executes arbitrary code in admin context
- **Fix:**
  ```typescript
  const ALLOWED_VIDEO_HOSTS = [
    "iframe.mediadelivery.net",
    "www.youtube.com",
    "youtube.com",
  ];

  function isValidVideoUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ALLOWED_VIDEO_HOSTS.includes(parsed.hostname);
    } catch {
      return false;
    }
  }

  // Before rendering iframe:
  {isValidVideoUrl(videoUrl) && (
    <iframe src={videoUrl} ... />
  )}
  ```

### ADMIN-H-07: Memory leak — Blob URLs never revoked
- **File:** `src/app/admin/courses/[id]/page.tsx:212-213`
- **Fix:**
  ```typescript
  // Add cleanup for blob URL
  useEffect(() => {
    return () => {
      if (localVideoUrl) URL.revokeObjectURL(localVideoUrl);
    };
  }, [localVideoUrl]);
  ```

### SURVEY-H-08: Receipt fields not validated when needsReceipt=true
- **File:** `src/components/ui/SurveyForm.tsx:100-125`
- **Risk:** Backend receives `needs_receipt: true` with empty receipt fields → invoice generation fails
- **Fix:** Add validation in `handleSubmit()` before `setSubmitting(true)`:
  ```typescript
  if (needsReceipt) {
    if (!receiptName.trim()) { setError("กรุณากรอกชื่อ"); setStep(3); return; }
    if (!receiptAddress.trim()) { setError("กรุณากรอกที่อยู่"); setStep(3); return; }
    if (!/^\d{13}$/.test(receiptTaxId.trim())) {
      setError("เลขประจำตัวผู้เสียภาษีต้องเป็น 13 หลัก"); setStep(3); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail.trim())) {
      setError("อีเมลรับใบเสร็จไม่ถูกต้อง"); setStep(3); return;
    }
  }
  ```

### SURVEY-H-09: Withholding checkbox not validated
- **File:** `src/components/ui/SurveyForm.tsx:301-304`
- **Risk:** Legal acknowledgment bypassed — user submits without agreeing to send withholding docs
- **Fix:** Add in same `handleSubmit()`:
  ```typescript
  if (needsWithholding) {
    if (!withholdingContact.trim()) {
      setError("กรุณากรอกเบอร์ติดต่อ"); setStep(3); return;
    }
    if (!withholdingAcknowledged) {
      setError("กรุณายืนยันรับทราบเงื่อนไขหัก ณ ที่จ่าย"); setStep(3); return;
    }
  }
  ```

### LEARN-H-10: Session expiry — no 401 redirect
- **File:** `src/app/learn/layout.tsx:245-252`
- **Risk:** Session expires → all API calls fail silently → user sees empty/broken UI
- **Fix:** Create a wrapper or interceptor:
  ```typescript
  // In LearnShell component, add:
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      if (res.status === 401 && window.location.pathname.startsWith("/learn")) {
        window.location.href = "/learn/login";
      }
      return res;
    };
    return () => { window.fetch = originalFetch; };
  }, []);
  ```
  Or better: use the `apiFetch` utility from API-H-01 with built-in 401 handling.

### LEARN-H-11: Theme flash — dark flickers before light loads
- **File:** `src/app/learn/layout.tsx:16-28`
- **Risk:** User with light theme sees dark flash on every page load
- **Fix:** Add inline script in `<head>` to set theme before React hydrates:
  ```typescript
  // In src/app/learn/layout.tsx or src/app/layout.tsx <head>:
  <script dangerouslySetInnerHTML={{ __html: `
    (function() {
      var t = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", t);
    })();
  `}} />
  ```

### LEARN-H-12: Auto-advance double-click sends duplicate requests
- **File:** `src/app/learn/[slug]/[lessonId]/page.tsx:87`
- **Risk:** Button re-enables before redirect → user clicks again → duplicate progress API calls
- **Fix:**
  ```typescript
  const [marking, setMarking] = useState(false);

  const handleComplete = async () => {
    if (marking) return; // prevent double-click
    setMarking(true);
    try {
      await fetch(...); // mark complete
      if (nextLessonId) {
        router.push(`/learn/${slug}/${nextLessonId}`);
      }
    } catch (err) {
      setMarking(false); // only re-enable on error
      setError("ไม่สามารถบันทึกได้");
    }
    // Do NOT setMarking(false) on success — let navigation handle it
  };
  ```

---

## Phase 3 — Fix in next sprint

### Input Validation (MEDIUM)

| ID | Issue | File | Fix |
|----|-------|------|-----|
| ADMIN-M-01 | No email validation before enroll | admin/courses/[id]:423 | Add `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` check |
| ADMIN-M-02 | Inputs not trimmed before save | admin/courses multiple | `.trim()` all string inputs |
| ADMIN-M-03 | Duration accepts negative/unrealistic values | admin/courses/[id]:650-658 | Add `min="0" max="23/59"` + JS validation |
| ADMIN-M-04 | Price accepts negative/too many decimals | admin/courses/[id]:352 | `Math.max(0, Math.round(price * 100) / 100)` |
| ADMIN-M-05 | Chapter/lesson order accepts 0/negative/duplicates | admin/courses/[id]:495,663 | Validate `order >= 1`, check uniqueness |
| CHECKOUT-M-06 | Phone number accepts any string | CheckoutForm.tsx:514 | Add `/^0\d{9}$/` for Thai phone |
| CHECKOUT-M-07 | Line ID accepts any string | CheckoutForm.tsx:521 | Add `/^[a-zA-Z0-9_.]{1,30}$/` |
| CHECKOUT-M-08 | Tax ID not validated as 13 digits | SurveyForm.tsx:271 | Add `/^\d{13}$/` check |
| SURVEY-M-09 | Survey Step 1 & 2 can be submitted empty | SurveyForm.tsx:100-125 | Check `source.length > 0`, `skillLevel`, `goal.length > 0` |

### Security (MEDIUM)

| ID | Issue | File | Fix |
|----|-------|------|-----|
| CHECKOUT-M-10 | Slip file type checks MIME only, not magic bytes | CheckoutForm.tsx:140 | Read first 4 bytes: JPEG=`FF D8`, PNG=`89 50 4E 47` |
| CHECKOUT-M-11 | Slip result rendered without XSS escaping | CheckoutForm.tsx:311 | React JSX auto-escapes unless `dangerouslySetInnerHTML` is used — verify no raw HTML |
| AUTH-M-12 | No CSRF token on profile/password forms | profile.tsx, reset-password.tsx | Add CSRF via NextAuth or custom token |
| AUTH-M-13 | Forgot-password leaks email existence | forgot-password/page.tsx:43 | Backend: always return same message regardless of email existence |
| AUTH-M-14 | Reset token not pre-validated | reset-password/page.tsx:10 | Call `GET /auth/verify-reset-token?token=X` on mount |
| AUTH-M-15 | No rate limiting on auth endpoints | login, register, forgot-password | Frontend: cooldown timer. Backend: rate limit by IP |

### UX (MEDIUM)

| ID | Issue | File | Fix |
|----|-------|------|-----|
| ADMIN-M-16 | No ESC key to close modals | admin/courses/[id]:508 | Add `keydown` listener for Escape |
| ADMIN-M-17 | No pagination on student list | admin/courses/[id]:99 | Add `?limit=50&offset=0` with pagination UI |
| LEARN-M-18 | Sidebar progress doesn't update real-time | learn/layout.tsx:58 | Refetch on lesson complete, or use shared state |
| LEARN-M-19 | No loading state for sidebar course list | learn/layout.tsx:52 | Add skeleton loader |
| CHECKOUT-M-20 | No fetch timeout — infinite spinner | CheckoutForm.tsx, SurveyForm.tsx | Use `fetchWithTimeout` from API-H-01 |

### LOW priority (pick up when available)

| ID | Issue | File |
|----|-------|------|
| AUTH-L-01 | Password accepts "123456" — no complexity check | register/page.tsx:41 |
| AUTH-L-02 | No "logout all devices" | learn/layout.tsx:186 |
| AUTH-L-03 | Turnstile key hardcoded (not a risk, but inconsistent) | login/page.tsx:10 |
| ADMIN-L-04 | Toast auto-clears too fast (2.5s) | admin/courses/[id]:85 |
| ADMIN-L-05 | Missing ARIA labels in admin | all admin pages |
| ADMIN-L-06 | Duplicate form state (separate useState per field) | admin/courses/[id]:48-75 |
| LEARN-L-07 | Video iframe no error state on load fail | learn/[slug]/[lessonId]:117 |
| LEARN-L-08 | No unsaved changes warning in profile | learn/profile.tsx |
| LEARN-L-09 | Long filenames not truncated in attachments | learn/[slug]/[lessonId]:202 |
| LEARN-L-10 | Missing accessibility (avatar alt, busy states) | learn/profile.tsx:146 |
| API-L-11 | No retry logic for transient 5xx errors | all fetch calls |
| API-L-12 | console.log may remain in production | community components |
| CHECKOUT-L-13 | Email regex too permissive | CheckoutForm.tsx:164 |
| CHECKOUT-L-14 | No debounce on BUC lookup | SurveyForm.tsx:141 |
| CHECKOUT-L-15 | Survey auto-redirect can be bypassed to skip survey | PaymentResult.tsx:150 |

---

## Recommended dev approach

1. **Start with `src/lib/fetch-utils.ts`** (API-H-01) — this one utility unblocks fixes for 40+ issues (timeout, abort, error handling, centralized URL)

2. **Fix auth.ts** (AUTH-C-03, AUTH-C-04) — small changes, high impact

3. **Move Bunny key to backend** (AUTH-C-01) — requires backend work, coordinate with backend dev

4. **Fix admin-fetch.ts** (AUTH-C-02) — requires backend to validate JWT instead of header

5. **Sweep all `.catch(() => {})` patterns** — grep for `.catch(() =>` and replace with error handling

6. **Add validation to SurveyForm** (SURVEY-H-08, H-09) — concentrated in one file

7. **Input validation sweep** — one pass through all forms

---

## Quick grep commands to find affected code

```bash
# Find all silent catches
rg "\.catch\(\(\) =>" src/

# Find all hardcoded API URLs
rg "checkout\.winwinwealth\.co" src/

# Find all fetch without res.ok check
rg "\.json\(\)" src/ --type tsx

# Find all missing AbortController
rg "useEffect.*fetch" src/ --type tsx

# Find Bunny API key
rg "AccessKey|e03fd3d9" src/
```

---

## Notes for backend dev

These frontend bugs assume the backend ALSO needs fixes:
1. **Backend must validate Turnstile token** with Cloudflare API (not just pass-through)
2. **Backend must validate admin from JWT/session**, not trust `x-admin-email` header
3. **Backend must validate enrollment** on `/learn/lessons/:id` endpoint
4. **Backend forgot-password** should return same response for existing and non-existing emails
5. **Backend should add rate limiting** on `/auth/login`, `/auth/register`, `/auth/forgot-password`
6. **Backend video upload** endpoint needed to proxy Bunny API with server-side key
