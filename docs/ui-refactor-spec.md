# UI/UX Refactor Spec — winwin-web-nextjs

เป้าหมาย: ยกหน้าตาฝั่ง **marketing** (homepage + sale pages) ให้เป็น premium-dark
typography-led สม่ำเสมอทั้งเว็บ สไตล์อ้างอิง: limitlessclub-shop.vercel.app
โดย **ไม่เปลี่ยน logic / payment / auth / LMS behavior**

อ่านไฟล์นี้ให้จบก่อนเริ่ม แล้วทำตามเฟส 0→5 ทีละขั้น commit ย่อยทุก section

---

## 0. บริบทโค้ดเบส (สิ่งที่มีอยู่จริง — อย่าเดา)

- Next.js 16 (App Router) · React 19 · **Tailwind CSS v4** (config แบบ CSS ใน `src/app/globals.css` ด้วย `@theme` — ไม่มี `tailwind.config.js`)
- Deploy: Cloudflare ผ่าน OpenNext (`open-next.config.ts`, `wrangler.jsonc`) — ระวัง build target
- Auth: next-auth v5 · Payment: promptpay-qr + qrcode.react · Turnstile

### โครงสร้างที่เกี่ยวข้อง
```
src/app/page.tsx                       homepage (ใช้ landing/*)
src/app/{inside-bank,bank-uncensored,private-consult,...}/page.tsx   sale pages (ใช้ sections/*)
src/app/globals.css                    @theme + LMS theme vars
src/components/landing/*               LandingHero/About/Services/CTA   ← ระบบดีไซน์ชุด A
src/components/sections/*              HeroKV, PricingCTA, BeforeAfterTable, ...  ← ระบบดีไซน์ชุด B
src/components/ui/*                     CTAButton, SectionWrapper, ... (primitive)
src/components/layout/*                 Navbar, Footer, SiteShell
src/data/*                             เนื้อหา (อย่าแก้ค่า content)
```

### ปัญหาที่ต้องแก้ (ยืนยันจากการอ่านโค้ดจริง)
1. **ดีไซน์ซ้อน 2 ชุด** (`landing/*` vs `sections/*`) ทำงานคล้ายกันแต่เขียนแยก → patterns ซ้ำ
2. **ค่า hardcode กระจาย**: `yellow-400/500`, `bg-black`, `bg-[#0a0a0a]`, `rounded-xl/2xl`, glow `shadow-[0_0_30px...]` ซ้ำทั้งโปรเจกต์ (เช่น CheckoutForm มี `yellow-500` 18 ครั้ง)
3. **primitive ถูก bypass**: `LandingHero` implement layout/badge เองแทนใช้ `SectionWrapper`
4. **ไม่มี type scale / eyebrow / section-heading กลาง** → ขนาดหัวข้อไม่นิ่ง

---

## 1. Design Tokens (Tailwind v4 `@theme`)

แทรกบล็อกนี้เพิ่มใน `src/app/globals.css` **ต่อจาก** `@theme` เดิม (เก็บของเดิมไว้ — `yellow-*` ยังต้องใช้ระหว่าง migrate)
accent คงสีแบรนด์เดิม **เหลืองทอง `#facc15`** (ไม่ใช่ lime)

