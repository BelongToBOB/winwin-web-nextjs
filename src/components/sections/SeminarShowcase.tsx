import SectionHeading from "@/components/ui/SectionHeading";

interface GalleryItem {
  image: string;
  title: string;
}

interface Props {
  eyebrow?: React.ReactNode;
  heading: string;
  highlight?: string | string[];
  subtitle?: React.ReactNode;
  items: GalleryItem[];
}

// แกลเลอรีบรรยากาศคลาสจริง — เลื่อนแนวนอน (ref-style) ชื่อทับมุมล่าง
export default function SeminarShowcase({ eyebrow, heading, highlight, subtitle, items }: Props) {
  return (
    <section className="w-full overflow-hidden bg-bg-subtle py-section">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowMark
          title={heading}
          highlight={highlight}
          lead={subtitle}
          align="center"
          className="mb-12"
        />
      </div>

      {/* แถวเลื่อนแนวนอน (full-bleed, การ์ดใหญ่แบบ ref) */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <figure
            key={i}
            className="group relative aspect-video w-[85vw] shrink-0 snap-start overflow-hidden rounded-card md:w-[46vw] xl:w-[31.5%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/90 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-base font-medium text-fg-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
