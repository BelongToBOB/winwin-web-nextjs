interface Props {
  photos: { img: string }[];
  heading?: string;
  subheading?: string;
}

export default function PhotoTestimonials({
  photos,
  heading = 'ธุรกิจที่พร้อม <span class="text-yellow-400">โต</span> เพราะเข้าใจหลังบ้านแบงก์',
  subheading = "ส่วนหนึ่งของผู้ประกอบการ SME ที่เราช่วยซัพพอร์ต จนสามารถทะลุกำแพงเรื่องเงิน เปลี่ยนคำปฏิเสธให้ยื่นผ่าน และคว้าเงินทุนไปต่อยอดธุรกิจให้โตไวได้จริง",
}: Props) {
  return (
    <section className="py-24 bg-black border-t border-red-500/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p className="text-lg text-gray-400">{subheading}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((item, i) => (
            <figure
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 transition-colors hover:border-yellow-400/50 hover:shadow-[0_0_20px_-5px_rgba(250,204,21,0.3)]"
            >
              <div className="relative aspect-square overflow-hidden bg-black/50">
                <img
                  src={item.img}
                  alt="ผู้ประกอบการ SME ที่ใช้บริการ WinWin"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 mix-blend-multiply"></div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
