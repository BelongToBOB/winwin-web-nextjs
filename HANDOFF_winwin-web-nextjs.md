# 📖 คู่มือส่งมอบงาน — winwin-web-nextjs
> หน้าขายคอร์ส (Sale Page) ของ WinWin — **programs.winwinwealth.co**
> ทำไว้สำหรับส่งมอบตอน dev เดิมลาออก — แบ่ง **Part A (ทีมสั่งงานผ่าน AI)** กับ **Part B (dev รับช่วง)**
> เวอร์ชันสั้นเฉพาะ deploy ดูที่ [DEPLOY_EDIT_GUIDE.md](DEPLOY_EDIT_GUIDE.md)

---

## 🧭 ภาพรวม 1 นาที
| | |
|---|---|
| **เว็บนี้คือ** | หน้าขายคอร์ส (sale page) 7 หน้า + หน้าแรกโปรไฟล์วิน + checkout จ่ายเงิน |
| **Domain** | https://programs.winwinwealth.co |
| **Stack** | Next.js 16 + React 19 + TailwindCSS 4 + Auth.js (next-auth) v5 beta |
| **Repo** | GitHub `winwinwealthcreation/winwin-web-nextjs` (org) — branch `main` |
| **โฟลเดอร์** | `~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs` |
| **Deploy** | Cloudflare (OpenNext + wrangler) — `git push` = auto-deploy |
| **หลังบ้าน (API)** | `https://checkout.winwinwealth.co/api` = lms_backend (VPS :3001) |
| **Package manager** | **pnpm เท่านั้น** (ห้ามใช้ npm) |

> ⚠️ **ส่วนที่ใช้งานจริง = หน้า sale page + หน้าแรก + checkout เท่านั้น**
> `/learn` (ห้องเรียน) และ `/admin` (หลังบ้าน LMS) **สร้างไว้แต่ยังไม่ได้ใช้ตอนนี้** — คลาสจริงสอนผ่าน FluentCommunity (community.winwinwealth.co) คู่มือนี้จึง **ไม่ครอบคลุม /learn และ /admin**
> อย่าสับสนกับโฟลเดอร์ `winwin-sale-web` ข้างๆ — นั่นคือเว็บเก่า (Astro) ที่เลิกใช้แล้ว

---
---

# 🟢 PART A — สำหรับทีม (สั่งงานผ่าน AI ให้แก้ให้)

> **ทีมไม่ต้องแตะโค้ดเอง และไม่ต้องเข้าใจโค้ด** วิธีทำงานคือ **บอก AI (Claude Code) เป็นภาษาคน** ว่าอยากแก้อะไร แล้ว AI จะเข้าไปแก้ไฟล์ + ตรวจ + อัปขึ้นเว็บให้ ทีมแค่เปิดเว็บเช็คผล

## A1. วิธีใช้ (3 ขั้น)
1. เปิด **Claude Code** ในโฟลเดอร์ `winwin-web-nextjs`
2. **พิมพ์สิ่งที่อยากแก้เป็นภาษาคน** (ดูตัวอย่างข้อ A2) — AI จะแก้ไฟล์ให้เอง
3. บอก AI ว่า **"ตรวจ build แล้ว deploy ขึ้นเว็บจริงให้หน่อย"** → รอ ~2-3 นาที → เปิดเว็บเช็ค

> ให้ AI อ่านไฟล์นี้ + `CLAUDE.md` ก่อนเริ่มเสมอ (บอกว่า "อ่าน HANDOFF กับ CLAUDE.md ก่อน") — AI จะรู้ว่าแก้ตรงไหน ห้ามแตะอะไร

## A2. ตัวอย่างประโยคสั่งงาน (ก็อปไปใช้ / ดัดแปลงได้เลย)
**แก้เนื้อหา/ราคา:**
- “แก้ราคาหน้า **Business Health Check** เป็น 3,900 บาท (ราคาเต็มขีดฆ่า 5,900)”
- “แก้ headline หน้า **Owner Finance Check** เป็น: ‹ข้อความใหม่›”
- “เพิ่ม FAQ ข้อใหม่ในหน้า **Bank Uncensored** — ถาม: ‹...› ตอบ: ‹...›”
- “เพิ่มรายการโบนัสในหน้า **Inside Bank**: ‹ชื่อโบนัส› มูลค่า ‹...›”
- “แก้ข้อความปุ่ม CTA หน้าแรกเป็น ‹...›”

