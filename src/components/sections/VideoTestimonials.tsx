"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import type { VideoItem } from "@/data/types";

interface Props {
  videos: VideoItem[];
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
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const getAspectClass = (video: VideoItem) => {
    if (video.aspectRatio === "portrait") return "aspect-[9/16]";
    if (video.aspectRatio === "four-five") return "aspect-[4/5]";
    return vertical ? "aspect-[9/16]" : "aspect-video";
  };

  const getEmbedUrl = (video: VideoItem, autoplay = false) =>
    video.provider === "vimeo"
      ? `https://player.vimeo.com/video/${video.videoId}?app_id=122963${autoplay ? "&autoplay=1" : ""}`
      : `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;

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
              ? "mx-auto grid max-w-4xl grid-cols-2 items-start gap-4 sm:grid-cols-3 sm:gap-6"
              : "grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {videos.map((vid) => (
            <div
              key={`${vid.provider ?? "youtube"}-${vid.videoId}`}
              className="surface-card flex flex-col overflow-hidden rounded-card transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-accent/30"
            >
              <div className={`relative w-full ${getAspectClass(vid)}`}>
                {vid.thumbnailUrl ? (
                  <button
                    type="button"
                    className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden bg-black"
                    onClick={() => setActiveVideo(vid)}
                    aria-label={`เล่น${vid.title ?? "คลิปรีวิวจากผู้ประกอบการ"}`}
                  >
                    <span
                      className="absolute -inset-8 scale-110 bg-cover bg-center opacity-55 blur-2xl"
                      style={{ backgroundImage: `url(${vid.thumbnailUrl})` }}
                    />
                    <span
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${vid.thumbnailUrl})` }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                      <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" aria-hidden="true" />
                    </span>
                  </button>
                ) : (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={getEmbedUrl(vid)}
                    title={vid.title ?? "คลิปรีวิวจากผู้ประกอบการ"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-[min(90vw,640px)] overflow-hidden rounded-card bg-black shadow-2xl ${getAspectClass({
              ...activeVideo,
              aspectRatio: activeVideo.sourceAspectRatio ?? activeVideo.aspectRatio,
            })}`}
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title ?? "คลิปรีวิวจากผู้ประกอบการ"}
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={getEmbedUrl(activeVideo, true)}
              title={activeVideo.title ?? "คลิปรีวิวจากผู้ประกอบการ"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white transition-colors hover:bg-black"
              onClick={() => setActiveVideo(null)}
              aria-label="ปิดวิดีโอ"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
