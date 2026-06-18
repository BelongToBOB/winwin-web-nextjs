interface GalleryItem {
  image: string;
  title: string;
}

interface Props {
  items: GalleryItem[];
}

// แถบภาพคั่น section — รูปบรรยากาศจริง + คำอธิบายใต้ภาพ (ไม่มีหัวข้อ)
export default function SeminarShowcase({ items }: Props) {
  return (
    <section className="w-full overflow-hidden bg-bg-subtle">
      <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {items.map((item, i) => (
          <figure
            key={i}
            className="group relative aspect-[21/9] w-[88vw] shrink-0 snap-start overflow-hidden border border-white/10 md:w-[62%] xl:w-[34%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-bg/25" />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-fg-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