**เปลี่ยนรูป:** (วางไฟล์รูปไว้ใน `public/images/` ก่อน แล้วบอกชื่อ)
- “เปลี่ยนรูปปกหน้า **Owner Finance Check** เป็นไฟล์ `public/images/ofc-new.webp` ที่ผมเพิ่งวางไว้”

**เพิ่มหน้าคอร์สใหม่ทั้งหน้า:** (AI จะสร้าง data + page + เพิ่มเมนูให้)
- “เพิ่มหน้าขายคอร์สใหม่ชื่อ ‹ชื่อคอร์ส› ที่ URL `/‹slug›` เนื้อหาแนวเดียวกับ Business Health Check — hero/ราคา/โบนัส/FAQ ประมาณนี้: ‹...› แล้วเพิ่มเข้าเมนูหมวด ‹เรียนออนไลน์/Onsite/ตัวต่อตัว›”

**อัปขึ้นเว็บ:**
- “build ให้ผ่านก่อน แล้ว deploy ขึ้น programs.winwinwealth.co”

## A3. เคล็ดลับให้ AI แก้ถูก
- ระบุ **หน้าไหน** (ชื่อคอร์ส หรือ URL) ให้ชัด + **อยากได้อะไร** ให้ครบ
- ให้ **ตัวเลข/ข้อความจริง** ที่จะใส่ (อย่าบอกลอยๆ ว่า “ปรับราคาหน่อย”)
- เปลี่ยนรูป: วางไฟล์ใน `public/images/` ก่อน แล้วบอกชื่อไฟล์
- อยากดูก่อนจริง: บอก “ขอดู preview ก่อน อย่าเพิ่ง deploy”

## A4. หลัง AI deploy → เช็คด้วยตา
เปิด `https://programs.winwinwealth.co/‹หน้าที่แก้›` (รอ ~2-3 นาที) ดูว่าถูกต้อง
ถ้ายังไม่เปลี่ยน >5 นาที บอก AI ว่า “เว็บยังไม่อัปเดต ช่วยเช็คว่า build ผ่านไหม”

## A5. บอก AI ให้ “ห้ามแตะ” (กันพลาด)
- **ห้ามแตะระบบจ่ายเงิน** (checkout / ChillPay / สลิป)
- **ห้ามแตะ `/learn`, `/admin`** (ยังไม่ใช้)
- ใช้ **pnpm** เท่านั้น / **ห้าม git push --force**
- (AI จะรู้จากคู่มือนี้อยู่แล้ว แต่ย้ำได้เพื่อความชัวร์)

---
---

# 🔵 PART B — สำหรับ Dev ที่มารับช่วง

## B1. โครงสร้าง (เฉพาะส่วนที่ใช้จริง)
```
src/
  app/
    page.tsx                — Landing (โปรไฟล์วิน)
    <slug>/page.tsx         — sale page แต่ละคอร์ส
    checkout/page.tsx       — จ่ายเงิน (ใช้ CheckoutForm)
    payment/result/         — callback ChillPay
    survey/page.tsx         — แบบสอบถามหลังจ่าย
    globals.css             — design tokens (@theme) + theme light/dark
    layout.tsx              — root layout (Navbar/Footer ผ่าน SiteShell)
    learn/ , admin/         — ⚠️ สร้างไว้แต่ยังไม่ใช้ (ข้ามได้)
    api/auth/[...nextauth]  — Auth.js handler (รองรับ learn/admin ที่ยังไม่ใช้)
  data/<slug>.ts            — เนื้อหา sale page (copy/ราคา/FAQ) + types.ts
  components/
    sections/               — บล็อกใช้ซ้ำ (HeroKV, PricingCards, PainPoints, FAQAccordion ...)
    ui/                     — CheckoutForm, SurveyForm, CTAButton, MobileMenu ...
    layout/                 — Navbar, Footer, SiteShell
    landing/                — เฉพาะหน้าแรก
  lib/                      — *-fetch.ts (คุยกับ lms API)
  auth.ts , middleware.ts   — ⚠️ ใช้กับ learn/admin ที่ยังไม่ใช้
```

## B2. สถาปัตยกรรม sale page (data-driven) — หัวใจของเว็บ
1 หน้า = **`src/data/<slug>.ts`** (เนื้อหา ตาม type `SalePageData` ใน `data/types.ts`) + **`src/app/<slug>/page.tsx`** (ประกอบ UI)
- หน้าใหม่ (เช่น `business-health-check`) เขียน JSX เอง แต่ดึงค่า `pricing/bonuses/features/FAQ/instructor` จาก data
- reuse บล็อกจาก `components/sections/*`
- 7 หน้า: `bank-uncensored`, `business-health-check`, `owner-finance-check`, `inside-bank`, `inside-business-finance`, `private-consult`, `monthly-finance-os`

