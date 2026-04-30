"use client";

import { useState, useEffect } from "react";

export default function PromoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("buc-promo-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("buc-promo-dismissed", "1");
  };

  const handleCTA = () => {
    setShow(false);
    localStorage.setItem("buc-promo-dismissed", "1");
    document.querySelector(".payment-channels-section")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Popup */}
      <div className="relative bg-zinc-900 border border-yellow-500/30 rounded-3xl p-8 md:p-10 max-w-md w-full shadow-[0_0_60px_-15px_rgba(250,204,21,0.3)] animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label="ปิด"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-5">
            <span className="text-yellow-400 text-2xl font-black">★</span>
          </div>

          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Early Bird
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            ราคาพิเศษ<br />
            <span className="text-yellow-400">Early Bird</span> เท่านั้น
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gray-500 line-through text-lg">15,900.-</span>
            <span className="text-yellow-400 text-4xl font-black">5,900.-</span>
          </div>

          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            คลาสออนไลน์ 4 ชั่วโมง<br />
            เช็คความพร้อมก่อนเดินเข้าธนาคาร
          </p>

          <button
            onClick={handleCTA}
            className="w-full py-4 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_20px_rgba(234,179,8,0.3)] mb-3"
          >
            ดูรายละเอียด & สมัครเลย
          </button>

          <p className="text-gray-600 text-xs">
            สิทธิพิเศษมีจำนวนจำกัด
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
      `}</style>
    </div>
  );
}
