interface Props {
  heroImage: string;
  heroAlt?: string;
  headline: string;
  description: string;
  instructor?: string;
  /** true = แสดง cover แบบ banner 16:9 (เตี้ย+แคบลง) เหมาะกับ cover แนวนอน */
  wide?: boolean;
}

export default function HeroKV({
  heroImage,
  heroAlt = "Course Key Visual",
  headline,
  description,
  instructor = "คุณวิน ที่ปรึกษาจาก WinWin Wealth Creation",
  wide = false,
}: Props) {
  return (
    <section className="w-full bg-bg py-8 md:py-12 mt-3 md:mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative w-full overflow-hidden rounded-card shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] border border-accent/20 ${
            wide ? "aspect-video max-w-5xl mx-auto" : "h-[56vw] md:h-[80vh]"
          }`}
        >
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center mt-10 px-6">
          <h2
            className="text-h2 font-bold text-fg leading-tight"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          <p className="mt-6 text-fg-2 text-lg leading-relaxed">
            {description}
            {instructor && (
              <span className="block mt-2">
                โดย <strong className="text-fg">{instructor}</strong>
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
