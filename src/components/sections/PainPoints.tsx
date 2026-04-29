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
    <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
      <h3
        className="text-xl md:text-2xl font-bold text-white mb-5 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      {subheading && <p className="text-gray-400 text-lg mb-5">{subheading}</p>}
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start text-gray-300">
            <span className="mr-3 text-red-500 shrink-0 mt-0.5 text-lg">⛔️</span>
            <span className="text-base md:text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
