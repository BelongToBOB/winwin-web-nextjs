interface PricingTier {
  label: string;
  price: string;
  originalPrice?: string;
  tag?: string;
  highlighted?: boolean;
}

interface Props {
  pricing: PricingTier[];
  pricingTag?: string;
  courseName: string;
  lineUrl?: string;
}

export default function PricingCTA({
  pricing,
  pricingTag = "ราคาพิเศษเฉพาะรอบนี้",
  courseName,
  lineUrl = "https://page.line.me/591xftzn?openQrModal=true",
}: Props) {
  return (
    <section id="pricing" className="w-full bg-[#0a0a0a] py-16 md:py-24 border-t border-yellow-500/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Pricing box */}
        <div className="bg-zinc-900 border-2 border-yellow-500/50 rounded-2xl p-6 md:p-8 text-center relative shadow-[0_0_30px_-10px_rgba(250,204,21,0.3)] mb-8">

          {/* Tag badge */}
          {pricingTag && (
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-yellow-500 text-black font-bold py-1.5 px-6 rounded-full text-sm tracking-wide uppercase shadow-[0_4px_10px_rgba(234,179,8,0.4)]">
                {pricingTag}
              </span>
            </div>
          )}

          {/* Tiers */}
          <div className="mt-6 flex flex-col gap-4">
            {pricing.map((tier, i) => (
              <div
                key={i}
                className={`w-full rounded-xl p-5 md:p-6 border text-left ${
                  tier.highlighted
                    ? "bg-yellow-500/10 border-yellow-500/40"
                    : "bg-black/60 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`font-semibold text-lg ${tier.highlighted ? "text-yellow-400" : "text-gray-300"}`}>
                      {tier.label}
                    </p>
                    {tier.originalPrice && (
                      <p className="text-gray-500 text-sm line-through mt-0.5">
                        จากปกติ {tier.originalPrice}
                      </p>
                    )}
                    {tier.tag && (
                      <p className="text-yellow-400 text-xs font-medium mt-1">{tier.tag}</p>
                    )}
                  </div>
                  <p className={`text-3xl md:text-4xl font-black tracking-tight shrink-0 ${
                    tier.highlighted ? "text-yellow-400" : "text-white"
                  }`}>
                    {tier.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINE CTA button */}
        <div className="flex flex-col items-center gap-4">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 rounded-full bg-[#00B900] hover:bg-[#009b00] text-white text-xl font-bold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(0,185,0,0.5)] shadow-xl"
          >
            <span>สมัคร {courseName} ผ่าน LINE</span>
            <img
              src="/images/LINE.webp"
              alt="LINE"
              className="w-7 h-7 object-contain transition-transform group-hover:rotate-12"
            />
          </a>

          <p className="text-gray-500 text-sm text-center max-w-sm leading-relaxed">
            ทักมาบอกชื่อคลาสและแพ็คเกจที่ต้องการ<br />
            ทีมงานจะแจ้งขั้นตอนการชำระเงินทันที
          </p>
        </div>

      </div>
    </section>
  );
}
