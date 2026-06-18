"use client";

import CTAButton from "@/components/ui/CTAButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

interface CtaLink {
  text: string;
  url: string;
  target?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Props {
  /** รูปพื้นหลังเต็มจอ — ถ้าไม่ใส่จะใช้ gradient placeholder ไปก่อน */
  bgImage?: string;
  bgAlt?: string;
  /** กลับด้านรูปแนวนอน (mirror) */
  flipBg?: boolean;
  eyebrow?: React.ReactNode;
  headline: string;
  /** คำใน headline ที่ไฮไลต์เป็นทอง (แบบต้นแบบ) */
  highlight?: string | string[];
  /** ทำคำไฮไลต์เป็นตัวเอียงแบบต้นแบบ */
  highlightItalic?: boolean;
  lead?: React.ReactNode;
  subnote?: React.ReactNode;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  stats?: Stat[];
  /** แถบประกาศล่างแบบต้นแบบ (NEW · รอบใหม่ ...) */
  announcement?: { tag?: string; text: React.ReactNode; url?: string };
}

function renderHeadline(headline: string, highlight: Props["highlight"], italic?: boolean) {
  if (!highlight) return headline;
  const terms = (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean);
  if (terms.length === 0) return headline;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = headline.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className={`text-accent ${italic ? "italic" : ""}`}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function HeroSpotlight({
  bgImage,
  bgAlt = "",
  flipBg = false,
  eyebrow,
  headline,
  highlight,
  highlightItalic = true,
  lead,
  subnote,
  primaryCta,
  secondaryCta,
  stats,
  announcement,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[640px] w-full items-center overflow-hidden bg-bg md:min-h-[88vh]">
      {/* Background */}
      {bgImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bgImage}
          alt={bgAlt}
          className={`absolute inset-y-0 left-0 -z-10 h-full w-[135%] max-w-none object-cover object-center md:w-[135%] ${flipBg ? "-scale-x-100" : ""}`}
        />
      ) : (
        <div
          className="absolute inset-0 -z-10 bg-bg-subtle"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 75% 35%, rgba(212,175,55,0.10), transparent 70%), linear-gradient(160deg, #1a1611, #14110d)",
          }}
          aria-hidden="true"
        />
      )}
      {/* Overlay แบบ cinematic — ดำเข้มซ้าย + คลุมทั้งภาพให้ moody + ไล่ดำล่าง/บน */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bg from-0% via-bg/75 via-42% to-bg/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-bg via-bg/45 via-30% to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg/70 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-20 sm:px-6 lg:px-8">
        <Stagger onMount className="flex max-w-2xl flex-col gap-6 [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
          {eyebrow && (
            <StaggerItem>
              <Eyebrow mark tone="accent">
                {eyebrow}
              </Eyebrow>
            </StaggerItem>
          )}

          <StaggerItem>
            <h1 className="text-display font-semibold text-fg">
              {renderHeadline(headline, highlight, highlightItalic)}
            </h1>
          </StaggerItem>

          {lead && (
            <StaggerItem>
              <p className="text-lead text-fg-2">{lead}</p>
            </StaggerItem>
          )}
          {subnote && (
            <StaggerItem>
              <p className="text-sm text-fg-muted">{subnote}</p>
            </StaggerItem>
          )}

          {(primaryCta || secondaryCta) && (
            <StaggerItem className="flex flex-wrap gap-4 pt-2">
              {primaryCta && (
                <CTAButton href={primaryCta.url} variant="yellow" size="large" target={primaryCta.target}>
                  {primaryCta.text}
                </CTAButton>
              )}
              {secondaryCta && (
                <CTAButton href={secondaryCta.url} variant="outline" size="large" target={secondaryCta.target}>
                  {secondaryCta.text}
                </CTAButton>
              )}
            </StaggerItem>
          )}

          {stats && stats.length > 0 && (
            <StaggerItem>
              <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <dt className="text-3xl font-bold text-fg md:text-4xl">{s.value}</dt>
                    <dd className="text-sm text-fg-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          )}
        </Stagger>
      </div>

      {/* Announcement bar */}
      {announcement && (
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-bg/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[var(--container-marketing)] items-center gap-3 px-4 py-3 text-sm sm:px-6 lg:px-8">
            {announcement.tag && <Badge variant="accent">{announcement.tag}</Badge>}
            {announcement.url ? (
              <a href={announcement.url} className="mkt-focus text-fg-2 hover:text-accent">
                {announcement.text}
              </a>
            ) : (
              <span className="text-fg-2">{announcement.text}</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
