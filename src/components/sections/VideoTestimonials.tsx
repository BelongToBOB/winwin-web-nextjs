interface Props {
  videos: { videoId: string }[];
  heading?: string;
  subheading?: string;
}

export default function VideoTestimonials({
  videos,
  heading = 'ทำไมเจ้าของธุรกิจถึงประทับใจ <span class="text-yellow-400">คุณวิน</span>',
  subheading = "ฟังเสียงตอบรับจากประสบการณ์ตรงของผู้ประกอบการ SME ที่ใช้เข้าร่วมเป็นที่ปรึกษากับเรา",
}: Props) {
  return (
    <section className="py-24 bg-neutral-950 border-t border-red-500/40 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen -translate-y-1/2"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-lg text-gray-400">{subheading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, i) => (
            <div
              key={i}
              className="flex flex-col bg-black rounded-3xl border border-white/5 overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 hover:border-yellow-400/30 hover:shadow-[0_20px_40px_-15px_rgba(250,204,21,0.15)]"
            >
              <div className="relative w-full aspect-video bg-neutral-900 border-b border-white/10">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${vid.videoId}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
