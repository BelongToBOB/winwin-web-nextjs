import Eyebrow from "@/components/ui/Eyebrow";

interface Props {
  videos: { videoId: string }[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  /** true = YouTube Shorts แนวตั้ง 9:16 (default = แนวนอน 16:9) */
  vertical?: boolean;
}

export default function VideoTestimonials({
  videos,
  eyebrow = "รีวิวจากผู้ประกอบการ",
  heading = 'ทำไมเจ้าของธุรกิจถึงประทับใจ <span class="text-accent">คุณวิน</span>',
  subheading = "ฟังเสียงตอบรับจากประสบการณ์ตรงของผู้ประกอบการ SME ที่ใช้เข้าร่วมเป็นที่ปรึกษากับเรา",
  vertical = false,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-bg py-section border-t border-accent/10">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-3 text-center">
          {eyebrow && <Eyebrow mark>{eyebrow}</Eyebrow>}
          <h2
            className="text-h2 font-bold text-fg tracking-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-lg text-fg-2">{subheading}</p>
        </div>
        <div
          className={
            vertical
              ? "mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
              : "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {videos.map((vid, i) => (
            <div
              key={i}
              className="surface-card flex flex-col overflow-hidden rounded-card transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-accent/30"
            >
              <div className={`relative w-full ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${vid.videoId}?rel=0&modestbranding=1`}
                  title="คลิปรีวิวจากผู้ประกอบการ"
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
