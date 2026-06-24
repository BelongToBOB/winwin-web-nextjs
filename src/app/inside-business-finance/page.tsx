/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { Flame, Star, Gift, ShieldCheck, MessageCircle, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PhotoTestimonials from "@/components/sections/PhotoTestimonials";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import SeminarGallery from "@/components/sections/SeminarGallery";
import WhoIsThisFor from "@/components/sections/WhoIsThisFor";
import ContactCTA from "@/components/sections/ContactCTA";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { insideBusinessFinanceData as d } from "@/data/inside-business-finance";

export const metadata: Metadata = {
  title: d.meta.title,
  description: d.meta.description,
};

const LINE = "https://page.line.me/591xftzn?openQrModal=true";

function JumpCTA({ label = "ดูรอบนี้ + ราคา Early Bird →", note }: { label?: string; note?: string }) {
  return (
    <div className="text-center mt-12">
      <a href="#pricing" className="inline-flex items-center justify-center px-9 py-4 text-base md:text-lg font-bold rounded-full bg-[length:200%_100%] bg-[linear-gradient(110deg,#facc15,#facc15_40%,#fef9c3_50%,#facc15_60%,#facc15)] animate-glass-shine text-black transition-transform hover:scale-105 shadow-[0_10px_30px_-5px_rgba(250,204,21,0.45)]">
        {label}
      </a>
      {note && <p className="text-sm text-gray-500 mt-3">{note}</p>}
    </div>
  );
}

const winStats = [
  { big: "7 ปี", lab: "อดีต RM ธนาคาร" },
  { big: "พันล้าน", lab: "มูลค่าเคสสินเชื่อที่เขียน" },
  { big: "ร้อยล้าน", lab: "ลงทุนสร้างธุรกิจเองด้วยสินเชื่อ" },
];

const pains = [
  { t: "มีโอกาสขยาย แต่ไม่กล้าตัดสินใจ", p: 'มีออเดอร์ มีโอกาสเปิดสาขา ซื้อเครื่องจักร 20 ล้าน หรือลงทุนระบบ — แต่คุณตัดสินใจไม่ลง เพราะลึก ๆ ไม่รู้ว่าธุรกิจ "รับไหว" หรือเปล่า' },
  { t: "ยอดขาย 50–100 ล้าน แต่เงินยังตึงตลอดเวลา", p: "ยอดขายเริ่มใหญ่ขึ้น แต่กระแสเงินสดยังฝืดเหมือนเดิม ไม่รู้ว่ารั่วตรงไหน — โตขึ้นแต่หลังบ้านการเงินไม่ได้ดีขึ้นตาม" },
  { t: "อยากใช้สินเชื่อขยาย แต่กลัวใช้ผิดประเภท", p: "รู้ว่าควรใช้แบงก์เป็นเครื่องมือ — แต่ไม่กล้า เพราะกลัวใช้เงินกู้ระยะสั้นไปลงทุนระยะยาว แล้วพังเพราะภาระผ่อนเร็วเกินไป" },
  { t: "ธุรกิจดูใหญ่ แต่เจ้าของยังปล่อยมือไม่ได้", p: "ทีมเริ่มเยอะ แต่การตัดสินใจเรื่องเงินทุกครั้งยังต้องผ่านเจ้าของ เพราะระบบการเงินยังไม่นิ่งพอให้ทีมทำตามได้" },
];

const diagnosisFactors = [
  "เงินที่หมุนแต่ละเดือนใหญ่ขึ้น",
  "หนี้เริ่มมีหลายประเภท",
  "ลงทุน 10–50 ล้าน ผูกมัด 3–5 ปี",
  "ทีมเยอะจนรวมศูนย์ที่เจ้าของไม่ได้",
];

const outcomes = [
  { h: "เปิดดูเงินจริงทุกเดือน ใน 5 นาที", p: "ไม่ต้องดูแค่ยอดขายแล้วเดา เห็น Cashflow 4 ชั้น รู้ว่าเงินที่เอาไปโตได้เหลือเท่าไหร่" },
  { h: "ตัดสินใจลงทุนด้วยตัวเลข ไม่ใช่ความรู้สึก", p: "ก่อนเปิดสาขา ก่อนซื้อเครื่องจักร — มีเครื่องมือคำนวณว่าธุรกิจรับได้แค่ไหน ใช้สินเชื่อแบบไหนเหมาะ" },
  { h: "คุยกับธนาคารด้วยแผน 1 หน้า ไม่ใช่แฟ้มหนา", p: "รู้ว่าแบงก์ดูอะไร เตรียมตรงจุด ตอบ 4 คำถามของคนให้เงินได้ครบ" },
  { h: "แยกเงินเป็น 5 บัญชี ที่ทีมทำตามได้", p: "เจ้าของไม่ต้องตัดสินใจเรื่องเงินทุกครั้ง ทีมรู้ว่าเงินก้อนไหนใช้ได้กับเรื่องอะไร" },
  { h: "รู้กำไรจริง ก่อนตั้งราคา", p: "เห็นว่ากำไรในบัญชีเหลือเป็นเงินจริงเท่าไหร่ ปรับราคาก่อนรับงานชิ้นต่อไป" },
];

const winFeels = [
  "รู้สึกถึงน้ำหนักของวันที่ต้องเซ็นค้ำสัญญาเงินกู้ร้อยล้านด้วยชื่อตัวเอง",
  "รู้สึกถึงคืนที่นอนคิดว่า สิ้นเดือนนี้จะมีเงินจ่ายเงินเดือนพนักงานและจ่ายหนี้คืนไหม",
  'รู้สึกถึงความหมายจริงของคำว่า "เงินหายไปไหน" เมื่อมันคือเงินของธุรกิจเราเอง',
];

const tools = [
  { lab: "เห็นโครงสร้างการเงินทั้งหมด", title: "Business Health Reading — อ่านงบเห็นสัญญาณ", p: "อ่านงบ 3 ฉบับด้วยสายตาเจ้าของ + ธนาคาร เห็นโครงสร้างสินทรัพย์ หนี้สิน และกำไร 3 ระดับ (EBITDA / EBIT / Net Profit) ก่อนตัดสินใจอะไร — เพราะถ้าอ่านงบไม่เป็น เครื่องมือที่เหลือก็ใช้ไม่ได้" },
  { lab: "เห็นเงินจริง", title: "Cashflow 4 Layers", p: "มุมมองเงินจริง 4 ชั้น (Cash In → Real Cash → Surplus → Growth Cash) ที่บอกว่าเงินหายไปชั้นไหน และเหลือกี่บาทที่เอาไปโตได้จริง" },
  { lab: "เห็นกำไรที่ใช้ได้จริง", title: "Real Profit Framework", p: "หากำไรจริงที่เจ้าของเอาไปใช้ได้ ไม่ใช่กำไรในบัญชี และตั้งราคาให้ได้กำไรตั้งแต่ต้น (Markup ≠ Margin)" },
  { lab: "อุดรอยรั่วโดยไม่ต้องเร่งยอด", title: "Expense Mapping — 10 จุดรั่วทางการเงิน", p: '10 จุดรั่วทางการเงิน ที่ทำให้ SME ส่วนใหญ่ "ขายดี แต่เงินไม่เหลือ" — พร้อมวิธีตรวจสอบแบบง่าย ๆ ผ่านเครื่องมือเฉพาะที่วินทำไว้ให้' },
  { lab: "ทีมตัดสินใจเองได้", title: "5-Bucket System", p: "แยกเงินเป็น 5 บัญชี (เงินทุนหมุนเวียน เงินสำรอง เงินขยาย เงินเจ้าของ เงินสำรองฉุกเฉิน) ที่ทีมทำตามได้" },
  { lab: "คุยกับแบงก์ได้ตรงจุด", title: "1-Page Business Plan", p: "แผนธุรกิจ 1 หน้า ที่ตอบ 4 คำถามของธนาคาร (Purpose / Repayment / Risk / Control) พร้อมยื่นขอสินเชื่อ" },
];

const dashQuestions = [
  { n: "1", h: "ขายได้เท่าไหร่", p: "ยอดขายจริงเดือนนี้ และเทียบเดือนก่อน" },
  { n: "2", h: "เหลือจริงไหม", p: "กำไรที่เอาไปใช้ได้จริง ไม่ใช่กำไรในบัญชี" },
  { n: "3", h: "รั่วตรงไหน", p: "ค่าใช้จ่ายที่ผิดประเภท กินกำไรเงียบ ๆ" },
  { n: "4", h: "เงินเข้าจริงไหม", p: "ลูกหนี้ค้าง vs เงินสดในมือเทียบยอดขาย" },
  { n: "5", h: "พอโต / พอจ่ายหนี้ไหม", p: "Growth Cash + ความสามารถรับหนี้เพิ่ม" },
];

const sessions = [
  { n: "1", title: "Owner Finance Thinking", p: "เปลี่ยนวิธีคิดจาก Operator สู่ Owner เข้าใจ 4 เสาหลัก (Cashflow / Profit / Capital / Growth)" },
  { n: "2", title: "Business Health Check — ตัวอย่างธุรกิจยอดขาย 205 ล้าน", p: "อ่านงบ 3 ฉบับด้วยสายตาเจ้าของ + ธนาคาร ผ่านเคสจริง 205 ล้าน" },
  { n: "3", title: "Cashflow 4 Layers", p: "เห็นเงินจริง 4 ชั้น เข้าใจว่ากำไรไม่เท่ากับเงินสด" },
  { n: "4", title: "Real Profit & Pricing", p: "กำไรจริง vs กำไรบัญชี + ตั้งราคาให้ได้กำไรตั้งแต่ต้น + Owner Dashboard" },
  { n: "5", title: "Plug the Leaks — 10 จุดรั่ว", p: "Expense Mapping 3 สี อุดรอยรั่วโดยไม่ต้องเร่งยอดขาย" },
  { n: "6", title: "Capital Structure — ระบบ 5 กล่อง", p: "5-Bucket System แยกเงินให้ทีมทำตามได้ — โครงสร้างที่แบงก์เห็นวินัย" },
  { n: "7", title: "Bank View — มุมมองแบงก์", p: "ธนาคารดูอะไร + 4 คำถามของคนให้เงิน + เขียน 1-Page Business Plan" },
];

const stages = [
  { num: "1", stage: "ก่อนเรียน (Online)", title: "Business Health Check", desc: "คอร์สออนไลน์ปูพื้นก่อนเจอกันสด ใช้เวลาประมาณ 2-3 ชั่วโมง เรียนตอนไหนก็ได้ จะมาคลาสสดโดยพื้นฐานพร้อมแล้ว ไม่ต้องเริ่มจากศูนย์", tag: "มูลค่า 5,900 · แถมฟรีเมื่อสมัคร", main: false },
  { num: "2", stage: "เจอกันสด (สัมมนาคลาสเรียน)", title: "Inside Business Finance · 7 Sessions", desc: "สัมมนาสด Workshop ทำบนตัวเลขจริงของธุรกิจคุณ ถาม-ตอบเฉพาะเคส วินช่วยดูให้รายคน ได้เครื่องมือ 100M Method ครบทั้ง 6 ตัว", tag: "★ หัวใจของคลาส", main: true },
  { num: "3", stage: "หลังเรียน (Lifetime)", title: "Online + Community", desc: "กลับไปเปิด Business Health Check ทบทวนได้ตลอดชีพ + เข้า Insider Community ถาม-ตอบหลังเรียนกับวินและเจ้าของธุรกิจคนอื่น", tag: "ไม่มีค่าใช้จ่ายเพิ่ม", main: false },
];

const caseNums = [
  { big: "+90%", lab: "ยอดขาย", change: "107.9M → 205.1M" },
  { big: "+112%", lab: "กำไรสุทธิ", change: "2.6M → 5.6M" },
  { big: "×12", lab: "เงินสดในบัญชี", change: "2.8M → 34.6M" },
];

const compareRows = [
  { label: "สอนอะไร", other: "บันทึกบัญชี ยื่นภาษี ปิดงบ", us: "ออกแบบโครงสร้างเงินทุนเพื่อการเติบโต" },
  { label: "มองจากมุมไหน", other: "มุมการปฏิบัติตามกฎหมาย", us: "มุมเจ้าของธุรกิจ + มุมธนาคาร" },
  { label: "ผลลัพธ์", other: "งบถูกต้อง แต่อ่านแล้วตัดสินใจไม่เป็น", us: "ตัดสินใจขยาย / ใช้สินเชื่อ ได้ทันที" },
  { label: "เหมาะกับใคร", other: "ทุกธุรกิจ (งานหลังบ้าน)", us: "เจ้าของ 30-100M ที่กำลังจะขยาย" },
];

const bonuses = [
  { h: "Template + Dashboard — Real Profit + Cashflow 4 ชั้น", p: "Excel พร้อมสูตร ใส่ตัวเลขแล้วเห็นเงินจริงทันที", val: "4,500.-" },
  { h: "Monthly Finance System — สรุปงบแบบง่าย 5 ช่อง", p: "ดูสุขภาพธุรกิจในหน้าเดียว", val: "2,500.-" },
  { h: "Workbook 7 Sessions", p: "สมุดทำ workshop ทีละหน้า", val: "2,500.-" },
  { h: "Insider Community — ตลอดชีพ", p: "ถาม-ตอบหลังเรียนกับวินและเจ้าของธุรกิจคนอื่น", val: "ประเมินค่าไม่ได้" },
];

const costRows = [
  { item: "เงินที่รั่วเงียบ ๆ ทุกเดือน เพราะมองไม่เห็นจุดรั่ว", cost: "หลักหมื่น–แสน/ปี" },
  { item: "ดอกเบี้ยที่จ่ายแพงเกิน เพราะใช้สินเชื่อผิดประเภท", cost: "หลักหมื่น–แสน/ปี" },
  { item: "โอกาสขยายที่หลุดมือ เพราะไม่กล้าตัดสินใจ", cost: "ประเมินค่าไม่ได้" },
];

const fitYes = [
  "เป็นเจ้าของธุรกิจ ยอดขาย <strong class='text-white'>30–100 ล้าน/ปี</strong> ที่กำลังเตรียมขยาย",
  "มีโอกาสลงทุน 10–50 ล้าน (เปิดสาขา / เครื่องจักร / ระบบ)",
  "อยากใช้สินเชื่อเป็นเครื่องมือ ไม่ใช่เครื่องมือสุดท้ายตอนเงินหมด",
  "ตัดสินใจขยายไม่ลง เพราะมองไม่เห็นว่าธุรกิจรับได้แค่ไหน",
  "อยากเลิกตัดสินใจเรื่องเงินด้วยความรู้สึก",
];
const fitNo = [
  "ยังไม่มีธุรกิจ หรือยอดขายต่ำกว่า 20 ล้าน/ปี",
  "มองหาสูตรลัดรวยเร็ว ไม่อยากลงมือทำ workshop",
  "ต้องการคนทำบัญชีให้ มากกว่าจะเข้าใจเงินด้วยตัวเอง",
];
const fitNote = "ถ้าเข้าข่ายนี้ คลาสนี้อาจยังไม่ใช่จังหวะของคุณ — ทักไลน์มาคุยกับทีมได้ เดี๋ยววินแนะนำทางที่เหมาะกว่าให้";

const faqs = [
  { question: "ทำไมต้องเรียนรอบสด ทำไมไม่ทำเป็นคลาสออนไลน์", answer: 'เพราะคลาสนี้ไม่ใช่การ "ฟังความรู้" แต่คือการ "ลงมือวางระบบ" ทุก workshop ทำบนตัวเลขจริงของธุรกิจคุณ — เห็นเงินจริง หาจุดรั่ว วางระบบเงิน 5 ช่อง ตรงนี้ต้องการการถาม-ตอบเฉพาะเคสแบบทันที และมุมมองที่วินช่วยดูให้เป็นรายคน ซึ่งคลิปอัดไว้ตอบแทนไม่ได้ ส่วนคอร์สออนไลน์ Business Health Check ที่แถมไป เป็นเครื่องมือทบทวนหลังจบสัมมนาสด ไม่ใช่ตัวคลาสหลัก' },
  { question: '"100M Method" คืออะไร', answer: "ระบบ 6 เครื่องมือที่วินใช้ออกแบบกลยุทธ์การเงินให้ธุรกิจ SME ขนาด 30–100 ล้าน/ปี — ประกอบด้วย Business Health Reading (อ่านงบเห็นสัญญาณ), Cashflow 4 Layers, Real Profit Framework, Expense Mapping, 5-Bucket System และ 1-Page Business Plan" },
  { question: "เคส 205 ล้านในคลาสคือเคสจริงไหม", answer: "เคสจริง เป็นงบการเงินบริษัทจริง 2 ปีติด ที่วินจะเดินทีละบรรทัดในคลาส ตั้งแต่งบกำไรขาดทุน, EBITDA, การหาค่าเสื่อมราคาที่ซ่อนในหมายเหตุประกอบงบ ไปจนถึงการ reconstruct Cash Flow" },
  { question: "ธุรกิจผม 25 ล้าน เรียนได้ไหม", answer: "เรียนได้ ถ้าเป็นธุรกิจที่เป็นบริษัทฯ หรือมีงบการเงินของธุรกิจแล้วสามารถเรียนได้ โดยไม่จำเป็นที่ต้องมียอดขาย 30 ล้านบาท" },
  { question: "ไม่มีพื้นฐานบัญชี เรียนเข้าใจไหม", answer: "เข้าใจได้ คลาสนี้ออกแบบมาเพื่อเจ้าของธุรกิจที่ไม่ใช่นักบัญชีโดยเฉพาะ — วินแปลภาษาการเงินให้เป็นภาษาที่ใช้ตัดสินใจได้จริง" },
  { question: "ต้องเอางบการเงินบริษัทมาด้วยไหม", answer: "แนะนำให้เตรียมงบการเงินและ Bank Statement ล่าสุดมาด้วย เพราะ workshop ในคลาสจะทำบนตัวเลขจริงของธุรกิจคุณ" },
  { question: "แพ็คเกจมาเป็นคู่คืออะไร", answer: "ราคา 19,900 สำหรับ 2 ท่าน เหมาะกับการพาคู่คิดทางธุรกิจ มือขวา หรือคนที่ดูแลการเงินมาเรียนด้วยกัน" },
  { question: "คลาสนี้รับประกันว่าเรียนแล้วธุรกิจจะดีขึ้นไหม", answer: "คลาสนี้ให้ระบบและเครื่องมือ เพื่อให้คุณเห็นเงินจริงและตัดสินใจได้ดีขึ้น — ผลลัพธ์จริงขึ้นอยู่กับการนำไปลงมือทำกับธุรกิจของคุณเอง วินไม่รับประกันผลตายตัว แต่รับประกันว่าคุณจะเห็นธุรกิจตัวเองชัดขึ้นมาก" },
];

export default function InsideBusinessFinancePage() {
  return (
    <main className="bg-black min-h-screen text-gray-50 flex flex-col selection:bg-yellow-400/30">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative w-full bg-black pt-8 md:pt-12 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] max-w-[120vw] h-[420px] bg-yellow-500/10 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="mkt-stagger-load relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] border border-yellow-400/20 mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.hero.heroImage} alt={d.hero.heroAlt ?? "Inside Business Finance"} className="w-full h-auto block" loading="eager" />
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block border border-yellow-400/30 text-yellow-300/90 rounded-full px-5 py-2 text-sm font-medium mb-6 tracking-wide">
              คลาสสัมมนาสด · 7 Sessions · สำหรับเจ้าของธุรกิจ 30–100 ล้าน
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
              ธุรกิจ 30–100 ล้าน ส่วนใหญ่ไม่ได้เจ๊งเพราะขายไม่ได้
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">แต่เพราะโครงสร้างเงินทุนตามการเติบโตไม่ทัน</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 font-medium">
              ไม่ใช่คลาสบัญชี ไม่ใช่ทฤษฎีการเงิน — แต่คือระบบ <strong className="text-white">100M Method</strong> ที่ทำให้คุณตัดสินใจเรื่องเงินก้อนใหญ่ของธุรกิจได้ด้วยตัวเอง
            </p>
            <p className="text-base text-gray-400 leading-relaxed mb-8">
              สอนโดยวิน — อดีต RM 7 ปี เขียนเคสสินเชื่อรวมหลักพันล้าน และปัจจุบันเป็นเจ้าของธุรกิจที่สร้างขึ้นด้วยสินเชื่อหลักร้อยล้าน
            </p>

            <div className="flex flex-wrap justify-center divide-x divide-zinc-800 border-y border-zinc-800 py-5 mb-8">
              {winStats.map((s, i) => (
                <div key={i} className="px-5 md:px-8">
                  <div className="text-2xl md:text-3xl font-black text-yellow-400 tabular-nums">{s.big}</div>
                  <div className="text-xs text-gray-400 mt-1 max-w-[120px]">{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* dual-layer positioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-9">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 text-left">
              <p className="font-bold text-yellow-400 mb-1.5">คนเดียวที่เห็นทั้ง 2 ฝั่ง</p>
              <p className="text-sm text-gray-300 leading-relaxed">วินเป็นทั้งอดีต RM ธนาคาร รู้วิธีคิดของฝ่ายพิจารณาเครดิต และเจ้าของธุรกิจจริง ที่ใช้สินเชื่อหลักร้อยล้านสร้างธุรกิจของตัวเอง</p>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 text-left">
              <p className="font-bold text-yellow-400 mb-1.5">คิดแบบเจ้าของ พูดแบบเจ้าของเข้าใจ</p>
              <p className="text-sm text-gray-300 leading-relaxed">ไม่ใช่ทฤษฎี ไม่ใช่ภาษาบัญชี — เป็นวิธีคิดที่แปลตัวเลขในงบ ให้กลายเป็นการตัดสินใจที่คุณใช้กับธุรกิจได้ทันที</p>
            </div>
          </div>

          <div className="text-center">
            <a href="#pricing" className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold rounded-full bg-[length:200%_100%] bg-[linear-gradient(110deg,#facc15,#facc15_40%,#fef9c3_50%,#facc15_60%,#facc15)] animate-glass-shine text-black transition-transform hover:scale-105 shadow-[0_10px_30px_-5px_rgba(250,204,21,0.45)]">
              สมัครรอบ Early Bird — 15,900.-
            </a>
            <p className="text-sm text-gray-500 mt-4">จากราคาเต็ม 25,900.- · จำนวนที่นั่งจำกัดต่อรอบ</p>
          </div>
        </div>
      </section>

      {/* ═══ 2. PAIN ═══ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-red-500/20">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-red-400/80 mb-3">เจ้าของธุรกิจที่กำลังจะขยาย มักเจอ 4 เรื่องนี้</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-5 leading-tight">ไม่ได้กลัวโต<br />แต่กลัวโตแล้วพัง</h2>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">ปัญหาของธุรกิจ 30–100 ล้าน ต่างจากธุรกิจเล็กกว่า — ไม่ใช่เรื่อง "เงินไม่พอ" แต่คือ "ตัดสินใจเรื่องเงินก้อนใหญ่ทุกครั้งโดยไม่มีระบบรองรับ"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <div key={i} className="bg-red-900/10 border-l-4 border-red-500 rounded-r-2xl p-5 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{p.t}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{p.p}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xl md:text-2xl font-bold text-white mt-12 leading-relaxed">ถ้าคุณกำลังเจอเรื่องแบบนี้ — ปัญหาไม่ได้อยู่ที่คุณบริหารไม่เก่ง</p>
        </div>
      </section>

      {/* ═══ 3. DIAGNOSIS ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">ปัญหาที่แท้จริง</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">ปัญหาคือ "โครงสร้างเงินทุน"<br />ตามการเติบโตไม่ทัน</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">ธุรกิจ 30–100 ล้าน คือจุดที่ความซับซ้อนทางการเงินเริ่มเกินตัวเจ้าของ:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {diagnosisFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <ChevronRight className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">สิ่งที่ขาดไม่ใช่ "ทักษะอ่านงบการเงิน" แต่คือ <strong className="text-white">"โครงสร้างเงินทุนที่ถูกออกแบบมาเพื่อโต"</strong> ที่บอกได้ว่าเงินแต่ละก้อนเป็นของช่องไหน ขยายได้เท่าไหร่ ใช้สินเชื่อแบบไหนถึงจะเหมาะ</p>
          <div className="border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-2xl p-6 text-left">
            <p className="text-lg md:text-xl font-semibold text-yellow-100/90 leading-relaxed">Inside Business Finance ไม่ใช่คลาสบัญชี และไม่ใช่ทฤษฎีการเงินมาตรฐาน — แต่คือระบบที่แปลภาษาการเงิน ให้กลายเป็นการตัดสินใจที่เจ้าของทำได้ทันที</p>
          </div>
        </div>
      </section>

      {/* ═══ 4. OUTCOME ═══ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">หลังเรียนจบ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">5 อย่างที่คุณจะทำต่างไปจากเดิม</h2>
          <p className="text-base text-gray-400 text-center mb-12">ไม่ใช่ความรู้ที่ต้องท่องจำ — แต่คือวิธีตัดสินใจใหม่ที่ใช้ทุกเดือน</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outcomes.map((o, i) => (
              <div key={i} className="flex items-start gap-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                <span className="text-2xl md:text-3xl font-black text-yellow-400 leading-none shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1">{o.h}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{o.p}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-lg md:text-xl font-bold text-white mt-10">5 อย่างนี้ — <span className="text-yellow-400">คือนิสัยใหม่ที่จะติดตัวคุณไปตลอด</span></p>
          <JumpCTA />
        </div>
      </section>

      {/* ═══ 5. 100M METHOD ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">ในคลาสคุณจะได้เครื่องมือครบชุด</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">100M Method — ระบบ 6 เครื่องมือ</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-8">ทำงานต่อยอดกันเป็นลำดับ — อ่านงบเห็นสัญญาณ → เห็นเงิน → เห็นกำไร → ปิดรั่ว → แยกระบบ → คุยกับธนาคาร</p>
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6 mb-10 max-w-3xl mx-auto text-gray-300 leading-relaxed text-sm md:text-base">
            <strong className="text-yellow-400">ทำไมชื่อ "100M Method"</strong> — เพราะระบบนี้ออกแบบมาสำหรับธุรกิจ SME ขนาด <strong className="text-white">30–100 ล้าน/ปี</strong> — สเกลที่ "ใหญ่พอจะมีจุดรั่วซ่อน แต่เล็กพอที่เจ้าของจะแก้ได้เอง" และเป็นช่วงที่ตัดสินใจเรื่องโครงสร้างเงินทุนผิด 1 ครั้ง อาจกินกำไรหลายล้าน
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tools.map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 md:p-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-black font-extrabold shrink-0">{i + 1}</span>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-yellow-400 mb-1"><ChevronRight className="w-3.5 h-3.5 shrink-0" />{t.lab}</div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5">{t.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. OWNER DASHBOARD ═══ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">ไฮไลท์: เครื่องมือเฉพาะที่วินทำให้คุณ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">Owner Money Dashboard — 10 ช่อง</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-8">ดูธุรกิจแบบเจ้าของ ไม่ใช่ดูแค่งบแบบบัญชี — เจ้าของไม่จำเป็นต้องดูตัวเลขทุกบรรทัด แต่ต้องรู้ 10 ช่องนี้ เพราะมันตอบคำถามสำคัญ 5 ข้อ ก่อนตัดสินใจอะไร</p>
          <div className="flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/40 rounded-2xl p-5 text-center text-yellow-300 font-semibold mb-8"><ShieldCheck className="w-5 h-5 shrink-0" /> 10 ช่อง = 5 คำถามที่เจ้าของต้องตอบได้ทุกเดือน</div>
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl border border-yellow-400/20 shadow-[0_0_40px_-12px_rgba(250,204,21,0.18)] mb-8 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ibf-owner-dashboard.webp" alt="Owner Money Dashboard 10 ช่อง" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {dashQuestions.map((q, i) => (
              <div key={i} className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black font-extrabold mx-auto mb-2">{q.n}</div>
                <h3 className="text-sm font-bold text-yellow-400 mb-1">{q.h}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">{q.p}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-base md:text-lg text-gray-300 mt-10 pt-8 border-t border-white/10 leading-relaxed">เปิดดูครั้งเดียวต่อเดือน — รู้ทันทีว่าเดือนนี้ธุรกิจคุณ <strong className="text-yellow-400">"แข็งแรง / ทรง / อ่อนแรง"</strong> และต้องโฟกัสเรื่องไหนก่อน — ก่อนจะตัดสินใจขยาย กู้ ลงทุน หรือเบรก</p>
        </div>
      </section>

      {/* ═══ 7. PROGRAM 7 SESSIONS ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">โครงสร้างหลักสูตร</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">7 Sessions — เรียนเป็นระบบ ไม่ใช่เป็นเทคนิค</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-12">คลาสสัมมนาสด เรียนต่อเนื่อง แต่ละ Session ต่อยอดจากอันก่อน เพราะการเห็นเงินจริงคือ "ระบบ" ไม่ใช่เคล็ดลับเดี่ยว ๆ</p>
          <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-4 md:p-5 bg-zinc-900/50">
                <span className="flex flex-col items-center justify-center min-w-[58px] rounded-lg bg-yellow-400 text-black font-extrabold text-[11px] leading-tight py-2 text-center shrink-0">Session<span className="text-base">{s.n}</span></span>
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. LEARNING PATH ═══ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">รูปแบบการเรียน 3 ช่วง</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">ไม่มีพื้นฐานบัญชีก็เรียนได้</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-12">เริ่มต้นด้วย Online ปรับพื้นฐาน → เจอกันสดเพื่อลงมือทำ → ทบทวนได้ตลอดชีพ</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stages.map((s, i) => (
              <div key={i} className={`rounded-2xl p-6 ${s.main ? "bg-gradient-to-br from-yellow-500/20 to-zinc-900 border-2 border-yellow-500/50 shadow-[0_0_30px_-10px_rgba(250,204,21,0.3)]" : "bg-zinc-900 border border-zinc-800"}`}>
                <div className="text-3xl font-black text-yellow-400 leading-none mb-3">{s.num}</div>
                <div className="text-xs font-bold tracking-widest uppercase text-yellow-400/70 mb-2">{s.stage}</div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{s.desc}</p>
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg ${s.main ? "bg-yellow-400 text-black" : "bg-green-500/10 text-green-400"}`}>{s.tag}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-base md:text-lg text-gray-300 font-medium mt-10 pt-8 border-t border-white/10 leading-relaxed">ไม่มีพื้นฐานบัญชี? — เรียน online ก่อน วันเจอจริงจะได้ต่อยอดได้เลย<br className="hidden sm:block" />คอร์สนี้ออกแบบมาเพื่อเจ้าของธุรกิจที่ไม่ใช่นักบัญชีโดยเฉพาะ</p>
        </div>
      </section>

      {/* ═══ 8.5 POSTER RECAP ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">สรุปแบบจับต้องได้</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 leading-tight">เหมาะกับใคร · ได้อะไรกลับบ้าน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {["/images/ibf_course.webp", "/images/ibf_uhav.webp"].map((src, i) => (
              <div key={i} className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-yellow-400/20 shadow-[0_0_40px_-12px_rgba(250,204,21,0.18)] bg-zinc-900 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Inside Business Finance — สรุปคอร์ส" className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 border border-yellow-400/20 group-hover:border-yellow-400/60 z-20 rounded-2xl md:rounded-3xl transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. PRICING ═══ */}
      <section id="pricing" className="relative w-full bg-black py-16 md:py-24 border-t border-yellow-500/30 overflow-hidden scroll-mt-24">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] max-w-[120vw] h-[520px] bg-yellow-500/[0.08] blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="relative mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/40 rounded-full px-5 py-2 text-center text-red-300 text-sm font-bold mb-8 max-w-md mx-auto animate-pulse shadow-[0_0_20px_-6px_rgba(239,68,68,0.5)]"><Flame className="w-4 h-4 text-red-400 shrink-0" />รอบ Early Bird — จำนวนที่นั่งจำกัดต่อรอบ</div>

          <div className="bg-zinc-900 border-2 border-yellow-500/50 rounded-2xl p-8 md:p-10 text-center relative shadow-[0_0_40px_-10px_rgba(250,204,21,0.3)] max-w-lg mx-auto mb-12">
            <div className="absolute -top-4 inset-x-0 flex justify-center"><span className="bg-yellow-500 text-black font-bold py-1.5 px-6 rounded-full text-sm tracking-wide uppercase">★ Early Bird ★</span></div>
            <div className="mt-4 text-gray-400 text-lg">จากราคาเต็ม <s className="text-gray-500">25,900.-</s></div>
            <div className="text-5xl md:text-6xl font-black text-white tracking-tight my-2 tabular-nums"><span className="text-2xl align-top text-yellow-400">฿</span>15,900</div>
            <p className="text-sm text-gray-500 mb-5">7 Sessions + 100M Method + โบนัสมูลค่า 15,400+</p>
            <div className="bg-black/60 border border-dashed border-yellow-500/40 rounded-xl p-4 text-sm text-gray-300 mb-6"><strong className="text-white">แพ็คเกจมาเป็นคู่ (2 ท่าน) 19,900.-</strong><br />พามือขวาหรือคู่คิดทางธุรกิจมาด้วยกัน</div>
            <a href={LINE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-8 py-5 text-lg md:text-xl font-bold rounded-full bg-[length:200%_100%] bg-[linear-gradient(110deg,#facc15,#facc15_40%,#fef9c3_50%,#facc15_60%,#facc15)] animate-glass-shine text-black transition-transform hover:scale-[1.02] shadow-[0_10px_30px_-5px_rgba(250,204,21,0.45)]">สมัครเรียน Early Bird</a>
            <p className="flex items-start justify-center gap-1.5 text-xs text-gray-500 mt-4 leading-relaxed"><MessageCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>ยังไม่แน่ใจ? ทักไลน์ปรึกษาทีมที่ปรึกษาฟรีก่อนตัดสินใจ — ไม่มีค่าใช้จ่ายเบื้องต้น</span></p>
          </div>

          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-5">โบนัสเฉพาะรอบนี้ — มูลค่ารวม 15,400+ บาท</p>
          <div className="bg-gradient-to-br from-yellow-500/20 to-zinc-900 border-2 border-yellow-500/40 rounded-2xl p-6 md:p-7 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-yellow-400 mb-2"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> โบนัสไฮไลท์ — แถมฟรี</div>
            <h3 className="text-lg font-bold text-white mb-1">คอร์สออนไลน์ "Business Health Check" — ฟรี</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">ปูพื้นก่อนเจอกันสด เรียนซ้ำได้ตลอดชีพ</p>
            <span className="inline-block bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-lg text-sm">มูลค่า 5,900 บาท · ฟรี</span>
          </div>
          <div className="space-y-3 mb-6">
            {bonuses.map((b, i) => (
              <div key={i} className="flex justify-between gap-4 items-start bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div>
                  <h3 className="flex items-start gap-2 text-sm md:text-base font-bold text-white mb-0.5"><Gift className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /><span>{b.h}</span></h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.p}</p>
                </div>
                <span className="text-green-400 font-bold text-sm whitespace-nowrap">{b.val}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-black border border-zinc-800 rounded-xl p-5 mb-12 font-bold text-white">
            <span>มูลค่าโบนัสรวมทั้งหมด</span>
            <span className="text-2xl text-yellow-400 tabular-nums">15,400+ บาท</span>
          </div>

          <p className="text-center text-base text-gray-400 mb-5">ก่อนดูราคาคลาส ลองดูต้นทุนของการไม่รู้</p>
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 bg-zinc-950 text-center text-sm font-bold text-gray-300">ราคาที่ต้องจ่าย ถ้ายังเดาเรื่องเงินต่อไป</div>
            {costRows.map((r, i) => (
              <div key={i} className="flex justify-between gap-4 p-4 border-t border-zinc-800 text-sm">
                <span className="text-gray-300">{r.item}</span>
                <span className="text-red-300 font-semibold whitespace-nowrap">{r.cost}</span>
              </div>
            ))}
            <div className="flex justify-between gap-4 p-4 border-t border-zinc-800 text-sm bg-yellow-500/5">
              <span className="text-white font-semibold">คลาส Inside Business Finance (Early Bird)</span>
              <span className="text-green-400 font-bold whitespace-nowrap">15,900 บาท</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10. WHO IS THIS FOR ═══ */}
      <div className="mkt-reveal js-reveal">
        <WhoIsThisFor heading="เหมาะกับคุณ ถ้า…" yesItems={fitYes} noItems={fitNo} noFootnote={fitNote} />
      </div>

      {/* ═══ 11. PROOF — CASE 205M ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">ตัวอย่างวิธีคิดที่จะเดินในคลาส</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">เคสจริง — ตัวเลข "ดูดี" แต่ใต้น้ำเป็นอีกเรื่อง</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-12">ในคลาสวินจะเดินงบจริงทีละบรรทัด ให้เห็นว่าตัวเลขที่ "ดูดี" ซ่อนอะไรไว้ใต้น้ำ</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <div className="text-xs font-bold tracking-widest uppercase text-yellow-400/80 mb-2">เคสจริง · งบการเงิน 2 ปีติด · ยอดขาย 205 ล้าน</div>
            <div className="grid grid-cols-3 gap-3 my-5">
              {caseNums.map((n, i) => (
                <div key={i} className="bg-black/50 border border-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-xl md:text-2xl font-extrabold text-green-400 tabular-nums">{n.big}</div>
                  <div className="text-xs text-gray-400 mt-1">{n.lab}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 tabular-nums">{n.change}</div>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3"><strong className="text-red-400">แต่ใต้น้ำ:</strong> CFO ติดลบ −5 ล้าน · สต็อกบวม +15.5 ล้าน · หนี้พุ่ง +42.7 ล้านในปีเดียว — เงินสด 34.6 ล้านส่วนใหญ่มาจาก "การกู้" ไม่ใช่จากธุรกิจ</p>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed"><strong className="text-green-400">จุดหักมุม:</strong> หนี้ 70 ล้านส่วนใหญ่เป็นเงินกู้กรรมการ ไม่ใช่หนี้แบงก์ — บทเรียน "หนี้ไม่เท่ากันทุกก้อน" วินเดินทีละบรรทัด ตั้งแต่ EBITDA, ค่าเสื่อมที่ซ่อนในหมายเหตุ ไปจนถึง reconstruct Cash Flow</p>
          </div>
          <p className="text-center text-base text-gray-400 leading-relaxed">นี่คือวิธีคิดที่คุณจะได้เดินบนตัวเลขจริงในคลาส — เห็นสิ่งที่งบ "ไม่ได้บอก"</p>
        </div>
      </section>

      {/* ═══ 12. SOCIAL PROOF (media untouched) ═══ */}
      <VideoTestimonials videos={d.videos} heading={d.videoHeading} vertical />
      <PhotoTestimonials photos={d.photos} heading={d.photoHeading} />
      {d.seminarImages && <SeminarGallery images={d.seminarImages} />}

      {/* ═══ 13. WHO IS WIN ═══ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">ทำไมต้องเรียนกับวิน</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 leading-tight">คนรู้การเงินมีเยอะ<br />แต่คนที่แปลให้ SME ตัดสินใจได้ มีน้อย</h2>

          <div className="space-y-5 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>ก่อนวินจะออกมาทำธุรกิจของตัวเอง วินทำงานเป็น RM อยู่ 7 ปี หน้าที่ของวินคือวิเคราะห์เครดิตก่อนที่ธนาคารจะอนุมัติสินเชื่อ — เป็นคนเขียนแผนธุรกิจ วิเคราะห์งบการเงิน และประเมินความสามารถในการกู้และการจ่ายหนี้คืน ก่อนส่งเคสขึ้นไปขออนุมัติ</p>
            <p>ตลอด 7 ปีนั้น วินวิเคราะห์งบการเงินมาเป็นร้อยบริษัท และเขียนเคสขอสินเชื่อรวมกันหลักพันล้านบาท</p>
            <p>จนวันที่วินออกจากธนาคารมาเป็นเจ้าของธุรกิจเอง — ลงทุนสร้างธุรกิจขึ้นด้วยสินเชื่อหลักร้อยล้าน วินถึงได้ <strong className="text-white">รู้สึก</strong> ถึงสิ่งที่ตอนเป็น RM มองจากนอกกระจก:</p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-2xl p-6 my-8 space-y-3">
            {winFeels.map((f, i) => (
              <p key={i} className="flex items-start gap-3 text-gray-200 italic leading-relaxed">
                <ChevronRight className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
                <span>{f}</span>
              </p>
            ))}
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">และนั่นคือจุดที่ทำให้วินตัดสินใจกลับมาเปิดสิ่งที่อยู่ "หลังโต๊ะทำงานในแบงก์" ให้เจ้าของธุรกิจได้เห็น</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-zinc-900/80 border border-yellow-500/20 rounded-2xl p-6">
              <h4 className="text-base font-bold text-yellow-400 mb-2">มุมที่ 1 — Founder&apos;s Banker</h4>
              <p className="text-sm text-gray-300 leading-relaxed">วินไม่ใช่คนเซ็นอนุมัติ แต่คือคนที่หาโอกาสและมุม ให้เจ้าของธุรกิจได้วงเงินที่เขาต้องการจริง — รู้ว่าฝ่ายพิจารณาเครดิตอ่านอะไรก่อน อ่านอะไรทีหลัง</p>
            </div>
            <div className="bg-zinc-900/80 border border-yellow-500/20 rounded-2xl p-6">
              <h4 className="text-base font-bold text-yellow-400 mb-2">มุมที่ 2 — Risk Closer</h4>
              <p className="text-sm text-gray-300 leading-relaxed">และพร้อมกันนั้น ต้องเป็นคนปิดความเสี่ยงให้ธนาคารไม่เจ็บ — รู้ว่าดีลแบบไหนเข้าหัวคณะกรรมการ ดีลแบบไหนถูกตีกลับตั้งแต่หน้าแรก</p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-7">
            <h3 className="text-sm font-bold text-yellow-400 mb-3">วินคือใคร</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {[
                "อดีต RM (Relationship Manager) — K SME Star Award หลายปีต่อเนื่อง",
                "เจ้าของธุรกิจสถานีบริการน้ำมัน PTT OR, ร้าน Café Amazon และร้าน 7-Eleven",
                "ที่ปรึกษาผู้บริหารสถานีบริการน้ำมัน Shell และที่ปรึกษาเจ้าของธุรกิจ SME",
                "ผู้วิเคราะห์งบการเงินและเขียนแผนธุรกิจสำหรับขอสินเชื่อธนาคาร",
                "Founder WinWin Wealth Creation",
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="text-yellow-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 14. COMPARE ═══ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="mkt-reveal js-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">คลาสนี้ต่างจากที่อื่นยังไง</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 leading-tight">ทำไมเรียนการเงินมาแล้ว ยังตัดสินใจไม่เป็น</h2>
          <p className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-12">เพราะคอร์สการเงินทั่วไปกับนักบัญชี ตอบคนละโจทย์กับสิ่งที่เจ้าของต้องการ</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-zinc-900 rounded-2xl overflow-hidden min-w-[560px] border border-zinc-800">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm font-bold text-gray-400 bg-zinc-950">เปรียบเทียบ</th>
                  <th className="p-4 text-left text-sm font-bold text-gray-300 bg-zinc-950">คอร์สบัญชี</th>
                  <th className="p-4 text-left text-sm font-bold text-black bg-yellow-400">Inside Business Finance</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={i} className="border-t border-zinc-800">
                    <td className="p-4 align-top text-sm font-bold text-white bg-zinc-950/60">{r.label}</td>
                    <td className="p-4 align-top text-sm text-gray-400">{r.other}</td>
                    <td className="p-4 align-top text-sm font-semibold text-yellow-100 bg-yellow-500/5">{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 border-l-4 border-yellow-500 bg-yellow-500/5 rounded-r-2xl p-6">
            <p className="text-base md:text-lg font-semibold text-yellow-100/90 leading-relaxed">คนที่สอนบัญชีการเงินมีเยอะ แต่วินคือคนที่แปลการเงินให้ SME เห็นภาพ เพื่อใช้ในการตัดสินใจทางธุรกิจ</p>
          </div>
          <p className="text-center text-xl md:text-2xl font-bold text-white mt-8 leading-relaxed">และคลาสนี้ — เราไม่ได้สอนบัญชี<br /><span className="text-base md:text-lg font-medium text-gray-400">ทำมาเพื่อเจ้าของธุรกิจโดยเฉพาะ</span></p>
          <JumpCTA />
        </div>
      </section>

      {/* ═══ 15. FAQ ═══ */}
      <div className="mkt-reveal js-reveal">
        <FAQAccordion faqs={faqs} eyebrow="คำถามที่พบบ่อย" heading="เรื่องที่เจ้าของธุรกิจมักถามก่อนสมัคร" subtitle="มีคำถามเพิ่มเติม ทักไลน์ @WIN_WIN ได้เลย" />
      </div>

      {/* ═══ 16. LETTER + FINAL CTA ═══ */}
      <section id="cta" className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="mkt-reveal js-reveal max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-yellow-400/80 mb-3">จากวินถึงคุณ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">7 Sessions นี้ จะเปลี่ยนวิธีที่คุณตัดสินใจเรื่องเงินไปตลอด</h2>
          <div className="space-y-5 text-base md:text-lg text-gray-400 leading-relaxed text-left max-w-2xl mx-auto">
            <p>วินรู้ว่าการตัดสินใจลงเรียนสักคลาส ไม่ใช่เรื่องง่าย แต่สิ่งที่วินรู้แน่ ๆ คือ การบริหารธุรกิจขนาด 30–100 ล้านโดย "เดาทาง" เรื่องโครงสร้างเงินทุน มันแพงกว่ามาก</p>
            <p>แพงที่เงินที่รั่วทุกเดือนโดยไม่รู้ตัว แพงที่ดอกเบี้ยจากสินเชื่อผิดประเภท แพงที่โอกาสขยายที่หลุดมือ และแพงที่สุดคือ ความรู้สึกที่เริ่มไม่มั่นใจในธุรกิจที่ตัวเองสร้างมากับมือ</p>
            <p>หลังจบคลาสนี้ คุณจะไม่ตัดสินใจเรื่องเงินด้วยความรู้สึกอีกต่อไป เพราะคุณจะมีระบบที่ทำให้เห็นทุกอย่างชัด — และรู้ว่าต้องทำอะไรต่อ</p>
            <p className="text-gray-300">วินจะรอเจอคุณในคลาสค่ะ</p>
          </div>
          <p className="mt-8 font-bold text-yellow-400">วิน — กวินทร์รัศม์ นิธิกรภาคย์<br /><span className="block text-xs font-normal text-gray-500 mt-1">ผู้ก่อตั้ง Inside Business Finance — WinWin Wealth Creation</span></p>
          <div className="mt-10">
            <a href={LINE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold rounded-full bg-[length:200%_100%] bg-[linear-gradient(110deg,#facc15,#facc15_40%,#fef9c3_50%,#facc15_60%,#facc15)] animate-glass-shine text-black transition-transform hover:scale-105 shadow-[0_10px_30px_-5px_rgba(250,204,21,0.45)]">สมัครเรียน Early Bird — 15,900.-</a>
            <p className="text-sm text-gray-500 mt-4">หรือทักไลน์ <strong className="text-yellow-400">@WIN_WIN</strong> เพื่อปรึกษาทีมที่ปรึกษาฟรีก่อนตัดสินใจ — ไม่มีค่าใช้จ่ายเบื้องต้น</p>
            <p className="text-sm text-gray-500 mt-3">รอบสัมมนาถัดไป — ทักไลน์เช็ควันและที่นั่งว่างได้เลย · รับจำนวนจำกัด</p>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 mt-12 text-left">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">หมายเหตุ</p>
            <p className="text-gray-500 text-xs leading-relaxed">คลาสนี้ให้ความรู้และเครื่องมือสำหรับบริหารการเงินธุรกิจและประเมินตัวเอง ไม่ใช่การรับประกันผลการอนุมัติสินเชื่อหรือผลประกอบการ ผลลัพธ์จริงขึ้นอยู่กับสถานะการเงินของแต่ละธุรกิจและเงื่อนไขของแต่ละธนาคาร · Cashflow 4 Layers เป็นกรอบการตัดสินใจเชิงบริหาร (Management Framework) ไม่ใช่มาตรฐานบัญชี และไม่ได้ใช้แทนงบการเงินตามมาตรฐาน IFRS/TFRS</p>
          </div>
        </div>
      </section>

      {/* ═══ 17. CONTACT ═══ */}
      {/* PaymentChannels ซ่อนไว้ชั่วคราว — เปิดกลับได้โดยลบคอมเมนต์
      <PaymentChannels ctaText="สมัครเรียนเลย — 15,900 บาท" ctaHref={LINE} /> */}
      <ContactCTA />

      <div className="h-16 bg-black" aria-hidden="true" />

      <ScrollReveal />
      <noscript>
        <style>{`.mkt-reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* ═══ STICKY CTA BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur border-t border-yellow-500/30 px-4 py-2.5 flex items-center justify-center gap-4 flex-wrap shadow-[0_-4px_18px_rgba(0,0,0,0.5)]">
        <span className="text-sm font-bold text-white tabular-nums">
          <s className="text-gray-500 font-normal mr-1.5">25,900.-</s>
          <span className="text-yellow-400">Early Bird 15,900.-</span>
        </span>
        <a href="#pricing" className="bg-[length:200%_100%] bg-[linear-gradient(110deg,#facc15,#facc15_40%,#fef9c3_50%,#facc15_60%,#facc15)] animate-glass-shine text-black font-bold px-6 py-2.5 rounded-full text-sm transition-transform hover:scale-105 shadow-[0_0_18px_-4px_rgba(250,204,21,0.6)]">สมัครรอบนี้</a>
      </div>
    </main>
  );
}
