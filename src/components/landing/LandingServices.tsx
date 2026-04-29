import Link from "next/link";
import { landingData } from "@/data/landing";

export default function LandingServices() {
  const { services } = landingData;

  return (
    <section className="bg-black border-t border-yellow-400/20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {services.heading}
          </h2>
          <p className="text-gray-400 text-lg">{services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.cards.map((card) => (
            <Link
              key={card.url}
              href={card.url}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:shadow-[0_0_30px_-10px_rgba(250,204,21,0.3)]"
            >
              {card.image && (
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5 space-y-3">
                <h3 className="text-white font-bold text-xl group-hover:text-yellow-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.subtitle}</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium pt-2">
                  <span>เรียนรู้เพิ่มเติม</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