```css
@theme {
  /* ----- Background / Surface ----- */
  --color-bg: #0a0a0a;
  --color-bg-subtle: #0f0f10;
  --color-surface: #15171c;       /* การ์ด */
  --color-surface-2: #1c1f26;     /* การ์ด hover / ยกระดับ */
  --color-surface-3: #262a33;     /* input / chip */

  /* ----- Text ----- */
  --color-fg: #f4f5f7;            /* text-fg : หัวข้อ/ข้อความหลัก */
  --color-fg-2: #aab0bb;          /* text-fg-2 : ข้อความรอง (AA ผ่าน) */
  --color-fg-muted: #7a8190;      /* text-fg-muted : eyebrow/caption (AA ผ่าน) */

  /* ----- Accent (แบรนด์เหลืองทอง) ----- */
  --color-accent: #facc15;        /* bg-accent / text-accent */
  --color-accent-hover: #fde047;
  --color-accent-pressed: #eab308;
  --color-on-accent: #1a1205;     /* ข้อความบนปุ่มเหลือง */

  /* ----- Semantic ----- */
  --color-positive: #22c55e;      /* ✓ before/after */
  --color-negative: #ef4444;      /* ✗ before/after */

  /* ----- Typography scale (responsive) ----- */
  --text-eyebrow: 0.8125rem;
  --text-eyebrow--line-height: 1.2;
  --text-display: clamp(2.75rem, 1.2rem + 7vw, 6rem);
  --text-display--line-height: 1.05;
  --text-h1: clamp(2rem, 1.3rem + 3.5vw, 4rem);
  --text-h1--line-height: 1.08;
  --text-h2: clamp(1.6rem, 1.2rem + 2vw, 2.75rem);
  --text-h2--line-height: 1.12;
  --text-h3: clamp(1.2rem, 1rem + 1vw, 1.6rem);
  --text-lead: clamp(1.0625rem, 1rem + 0.4vw, 1.3rem);

  /* ----- Radius / Shadow / Motion ----- */
  --radius-card: 1rem;            /* rounded-card */
  --radius-pill: 999px;           /* rounded-pill */
  --shadow-glow: 0 0 40px -8px rgba(250, 204, 21, 0.35);  /* shadow-glow */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* ----- Semantic spacing (ใช้ร่วมกับ scale ปกติได้) ----- */
  --spacing-section: 6rem;        /* py-section ≈ ระยะห่าง section ใหญ่ */
}
```

> หลังใส่แล้วจะใช้ได้เป็น: `bg-bg`, `bg-surface`, `text-fg`, `text-fg-2`, `text-accent`,
> `bg-accent text-on-accent`, `text-display`, `text-h2`, `rounded-card`, `rounded-pill`,
> `shadow-glow`, `py-section`

### ตารางแปลงค่าเดิม → token (ใช้ตอน migrate)
| เดิม | ใหม่ |
|---|---|
| `bg-black` | `bg-bg` |
| `bg-[#0a0a0a]` | `bg-bg-subtle` |
| `bg-zinc-900` (การ์ด) | `bg-surface` |
| `text-white` | `text-fg` |
| `text-gray-300/400` | `text-fg-2` / `text-fg-muted` |
| `text-yellow-400` | `text-accent` |
| `bg-yellow-500 text-black` | `bg-accent text-on-accent` |
| `hover:bg-yellow-400` | `hover:bg-accent-hover` |
| `rounded-xl` / `rounded-2xl` | `rounded-card` |
| `rounded-full` (pill/badge) | `rounded-pill` |
| `shadow-[0_0_30px...rgba(250,204,21...)]` | `shadow-glow` |
| `py-16 md:py-24` | `py-section` (หรือคงไว้ถ้า section พิเศษ) |

---

## 2. Component standards (primitive ที่ทุก section ต้องใช้)

ปรับ/เพิ่มใน `src/components/ui/` แล้วบังคับใช้แทน markup ซ้ำ

1. **`SectionWrapper`** (มีอยู่แล้ว) — ปรับ `bgMap`/`borderMap` ให้ใช้ token (`bg-bg`, `bg-bg-subtle`, `bg-surface`, `border-accent/20`) และ `paddingMap` ใช้ `py-section`
2. **`CTAButton`** (มีอยู่แล้ว) — เปลี่ยน `variantMap` ไปใช้ token: `yellow`→`bg-accent text-on-accent hover:bg-accent-hover`; เพิ่ม `rounded-pill`; ลด `hover:scale-105` เหลือ transition นุ่ม ๆ (`hover:-translate-y-0.5`)
3. **`Eyebrow`** (ใหม่) — `<p className="text-eyebrow uppercase tracking-[0.12em] text-fg-muted font-semibold">`
4. **`Badge`** (ใหม่) — pill: ปกติ `bg-surface-3 text-fg-2`, variant `accent` = `bg-accent/10 text-accent border border-accent/20` (ใช้กับ "NEW"/"Most Popular"/ส่วนลด)
5. **`SectionHeading`** (ใหม่) — รับ `eyebrow`, `title`, รองรับ highlight คำ (render บางคำเป็น `text-accent`) คุมขนาดด้วย `text-h2`

