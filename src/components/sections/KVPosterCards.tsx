interface Props {
  images: string[];
}

export default function KVPosterCards({ images }: Props) {
  return (
    <div className="max-w-5xl mx-auto mt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(250,204,21,0.2)] bg-zinc-900 group ${
              images.length === 3 && index === 2 ? "md:col-span-2 md:max-w-md md:mx-auto" : ""
            }`}
          >
            <img
              src={src}
              alt={`Course poster ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 border border-yellow-400/30 group-hover:border-yellow-400/70 z-20 rounded-2xl md:rounded-3xl transition-colors pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
