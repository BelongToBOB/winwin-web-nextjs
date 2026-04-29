import { landingData } from "@/data/landing";

export default function LandingAbout() {
  const { about } = landingData;

  return (
    <section id="about" className="bg-[#0a0a0a] border-t border-yellow-400/20 py-16 md:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {about.heading}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                ประสบการณ์การทำงาน
              </h3>
              <div className="space-y-4">
                {about.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-yellow-500/30">
                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-yellow-500/60 border-2 border-yellow-500"></div>
                    <p className="text-white font-semibold">{exp.role}</p>
                    <p className="text-gray-400 text-sm">{exp.org}</p>
                    <p className="text-gray-500 text-xs mt-1">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-gray-300 leading-relaxed">{about.bio}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                ธุรกิจและบทบาทปัจจุบัน
              </h3>
              <ul className="space-y-3">
                {about.businesses.map((biz, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{biz}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                ปรัชญาและแนวคิด
              </h3>
              {about.philosophy.map((para, i) => (
                <p key={i} className="text-gray-400 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="bg-zinc-900/80 border-l-4 border-yellow-500 rounded-r-2xl p-6">
              <blockquote className="text-yellow-400 font-semibold text-lg md:text-xl leading-relaxed italic">
                &ldquo;{about.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
