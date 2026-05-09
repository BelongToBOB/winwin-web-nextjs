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
    page.tsx                    — Landing page
    bank-uncensored/page.tsx    — BUC course page
    checkout/page.tsx           — Checkout (uses CheckoutForm)
    inside-bank/page.tsx        — IB course page
    inside-business-finance/    — IBF course page
    private-consult/page.tsx    — Private consult page
    payment/result/page.tsx     — Payment result (ChillPay callback)
    survey/page.tsx             — Post-payment survey
  components/
    ui/
      CheckoutForm.tsx          — Payment form (slip + ChillPay)
      PaymentResult.tsx         — ChillPay result handler
      SurveyForm.tsx            — Post-payment survey
    sections/
      PaymentChannels.tsx       — Payment channel cards (landing)
    layout/
      Navbar.tsx, Footer.tsx
```

## API Base
- https://checkout.winwinwealth.co/api (lms-backend on VPS port 3001)

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
- promptpay-qr — QR payload from account number
- qrcode.react — QR SVG rendering
- wrangler — CF Pages deploy (must be in devDependencies)

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
