interface Feature {
  title: string;
  description: string;
}

interface Bonus {
  title: string;
  description: string;
  value?: string;
}

interface PricingTier {
  label: string;
  price: string;
  originalPrice?: string;
  tag?: string;
  highlighted?: boolean;
}

interface Props {
  featuresHeading?: string;
  features: Feature[];
  bonusHeading?: string;
  bonuses: Bonus[];
  pricing: PricingTier[];
  pricingTag?: string;
}

export default function FeaturesAndBonuses({
  featuresHeading = 'สิ่งที่คุณจะได้รับแบบ "จับต้องได้" ในคลาสนี้',
  features,
  bonusHeading = "BONUS เฉพาะรอบนี้",
  bonuses,
  pricing,
  pricingTag = "ราคาพิเศษเฉพาะรอบนี้",
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 flex items-center">
          <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {featuresHeading}
        </h3>
        <ul className="space-y-4">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start text-gray-300">
              <span className="mr-3 text-green-500 shrink-0 mt-0.5 text-lg">✅</span>
              <span className="leading-relaxed">
                <strong className="text-white">{feat.title}:</strong> {feat.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 flex flex-col justify-between">
        <div className="bg-gradient-to-br from-yellow-500/20 to-zinc-900 border border-yellow-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden flex-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 flex items-center relative z-10">
            <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span>{bonusHeading}</span>
          </h3>
          <ul className="space-y-4 relative z-10">
            {bonuses.map((bonus, i) => (
              <li key={i} className="flex items-start text-gray-300">
                <span className="mr-3 text-yellow-400 shrink-0 mt-0.5 text-lg">🎁</span>
                <span className="leading-relaxed">
                  <strong className="text-white">{bonus.title}:</strong> {bonus.description}
                  {bonus.value && (
                    <span className="text-yellow-400 font-bold ml-1 text-sm">({bonus.value})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-zinc-900 border-2 border-yellow-500/50 rounded-2xl p-6 md:p-8 text-center relative shadow-[0_0_30px_-10px_rgba(250,204,21,0.3)]">
          {pricingTag && (
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-yellow-500 text-black font-bold py-1.5 px-6 rounded-full text-sm md:text-base tracking-wide uppercase shadow-[0_4px_10px_rgba(234,179,8,0.4)]">
                {pricingTag}
              </span>
            </div>
          )}
          <div className="mt-6 flex flex-col items-center justify-center space-y-4">
            {pricing.map((tier, i) => (
              <div
                key={i}
                className={`w-full rounded-xl p-5 md:p-6 border ${
                  tier.highlighted
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-black/60 border-zinc-800"
                }`}
              >
                <p className="text-gray-400 mb-1 text-lg">{tier.label}</p>
                <p
                  className={`text-4xl md:text-5xl font-black tracking-tight ${
                    tier.highlighted ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {tier.price}
                </p>
                {tier.originalPrice && (
                  <p className="text-base text-gray-500 line-through mt-2">
                    จากปกติ {tier.originalPrice}
                  </p>
                )}
                {tier.tag && (
                  <p className="text-sm text-yellow-400 mt-2">{tier.tag}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
