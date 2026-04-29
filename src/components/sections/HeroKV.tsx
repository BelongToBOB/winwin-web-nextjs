interface Props {
  heroImage: string;
  heroAlt?: string;
  headline: string;
  description: string;
  instructor?: string;
}

export default function HeroKV({
  heroImage,
  heroAlt = "Course Key Visual",
  headline,
  description,
  instructor = "คุณวิน ที่ปรึกษาจาก WinWin Wealth Creation",
}: Props) {
  return (
    <section className="w-full bg-black py-8 md:py-12 mt-3 md:mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[56vw] md:h-[80vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] border border-yellow-400/20">
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center mt-10 px-6">
          <h2
            className="text-2xl md:text-4xl font-bold text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            {description}
            {instructor && (
              <span className="block mt-2">
                โดย <strong className="text-white">{instructor}</strong>
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