## B3. เพิ่มหน้า sale page ใหม่ (step-by-step)
1. สร้าง `src/data/<slug>.ts` — copy จากไฟล์ใกล้เคียง แก้ `meta/hero/pricing/bonuses/features/FAQ`
2. สร้าง `src/app/<slug>/page.tsx` — export `metadata` จาก `d.meta` + ประกอบ section (ดู `business-health-check/page.tsx` เป็นแบบ)
3. เพิ่มรูปที่ `public/images/` (`.webp`)
4. เพิ่มลงเมนู: `src/components/layout/Navbar.tsx` → array **`courseGroups`**
5. `pnpm build` ผ่าน → deploy

## B4. Design system
- Tailwind 4 + tokens ใน `src/app/globals.css` บล็อก `@theme` — สีหลัก `--color-accent` ทอง `#eab308`, `--color-teal` `#5ec9a7`, `--color-negative` `#ef4444`
- utility custom: `text-h2`, `py-section`, `rounded-card`, `rounded-pill`, `max-w-[var(--container-marketing)]`, `shadow-glow`
- Theme: override ที่ `[data-theme="light|dark"]` — **ห้าม hardcode สี** ใช้ token
- Responsive: mobile `px-4`, desktop `px-6`

## B5. Checkout / Payment (ส่วนที่ยังเชื่อม lms)
- API base = `checkout.winwinwealth.co/api` (lms_backend); helper `src/lib/*-fetch.ts`
- **`components/ui/CheckoutForm.tsx`** 2 flow:
  - `isSlipChannel` (QR/โอน) → upload สลิป base64 → `POST /api/checkout/verify-slip`
  - บัตรเครดิต → **ChillPay redirect** → `POST /api/checkout/init` → callback ที่ `payment/result`
- `next.config.ts` → `images.unoptimized = true` (ข้อจำกัด Cloudflare)
- sale page ส่วนใหญ่ CTA ไป **LINE @WIN_WIN** (`https://lin.ee/gGDzjTi`)

Deploy = Cloudflare **Worker** (ชื่อ `winwin-web-nextjsfw`, `wrangler.jsonc`, entry `.open-next/worker.js`) มี 2 ทาง:

### A. Git-driven (ปกติ) — push แล้ว Cloudflare build+deploy เอง
```bash
git add -A && git commit -m "<msg>"
git push origin main
```
**ค่า Build config ที่ถูกต้อง** (Cloudflare → Worker → Settings → Build):
| ตั้งค่า | ค่า |
|---|---|
| **Git repository** | `winwinwealthcreation/winwin-web-nextjs` ⚠️ อย่าเลือกผิดเป็น `SmeDbankproject` (ชื่อใกล้กันในลิสต์) |
| **Build command** | `npx @opennextjs/cloudflare build` ⚠️ **ไม่ใช่** `pnpm run build` (จะไม่สร้าง `.open-next/` → deploy fail) |
| Deploy command | `npx wrangler deploy` |
| Version command | `npx wrangler versions upload` |
| Root directory | `/` |
| Production branch | `main` |
| API token | `formseminarwinwin build token` |

**Variables and secrets** (Settings → Variables and secrets): `AUTH_SECRET` · `AUTH_GOOGLE_ID` · `AUTH_GOOGLE_SECRET` · `AUTH_TRUST_HOST=true` · `LMS_API_URL` (ค่าดูใน `deploy.sh`)
> 🟡 **สถานะปัจจุบัน = `None` (ยังไม่ตั้ง — ตั้งใจเว้นไว้ให้ dev คนต่อไป ดู §B11 งานค้าง)** — sale page deploy ผ่าน git ได้อยู่แม้ยังว่าง (หน้าขายไม่ใช้ auth); env ชุดนี้จำเป็นเฉพาะตอนจะเปิด `/learn`,`/admin`

> 📌 **ตอนย้าย org (2026-07):** repo ย้ายจาก `BelongToBOB` → org `winwinwealthcreation` ทำให้ Cloudflare หลุดการเชื่อม (disconnected / build failed) วิธีต่อใหม่: Settings → Build → **Disconnect** → **Connect** → เลือก repo `winwinwealthcreation/winwin-web-nextjs`. ถ้า Cloudflare มองไม่เห็น repo: ไป GitHub org → Settings → **GitHub Apps → Cloudflare Workers and Pages → Configure** → ให้สิทธิ์ repo. ระหว่างที่ยังไม่ต่อ ใช้ Path B ได้เลย

