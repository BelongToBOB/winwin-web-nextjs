import CTAButton from "@/components/ui/CTAButton";
import SectionHeading from "@/components/ui/SectionHeading";

export interface ServiceCardItem {
  title: string;
  subtitle?: string;
  image?: string;
  url: string;
  /** ป้ายมุมบนซ้าย เช่น "ออนไลน์" / "Workshop" (ถ้าต้องการ) */
  tag?: string;
  ctaText?: string;
}

interface Props {
  eyebrow?: React.ReactNode;
  heading: string;
  highlight?: string | string[];
  subtitle?: React.ReactNode;
  cards: ServiceCardItem[];
}

export default function ServiceCards({ eyebrow, heading, highlight, subtitle, cards }: Props) {
  return (
    <section className="w-full bg-bg-subtle py-section">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowMark
          title={heading}
          highlight={highlight}
          lead={subtitle}
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <article
              key={i}
              className="surface-card group flex flex-col overflow-hidden rounded-card transition-transform duration-200 ease-out hover:-translate-y-1"
            >
              <div className="relative">
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.image}
                    alt={card.title}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div
                    className="aspect-video w-full bg-gradient-to-br from-surface-2 to-bg"
                    aria-hidden="true"
                  />
                )}
                {card.tag && (
                  <span className="absolute left-3 top-3 rounded-pill bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-on-accent">
                    {card.tag}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-h3 font-bold text-fg">{card.title}</h3>
                {card.subtitle && <p className="text-sm text-fg-2">{card.subtitle}</p>}
                <div className="mt-auto pt-2">
                  <CTAButton href={card.url} variant="yellow" className="w-full">
                    {card.ctaText ?? "สมัครเลย"}
                  </CTAButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
