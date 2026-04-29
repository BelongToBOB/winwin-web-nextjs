export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-32 bg-black border-t border-red-500/40 overflow-hidden">
      {/* Subtle patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-yellow-400/30 h-full -translate-x-1/2"></div>
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-yellow-400/30 w-full -translate-y-1/2"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-900/10 blur-3xl mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/50 mb-8 backdrop-blur-sm border border-yellow-400/30 ring-4 ring-red-500/10">
          <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight text-balance leading-tight">
          เริ่มปรึกษาธุรกิจของคุณวันนี้
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          ติดต่อทีมที่ปรึกษาของ WinWin Wealth Creation เพื่อประเมินความเป็นไปได้และวางแผนกลยุทธ์การเงินฟรี ไม่มีค่าใช้จ่ายเบื้องต้น
        </p>

        <div className="flex flex-col gap-5 w-full sm:w-auto">
          <a
            href="https://page.line.me/591xftzn?openQrModal=true"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 md:px-12 text-xl md:text-2xl font-bold rounded-full bg-[#00B900] text-white transition-all hover:scale-105 hover:bg-[#009b00] hover:shadow-[0_0_30px_-5px_rgba(0,185,0,0.5)] shadow-xl w-full sm:w-auto"
          >
            <span>Add LINE @WIN_WIN</span>
            <img src="/images/LINE.webp" alt="LINE Logo" className="w-8 h-8 transition-transform group-hover:rotate-12 object-contain" />
          </a>
          <a
            href="https://www.facebook.com/consultantwinwin?locale=th_TH"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 md:px-12 text-xl md:text-2xl font-bold rounded-full bg-[#1877F1] text-white transition-all hover:scale-105 hover:bg-[#0e65d0] hover:shadow-[0_0_30px_-5px_rgba(24,119,242,0.5)] shadow-xl w-full sm:w-auto"
          >
            <span className="hidden sm:inline">สร้างธุรกิจโดยไม่ใช้เงินตัวเอง สไตล์วินวิน</span>
            <span className="sm:hidden">Facebook WinWin Consult</span>
            <img src="/images/Facebook.webp" alt="Facebook Logo" className="w-8 h-8 transition-transform group-hover:rotate-12 object-contain shadow-sm" />
          </a>
          <a
            href="https://www.instagram.com/winwin_consult/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 md:px-12 text-xl md:text-2xl font-bold rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-all hover:scale-105 hover:brightness-110 hover:shadow-[0_0_30px_-5px_rgba(221,42,123,0.5)] shadow-xl w-full sm:w-auto"
          >
            <span>winwin_consult</span>
            <img src="/images/instagram.webp" alt="Instagram Logo" className="w-8 h-8 transition-transform group-hover:rotate-12 object-contain" />
          </a>
          <a
            href="https://www.tiktok.com/@winwin_business"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 md:px-12 text-xl md:text-2xl font-bold rounded-full bg-[#010101] text-white transition-all hover:scale-105 hover:bg-[#1a1a1a] hover:shadow-[0_0_30px_-5px_rgba(105,201,208,0.5)] shadow-sm shadow-white w-full sm:w-auto"
          >
            <span>สร้างธุรกิจแบบวินวิน</span>
            <img src="/images/tiktok.webp" alt="TikTok Logo" className="w-8 h-8 transition-transform group-hover:rotate-12 object-contain" />
          </a>
        </div>
      </div>
    </section>
  );
}
