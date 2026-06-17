import CTAButton from "@/components/ui/CTAButton";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";

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
          className={`absolute inset-0 -z-10 h-full w-full object-cover object-center ${flipBg ? "-scale-x-100" : ""}`}
        />
      ) : (
        <div
          className="absolute inset-0 -z-10 bg-bg-subtle"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 75% 35%, rgba(250,204,21,0.10), transparent 70%), linear-gradient(160deg, #1a1611, #14110d)",
          }}
          aria-hidden="true"
        />
      )}
      {/* Overlay — เน้นอ่านข้อความฝั่งซ้าย + vignette ล่าง */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/85 to-bg/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-6">
          {eyebrow && (
            <Eyebrow mark tone="accent">
              {eyebrow}
            </Eyebrow>
          )}

          <h1 className="text-display font-bold text-fg">
            {renderHeadline(headline, highlight, highlightItalic)}
          </h1>

          {lead && <p className="text-lead text-fg-2">{lead}</p>}
          {subnote && <p className="text-sm text-fg-muted">{subnote}</p>}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 pt-2">
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
            </div>
          )}

          {stats && stats.length > 0 && (
            <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="text-3xl font-bold text-fg md:text-4xl">{s.value}</dt>
                  <dd className="text-sm text-fg-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
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
