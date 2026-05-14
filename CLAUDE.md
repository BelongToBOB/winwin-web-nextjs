# WinWin Web (Next.js)

## Project
- **Repo:** winwin-web-nextjs (GitHub → Cloudflare Pages)
- **Domain:** programs.winwinwealth.co
- **Framework:** Next.js 16 + React 19 + TailwindCSS 4
- **Deploy:** Cloudflare Pages via @opennextjs/cloudflare + wrangler

## Structure
```
src/
  app/
    page.tsx                         — Landing page
    bank-uncensored/page.tsx         — BUC course page
    checkout/page.tsx                — Checkout (uses CheckoutForm)
    inside-bank/page.tsx             — IB course page
    inside-business-finance/         — IBF course page
    private-consult/page.tsx         — Private consult page
    payment/result/page.tsx          — Payment result (ChillPay callback)
    survey/page.tsx                  — Post-payment survey
    api/auth/[...nextauth]/route.ts  — Auth.js route handler
    learn/
      layout.tsx                     — Sidebar + theme + SessionProvider
      page.tsx                       — Course dashboard (enrolled + locked)
      [slug]/page.tsx                — Course detail (chapters + lessons)
      [slug]/[lessonId]/page.tsx     — Lesson player (video/text/file)
      login/page.tsx                 — Login (email/password + Google + Turnstile)
      register/page.tsx              — Register (email/password + Google)
      profile/page.tsx               — User profile (name, phone, Line ID, password)
      forgot-password/page.tsx       — Request password reset
      reset-password/page.tsx        — Set new password
    admin/
      layout.tsx                     — Admin sidebar + theme
      page.tsx                       — Dashboard (stats, chart, top courses)
      courses/page.tsx               — Course list + create
      courses/[id]/page.tsx          — Course editor (cover, info, chapters, lessons, students)
      students/page.tsx              — All students across courses
  auth.ts                            — next-auth config (Google + Credentials)
  middleware.ts                      — Protect /learn/* + /admin/* routes
  components/
    ui/
      CheckoutForm.tsx               — Payment form (slip + ChillPay)
      PaymentResult.tsx              — ChillPay result handler
      SurveyForm.tsx                 — Post-payment survey
    sections/
      PaymentChannels.tsx            — Payment channel cards (landing)
    layout/
      Navbar.tsx                     — Sale page navbar (has "เข้าเรียน" link)
      Footer.tsx                     — Sale page footer
      SiteShell.tsx                  — Hides Navbar/Footer on /learn + /admin
```

## API Base
- https://checkout.winwinwealth.co/api (lms-backend on VPS port 3001)

## Auth
- **next-auth v5 beta** (Google + Credentials providers)
- **Cloudflare Turnstile** on login + register (site key in code, secret on VPS)
- Middleware: /learn/* requires login, /admin/* requires login + role=admin
- Auth pages (login/register/forgot/reset) are public
- Session includes user role from backend check-enrollment endpoint
- Google OAuth redirect: https://programs.winwinwealth.co/api/auth/callback/google

## LMS Learn Area (/learn)
- **Theme:** Light/Dark toggle (CSS variables in globals.css, localStorage)
- **Sidebar:** Desktop=fixed, Mobile=hamburger overlay
  - Home: courses list with progress
  - Inside course: curriculum navigation (chapters + lessons)
  - User info + logout at bottom
  - Admin link for role=admin
- **Course types:** enrolled (with progress) + locked (with price + buy button)
- **Lesson types:** video (Bunny Stream/YouTube), text (article), file (download)
- **Attachments:** per-lesson file downloads
- **Progress:** mark complete per lesson, auto-advance to next

## Video Hosting
- **Bunny Stream** (library ID: 659470, CDN: vz-504db103-fe3.b-cdn.net)
- Upload from admin UI → XHR PUT to Bunny API
- Playback via iframe (mediadelivery.net)
- Referer restriction: programs.winwinwealth.co + localhost
- Auto-detect duration from uploaded video metadata

## Admin Backoffice (/admin)
- **Dashboard:** user count, enrollments, avg progress, content stats, signup chart, top courses
- **Courses:** CRUD + cover upload + draft/publish + chapters/lessons editor
- **Lesson editor:** type selector, video upload with progress, text editor, file attachments, duration (h:m:s)
- **Students:** all students across courses, search, detail modal (courses + progress + phone + Line)
- **Per-course students tab:** enroll/unenroll by email

## Payment Channels
- **QR ชำระเงิน** (bank_qrcode) — QR + account info + slip upload → POST /api/checkout/verify-slip
- **ชำระผ่านบัญชี** (bank_transfer) — account info only + slip upload → same endpoint
- **บัตรเครดิต** (creditcard) — ChillPay redirect → POST /api/checkout/init

bank_transfer is client-side only (not in DB enabledChannels).

## Slip Flow
1. Select QR/bank_transfer → show bank info + upload zone
2. Upload slip (JPG/PNG, max 5MB) → base64
3. Fill customer info → "ยืนยันการชำระเงิน"
4. POST /api/checkout/verify-slip → success/pending_manual
5. Result page → "กรอกแบบสอบถาม" → /survey?buc=XXX

## Key Dependencies
- next-auth@beta — Auth.js v5
- @marsidev/react-turnstile — Cloudflare Turnstile
- promptpay-qr — QR payload from account number
- qrcode.react — QR SVG rendering
- wrangler — CF Pages deploy (must be in devDependencies)

## ENV (.env.local)
- AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET
- AUTH_TRUST_HOST=true
- LMS_API_URL=https://checkout.winwinwealth.co/api

## Build & Deploy
```bash
pnpm build
git push origin main  # CF Pages auto-deploy
```

## Rules
- ห้ามแตะ ChillPay flow (handleSubmit)
- ห้ามแตะ installment logic
- isSlipChannel แยก 2 flow
- Payload ไม่มี password (ลูกค้ากด forgot password เอง)
- Theme: ใช้ CSS variables [data-theme="light"/"dark"] ไม่ hardcode สี
- Mobile: ทุกหน้าต้อง responsive (px-4 mobile, px-6 desktop)
