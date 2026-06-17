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
      <div className="surface-card rounded-card p-6 md:p-8">
        <h3 className="text-h3 font-bold text-accent mb-6 flex items-center">
          <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {featuresHeading}
        </h3>
        <ul className="space-y-4">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start text-fg-2">
              <span className="mr-3 text-positive shrink-0 mt-0.5 text-lg">✅</span>
              <span className="leading-relaxed">
                <strong className="text-fg">{feat.title}:</strong> {feat.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 flex flex-col justify-between">
        <div className="bg-gradient-to-br from-accent/20 to-surface border border-accent/30 rounded-card p-6 md:p-8 relative overflow-hidden flex-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
          <h3 className="text-h3 font-bold text-accent mb-6 flex items-center relative z-10">
            <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span>{bonusHeading}</span>
          </h3>
          <ul className="space-y-4 relative z-10">
            {bonuses.map((bonus, i) => (
              <li key={i} className="flex items-start text-fg-2">
                <span className="mr-3 text-accent shrink-0 mt-0.5 text-lg">🎁</span>
                <span className="leading-relaxed">
                  <strong className="text-fg">{bonus.title}:</strong> {bonus.description}
                  {bonus.value && (
                    <span className="text-accent font-bold ml-1 text-sm">({bonus.value})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card border-2 border-accent/50 rounded-card p-6 md:p-8 text-center relative shadow-glow">
          {pricingTag && (
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-accent text-on-accent font-bold py-1.5 px-6 rounded-pill text-sm md:text-base tracking-wide uppercase shadow-[0_4px_10px_rgba(234,179,8,0.4)]">
                {pricingTag}
              </span>
            </div>
          )}
          <div className="mt-6 flex flex-col items-center justify-center space-y-4">
            {pricing.map((tier, i) => (
              <div
                key={i}
                className={`w-full rounded-card p-5 md:p-6 border ${
                  tier.highlighted
                    ? "bg-accent/10 border-accent/30"
                    : "bg-bg/60 border-surface-3"
                }`}
              >
                <p className="text-fg-2 mb-1 text-lg">{tier.label}</p>
                <p
                  className={`text-4xl md:text-5xl font-black tracking-tight ${
                    tier.highlighted ? "text-accent" : "text-fg"
                  }`}
                >
                  {tier.price}
                </p>
                {tier.originalPrice && (
                  <p className="text-base text-fg-muted line-through mt-2">
                    จากปกติ {tier.originalPrice}
                  </p>
                )}
                {tier.tag && (
                  <p className="text-sm text-teal font-medium mt-2">{tier.tag}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
