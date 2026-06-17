# Prompt สำหรับ Claude Code

วางข้อความด้านล่างใน Claude Code ที่เปิดอยู่ใน root ของ `winwin-web-nextjs`
(ทำทีละเฟส ไม่ต้องเทหมดทีเดียว — แนะนำส่งเฟส 0→2 ก่อน แล้วค่อยส่งเฟส 3 ทีละ section)

---

## รอบที่ 1 — Tokens + Primitives + Styleguide (เฟส 0–2)

```
อ่าน docs/ui-refactor-spec.md ให้จบก่อน แล้วทำตามเฉพาะเฟส 0 ถึง 2:

1. สร้าง branch feat/ui-refactor และรัน `npm run dev` ยืนยันว่า build ผ่านเป็น baseline
2. เพิ่ม @theme tokens ตามข้อ 1 ของสเปก ลงใน src/app/globals.css โดย "ต่อท้าย" ของเดิม
   ห้ามลบ @theme เดิมหรือ --lms-* (accent ต้องเป็นเหลืองทอง #facc15 ตามแบรนด์)
3. ปรับ src/components/ui/SectionWrapper.tsx และ CTAButton.tsx ให้ใช้ token แทน hardcode
4. สร้าง primitive ใหม่: Eyebrow, Badge, SectionHeading ใน src/components/ui/ ตามข้อ 2 ของสเปก
5. สร้างหน้า dev ชั่วคราว src/app/styleguide/page.tsx โชว์ palette / typography scale /
   ปุ่มทุก variant / การ์ด / badge เพื่อให้ฉันเทส local

ทำตาม Guardrails ข้อ 4 เคร่งครัด: ห้ามแตะ payment/auth/LMS/data, ห้ามเพิ่ม dependency
จบแล้วรัน `npm run lint` ให้ผ่าน, commit แยกเป็นขั้น ๆ, แล้วสรุปว่าเปิด /styleguide ดูยังไง
```

## รอบที่ 2 — Migrate ทีละ section (เฟส 3, ส่งซ้ำทีละตัว)

```
ทำเฟส 3 ของ docs/ui-refactor-spec.md เฉพาะ component: <ใส่ชื่อ เช่น PricingCTA>
- แทนค่า hardcode ตามตารางแปลงในข้อ 1 ของสเปก
- ใช้ primitive (SectionWrapper / SectionHeading / Eyebrow / Badge / CTAButton) แทน markup ซ้ำ
- ห้ามเปลี่ยนเนื้อหา/ค่าใน src/data และห้ามแตะ logic
จบแล้ว lint ให้ผ่าน, commit, บอกฉันว่าต้องเปิดหน้าไหนเพื่อเช็กผล
```

แนะนำลำดับรอบที่ 2: PricingCTA → LandingHero → BeforeAfterTable → sections ที่เหลือ →
landing ที่เหลือ → Navbar/Footer → CheckoutForm/SurveyForm

## รอบที่ 3 — Polish + ตรวจรับ (เฟส 4–5)

```
ทำเฟส 4–5 ของ docs/ui-refactor-spec.md: scroll reveal เบา ๆ (เลี่ยง dependency),
เช็ก responsive 375/768/1280, focus-visible, prefers-reduced-motion, next/image
แล้วรัน lint + build (และ build:cf ถ้าจะ deploy) ให้ผ่าน
grep หา residue yellow-400/yellow-500/bg-black/rounded-xl ในโฟลเดอร์ marketing แล้วรายงาน
สุดท้ายลบหน้า styleguide ออกถ้าไม่ต้องการใน production
```

---

### วิธีเทส local หลัง Claude Code ทำเสร็จแต่ละรอบ
```bash
npm run dev          # เปิด http://localhost:3000
# เช็ก: /styleguide (รอบ 1) ; / และหน้า sale page ต่าง ๆ (รอบ 2+)
npm run lint
npm run build        # ก่อน merge
```
ถ้าหน้าตาเพี้ยน ให้บอก Claude Code ชี้ component + อาการ แล้วให้แก้ทีละจุด
