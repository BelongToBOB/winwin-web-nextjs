# คู่มือ แก้ไข + Deploy — winwin-web-nextjs (Sale Page / programs.winwinwealth.co)

> สรุปไว้สำหรับหยิบใช้เร็ว — flow การแก้ sale page และการ deploy ขึ้น production

## โปรเจกต์นี้คืออะไร
- **Sale page + LMS + Checkout** ของ WinWin → domain **programs.winwinwealth.co**
- **Stack:** Next.js 16 + React 19 + TailwindCSS 4 + Auth.js v5 (beta)
- **Deploy:** Cloudflare (OpenNext + wrangler) — repo GitHub `winwinwealthcreation/winwin-web-nextjs` (org, branch `main`)
- **Path:** `~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs`
- **API หลังบ้าน:** `https://checkout.winwinwealth.co/api` (lms_backend บน VPS :3001)

---

## 1) Sale pages อยู่ไหน (แก้ตรงไหน)
ทุกหน้าอยู่ใน `src/app/<ชื่อ>/page.tsx`:

| หน้า | ไฟล์ |
|---|---|
| Landing | `src/app/page.tsx` |
| Bank Uncensored (BUC) | `src/app/bank-uncensored/page.tsx` |
| Inside Bank (IB) | `src/app/inside-bank/page.tsx` |
| Inside Business Finance (IBF) | `src/app/inside-business-finance/` |
| Private Consult | `src/app/private-consult/page.tsx` |
| BHC / OFC / Monthly Finance OS | sale page เพิ่มล่าสุด (ดู `src/app/` + commit ล่าสุด) |
| Checkout | `src/app/checkout/page.tsx` (ใช้ `components/ui/CheckoutForm.tsx`) |

- Navbar/Footer: `src/components/layout/Navbar.tsx`, `Footer.tsx` (ซ่อนอัตโนมัติใน `/learn`, `/admin` ผ่าน `SiteShell.tsx`)

## 2) Flow การแก้ (edit)
```bash
cd ~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs
pnpm install          # ครั้งแรก / มี dep ใหม่  (ใช้ pnpm เท่านั้น — repo pnpm-locked)
pnpm dev              # เปิด localhost:3000 ดูผลก่อน
# แก้ไฟล์ src/app/<page>/page.tsx ...
pnpm build            # ต้องผ่านก่อน deploy  (อย่าใช้ npm run build)
```
**กติกาตอนแก้:**
- ข้อความไทย, Tailwind
- **Theme:** ใช้ CSS variables `[data-theme="light"/"dark"]` — ห้าม hardcode สี
- **Responsive:** mobile `px-4`, desktop `px-6` ทุกหน้า

## 3) Flow การ Deploy — มี 2 ทาง

### ทาง A — Git push (ใช้ปกติ ✅)
```bash
cd ~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs
git status                          # ดูว่าจะ ship อะไร
git add -A && git commit -m "<msg>"
git push origin main                # Cloudflare auto-deploy
```
→ ดู build ที่ Cloudflare dashboard.

**ค่า Build config ที่ถูกต้องบน Cloudflare Worker** (Settings → Build):
- Git repository: **`winwinwealthcreation/winwin-web-nextjs`** ⚠️ อย่าเลือกผิดเป็น `SmeDbankproject`
- Build command: **`npx @opennextjs/cloudflare build`** (ไม่ใช่ `pnpm run build`)
- Deploy command: `npx wrangler deploy` · Root: `/` · Branch: `main`
- **Variables and secrets** ต้องมี: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_TRUST_HOST=true`, `LMS_API_URL` (ค่าใน `deploy.sh`)

> 📌 **repo ย้ายมา org `winwinwealthcreation` (2026-07):** ถ้า push แล้วไม่ auto-deploy / disconnected → Settings → Build → **Disconnect → Connect** เลือก repo ให้ถูก. ถ้ามองไม่เห็น repo: GitHub org → Settings → GitHub Apps → Cloudflare Workers and Pages → Configure → ให้สิทธิ์. ระหว่างนี้ใช้ `bash deploy.sh` ได้

### ทาง B — Direct wrangler (เมื่อ git integration ล่ม / hotfix)
```bash
cd ~/Desktop/Projects/winwinwebsitebase/winwin-web-nextjs
bash deploy.sh                      # inject env + build + wrangler deploy
```
`deploy.sh` จะใส่ env (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `LMS_API_URL`) แล้วรัน `npx @opennextjs/cloudflare build && npx wrangler deploy`
> อย่าข้าม env ใน deploy.sh — `next-auth` จะพังเงียบๆ ถ้าไม่มี `AUTH_SECRET`

## 4) Verify หลัง deploy
- เปิด `https://programs.winwinwealth.co/` → landing + หน้า sale page ต้องขึ้น
- (`/learn`, `/admin` ยังไม่ใช้งาน — ไม่ต้องเช็ค)

## 5) Rollback
Cloudflare dashboard → Deployments → build ก่อนหน้า → **"Rollback to this deployment"**

---

## ⚠️ Landmines (ห้ามพลาด)
- **ห้ามแตะ** `handleSubmit` + installment logic ใน `components/ui/CheckoutForm.tsx` (ChillPay flow) — slip flow แยกที่ `isSlipChannel`
- **ใช้ `pnpm` ไม่ใช่ `npm`** — repo pnpm-locked, `npm run build` จะเพี้ยน
- **ห้าม `git push --force` ไป `main`** — ใช้ branch แล้ว merge
- Payload ตอนสมัคร **ไม่มี password** (ลูกค้ากด forgot password เอง)

---
_อัปเดต: 2026-07-08 — repo สะอาด ไม่มีงานค้าง commit ล่าสุด = Monthly Finance OS sale page_
