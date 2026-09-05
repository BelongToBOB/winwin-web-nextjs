import CTAButton from "@/components/ui/CTAButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import CardCarousel from "@/components/ui/CardCarousel";

export interface JourneyStep {
  /** ป้ายขั้น เช่น "ขั้นที่ 1 · ออนไลน์" */
  eyebrow?: React.ReactNode;
  title: string;
  /** คำใน title ที่ไฮไลต์เป็น teal (ถ้าต้องการ) */
  highlight?: string | string[];
  /** ประโยคผลลัพธ์ (มีเส้นทองด้านซ้าย) */
  lead?: React.ReactNode;
  /** จุดเด่นแบบ bullet ลูกศรทอง */
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  badge?: string;
  href?: string;
  ctaText?: string;
  /** true = แสดง subCards เป็น carousel (เลื่อนได้) แทน grid — ใช้เมื่อการ์ดเกินจำนวนต่อแถว */
  carousel?: boolean;
  /** ถ้ามี = render เป็นการ์ดย่อยหลายคอร์สแทน layout รูปข้าง (เช่น Onsite รวม 2 คอร์ส) */
  subCards?: {
    title: string;
    subtitle?: string;
    image?: string;
    /** ถ้าไม่ใส่ = การ์ดโชว์เฉย ๆ (ไม่มีปุ่ม/ไม่เป็นลิงก์) สำหรับคอร์สที่ยังไม่มี sale page */
    href?: string;
    ctaText?: string;
  }[];
}

interface Props {
  eyebrow?: React.ReactNode;
  heading: string;
  highlight?: string | string[];
  subtitle?: React.ReactNode;
  steps: JourneyStep[];
}

function renderTitle(title: string, highlight: Props["highlight"]) {
  if (!highlight) return title;
  const terms = (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean);
  if (terms.length === 0) return title;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = title.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className="text-teal">
        {part}
      </span>
    ) : (
      part
    )
  );
}

type JourneySubCard = NonNullable<JourneyStep["subCards"]>[number];

// การ์ดย่อยหนึ่งใบ (รูป + หัวข้อ + subtitle + ปุ่ม) — ใช้ร่วมทั้ง grid และ carousel
function renderSubCard(sc: JourneySubCard, si: number) {
  const inner = (
    <>
      <div className="relative aspect-video w-full bg-bg-subtle">
        {sc.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sc.image}
            alt={sc.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface-3 to-surface" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1 p-4">
        <h4 className="font-bold text-fg">{sc.title}</h4>
        {sc.subtitle && <p className="text-sm text-fg-2">{sc.subtitle}</p>}
        {sc.href && (
          <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-pill border border-accent/40 px-4 py-2 text-sm font-semibold text-accent transition-colors group-hover/sc:border-accent group-hover/sc:bg-accent group-hover/sc:text-on-accent">
            {sc.ctaText ?? "ดูรายละเอียด"}
            <svg
              className="h-4 w-4 transition-transform group-hover/sc:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </div>
    </>
  );
  const cardClass =
    "group/sc flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-surface-2";
  return sc.href ? (
    <a
      key={si}
      href={sc.href}
      className={`mkt-focus ${cardClass} transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent/40`}
    >
      {inner}
    </a>
  ) : (
    <div key={si} className={cardClass}>
      {inner}
    </div>
  );
}

export default function JourneyTimeline({ eyebrow, heading, highlight, subtitle, steps }: Props) {
  return (
    <section className="w-full border-t border-accent/10 bg-bg py-section">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            eyebrowMark
            title={heading}
            highlight={highlight}
            highlightTone="accent"
            lead={subtitle}
            align="center"
            className="mb-16"
          />
        </Reveal>

        <Stagger as="ol" className="relative">
          {steps.map((step, i) => {
            const n = i + 1;
            return (
              <StaggerItem as="li" key={i} className="relative pb-10 pl-16 last:pb-0 md:pl-24">
                {/* เส้นเชื่อมแนวตั้ง + วงกลมเลข (มือถือ + เดสก์ท็อป) */}
                <span
                  className="absolute left-5 top-0 h-full w-px bg-accent/25 md:left-6"
                  aria-hidden="true"
                />
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-bg text-base font-bold text-accent md:h-12 md:w-12 md:text-lg">
                  {n}
                </span>

                {step.subCards ? (
                  /* หมวดที่มีหลายคอร์ส (เช่น Onsite) — header + การ์ดย่อย */
                  <article className="surface-card overflow-hidden rounded-card p-6 md:p-8">
                    <div className="flex flex-col gap-4">
                      {step.eyebrow && <Eyebrow tone="accent">{step.eyebrow}</Eyebrow>}
                      <h3 className="text-h3 font-bold text-fg">
                        {renderTitle(step.title, step.highlight)}
                      </h3>
                      {step.lead && (
                        <p className="border-l-2 border-accent pl-4 text-fg-2">{step.lead}</p>
                      )}
                    </div>
                    {step.carousel ? (
                      <CardCarousel
                        className="mt-6"
                        gapClass="gap-4"
                        basisClass="basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
                        ariaLabel={step.title}
                      >
                        {step.subCards.map((sc, si) => renderSubCard(sc, si))}
                      </CardCarousel>
                    ) : (
                      <div
                        className={`mt-6 grid gap-4 sm:grid-cols-2 ${
                          step.subCards.length >= 3 ? "lg:grid-cols-3" : ""
                        }`}
                      >
                        {step.subCards.map((sc, si) => renderSubCard(sc, si))}
                      </div>
                    )}
                  </article>
                ) : (
                /* Side card: รูป | เนื้อหา */
                <article className="surface-card grid overflow-hidden rounded-card md:grid-cols-[3fr_2fr]">
                  <div className="relative aspect-video">
                    {step.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={step.image}
                        alt={step.imageAlt ?? step.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-surface-2 to-bg"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                    {step.eyebrow && <Eyebrow tone="accent">{step.eyebrow}</Eyebrow>}

                    <h3 className="text-h3 font-bold text-fg">
                      {renderTitle(step.title, step.highlight)}
                    </h3>

                    {step.lead && (
                      <p className="border-l-2 border-accent pl-4 text-fg-2">{step.lead}</p>
                    )}

                    {step.bullets && step.bullets.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {step.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-fg-2">
                            <span className="mt-1 text-accent" aria-hidden="true">
                              ›
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      {step.badge && <Badge>{step.badge}</Badge>}
                      {step.href && (
                        <CTAButton href={step.href} variant="outline" className="group ml-auto">
                          {step.ctaText ?? "ดูรายละเอียด"}
                          <svg
                            className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </CTAButton>
                      )}
                    </div>
                  </div>
                </article>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
