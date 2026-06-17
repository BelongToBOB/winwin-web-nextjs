import CTAButton from "@/components/ui/CTAButton";
import SectionHeading from "@/components/ui/SectionHeading";

export interface PricingPackage {
  /** ป้ายบนการ์ด เช่น MOST POPULAR / ทุกอย่างครบ */
  badge?: { label: string; tone: "accent" | "teal" };
  eyebrow?: string;
  eyebrowTone?: "accent" | "teal";
  title: string;
  description?: string;
  image?: string;
  features: string[];
  /** บรรทัดประหยัด เช่น "ประหยัด ฿8,000 · 50% off" */
  savings?: string;
  price: string;
  originalPrice?: string;
  highlighted?: boolean;
  highlightTone?: "accent" | "teal";
  url: string;
  ctaText?: string;
}

interface Props {
  eyebrow?: React.ReactNode;
  heading: string;
  highlight?: string | string[];
  subtitle?: React.ReactNode;
  packages: PricingPackage[];
}

const toneText = { accent: "text-accent", teal: "text-teal" };
const toneDot = { accent: "text-accent", teal: "text-teal" };
const badgeTone = {
  accent: "bg-accent text-on-accent",
  teal: "bg-teal text-on-teal",
};
const ringTone = {
  accent: "border-accent/50",
  teal: "border-teal/50",
};

export default function PricingCards({ eyebrow, heading, highlight, subtitle, packages }: Props) {
  return (
    <section className="w-full bg-bg py-section">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowMark
          title={heading}
          highlight={highlight}
          lead={subtitle}
          align="center"
          className="mb-16"
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg, i) => {
            const tone = pkg.highlightTone ?? "accent";
            return (
              <article
                key={i}
                className={`surface-card relative flex flex-col rounded-card transition-transform duration-200 ease-out hover:-translate-y-1 ${
                  pkg.highlighted ? `border-2 ${ringTone[tone]}` : ""
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-pill px-4 py-1 text-xs font-bold uppercase tracking-wide shadow-lg ${badgeTone[pkg.badge.tone]}`}
                  >
                    {pkg.badge.label}
                  </span>
                )}
                {pkg.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="aspect-video w-full rounded-t-card object-cover"
                  />
                )}

                <div className="flex flex-1 flex-col p-6 md:p-7">
                {pkg.eyebrow && (
                  <p
                    className={`text-eyebrow font-semibold uppercase tracking-[0.14em] ${toneText[pkg.eyebrowTone ?? "accent"]}`}
                  >
                    {pkg.eyebrow}
                  </p>
                )}

                <h3 className="mt-2 text-h3 font-bold text-fg">{pkg.title}</h3>
                {pkg.description && (
                  <p className="mt-2 min-h-[2.5rem] text-sm text-fg-2">{pkg.description}</p>
                )}

                <ul className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-fg-2">
                      <span className={`mt-0.5 ${toneDot[tone]}`} aria-hidden="true">
                        •
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  {pkg.savings && (
                    <p className="text-sm font-semibold text-teal tabular-nums">{pkg.savings}</p>
                  )}
                  <p className="mt-1 flex items-baseline gap-2 tabular-nums">
                    <span className="text-3xl font-bold text-fg">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-base text-fg-2 line-through">{pkg.originalPrice}</span>
                    )}
                  </p>
                  <CTAButton
                    href={pkg.url}
                    variant={pkg.highlighted ? "yellow" : tone === "teal" ? "teal" : "outline"}
                    className="mt-5 w-full"
                  >
                    {pkg.ctaText ?? "ดูรายละเอียด"}
                  </CTAButton>
                </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
