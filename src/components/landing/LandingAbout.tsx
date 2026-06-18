import { landingData } from "@/data/landing";

export default function LandingAbout() {
  const { about } = landingData;

  return (
    <section id="about" className="bg-bg-subtle border-t border-accent/10 py-section scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-h2 font-semibold text-fg mb-4">
            {about.heading}
          </h2>
          <p className="text-fg-2 text-lg md:text-xl max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">
                ประสบการณ์การทำงาน
              </h3>
              <div className="space-y-4">
                {about.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-accent/30">
                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent/60 border-2 border-accent"></div>
                    <p className="text-fg font-semibold">{exp.role}</p>
                    <p className="text-fg-2 text-sm">{exp.org}</p>
                    <p className="text-fg-muted text-xs mt-1">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card rounded-card p-6">
              <p className="text-fg-2 leading-relaxed">{about.bio}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">
                ธุรกิจและบทบาทปัจจุบัน
              </h3>
              <ul className="space-y-3">
                {about.businesses.map((biz, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-fg-2">{biz}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">
                ปรัชญาและแนวคิด
              </h3>
              {about.philosophy.map((para, i) => (
                <p key={i} className="text-fg-2 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="surface-card border-l-4 border-accent rounded-r-card p-6">
              <blockquote className="text-accent font-semibold text-lg md:text-xl leading-relaxed italic">
                &ldquo;{about.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