### B. Direct wrangler (hotfix / git ล่ม)
```bash
bash deploy.sh                  # inject env + build + wrangler deploy — ไม่ผ่าน git
```
ข้อดี: ไม่พึ่ง Cloudflare↔Git และ **ฉีด env ให้เองในสคริปต์** (deploy ได้แม้ Variables บน Worker ยังว่าง)

## B7. ENV (`.env.local` dev / `deploy.sh` prod)
`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, `AUTH_TRUST_HOST=true`, `LMS_API_URL`
> `next-auth` พังเงียบถ้าไม่มี `AUTH_SECRET` (แม้ตอนนี้ auth ใช้กับ learn/admin ที่ยังไม่เปิด แต่ build ต้องมี)

## B8. Verify + Rollback
- Verify: เปิด `programs.winwinwealth.co/` + หน้าที่แก้
- Rollback: Cloudflare dashboard → Deployments → build เดิม → **Rollback to this deployment**

## B9. ⛔ Landmines
- **`CheckoutForm.tsx`**: `handleSubmit` + installment (ChillPay) — ห้ามแตะเว้นแต่แก้ ChillPay โดยตรง; slip flow แยกที่ `isSlipChannel`
- **ใช้ `pnpm` ไม่ใช่ `npm`** (repo pnpm-locked)
- **ห้าม `git push --force`** ไป `main`
- Theme: CSS variables เท่านั้น
- `/learn`, `/admin` ยังไม่ใช้ — อย่าเพิ่งไปพัฒนา/ลบจนกว่าจะเคลียร์กับเจ้าของ

## B10. 🔐 หนี้ทางเทคนิค / ความปลอดภัย (สำคัญตอน dev ลาออก)
1. **`deploy.sh` มี secret จริง hardcode** (`AUTH_SECRET`, `AUTH_GOOGLE_SECRET`) อยู่ในไฟล์ — dev ที่ลาออกมี key ชุดนี้ → **ควร rotate secret + Google OAuth secret หลังเขาออก** และย้ายไป CF Secrets
2. **ADMIN_EMAILS hardcode ใน `auth.ts`** (ผูกกับ /admin ที่ยังไม่ใช้) — ถ้าจะเปิด /admin ในอนาคต ควรคุมด้วย `role` ใน DB แทน

## B11. 📌 งานค้างส่งต่อ (TODO — dev คนต่อไป)
- [ ] **ตั้ง Cloudflare Worker → Variables and secrets** ให้ครบ 5 ตัว (ค่าใน `deploy.sh`): `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_TRUST_HOST=true`, `LMS_API_URL` — **ตอนนี้ยังเป็น `None`** จำเป็นก่อนเปิด `/learn`,`/admin` หรือถ้าอยากให้ git auto-deploy มี auth ครบ (ตอนนี้ sale page ทำงานได้อยู่แม้ยังว่าง)
- [ ] **Rotate `AUTH_SECRET` + Google OAuth secret** หลัง dev เดิมออก (secret หลุดอยู่ใน `deploy.sh`)
- [ ] เมื่อ Worker มี env ครบแล้ว → เลิกพึ่ง `deploy.sh` ได้ ใช้ git auto-deploy (Path A) อย่างเดียว
- [ ] ตัดสินใจ `/learn`,`/admin` (LMS ในเว็บ) จะใช้ต่อหรือลบ — ตอนนี้คลาสจริงอยู่ FluentCommunity

---

## 🔖 Cheat sheet
```bash
cd ~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs
pnpm install            # ครั้งแรก
pnpm dev                # dev server :3000
pnpm build              # ตรวจก่อน deploy
git push origin main    # deploy (ปกติ)
bash deploy.sh          # deploy (hotfix)
```
| อยากแก้ | ไปที่ |
|---|---|
| ข้อความ/ราคา/FAQ หน้าคอร์ส | `src/data/<slug>.ts` |
| โครง/ดีไซน์หน้าคอร์ส | `src/app/<slug>/page.tsx` |
| เมนูนำทาง | `src/components/layout/Navbar.tsx` (`courseGroups`) |
| สี/ธีม | `src/app/globals.css` (`@theme`) |
| จ่ายเงิน | `src/components/ui/CheckoutForm.tsx` |
| รูป | `public/images/` |

_อัปเดต: 2026-07-08 · repo สะอาด branch main · commit ล่าสุด = Monthly Finance OS sale page_
