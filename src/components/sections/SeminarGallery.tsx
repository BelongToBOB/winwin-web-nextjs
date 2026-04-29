interface Props {
  images: string[];
  heading?: string;
  subheading?: string;
}

export default function SeminarGallery({
  images,
  heading = "บรรยากาศการสัมมนาและแชร์ประสบการณ์ธุรกิจ",
  subheading = 'คลาสเรียน "Inside Bank" และการให้คำปรึกษากับผู้ประกอบการ SME',
}: Props) {
  const heroImage = images[0];
  const galleryImages = images.slice(1);

  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-yellow-500/10 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            {subheading}
          </p>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="group relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-neutral-950 border border-white/5 ring-1 ring-white/10">
            <img
              src={heroImage}
              alt="บรรยากาศงานสัมมนา WinWin Wealth Creation"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-50"></div>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 py-2 px-1 [&>*]:mb-4 md:[&>*]:mb-6">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className="group relative break-inside-avoid overflow-hidden rounded-xl md:rounded-2xl bg-neutral-900 border border-white/5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]"
              >
                <img
                  src={src}
                  alt={`ภาพบรรยากาศคลาสเรียนและสัมมนา ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-xl md:rounded-2xl"></div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
