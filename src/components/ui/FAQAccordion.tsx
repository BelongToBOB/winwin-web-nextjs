"use client";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  faqs,
  eyebrow = "FAQ",
  heading = "คำถามที่พบบ่อย",
  subtitle = "มีคำถามเพิ่มเติม ทักไลน์ @win_win ได้เลย",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full bg-bg-subtle py-section border-t border-accent/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="text-h2 font-semibold text-fg">{heading}</h2>
          <p className="text-fg-2">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`surface-card overflow-hidden rounded-card transition-colors duration-200 ${
                  isOpen ? "border-accent/40" : ""
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="mkt-focus flex w-full cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-fg font-medium text-base leading-snug">
                    <span className="text-accent/70 text-sm font-bold mr-2">Q{i + 1}</span>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-5 pb-5 pt-1">
                    <p className="text-fg-2 text-base leading-relaxed border-t border-white/10 pt-4">
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
