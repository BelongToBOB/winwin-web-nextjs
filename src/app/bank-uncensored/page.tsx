import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";
import PaymentChannels from "@/components/sections/PaymentChannels";
import ContactCTA from "@/components/sections/ContactCTA";
import HeroSlider from "@/components/ui/HeroSlider";
import PromoPopup from "@/components/ui/PromoPopup";

export const metadata: Metadata = {
  title: "Bank Uncensored Online — ความลับที่แบงก์ไม่เคยบอก | WinWin Wealth",
  description:
    "คลาสออนไลน์ 4 ชั่วโมง สอนโดยอดีต RM ธนาคาร 7 ปี เรียนจบ เช็คตัวเองได้ทันทีว่าพร้อมกู้แค่ไหน",
};

export default function BankUncensoredPage() {
  const faqs = [
    { question: "ถ้าเข้าวันสด 20 พ.ค. ไม่ได้ ทำยังไง?", answer: "ไม่ต้องห่วงค่ะ ทุกคนที่สมัครจะได้วิดีโอบันทึกการสอนเต็ม หลังคลาสจบ ดูย้อนหลังได้ตลอด รวมถึง Recap Q&A วันที่ 25 มิถุนายน 2569 ก็มีบันทึกให้ดูเช่นกัน" },
    { question: "สมัครวันนี้ ระหว่างรอวันที่ 20 พ.ค. จะได้อะไรก่อนไหม?", answer: "ได้ค่ะ หลังสมัครและยืนยันการชำระเงิน คุณจะได้รับ Ebook \"คู่มืออ่านงบการเงินฉบับเจ้าของธุรกิจ\" + Template Excel คำนวณวงเงินกู้ทันที" },
    { question: "คอร์สนี้ต่างจากคลาสสด Inside Bank 27,900 ยังไง?", answer: "คลาสออนไลน์นี้คือ \"เช็คก่อนกู้\" สอนให้คุณรู้ว่าธุรกิจตัวเองพร้อมแค่ไหน ส่วนคลาสสด 27,900 คือ \"วางโครงสร้างก่อนและหลังการกู้\" วินวิเคราะห์งบการเงินของธุรกิจคุณเอง" },
    { question: "ไม่มีพื้นฐานบัญชี เรียนเข้าใจไหม?", answer: "เข้าใจค่ะ คลาสนี้ออกแบบมาสำหรับ \"เจ้าของธุรกิจ\" ไม่ใช่นักบัญชี วินจะสอนให้อ่านงบในมุมเจ้าของ โฟกัสเฉพาะตัวเลขที่ธนาคารดู" },
    { question: "เหมาะกับธุรกิจขนาดไหน?", answer: "เจ้าของธุรกิจที่มียอดขาย 10–70 ล้านบาท/ปี เป็นกลุ่มหลัก ถ้ายอดขายต่ำกว่า 10 ล้าน/ปี เรียนได้ ถ้าเกิน 70 ล้าน แนะนำ InsideBank Workshop หรือ Private Consult" },
    { question: "ถ้ายังไม่เคยกู้เลย เรียนได้ไหม?", answer: "ได้ค่ะ คลาสนี้เหมาะมากสำหรับคนที่ \"กำลังจะกู้ครั้งแรก\" เพราะจะทำให้คุณเตรียมตัวถูกตั้งแต่แรก" },
    { question: "Insider Community เข้าได้นานแค่ไหน?", answer: "เข้าได้ตลอดชีพค่ะ ตราบใดที่ Bank Uncensored ยังเปิดดำเนินการ" },
    { question: "ใช้ใบเสร็จลดหย่อนภาษีได้ไหม?", answer: "ออกใบเสร็จในนามบริษัทได้ค่ะ สามารถนำไปลงค่าใช้จ่ายในงบของบริษัทได้ตามปกติ" },
    { question: "ชำระเงินยังไง?", answer: "โอนผ่านบัญชีธนาคาร / สแกน QR Code / หรือชำระผ่านบัตรเครดิต หลังโอนแล้วส่งสลิปในไลน์ @WIN_WIN จะมีแอดมินยืนยันภายใน 24 ชั่วโมง" },
    { question: "คลาสนี้รับประกันว่าเรียนแล้วกู้ผ่านไหม?", answer: "ไม่ค่ะ และวินไม่เคยรับประกันแบบนั้น แต่สิ่งที่คลาสนี้รับประกันได้คือ คุณจะเข้าใจมุมมองของธนาคาร และรู้ว่าตัวเองอยู่ตรงไหน" },
    { question: "ติดเครดิตบูโรเรียนได้ไหม? จะกู้ผ่านไหม?", answer: "เรียนได้แน่นอนค่ะ แต่ \"กู้ผ่าน\" ต้องดูเป็นเคสๆ ไป คลาสนี้แยก 4 Case ของการติดบูโรให้คุณเห็น พร้อม 4 ทางที่ยังมีโอกาสกู้ได้" },
  ];

  return (
    <main className="bg-black min-h-screen text-gray-50 flex flex-col selection:bg-yellow-400/30">
      <PromoPopup />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S1: HeroSection */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-8 md:py-12 mt-1 md:mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] border border-yellow-400/20 bg-zinc-900/40">
            <div className="relative w-full md:h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] border border-yellow-400/20">
              <img src="/images/mainkvbuc2.webp" alt="Bank Uncensored Online Key Visual" className="w-full h-full object-cover object-center" loading="eager" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-10 px-6">
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">Bank Uncensored Online</p>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6">
              ก่อนจะถามว่า &quot;กู้ผ่านไหม&quot;<br className="hidden sm:block" />
              คุณควรรู้ก่อนว่า ธุรกิจคุณ<br className="hidden sm:block" />
              คือ <span className="text-yellow-400">&quot;โอกาส&quot;</span> หรือ <span className="text-red-400">&quot;ความเสี่ยง&quot;</span><br className="hidden sm:block" />
              ในสายตาธนาคาร
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              คลาสออนไลน์ 4 ชั่วโมง สอนโดยอดีต RM ธนาคารกสิกร 7 ปี<br className="hidden md:block" />
              ที่ปัจจุบันเป็นเจ้าของธุรกิจ ใช้สินเชื่อธนาคาร ลงทุนเป็นร้อยล้าน
            </p>
            <p className="text-gray-400 text-base">
              เรียนจบ คุณจะ<span className="text-yellow-400 font-medium">เช็คตัวเองได้ทันที</span> ว่าพร้อมกู้แค่ไหน และต้องแก้อะไรก่อนเดินเข้าธนาคาร
            </p>
          </div>

          {/* Desktop: grid 3 cols */}
          <div className="max-w-5xl mx-auto mt-10 hidden sm:grid grid-cols-3 gap-4">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
              <img src="/images/win-ptt-team.webp" alt="วินกับทีมงานที่ปั๊ม PTT" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 border border-yellow-400/20 group-hover:border-yellow-400/50 rounded-2xl transition-colors pointer-events-none"></div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
              <img src="/images/win-cafe-amazon.webp" alt="วินกับธุรกิจ Cafe Amazon" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 border border-yellow-400/20 group-hover:border-yellow-400/50 rounded-2xl transition-colors pointer-events-none"></div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
              <img src="/images/win-7eleven.webp" alt="วินในร้าน 7-Eleven" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 border border-yellow-400/20 group-hover:border-yellow-400/50 rounded-2xl transition-colors pointer-events-none"></div>
            </div>
          </div>

          {/* Mobile: auto-scroll slider */}
          <div className="sm:hidden mt-8 relative overflow-hidden">
            <div id="hero-slider" className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 pb-4 -mx-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
              <div className="relative shrink-0 w-[80vw] aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-yellow-400/20">
                <img src="/images/win-ptt-team.webp" alt="วินกับทีมงานที่ปั๊ม PTT" className="absolute inset-0 w-full h-full object-cover snap-center" loading="lazy" />
              </div>
              <div className="relative shrink-0 w-[80vw] aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-yellow-400/20">
                <img src="/images/win-cafe-amazon.webp" alt="วินกับธุรกิจ Cafe Amazon" className="absolute inset-0 w-full h-full object-cover snap-center" loading="lazy" />
              </div>
              <div className="relative shrink-0 w-[80vw] aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-yellow-400/20">
                <img src="/images/win-7eleven.webp" alt="วินในร้าน 7-Eleven" className="absolute inset-0 w-full h-full object-cover snap-center" loading="lazy" />
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-3" id="hero-dots">
              <span className="w-2 h-2 rounded-full bg-yellow-400 transition-colors"></span>
              <span className="w-2 h-2 rounded-full bg-zinc-600 transition-colors"></span>
              <span className="w-2 h-2 rounded-full bg-zinc-600 transition-colors"></span>
            </div>
          </div>

          <HeroSlider />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S2: MiniStoryHook */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-12 md:py-16 border-t border-zinc-900/60 bg-gradient-to-b from-zinc-900/80 to-transparent p-8 md:p-12 relative overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-yellow-500/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="space-y-4 text-gray-300 text-lg md:text-xl leading-relaxed relative z-10 font-medium">
            <p>&quot;ก่อนวินจะออกมาทำธุรกิจของตัวเอง วินเป็น RM ธนาคาร 7 ปี</p>
            <p>เขียนเคสสินเชื่อมาเป็นร้อยเคส รวมวงเงินอนุมัติเป็นพันล้านบาท</p>
            <p>แต่สิ่งที่ทำให้วินตัดสินใจออกมาเปิดคลาสนี้ ไม่ใช่เพราะสิ่งที่เห็นในแบงก์</p>
            <p>แต่เป็นสิ่งที่วินรู้สึก <span className="text-yellow-400">ในวันที่ต้องเซ็นสัญญาค้ำประกันเงินกู้ร้อยล้านด้วยชื่อตัวเอง</span>&quot;</p>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-800/60 max-w-[200px] mx-auto">
            <p className="text-yellow-500/80 text-sm font-semibold tracking-wide">วิน กวินทร์รัศม์ นิธิกรภาคย์</p>
            <p className="mt-2 text-zinc-500 text-sm italic">(เดี๋ยววินจะเล่าให้ฟัง)</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S3: OpeningPitch (Pain + Trust Box + Course Intro) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10 mt-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">ถ้าคุณกำลังรู้สึกแบบนี้อยู่...</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              คุณเป็นเจ้าของธุรกิจ ทำงานหนักมาหลายปี ยอดขายก็มี ลูกค้าก็มี กำไรก็พอมี<br className="hidden md:block" />
              แต่พอถึงเวลาต้องใช้เงินขยายกิจการ... คุณก็<span className="text-red-400 font-medium">ไม่กล้าเดินเข้าธนาคาร</span>
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col space-y-8">
            {/* Pain bullets */}
            <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
              <p className="text-white font-semibold mb-5">เพราะ...</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x26D4;&#xFE0F;</span><span className="text-base md:text-lg">คุณไม่รู้ว่าธนาคารจะมองธุรกิจเรายังไง</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x26D4;&#xFE0F;</span><span className="text-base md:text-lg">คุณไม่รู้ว่า &quot;ตัวเลขแบบนี้&quot; พอไหม</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x26D4;&#xFE0F;</span><span className="text-base md:text-lg">คุณไม่รู้ว่า &quot;เอกสารชุดนี้&quot; ครบหรือเปล่า</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x26D4;&#xFE0F;</span><span className="text-base md:text-lg">คุณไม่รู้ว่า &quot;ธุรกิจเรา&quot; มีคุณสมบัติพอให้เขาอนุมัติไหม</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x26D4;&#xFE0F;</span><span className="text-base md:text-lg">คุณไม่รู้ว่า &quot;ติดบูโรอยู่แบบนี้&quot; จะยังกู้ได้ไหม หรือต้องแก้ตรงไหนก่อน</span></li>
              </ul>
              <p className="text-white text-lg font-medium italic border-t border-red-500/20 pt-5">
                และสิ่งที่เจ็บที่สุดคือ <span className="text-red-400">คุณไม่รู้ด้วยซ้ำว่าต้องไปถามใคร</span> เพื่อให้ได้คำตอบที่ตรงไปตรงมา
              </p>
            </div>

            {/* Teaching photos row 1: 3 portrait */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-consult-client.webp" alt="วินถือไมค์สอน" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-meeting-bank-rm.webp" alt="วินสอนหน้ากระดาน" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-sme-dbank-booth.webp" alt="วินสอนเรื่องงบการเงิน" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>

            {/* Teaching photos row 2: 2 portrait */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-sme-loan-booth-2.webp" alt="วินชี้ slide สินเชื่อ" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-bank-banner.webp" alt="วินยืนดู banner สินเชื่อ" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>

            {/* Bank rejection story */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
              <p className="text-white font-semibold mb-4">หรือบางทีคุณอาจจะเคยไปแบงก์แล้ว...</p>
              <div className="text-gray-200 text-lg leading-relaxed space-y-3 mb-6">
                <p>เตรียมเอกสารมาอย่างดี นั่งรอในธนาคาร พนักงานยิ้มรับ ถ่ายรูปสำเนา เก็บแฟ้มเข้าไป</p>
                <p>แล้วก็... <span className="text-white font-bold">เงียบ</span></p>
                <p>รออยู่เป็นอาทิตย์ เป็นเดือน โทรไปถาม ได้คำตอบเดิม <span className="text-gray-300 italic">&quot;กำลังพิจารณาค่ะ&quot;</span></p>
                <p>จนในที่สุด ได้คำตอบกลับมาว่า... <span className="text-red-400 font-bold text-xl">&quot;ขออภัยค่ะ ครั้งนี้ไม่สามารถอนุมัติได้&quot;</span></p>
                <p className="text-white font-medium">ไม่มีคำอธิบาย ไม่มีเหตุผลชัดๆ มีแค่คำว่า &quot;ไม่ผ่าน&quot;</p>
              </div>
              <p className="text-white font-bold text-lg mb-3">และหลังจากวันนั้น...</p>
              <ul className="space-y-2 text-gray-200 text-lg">
                <li>&rarr; คุณเห็นคู่แข่งได้วงเงิน ในขณะที่คุณยังไปไหนไม่ได้</li>
                <li>&rarr; คุณเห็นโอกาสผ่านไป เพราะไม่มีเงินทุนพอ</li>
                <li>&rarr; และที่หนักที่สุด <span className="text-red-400">คุณเริ่มกลัวที่จะเดินเข้าธนาคารอีก</span></li>
              </ul>
            </div>

            {/* Trust Box 3 กล่อง */}
            <div className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-6 md:p-10">
              <p className="text-white text-xl md:text-2xl leading-relaxed mb-2 font-medium">ปัญหาไม่ได้อยู่ที่ธุรกิจของคุณ</p>
              <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-3">
                ปัญหาอยู่ที่ไม่มีใครเคยอธิบายให้คุณฟังตรงๆ ว่า <span className="text-yellow-400 font-bold">ธนาคารตัดสินจากอะไรจริงๆ</span>
              </p>
              <p className="text-gray-300 text-lg mb-8">
                ไม่ใช่แค่จากเอกสาร ไม่ใช่จากยอดขาย ไม่ใช่จากกำไรในงบ แต่เป็น <span className="text-white font-bold">3 กล่อง</span>ที่ซ่อนอยู่เบื้องหลังการอนุมัติทุกเคส
              </p>
              <p className="text-yellow-400 font-black text-2xl md:text-3xl mb-8 text-center">&#x1F4E6; Trust Box 3 กล่อง</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                <div className="bg-black/60 rounded-2xl p-6 border border-yellow-500/30 text-center shadow-[0_0_20px_-8px_rgba(250,204,21,0.15)]">
                  <span className="text-yellow-400 font-black text-4xl md:text-5xl block mb-3">&#x2460;</span>
                  <p className="text-white font-bold text-lg md:text-xl mb-2">ตัวเจ้าของ</p>
                  <p className="text-yellow-400 text-base md:text-lg leading-relaxed font-semibold">ธนาคารเชื่อในตัวคุณไหม?</p>
                </div>
                <div className="bg-black/60 rounded-2xl p-6 border border-yellow-500/30 text-center shadow-[0_0_20px_-8px_rgba(250,204,21,0.15)]">
                  <span className="text-yellow-400 font-black text-4xl md:text-5xl block mb-3">&#x2461;</span>
                  <p className="text-white font-bold text-lg md:text-xl mb-2">ตัวธุรกิจ</p>
                  <p className="text-yellow-400 text-base md:text-lg leading-relaxed font-semibold">ธุรกิจคุณน่าเชื่อถือไหม?</p>
                </div>
                <div className="bg-black/60 rounded-2xl p-6 border border-yellow-500/30 text-center shadow-[0_0_20px_-8px_rgba(250,204,21,0.15)]">
                  <span className="text-yellow-400 font-black text-4xl md:text-5xl block mb-3">&#x2462;</span>
                  <p className="text-white font-bold text-lg md:text-xl mb-2">ตัวเลข</p>
                  <p className="text-yellow-400 text-base md:text-lg leading-relaxed font-semibold">ตัวเลขกับเรื่องที่เจ้าของเล่า พูดเรื่องเดียวกันไหม?</p>
                </div>
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mt-6 text-center">
                <p className="text-red-400 text-lg md:text-xl font-bold">ถ้าคุณขาดแค่กล่องเดียว ธนาคารก็อาจปฏิเสธ ไม่ว่าธุรกิจจะดีแค่ไหนก็ตาม</p>
              </div>
            </div>

            {/* Course Intro */}
            <div className="border-l-4 border-yellow-500 pl-6 py-2">
              <p className="text-xl md:text-2xl font-bold text-yellow-400 leading-snug mb-3">Bank Uncensored Online คลาส 4 ชั่วโมง ที่จะทำให้คุณเช็คตัวเองได้ ก่อนเดินเข้าธนาคาร</p>
              <p className="text-lg text-gray-300 leading-relaxed mb-2">ไม่ใช่คลาสสอน &quot;เคล็ดลับให้กู้ผ่าน&quot; เพราะไม่มีใครรับประกันได้</p>
              <p className="text-base text-gray-400 leading-relaxed">แต่เป็นคลาสที่จะทำให้คุณเข้าใจว่าธนาคารดูอะไร คิดอะไร และคุณอยู่ตรงไหนในสายตาเขา เรียนจบแล้ว คุณจะไม่ถามว่า &quot;กู้ได้ไหม&quot; อีกต่อไป คุณจะรู้ว่า &quot;ต้องทำอะไรต่อ ก่อนวันที่พร้อมจริงๆ&quot;</p>
            </div>

            {/* Teaching photos in class */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-bank-pov-check.webp" alt="วินสอนหน้าเวที" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-financial-statement.webp" alt="วินสอนหน้าจอ" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-balance-sheet.webp" alt="วินสอนตัวเลขงบ" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>
            <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group mb-4">
              <img src="/images/win-team-buc.webp" alt="วินถ่ายกับทีมงาน Bank Uncensored" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-loan-slide.webp" alt="วินสอน slide" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-teaching-students.webp" alt="วินสอนผู้เรียน" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-400/20 group">
                <img src="/images/win-architect-stage.webp" alt="วินบนเวที" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </div>

            {/* Format info */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <h4 className="text-lg md:text-xl font-bold text-white leading-tight mb-2">Zoom สด + วิดีโอบันทึก</h4>
              <p className="text-sm md:text-base text-gray-400">4 PART / 12+ บทเรียน / ~4 ชั่วโมง</p>
              <p className="text-sm md:text-base text-gray-300 mt-1">&#x1F4C5; วันที่สด: <strong className="text-white">20 พ.ค. 69 / 19:00-21:00 น.</strong> &nbsp;|&nbsp; Recap Q&amp;A: <strong className="text-white">25 มิ.ย. 69</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S4: WhatYoullLearn */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">สิ่งที่คุณจะได้เรียนรู้</h2>
            <p className="text-xl text-gray-400">คำตอบสำหรับคำถามที่คุณอาจสงสัยอยู่</p>
          </div>

          {/* 8 learning items */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              สิ่งที่คุณจะได้เรียนรู้
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">เกณฑ์ชี้วัดสำคัญที่ธนาคารใช้พิจารณาอนุมัติเงินกู้</strong> ที่คนส่วนใหญ่ไม่เคยรู้ แม้แต่คนที่เคยยื่นกู้มาแล้ว</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">อ่านงบการเงินได้ใน 5 นาที แบบไม่ต้องเป็นบัญชี</strong> โฟกัสเฉพาะจุดที่ธนาคารดู ไม่จำเป็นต้องอ่านเป็นทั้งเล่ม</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">3 ตัวเลขสำคัญ + สูตรคำนวณวงเงินกู้เบื้องต้น</strong> รู้ก่อนยื่นว่ากู้ได้เท่าไหร่ และจะจ่ายไหวไหม คำนวณเองได้เลย</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">Statement ดี vs น่าสงสัย ต่างกันตรงไหน</strong> สิ่งที่ Statement บอกธนาคาร ที่เจ้าของธุรกิจอาจมองข้าม</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">Trust Box 3 กล่อง (หลักความน่าเชื่อถือ 3 กล่อง)</strong> ธนาคารเช็คอะไรก่อนอนุมัติ ตัวเลขดีอย่างเดียวอาจไม่พอ</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">10 เหตุผลที่ธนาคารปฏิเสธ + Checklist เตรียมตัวก่อนยื่น</strong> รู้ข้อผิดพลาดที่พบบ่อย + เตรียมเอกสารให้ครบตั้งแต่ครั้งแรก</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">เช็คความพร้อมก่อนยื่นกู้ รู้ทันทีว่าต้องแก้ตรงไหน</strong> ประเมินตัวเองได้เลย ไม่ต้องรอไปโดนปฏิเสธก่อน</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed"><strong className="text-white">ติดบูโรกู้ได้ไหม?</strong> 4 Case ที่ต้องแยกให้ออก + <span className="text-yellow-400">4 ทางออกที่ยังมี</span></span></li>
            </ul>
          </div>

          {/* 4 PART structure */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">โครงสร้างเนื้อหา 4 PART / 12+ บทเรียน / 3 ชั่วโมง</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0"><span className="text-yellow-400 font-black">01</span></div>
                  <h4 className="text-white font-bold">PART 1: ธนาคารตัดสินธุรกิจคุณจากอะไร</h4>
                </div>
                <ul className="space-y-1.5 text-gray-300 text-base ml-1">
                  <li>&rarr; เกณฑ์การพิจารณาเครดิตของธนาคาร</li>
                  <li>&rarr; มุมมองเรื่องการเงิน &quot;เจ้าของธุรกิจ vs ธนาคาร&quot;</li>
                  <li>&rarr; ความเชื่อผิดที่ทำให้กู้ไม่ผ่าน</li>
                  <li>&rarr; เครดิตบูโร: 4 Case + 4 ทางออกถ้าติดบูโร</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0"><span className="text-yellow-400 font-black">02</span></div>
                  <h4 className="text-white font-bold">PART 2: อ่านงบ + คำนวณวงเงิน</h4>
                </div>
                <ul className="space-y-1.5 text-gray-300 text-base ml-1">
                  <li>&rarr; กำไร &#x2260; เงินสด (Insight สำคัญที่สุด)</li>
                  <li>&rarr; อ่านงบการเงินใน 5 นาที โฟกัสตัวเลขที่สำคัญ</li>
                  <li>&rarr; สูตรคำนวณความสามารถในการกู้และจ่ายหนี้</li>
                  <li>&rarr; วิเคราะห์ศักยภาพการกู้และประเมินโอกาสผ่านด้วยตัวเอง</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0"><span className="text-yellow-400 font-black">03</span></div>
                  <h4 className="text-white font-bold">PART 3: Statement + ความน่าเชื่อถือ</h4>
                </div>
                <ul className="space-y-1.5 text-gray-300 text-base ml-1">
                  <li>&rarr; Statement แบบไหน &quot;ดี / เสี่ยง&quot;</li>
                  <li>&rarr; สร้างกล่องความน่าเชื่อถือ 3 กล่อง</li>
                  <li>&rarr; 6 เอกสารสำคัญที่ธนาคารต้องการ</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0"><span className="text-yellow-400 font-black">04</span></div>
                  <h4 className="text-white font-bold">PART 4: Quick Assessment เช็กความพร้อมก่อนยื่น</h4>
                </div>
                <p className="text-gray-300 text-base ml-1">Self-Assessment ครบจบในตอนเดียว</p>
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="max-w-4xl mx-auto mb-14">
            <div className="bg-gradient-to-br from-yellow-500/10 to-zinc-900 border border-yellow-500/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-yellow-400 mb-5">ผลลัพธ์หลังจบคลาส</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed">เข้าใจ &quot;มุมมองธนาคาร&quot; ว่าตัดสินอนุมัติจากอะไรจริงๆ (ไม่ใช่แค่เอกสาร)</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed">รู้ว่าธุรกิจตัวเอง &quot;พร้อมกู้หรือยัง&quot; และต้องแก้อะไรก่อน</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed">อ่านงบการเงิน + Statement ได้ในมุมเจ้าของธุรกิจ</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed">คำนวณวงเงินที่กู้ได้ และความสามารถในการจ่ายหนี้</span></li>
                <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="leading-relaxed">เตรียมเอกสารและข้อมูลได้ &quot;ถูกจุด&quot; ก่อนยื่นจริง</span></li>
              </ul>
            </div>
          </div>

          {/* Mid CTA */}
          <div className="w-full bg-black py-8 text-center">
            <a href="#pricing" className="inline-flex items-center gap-3 bg-[#00B900] hover:bg-[#00d100] text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:scale-105 shadow-lg animate-glass-shine relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">สมัครเลย Insider Price 4,900.- <img src="/images/LINE.webp" alt="LINE" className="w-6 h-6" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S5: WhoIsThisFor */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">คลาสนี้เหมาะกับคุณ ถ้า...</h2>
          </div>
          {/* เหมาะกับ */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">อยากกู้เงินขยายธุรกิจ แต่ไม่รู้ว่าธนาคารจะมองธุรกิจเราว่า &quot;ผ่าน&quot; หรือ &quot;ไม่ผ่าน&quot;</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">เคยยื่นกู้แล้วโดนปฏิเสธ แต่ไม่เคยรู้เหตุผลจริงๆ ว่าทำไมไม่อนุมัติ</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">มีธุรกิจที่ไปได้ แต่พอแบงก์ขอดูงบ ตัวเลข Statement ก็วิเคราะห์ไม่เป็น ไม่รู้แบงก์ดูอะไร</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">คิดว่าเตรียมให้ครบแล้ว แบงก์ขอเอกสารตั้งเยอะ แต่แบงก์ก็ยังเงียบอยู่ดี</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">กลัวว่าเตรียมตัวไม่ถูก แล้วเสียเวลายื่นไปฟรีๆ</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">อยากกู้แบบ &quot;ไม่ต้องลุ้น แต่มีแผนชัดเจน&quot;</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">อยากรู้ว่า &quot;กู้ได้เท่าไหร่&quot; และ &quot;จ่ายไหวไหม&quot; ก่อนไปหาธนาคาร</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">ไม่เคยมีใครบอกตรงๆ ว่าธนาคารตัดสินใจจากอะไร อยากรู้จากคนใน</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base md:text-lg leading-relaxed">คุณเป็นเจ้าของธุรกิจที่มียอดขาย <strong className="text-white">10–70 ล้านบาท/ปี</strong> ที่กำลังจะวางแผนการเงิน เตรียมตัวเริ่มต้นขอสินเชื่อ</span></li>
            </ul>
          </div>
          {/* ไม่เหมาะกับ */}
          <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
            <p className="text-red-400 font-bold mb-4">คลาสนี้ไม่เหมาะกับคุณ ถ้า...</p>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x274C;</span><span className="text-base leading-relaxed">ยังไม่มีธุรกิจ หรือเพิ่งเริ่มต้นยังไม่มีรายได้</span></li>
              <li className="flex items-start text-gray-400"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x274C;</span><span className="text-base leading-relaxed">ต้องการให้ใครรับประกันว่า &quot;กู้ผ่านแน่นอน&quot;</span></li>
              <li className="flex items-start text-gray-400"><span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">&#x274C;</span><span className="text-base leading-relaxed">หาทางลัด ไม่อยากเตรียมตัวจริง</span></li>
            </ul>
          </div>
          {/* ผลลัพธ์ */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 mt-6">
            <p className="text-white font-bold mb-5">&#x1F3AF; ผลลัพธ์หลังจบคลาส</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base leading-relaxed">เข้าใจ &quot;มุมมองธนาคาร&quot; ว่าตัดสินอนุมัติจากอะไรจริงๆ</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base leading-relaxed">รู้ว่าธุรกิจตัวเอง &quot;พร้อมกู้หรือยัง&quot; และต้องแก้อะไรก่อน</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base leading-relaxed">อ่านงบการเงิน + Statement ได้ในมุมเจ้าของธุรกิจ</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base leading-relaxed">คำนวณวงเงินที่กู้ได้ และความสามารถในการจ่ายหนี้</span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">&#x2705;</span><span className="text-base leading-relaxed">เตรียมเอกสารและข้อมูลได้ &quot;ถูกจุด&quot; ก่อนยื่นจริง</span></li>
            </ul>
            <div className="text-center">
              <a href="#pricing" className="inline-block bg-yellow-500 text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_4px_20px_rgba(234,179,8,0.4)]">ดูโปรโมชั่นสุดพิเศษตอนนี้ &rarr;</a>
            </div>
          </div>
          {/* Canvas images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            <div className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(250,204,21,0.2)] bg-zinc-900 group">
              <img src="/images/canvas-what-youll-learn.webp" alt="สิ่งที่คุณจะได้เรียน" className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 border border-yellow-400/30 group-hover:border-yellow-400/70 z-20 rounded-2xl md:rounded-3xl transition-colors pointer-events-none"></div>
            </div>
            <div className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(250,204,21,0.2)] bg-zinc-900 group">
              <img src="/images/canvas-who-is-this-for.webp" alt="คอร์สนี้เหมาะกับใคร" className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 border border-yellow-400/30 group-hover:border-yellow-400/70 z-20 rounded-2xl md:rounded-3xl transition-colors pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S6: AboutWin */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">ทำไมต้องเรียนกับวิน?</h2>
            <p className="text-gray-300 text-lg italic">เดี๋ยววินจะเล่าให้ฟัง...เรื่องที่ทำให้วินตัดสินใจเปิดคลาสนี้</p>
          </div>
          {/* RM Story */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <div className="space-y-5 text-lg md:text-xl leading-relaxed">
              <p className="text-gray-200">ก่อนวินจะออกมาทำธุรกิจของตัวเอง วินทำงานเป็น <span className="text-yellow-400 font-bold">RM ธนาคารอยู่ 7 ปี</span></p>
              <p className="text-gray-300">หน้าที่ของวินคือ วิเคราะห์เครดิตก่อนที่ธนาคารจะอนุมัติสินเชื่อ พูดง่ายๆ คือ วินคือคนที่ต้อง<span className="text-white font-medium">เขียนแผนธุรกิจ วิเคราะห์งบการเงิน ประเมินความสามารถในการกู้และจ่ายหนี้คืน</span>ของเจ้าของธุรกิจ ก่อนจะส่งเคสขึ้นไปขออนุมัติ</p>
              <p className="text-gray-200">ในช่วงเวลา 7 ปีนั้น วินได้เจอเจ้าของธุรกิจ วิเคราะห์งบการเงิน<span className="text-white font-bold">เป็นร้อยๆ บริษัท</span> และเขียนเคสขออนุมัติสินเชื่อรวมกัน<span className="text-yellow-400 font-bold">เป็นพันล้านบาท</span></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="bg-black/40 border border-zinc-700 rounded-xl p-4"><p className="text-yellow-400 font-bold mb-1">ด้านที่ 1</p><p className="text-gray-200 text-base">ต้องหาโอกาส หามุมให้เจ้าของธุรกิจ<span className="text-white font-medium">ได้วงเงินที่ต้องการจริงๆ</span></p></div>
                <div className="bg-black/40 border border-zinc-700 rounded-xl p-4"><p className="text-yellow-400 font-bold mb-1">อีกด้าน</p><p className="text-gray-200 text-base">ต้องเป็นคน<span className="text-white font-medium">ปิดความเสี่ยง</span>จากการให้กู้ ให้กับธนาคาร</p></div>
              </div>
            </div>
          </div>
          {/* What Win Saw */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-white font-bold text-xl mb-5">7 ปีที่วินได้เห็นเจ้าของธุรกิจเข้ามาหาวิน...</p>
            <div className="space-y-4 text-lg leading-relaxed mb-6">
              <p className="text-gray-200">หลายคนมากับ<span className="text-white font-medium">แฟ้มเอกสารหนามาก</span> แต่ละคนมีความหวังเหมือนกัน อยากให้ผ่าน</p>
              <div className="border-l-4 border-zinc-700 pl-5 py-2">
                <p className="text-gray-300 text-lg italic">&quot;ช่วยพี่หน่อยนะ แค่ครั้งนี้ครั้งเดียว&quot;</p>
                <p className="text-gray-300 text-lg italic">&quot;ขอให้อนุมัติเถอะ ธุรกิจจะได้ไปต่อได้&quot;</p>
                <p className="text-gray-300 text-lg italic">&quot;มีโอกาสจะได้รับวงเงินไหม รอนานหรือเปล่า&quot;</p>
              </div>
            </div>
            <p className="text-yellow-400 font-bold text-xl mb-4">แต่คุณรู้ไหม...</p>
            <p className="text-gray-200 text-lg leading-relaxed mb-5">สิ่งที่แบงก์อยากเห็นจริงๆ <span className="text-white font-medium">ไม่ใช่แค่เอกสาร หรือหลักทรัพย์ค้ำประกัน</span></p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 text-xl shrink-0">&#x2460;</span><p className="text-white text-lg font-medium">&quot;ธุรกิจเขาเป็นยังไง&quot;</p></div>
              <div className="flex items-center gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 text-xl shrink-0">&#x2461;</span><p className="text-white text-lg font-medium">&quot;รายได้ กำไร เป็นยังไง ดีพอจะคืนหนี้ไหม&quot;</p></div>
              <div className="flex items-center gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 text-xl shrink-0">&#x2462;</span><p className="text-white text-lg font-medium">&quot;แผนต่อไปคืออะไร จะเอาวงเงินไปทำอะไร&quot;</p></div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 mb-5">
              <p className="text-yellow-400 text-lg font-bold">เพราะนี่คือสิ่งที่บอกว่า &quot;ธุรกิจนี้คือโอกาส&quot; ไม่ใช่ &quot;ความเสี่ยง&quot;</p>
            </div>
            <div className="space-y-2 text-gray-200 text-lg">
              <p>น่าเสียดายมาก คนที่ธุรกิจดี กำไรพอมี ยอดขายโต <span className="text-red-400 font-medium">แต่กู้ไม่ผ่าน</span></p>
              <p>คนที่เตรียมเอกสารครบทุกแผ่น <span className="text-red-400 font-medium">แต่กู้ไม่ผ่าน</span></p>
              <p>คนที่มีหลักประกัน มีที่ดิน มีบ้าน <span className="text-red-400 font-medium">แต่ก็ยังกู้ไม่ผ่าน</span></p>
              <p className="mt-3 text-white font-medium">และที่ทำให้วินใจหายที่สุดคือ <span className="text-red-400 font-bold">พวกเขาไม่รู้ด้วยซ้ำว่าตัวเองพลาดตรงไหน</span></p>
            </div>
          </div>
          {/* Transition to Entrepreneur */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-5">&#x1F3D7;&#xFE0F; จนวันที่วินออกจากธนาคาร มาเป็น<span className="text-white font-bold">เจ้าของธุรกิจเอง</span> เริ่มลงทุน<span className="text-yellow-400 font-bold">เป็นร้อยล้าน</span>ด้วยสินเชื่อธุรกิจ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="flex items-start gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 shrink-0 mt-0.5">&#x25B8;</span><p className="text-gray-200 text-base">รู้สึกถึง<span className="text-white font-medium">ความรับผิดชอบ</span>ของวันที่ต้องเซ็นค้ำสัญญาเงินกู้ร้อยล้านด้วยชื่อตัวเอง</p></div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 shrink-0 mt-0.5">&#x25B8;</span><p className="text-gray-200 text-base">รู้สึกถึง<span className="text-white font-medium">ความเงียบ</span> และเวลาเดินช้ามาก ตอนรอคำตอบจากแบงก์</p></div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 shrink-0 mt-0.5">&#x25B8;</span><p className="text-gray-200 text-base">รู้สึกถึง<span className="text-white font-medium">ความกังวล</span>ว่าธนาคารจะอนุมัติตามที่เราขอไหม</p></div>
              <div className="flex items-start gap-3 bg-black/30 rounded-lg px-4 py-3 border border-zinc-700/50"><span className="text-yellow-400 shrink-0 mt-0.5">&#x25B8;</span><p className="text-gray-200 text-base">รู้สึกถึง<span className="text-white font-medium">คืนที่นอนไม่หลับ</span> เพราะพรุ่งนี้ต้องจ่ายเงินเดือนพนักงาน</p></div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-6 py-2">
              <p className="text-yellow-400 text-lg md:text-xl font-bold leading-snug">และนั่นคือจุดที่ทำให้วินตัดสินใจ กลับมาทำในสิ่งที่ตอนเป็น RM ทำไม่ได้</p>
              <p className="text-gray-200 text-base mt-1">มาเปิดสิ่งที่อยู่ &quot;หลังโต๊ะทำงานในแบงก์&quot; ให้เจ้าของธุรกิจได้เห็น</p>
            </div>
          </div>
          {/* 2 Sides */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-white font-bold text-xl md:text-2xl mb-6 text-center">วินคือคนที่อยู่ทั้ง <span className="text-yellow-400">2 ด้าน</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/50 rounded-xl p-5 border border-yellow-500/20">
                <p className="text-yellow-400 font-bold text-lg mb-3">&#x1F3E6; ด้านที่ 1 Founder&apos;s Banker</p>
                <p className="text-gray-200 text-base leading-relaxed">คนที่เคยเขียนเคสสินเชื่อ<span className="text-white font-medium">เป็นพันล้าน</span> วินรู้ว่า ฝ่ายพิจารณาเครดิต เขา<span className="text-yellow-400">อ่านอะไรก่อน อ่านอะไรทีหลัง</span> เขาจับผิดตรงไหน และเขาให้ผ่านเพราะอะไร</p>
              </div>
              <div className="bg-black/50 rounded-xl p-5 border border-yellow-500/20">
                <p className="text-yellow-400 font-bold text-lg mb-3">&#x1F3D7;&#xFE0F; ด้านที่ 2 Architect</p>
                <p className="text-gray-200 text-base leading-relaxed">เจ้าของธุรกิจที่ใช้สินเชื่อเป็นเครื่องมือสร้าง<span className="text-white font-medium">ธุรกิจร้อยล้าน</span> เป็น<span className="text-yellow-400 font-medium">เงินกู้แบงก์ล้วนๆ</span> ที่ต่อยอดจนกลายเป็นธุรกิจร้อยล้าน</p>
              </div>
            </div>
            <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-yellow-400/20">
              <img src="/images/win-quote.webp" alt="วินไม่ได้สอนให้คุณกู้ผ่าน วินสอนให้คุณเข้าใจว่าแบงก์มองธุรกิจคุณยังไง" className="w-full h-auto" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S7: Testimonials (5 Cloudinary video clips) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">เสียงจากเจ้าของธุรกิจที่เคยเรียนกับวิน</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">ไม่มีเส้นสาย แค่<span className="text-yellow-400 font-medium">เข้าใจว่าธนาคารหาอะไร</span> แล้วเตรียมตัวให้ตรงจุด</p>
          </div>
          {/* Row 1: 3 clips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-colors">
              <div className="relative w-full aspect-[9/16] bg-black">
                <video className="w-full h-full object-contain" controls preload="none" playsInline poster="https://res.cloudinary.com/dzjum15hd/video/upload/so_3,w_480,c_scale/v1775835560/bank-uncensored/Clip%20-%20Vox%20pop%20%E0%B8%A3%E0%B8%A7%E0%B8%A1%20_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.jpg">
                  <source src="https://res.cloudinary.com/dzjum15hd/video/upload/v1775835560/bank-uncensored/Clip%20-%20Vox%20pop%20%E0%B8%A3%E0%B8%A7%E0%B8%A1%20_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-3 md:p-4"><p className="text-gray-200 text-sm md:text-base leading-relaxed italic">&quot;ถ้าธุรกิจมีปัญหาเรื่องการเงิน อยากให้ลองมาเจอพี่วิน&quot;</p></div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-colors">
              <div className="relative w-full aspect-[9/16] bg-black">
                <video className="w-full h-full object-contain" controls preload="none" playsInline poster="https://res.cloudinary.com/dzjum15hd/video/upload/so_3,w_480,c_scale/v1775835566/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%99%E0%B8%B4%E0%B8%A7_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.jpg">
                  <source src="https://res.cloudinary.com/dzjum15hd/video/upload/v1775835566/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%99%E0%B8%B4%E0%B8%A7_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-3 md:p-4"><p className="text-gray-200 text-sm md:text-base leading-relaxed italic">&quot;รู้เขา รู้เรา...เช็คความพร้อมก่อนกู้ กับคลาส Bank Uncensored&quot;</p></div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-colors">
              <div className="relative w-full aspect-[9/16] bg-black">
                <video className="w-full h-full object-contain" controls preload="none" playsInline poster="https://res.cloudinary.com/dzjum15hd/video/upload/so_3,w_480,c_scale/v1775835570/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%A0%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%A3_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.jpg">
                  <source src="https://res.cloudinary.com/dzjum15hd/video/upload/v1775835570/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%A0%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%A3_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-3 md:p-4"><p className="text-gray-200 text-sm md:text-base leading-relaxed italic">&quot;รู้วิธีการกู้หลักร้อยล้านยังไงให้ผ่าน เคล็ดลับที่ไม่ได้มีบอกทั่วไป&quot;</p></div>
            </div>
          </div>
          {/* Row 2: 2 clips centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10 max-w-2xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-colors">
              <div className="relative w-full aspect-[9/16] bg-black">
                <video className="w-full h-full object-contain" controls preload="none" playsInline poster="https://res.cloudinary.com/dzjum15hd/video/upload/so_3,w_480,c_scale/v1775835574/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AB%E0%B8%A1%E0%B8%ADAi_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.jpg">
                  <source src="https://res.cloudinary.com/dzjum15hd/video/upload/v1775835574/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AB%E0%B8%A1%E0%B8%ADAi_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-3 md:p-4"><p className="text-gray-200 text-sm md:text-base leading-relaxed italic">&quot;SME ที่หาทางไปไม่เจอ ควรมาเรียนคลาสนี้&quot;</p></div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400/30 transition-colors">
              <div className="relative w-full aspect-[9/16] bg-black">
                <video className="w-full h-full object-contain" controls preload="none" playsInline poster="https://res.cloudinary.com/dzjum15hd/video/upload/so_3,w_480,c_scale/v1775835578/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AD%E0%B8%B2%E0%B8%A0%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%99%E0%B9%8C_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.jpg">
                  <source src="https://res.cloudinary.com/dzjum15hd/video/upload/v1775835578/bank-uncensored/Clip%20-%20%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AD%E0%B8%B2%E0%B8%A0%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%99%E0%B9%8C_%E0%B8%82%E0%B8%B2%E0%B8%A2%20Bank%20online_.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-3 md:p-4"><p className="text-gray-200 text-sm md:text-base leading-relaxed italic">&quot;เปลี่ยนมุมมองเรื่องการกู้เงินทำธุรกิจ จากความกลัวสู่ความมั่นใจ เติบโตได้ทันที&quot;</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S8: BonusStack */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">Bonus พิเศษ มูลค่ารวม <span className="text-yellow-400">15,000 บาท</span></h2>
            <p className="text-gray-400 text-lg">ได้รับทันทีเมื่อลงทะเบียนในรอบนี้</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-zinc-900 border border-yellow-500/30 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl"></div>
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-8 flex items-center relative z-10">
              <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
              BONUS เฉพาะรอบนี้
            </h3>
            <ul className="space-y-5 relative z-10">
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x1F381;</span><span className="leading-relaxed"><strong className="text-white">Recap Q&amp;A สด ผ่าน Zoom วันที่ 25 มิ.ย. 69</strong><br/><span className="text-gray-300 text-base">ตอบทุกคำถามที่ค้างจากบทเรียน ถามวินได้ตรงๆ</span><br/><span className="text-yellow-400 text-sm font-medium">มูลค่า 3,500 บาท</span></span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x1F381;</span><span className="leading-relaxed"><strong className="text-white">Template คำนวณความสามารถในการขอสินเชื่อ + จ่ายหนี้</strong><br/><span className="text-gray-300 text-base">Excel พร้อมสูตร แค่ใส่ตัวเลขก็รู้ทันทีว่ากู้ได้เท่าไหร่</span><br/><span className="text-yellow-400 text-sm font-medium">มูลค่า 3,500 บาท</span></span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x1F381;</span><span className="leading-relaxed"><strong className="text-white">Ebook คู่มืออ่านงบการเงิน ฉบับเจ้าของธุรกิจ</strong><br/><span className="text-gray-300 text-base">ไม่ต้องเป็นบัญชีก็เข้าใจ โฟกัสจุดที่ธนาคารดู</span><br/><span className="text-yellow-400 text-sm font-medium">มูลค่า 3,500 บาท</span></span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x1F381;</span><span className="leading-relaxed"><strong className="text-white">Workbook Quick Assessment ประเมินตัวเองทีละหน้า</strong><br/><span className="text-gray-300 text-base">รู้ว่าอยู่โซนเขียว/เหลือง/แดง + Action ต่อไปที่ต้องทำ</span><br/><span className="text-yellow-400 text-sm font-medium">มูลค่า 2,500 บาท</span></span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x1F381;</span><span className="leading-relaxed"><strong className="text-white">Checklist 6 เอกสาร + Roadmap ก่อนยื่นกู้</strong><br/><span className="text-gray-300 text-base">เตรียมครบ ยื่นได้เร็ว ไม่ต้องถูกขอเพิ่ม</span><br/><span className="text-yellow-400 text-sm font-medium">มูลค่า 2,000 บาท</span></span></li>
              <li className="flex items-start text-gray-300"><span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">&#x2B50;</span><span className="leading-relaxed"><strong className="text-white">Insider Community กลุ่มปิดตลอดชีพ</strong><br/><span className="text-gray-300 text-base">ถาม-ตอบหลังเรียนตลอดชีพ + Bank Update Channel + Network SME</span><br/><span className="text-yellow-400 text-sm font-medium">ประเมินราคาไม่ได้</span></span></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-yellow-500/20 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div><p className="text-gray-400 text-sm mb-1">มูลค่า Bonus รวมทั้งหมด</p><p className="text-3xl font-black text-yellow-400">15,000 บาท</p></div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-5 py-3"><p className="text-yellow-400 text-sm font-medium">รับทั้งหมดนี้</p><p className="text-white font-bold">โดยไม่มีค่าใช้จ่ายเพิ่มเติม</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S9: PricingBlock */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="pricing" className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">ราคาสำหรับคนที่พร้อมเตรียมตัวก่อนคนอื่น</h2>
            <p className="text-gray-400 text-lg">ยิ่งตัดสินใจเร็ว ยิ่งได้ราคาพิเศษกว่า</p>
          </div>
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {/* Insider */}
            <div className="bg-zinc-900 border-2 border-yellow-500/50 rounded-2xl p-6 text-center relative shadow-[0_0_30px_-10px_rgba(250,204,21,0.3)] lg:col-span-2">
              <div className="absolute -top-4 inset-x-0 flex justify-center"><span className="bg-yellow-500 text-black font-bold py-1.5 px-6 rounded-full text-sm tracking-wide uppercase shadow-[0_4px_10px_rgba(234,179,8,0.4)]">&#x2605; Insider Price 30 คนแรกเท่านั้น &#x2605;</span></div>
              <div className="mt-6 bg-black/60 rounded-xl p-5 border border-zinc-800">
                <p className="text-gray-400 mb-1">30 คนแรกที่ติดตาม</p>
                <p className="text-5xl font-black text-yellow-400 tracking-tight">4,900</p>
                <p className="text-gray-400 text-base mt-1">บาท</p>
                <p className="text-gray-600 text-sm line-through mt-2">ราคาเต็ม 15,900 บาท</p>
              </div>
              <a href="https://page.line.me/591xftzn?openQrModal=true" target="_blank" rel="noopener noreferrer" className="mt-5 block w-full py-4 bg-[#00B900] hover:bg-[#00d100] text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg animate-glass-shine relative overflow-hidden">
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <span className="flex items-center gap-2 text-base md:text-lg">สมัครเลย Insider <img src="/images/LINE.webp" alt="LINE" className="w-5 h-5" /></span>
                  <span className="text-white/80 text-xs font-normal">รับราคาพิเศษ 30 ท่านแรก | จากปกติ <span className="line-through">15,900</span></span>
                </span>
              </a>
            </div>
            {/* Early Bird */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center relative">
              <div className="absolute -top-4 inset-x-0 flex justify-center"><span className="bg-zinc-700 text-white font-bold py-1.5 px-4 rounded-full text-sm tracking-wide uppercase">Early Bird</span></div>
              <div className="mt-6 bg-black/60 rounded-xl p-5 border border-zinc-800">
                <p className="text-gray-400 text-sm mb-1">1-30 เม.ย. 2569</p>
                <p className="text-4xl font-black text-white tracking-tight">5,900</p>
                <p className="text-gray-400 text-sm mt-1">บาท</p>
                <p className="text-gray-600 text-xs line-through mt-2">ราคาเต็ม 15,900 บาท</p>
              </div>
              <a href="https://page.line.me/591xftzn?openQrModal=true" target="_blank" rel="noopener noreferrer" className="mt-5 block w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-xl transition-all text-sm">สมัคร Early Bird</a>
            </div>
            {/* Regular */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center opacity-70 relative">
              <div className="absolute -top-4 inset-x-0 flex justify-center"><span className="bg-zinc-800 text-gray-400 font-bold py-1.5 px-4 rounded-full text-sm tracking-wide uppercase">ราคาปกติ</span></div>
              <div className="mt-6 bg-black/60 rounded-xl p-5 border border-zinc-800">
                <p className="text-gray-500 text-sm mb-1">หลังโปรโมชั่น</p>
                <p className="text-4xl font-black text-gray-400 tracking-tight">7,900</p>
                <p className="text-gray-500 text-sm mt-1">บาท</p>
                <p className="text-gray-600 text-xs line-through mt-2">ราคาเต็ม 15,900 บาท</p>
              </div>
              <div className="mt-5 block w-full py-3 bg-zinc-800 text-gray-500 font-bold rounded-xl text-sm cursor-default">ราคาปกติ</div>
            </div>
          </div>
          {/* Promotion Urgency */}
          <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-5 md:p-6 text-center mb-12">
            <p className="text-white font-bold text-lg">&#x26A1; PROMOTION: 1-30 เมษายน เท่านั้น</p>
            <p className="text-gray-300 text-base mt-1">สิทธิพิเศษสำหรับ 30 ท่านแรกมีจำนวนจำกัด</p>
          </div>
          {/* Cost Comparison */}
          <div className="max-w-3xl mx-auto mb-14">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">ราคาที่ต้องจ่ายถ้ายังเดาใจแบงก์</h3>
            <div className="rounded-2xl overflow-hidden border border-zinc-800">
              <div className="grid grid-cols-2 bg-zinc-900"><div className="p-4 border-b border-zinc-800"><p className="text-gray-400 font-medium text-sm">รายการ</p></div><div className="p-4 border-b border-l border-zinc-800"><p className="text-gray-400 font-medium text-sm">ค่าใช้จ่าย</p></div></div>
              <div className="grid grid-cols-2 bg-zinc-900/50"><div className="p-4 border-b border-zinc-800"><p className="text-white text-sm font-medium">คอร์ส Bank Uncensored Online (Insider Price)</p></div><div className="p-4 border-b border-l border-zinc-800"><p className="text-yellow-400 font-bold text-sm">4,900 บาท</p></div></div>
              <div className="grid grid-cols-2 bg-zinc-900/30"><div className="p-4 border-b border-zinc-800"><p className="text-gray-300 text-sm">ค่าเสียหายจากการกู้ไม่ผ่านสักรอบ</p></div><div className="p-4 border-b border-l border-zinc-800"><p className="text-red-400 font-medium text-sm">หลักแสน – ล้านบาท</p></div></div>
              <div className="grid grid-cols-2 bg-zinc-900/50"><div className="p-4 border-b border-zinc-800"><p className="text-gray-300 text-sm">ค่าดอกเบี้ยที่จ่ายแพงกว่าจำเป็น</p></div><div className="p-4 border-b border-l border-zinc-800"><p className="text-red-400 font-medium text-sm">หลักหมื่น – แสน/ปี</p></div></div>
              <div className="grid grid-cols-2 bg-zinc-900/30"><div className="p-4"><p className="text-gray-300 text-sm">เวลาที่เสียไปจากการยื่นแล้วโดนปฏิเสธ</p></div><div className="p-4 border-l border-zinc-800"><p className="text-red-400 font-medium text-sm">3-6 เดือน ที่ได้คืนไม่ได้</p></div></div>
            </div>
            <div className="mt-6 border-l-4 border-yellow-500 pl-6 py-2">
              <p className="text-xl md:text-2xl font-bold text-yellow-400 leading-snug">คุณจะลงทุน 4 ชั่วโมง เพื่อเช็คตัวเองก่อน<br className="hidden sm:block" /> หรือจะเสียอีกปีเพื่อรู้ทีหลัง?</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S10: TransformationTable (Before/After) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">ก่อนเรียน vs หลังเรียน</h2></div>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-zinc-800">
            <div className="grid grid-cols-2">
              <div className="bg-red-900/20 border-b border-zinc-800 p-4 text-center"><span className="text-red-400 font-bold text-lg">&#x1F625; ก่อนเรียน</span></div>
              <div className="bg-green-900/10 border-b border-l border-zinc-800 p-4 text-center"><span className="text-green-400 font-bold text-lg">&#x1F3AF; หลังเรียน</span></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;กู้ได้ไหม?&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;ฉันอยู่ตรงไหน ต้องทำอะไรต่อ&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;ธนาคารมองเรายังไงไม่รู้&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;รู้ว่าธนาคารเช็คอะไรใน Trust Box 3 กล่อง&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;อ่านงบไม่ออก&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;โฟกัสจุดที่ธนาคารดู อ่านใน 5 นาที&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;ไม่รู้กู้ได้เท่าไหร่&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;คำนวณวงเงินเบื้องต้นเองได้&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;Statement คืออะไร ทำไมธนาคารต้องดู&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;รู้ว่า Statement บอกอะไร เตรียมให้ถูกได้&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;ติดบูโร = จบชีวิต กู้ไม่ได้แน่&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;รู้ว่าเป็น Case ไหน + มีทางไหนบ้างที่ยังกู้ได้&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;เตรียมเอกสารครบแล้ว น่าจะผ่าน&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;รู้ว่าเอกสารเป็นแค่ 1 ใน 3 กล่อง&quot;</p></div>
              <div className="bg-zinc-900/50 p-5 border-b border-zinc-800"><p className="text-gray-400">&quot;กลัวเดินเข้าธนาคาร&quot;</p></div><div className="bg-zinc-900/30 p-5 border-b border-l border-zinc-800"><p className="text-white font-medium">&quot;มั่นใจในสิ่งที่เตรียม&quot;</p></div>
              <div className="bg-zinc-900/50 p-5"><p className="text-gray-400">&quot;รอคำตอบ&quot;</p></div><div className="bg-zinc-900/30 p-5 border-l border-zinc-800"><p className="text-white font-medium">&quot;รู้คำตอบของตัวเองก่อนส่งเอกสาร&quot;</p></div>
            </div>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"><div className="bg-red-900/20 px-4 py-3 border-b border-zinc-800"><p className="text-gray-400 text-sm"><span className="text-red-400 mr-1">&#x1F625;</span>&quot;กู้ได้ไหม?&quot;</p></div><div className="px-4 py-3"><p className="text-white font-medium text-sm"><span className="text-green-400 mr-1">&#x1F3AF;</span>&quot;ฉันอยู่ตรงไหน ต้องทำอะไรต่อ&quot;</p></div></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"><div className="bg-red-900/20 px-4 py-3 border-b border-zinc-800"><p className="text-gray-400 text-sm"><span className="text-red-400 mr-1">&#x1F625;</span>&quot;อ่านงบไม่ออก&quot;</p></div><div className="px-4 py-3"><p className="text-white font-medium text-sm"><span className="text-green-400 mr-1">&#x1F3AF;</span>&quot;โฟกัสจุดที่ธนาคารดู อ่านใน 5 นาที&quot;</p></div></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"><div className="bg-red-900/20 px-4 py-3 border-b border-zinc-800"><p className="text-gray-400 text-sm"><span className="text-red-400 mr-1">&#x1F625;</span>&quot;กลัวเดินเข้าธนาคาร&quot;</p></div><div className="px-4 py-3"><p className="text-white font-medium text-sm"><span className="text-green-400 mr-1">&#x1F3AF;</span>&quot;มั่นใจในสิ่งที่เตรียม&quot;</p></div></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"><div className="bg-red-900/20 px-4 py-3 border-b border-zinc-800"><p className="text-gray-400 text-sm"><span className="text-red-400 mr-1">&#x1F625;</span>&quot;รอคำตอบ&quot;</p></div><div className="px-4 py-3"><p className="text-white font-medium text-sm"><span className="text-green-400 mr-1">&#x1F3AF;</span>&quot;รู้คำตอบของตัวเองก่อนส่งเอกสาร&quot;</p></div></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S11: ReframeClose */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">4 ชั่วโมงนี้<br className="hidden sm:block"/>จะเปลี่ยนคำถามในหัวคุณไปตลอด</h2>
          <p className="text-gray-400 text-lg mb-10">ถ้าวันนี้คุณยังถามตัวเองว่า...<br/><span className="text-gray-300">&quot;ธุรกิจเรากู้ได้ไหม?&quot; &quot;เขาจะมองเรายังไง?&quot; &quot;เตรียมอะไรถึงจะพอ?&quot;</span></p>
          <p className="text-white font-bold text-lg mb-6">หลังจบคลาสนี้ คำถามเหล่านั้นจะหายไป</p>
          <div className="text-left space-y-4 mb-10 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"><span className="text-green-400 font-bold mt-0.5 shrink-0">&rarr;</span><p className="text-gray-300 leading-relaxed">คุณจะ<strong className="text-white">ไม่ถามว่า &quot;กู้ได้ไหม&quot;</strong> อีกต่อไป เพราะคุณจะรู้แล้วว่า &quot;ธุรกิจเราอยู่ตรงไหน&quot;</p></div>
            <div className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"><span className="text-green-400 font-bold mt-0.5 shrink-0">&rarr;</span><p className="text-gray-300 leading-relaxed">คุณจะ<strong className="text-white">ไม่กลัวว่า &quot;เอกสารจะไม่ครบ&quot;</strong> เพราะคุณจะมี Checklist + Roadmap ชัดๆ ในมือ</p></div>
            <div className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"><span className="text-green-400 font-bold mt-0.5 shrink-0">&rarr;</span><p className="text-gray-300 leading-relaxed">คุณจะ<strong className="text-white">ไม่ลุ้นว่า &quot;จะได้วงเงินเท่าไหร่&quot;</strong> เพราะคุณจะคำนวณเองได้ก่อนเดินเข้าธนาคาร</p></div>
            <div className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"><span className="text-green-400 font-bold mt-0.5 shrink-0">&rarr;</span><p className="text-gray-300 leading-relaxed">คุณจะ<strong className="text-white">ไม่สงสัยว่า &quot;ทำไมโดนปฏิเสธ&quot;</strong> เพราะคุณจะรู้ Trust Box 3 กล่อง</p></div>
          </div>
          <div className="border-l-4 border-yellow-500 pl-6 py-3 text-left mb-10 max-w-2xl mx-auto">
            <p className="text-yellow-400 font-bold text-xl leading-snug mb-2">&quot;ต้องเตรียมอะไรต่อ... ก่อนวันที่พร้อม&quot;</p>
            <p className="text-gray-400 text-base">คำถามเดียวที่จะอยู่ในหัวคุณหลังจบคลาส</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 text-base leading-relaxed">นี่คือความต่างระหว่าง เจ้าของธุรกิจที่ <span className="text-red-400 font-semibold">&quot;ลุ้น&quot;</span> กับเจ้าของธุรกิจที่ <span className="text-green-400 font-semibold">&quot;เตรียม&quot;</span></p>
            <p className="text-gray-200 text-base mt-2">คนหนึ่งเดินเข้าธนาคารด้วย<span className="text-red-400">ความหวัง</span> อีกคนเดินเข้าไปด้วย<span className="text-yellow-400">ความมั่นใจ</span></p>
            <p className="text-gray-200 text-base">คนหนึ่ง<span className="text-red-400">รอคำตอบ</span> อีกคน<span className="text-yellow-400">รู้คำตอบของตัวเองแล้ว</span> ก่อนส่งเอกสาร</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S12: FAQ (React Island) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <FAQAccordion faqs={faqs} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Payment Channels */}
      {/* ═══════════════════════════════════════════════════════ */}
      <PaymentChannels />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S13: ClosingCTA */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">4 ชั่วโมงนี้ จะเปลี่ยนคำถามในหัวคุณไปตลอด</p>
          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-xl md:text-2xl font-bold text-yellow-400 leading-snug">&quot;4 ชั่วโมง ที่จะทำให้คุณรู้ว่าพร้อมกู้หรือยัง ก่อนเดินเข้าธนาคาร&quot;</p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">&quot;จบแล้วจะไม่มีคำถามว่า &apos;กู้ได้ไหม&apos; จะมีแค่คำตอบว่า &apos;ต้องเตรียมอะไร&apos;&quot;</p>
          </div>
          {/* Final CTA */}
          <a href="https://page.line.me/591xftzn?openQrModal=true" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 md:px-12 text-xl md:text-2xl font-bold rounded-full bg-[#00B900] text-white transition-all hover:scale-105 hover:bg-[#009b00] hover:shadow-[0_0_30px_-5px_rgba(0,185,0,0.5)] shadow-xl w-full sm:w-auto mb-4">
            <span>สมัครเลย Insider Price 4,900 บาท</span>
            <img src="/images/LINE.webp" alt="LINE" className="w-8 h-8 transition-transform group-hover:rotate-12 object-contain" />
          </a>
          <p className="text-gray-500 text-sm mb-12">30 คนแรกเท่านั้น | โปรโมชั่น 1-30 เมษายน 2569</p>
          {/* Personal Letter */}
          <div className="border border-zinc-800 rounded-2xl p-6 md:p-8 text-left max-w-2xl mx-auto mb-8 bg-zinc-900/40">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4">จากวินถึงคุณ</p>
            <div className="space-y-3 text-gray-300 text-base leading-relaxed mb-5">
              <p>วินรู้ว่าการตัดสินใจซื้อคอร์สออนไลน์ในวันนี้ ไม่ใช่เรื่องง่าย</p>
              <p>แต่วินรู้แน่ๆ ว่า การกู้แล้วโดนปฏิเสธ มันเจ็บกว่า<br/><span className="text-gray-400">เจ็บที่เสียเวลา เจ็บที่เสียโอกาส เจ็บที่เริ่มสงสัยในตัวเอง</span></p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-5 py-2 mb-5">
              <p className="text-white font-semibold">4,900 บาท กับ 4 ชั่วโมง</p>
              <p className="text-gray-200 text-base mt-1">แลกกับการรู้ว่าธุรกิจคุณพร้อมแค่ไหน ก่อนเสียเวลายื่นจริง</p>
            </div>
            <p className="text-gray-400 text-base">วินจะรอเจอคุณในคลาสค่ะ</p>
            <p className="text-gray-500 text-sm mt-1">วิน กวินทร์รัศม์ นิธิกรภาคย์</p>
          </div>
          {/* Disclaimer */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">หมายเหตุ</p>
            <p className="text-gray-500 text-xs leading-relaxed">คลาสนี้ให้ความรู้และเครื่องมือประเมินตัวเอง ไม่ใช่การรับประกันผลการอนุมัติสินเชื่อ ผลลัพธ์จริงขึ้นอยู่กับสถานะทางการเงินและเงื่อนไขของแต่ละธนาคาร</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* S14: ContactCTA (shared component) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <ContactCTA />

    </main>
  );
}
