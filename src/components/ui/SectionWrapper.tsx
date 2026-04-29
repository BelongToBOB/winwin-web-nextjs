interface Props {
  id?: string;
  className?: string;
  bg?: "black" | "darker" | "zinc";
  borderTop?: "yellow" | "red" | "none";
  padding?: "normal" | "large" | "none";
  children: React.ReactNode;
}

const bgMap = {
  black: "bg-black",
  darker: "bg-[#0a0a0a]",
  zinc: "bg-zinc-900",
};

const borderMap = {
  yellow: "border-t border-yellow-400/20",
  red: "border-t border-red-500/20",
  none: "",
};

const paddingMap = {
  normal: "py-16 md:py-24",
  large: "py-24 md:py-32",
  none: "",
};

export default function SectionWrapper({
  id,
  className = "",
  bg = "black",
  borderTop = "none",
  padding = "normal",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`${bgMap[bg]} ${borderMap[borderTop]} ${paddingMap[padding]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