> เป้า: ทุก section จากนี้ = `SectionWrapper > SectionHeading + เนื้อหา` ห้าม implement layout/heading เองซ้ำ

---

## 3. แผนทำทีละเฟส (commit ย่อยทุกข้อ)

**เฟส 0 — เตรียม**
- แตก branch `feat/ui-refactor`
- `npm install` แล้ว `npm run dev` ให้ผ่านก่อน (baseline) — เก็บ screenshot ทุกหน้า marketing
- ถ้าเข้าถึงเว็บอ้างอิงได้: ใช้ color picker จิ้มสีจริง ปรับ `--color-accent` ให้ตรง

**เฟส 1 — Tokens**
- ใส่ `@theme` ตามข้อ 1 ลง `globals.css` (อย่าลบ `--lms-*` และ `@theme` เดิม)
- เพิ่มหน้า dev ชั่วคราว `src/app/styleguide/page.tsx` โชว์สี/typography/ปุ่ม/การ์ด (ลบทิ้งก่อน merge prod ได้)

**เฟส 2 — Primitives**
- ปรับ `SectionWrapper`, `CTAButton` ให้ใช้ token + สร้าง `Eyebrow`, `Badge`, `SectionHeading`
- `npm run lint` + เช็ก `/styleguide`

**เฟส 3 — Migrate ทีละ section (เริ่มจากที่เห็นผลชัด)**
ลำดับ: `PricingCTA` → `LandingHero` → `BeforeAfterTable` → `sections/*` ที่เหลือ → `landing/*` ที่เหลือ → `layout/Navbar,Footer` → forms (`CheckoutForm`, `SurveyForm`)
- แต่ละไฟล์: แทนค่า hardcode ตามตารางข้อ 1, ใช้ primitive ข้อ 2
- **เป้าหมายระยะยาว**: ยุบ `landing/*` ให้ใช้ pattern เดียวกับ `sections/*` (แต่ระยะนี้แค่ tokenize ก่อน ค่อยรวมทีหลังถ้าเสี่ยงน้อย)

**เฟส 4 — Motion / Responsive / Polish**
- scroll reveal เบา ๆ (IntersectionObserver + CSS; ไม่ต้องเพิ่ม dependency ถ้าเลี่ยงได้)
- เช็ก breakpoint 375/768/1280, `:focus-visible` ring, `prefers-reduced-motion`
- รูปใช้ `next/image` + `sizes`

**เฟส 5 — ตรวจรับ**
- `npm run lint` ผ่าน, `npm run build` ผ่าน (และถ้าจะ deploy: `npm run build:cf` ผ่าน)
- grep หา residue: `yellow-400|yellow-500|bg-black|rounded-xl|rounded-2xl` ในโฟลเดอร์ marketing ควรเหลือน้อยสุด
- เทียบ before/after screenshot ทุกหน้า

---

## 4. Guardrails (ห้ามทำ)

- **อย่าแตะ logic**: payment (promptpay/checkout), auth (next-auth/middleware), API routes, data fetching
- **อย่าแก้ค่าใน `src/data/*`** (เนื้อหา/ราคา) — แก้แค่ presentation
- **อย่าแตะ LMS theme** `[data-theme]` และ `--lms-*` + หน้า `/learn/*`, `/admin/*` (คนละระบบสี) เว้นแต่จะระบุภายหลัง
- **อย่าเพิ่ม dependency หนัก** โดยไม่จำเป็น (เลี่ยง animation lib ถ้า CSS พอ); ถ้าจะเพิ่ม ให้ขอยืนยันก่อน
- อย่าลบ `@theme`/ตัวแปรเดิมจนกว่าจะ migrate ครบ (กัน utility เก่าพัง)
- ทำทีละเฟส อย่า refactor รวดเดียวทั้งโปรเจกต์

## 5. Definition of Done
- หน้า marketing ทุกหน้า render ปกติ, `lint` + `build` ผ่าน
- ใช้ token แทน hardcode ในไฟล์ที่ migrate, primitive ถูกใช้แทน markup ซ้ำ
- contrast ข้อความผ่าน WCAG AA, responsive 3 breakpoint
- ไม่มีการเปลี่ยนพฤติกรรม payment/auth/LMS
