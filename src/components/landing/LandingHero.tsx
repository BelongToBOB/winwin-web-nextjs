import { landingData } from "@/data/landing";
import CTAButton from "@/components/ui/CTAButton";

export default function LandingHero() {
  const { hero } = landingData;

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20">
              {hero.badge}
            </span>
            <p className="text-gray-400 text-sm font-medium">{hero.name}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {hero.headline}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              {hero.subheadline}
            </p>
            <p className="text-yellow-400 text-xl md:text-2xl font-bold">
              {hero.highlight}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <CTAButton href={hero.ctaPrimary.url} variant="yellow" size="large" target="_blank">
                {hero.ctaPrimary.text}
              </CTAButton>
              <CTAButton href={hero.ctaSecondary.url} variant="white-outline" size="large">
                {hero.ctaSecondary.text}
              </CTAButton>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {hero.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all"
                >
                  {social.platform === "facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social.platform === "youtube" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {social.platform === "line" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative w-72 md:w-96 aspect-[3/4] rounded-3xl border-2 border-yellow-500/30 overflow-hidden shadow-[0_20px_50px_-12px_rgba(250,204,21,0.15)] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black">
                <img
                  src={hero.profileImage}
                  alt={hero.name}
                  className="absolute top-0 left-0 w-full h-auto -translate-x-[5%]"
                />
                <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.5)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
