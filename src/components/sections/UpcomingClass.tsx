import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import CTAButton from "@/components/ui/CTAButton";

interface Props {
  eyebrow?: string;
  heading?: string;
  image: string;
  imageAlt?: string;
  badgeLabel?: string;
  lineUrl: string;
  ctaText?: string;
}

// แบนเนอร์คลาสล่าสุดที่กำลังจะมาถึง
export default function UpcomingClass({
  eyebrow = "รอบล่าสุด",
  heading = "คลาสที่กำลังจะมาถึง",
  image,
  imageAlt = "คลาสล่าสุดที่กำลังจะมาถึง",
  badgeLabel = "NEW · รอบใหม่",
  lineUrl,
  ctaText = "สำรองที่นั่ง · ติดต่อ Line",
}: Props) {
  return (
    <section className="w-full border-t border-accent/10 bg-bg-subtle py-section">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Eyebrow mark>{eyebrow}</Eyebrow>
          <h2 className="text-h2 font-semibold text-fg">{heading}</h2>
        </div>

        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mkt-focus group relative block overflow-hidden rounded-card border border-white/10 shadow-glow"
        >
          <span className="absolute left-4 top-4 z-10">
            <Badge variant="accent">{badgeLabel}</Badge>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[2059/764] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </a>

        <div className="mt-6 flex justify-center">
          <CTAButton href={lineUrl} target="_blank" variant="line" size="large">
            {ctaText}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
