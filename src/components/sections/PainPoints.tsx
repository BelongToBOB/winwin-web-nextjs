interface Props {
  heading?: string;
  subheading?: string;
  items: string[];
}

export default function PainPoints({
  heading = 'เคยสงสัยไหม... ทำไมธุรกิจคุณไปได้ดี แต่พอถึงเวลาต้องใช้เงินก้อน กลับ "ไปต่อไม่ได้"?',
  subheading,
  items,
}: Props) {
  return (
    <div className="rounded-card border border-negative/20 bg-negative/5 p-6 md:p-8">
      <h3
        className="text-h3 font-bold text-fg mb-5 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      {subheading && <p className="text-fg-2 text-lg mb-5">{subheading}</p>}
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-fg-2">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-negative"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
            </svg>
            <span className="text-base md:text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
