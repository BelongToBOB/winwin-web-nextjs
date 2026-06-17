import Eyebrow from "@/components/ui/Eyebrow";

interface Props {
  photos: { img: string }[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
}

export default function PhotoTestimonials({
  photos,
  eyebrow = "เสียงจากลูกค้า",
  heading = 'ธุรกิจที่พร้อม <span class="text-accent">โต</span> เพราะเข้าใจหลังบ้านแบงก์',
  subheading = "ส่วนหนึ่งของผู้ประกอบการ SME ที่เราช่วยซัพพอร์ต จนสามารถทะลุกำแพงเรื่องเงิน เปลี่ยนคำปฏิเสธให้ยื่นผ่าน และคว้าเงินทุนไปต่อยอดธุรกิจให้โตไวได้จริง",
}: Props) {
  return (
    <section className="w-full bg-bg-subtle py-section border-t border-accent/10">
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          {eyebrow && <Eyebrow mark>{eyebrow}</Eyebrow>}
          <h2
            className="mt-4 text-h2 font-bold text-fg tracking-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="mt-4 text-lg text-fg-2">{subheading}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {photos.map((item, i) => (
            <figure
              key={i}
              className="surface-card group relative flex flex-col overflow-hidden rounded-card transition-colors hover:border-accent/50"
            >
              <div className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt="ผู้ประกอบการ SME ที่ใช้บริการ WinWin"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-70"></div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
