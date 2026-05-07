export default function PaymentChannels() {
  return (
    <section className="payment-channels-section w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">ช่องทางชำระเงิน</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">เลือกช่องทางที่สะดวก</h2>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-green-400 text-xs font-medium">SSL Encrypted — ข้อมูลเข้ารหัสทุกขั้นตอน</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

          {/* QR โอนเงิน */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-base mb-1">QR โอนเงิน</p>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">สแกน QR โอนเข้าบัญชีบริษัทโดยตรง</p>
            </div>
          </div>

          {/* Mobile Banking */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-base mb-1">K PLUS</p>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">ชำระผ่านแอป K PLUS ธนาคารกสิกรไทย</p>
            </div>
          </div>

          {/* Credit Card */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 flex items-start gap-4 sm:col-span-2">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src="/images/creditcard-icon.png" alt="Credit Card" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-semibold text-base mb-1">บัตรเครดิต / เดบิต</p>
              <p className="text-[#6b6b6b] text-sm leading-relaxed">VISA · MasterCard · JCB</p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/checkout"
            className="inline-block bg-[#eab308] text-black font-bold text-base py-4 px-12 rounded-full hover:bg-yellow-400 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(234,179,8,0.25)]"
          >
            สมัครเรียนเลย — 5,900 บาท
          </a>
          <p className="text-[#6b6b6b] text-sm mt-4">เลือกช่องทางชำระได้ในขั้นตอนถัดไป</p>
        </div>

        {/* Trust Bar */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[#6b6b6b] text-xs">ChillPay Payment Gateway</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[#6b6b6b] text-xs">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[#6b6b6b] text-xs">บัตรเครดิตผ่าน ChillPay (ธปท. รับรอง)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
