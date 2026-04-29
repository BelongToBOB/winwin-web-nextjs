"use client";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-black py-16 md:py-24 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            คำถามที่พบบ่อย
          </h2>
          <p className="text-gray-400">หากมีคำถาม แอดไลน์ @WIN_WIN</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-zinc-900 border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-yellow-500/30" : "border-zinc-800"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between gap-4 px-5 py-4 w-full text-left select-none"
                >
                  <span className="text-white font-medium text-base leading-snug">
                    <span className="text-yellow-400/70 text-sm font-bold mr-2">
                      Q{i + 1}
                    </span>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-yellow-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-gray-400 text-base leading-relaxed border-t border-zinc-800 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
