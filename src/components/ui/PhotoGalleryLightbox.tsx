"use client";
import { useState, useEffect, useCallback } from "react";

interface Photo {
  img: string;
  span?: string;
}

interface Props {
  photos: Photo[];
  heading?: string;
  subheading?: string;
  footnote?: string;
}

export default function PhotoGalleryLightbox({
  photos,
  heading = "เบื้องหลัง<span class='text-yellow-400'>ทุก Session</span> ที่ธุรกิจเริ่มเปลี่ยน",
  subheading = "ทุก session คือการนั่งวิเคราะห์ธุรกิจของคุณโดยตรง — ไม่ใช่สอนทฤษฎี แต่เจาะลึก วางแผน และหาทางออกร่วมกันแบบตัวต่อตัว",
  footnote = "ภาพจาก Private Consult Session จริง · ปรับตาม Business Case ของแต่ละท่าน",
}: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  }, []);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeLightbox]);

  return (
    <section className="py-24 bg-black border-t border-yellow-400/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.04)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Private Session Gallery
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[240px] gap-3 md:gap-4">
          {photos.map((item, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5 hover:border-yellow-400/40 transition-all duration-500 hover:shadow-[0_0_30px_-8px_rgba(250,204,21,0.25)] cursor-pointer ${item.span || ""}`}
              onClick={() => openLightbox(item.img)}
            >
              <img
                src={item.img}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                alt="Private Consult Session"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Hover zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/40 backdrop-blur-[2px]">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </figure>
          ))}
        </div>

        {footnote && (
          <p className="mt-10 text-center text-sm text-gray-600 tracking-wide">
            {footnote}
          </p>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 lg:top-8 lg:right-10 text-white/50 hover:text-white transition-colors p-2 text-4xl leading-none z-50 rounded-full hover:bg-white/10 w-12 h-12 flex items-center justify-center"
            aria-label="ปิด"
          >
            &times;
          </button>
          <img
            src={lightboxSrc}
            className="max-w-full max-h-[90vh] object-contain px-4 sm:px-8 animate-scale-in"
            alt="Expanded view"
          />
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
    </section>
  );
}
