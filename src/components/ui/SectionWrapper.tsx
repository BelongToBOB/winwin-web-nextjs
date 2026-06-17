interface Props {
  id?: string;
  className?: string;
  bg?: "bg" | "subtle" | "surface" | "black" | "darker" | "zinc";
  borderTop?: "accent" | "teal" | "none" | "yellow" | "red";
  padding?: "normal" | "large" | "none";
  children: React.ReactNode;
}

// token-based; legacy keys (black/darker/zinc/yellow/red) kept for backward compat during migrate
const bgMap = {
  bg: "bg-bg",
  subtle: "bg-bg-subtle",
  surface: "bg-surface",
  black: "bg-bg",
  darker: "bg-bg-subtle",
  zinc: "bg-surface",
};

const borderMap = {
  accent: "border-t border-accent/20",
  teal: "border-t border-teal/20",
  none: "",
  yellow: "border-t border-accent/20",
  red: "border-t border-negative/20",
};

const paddingMap = {
  normal: "py-section",
  large: "py-section md:py-32",
  none: "",
};

export default function SectionWrapper({
  id,
  className = "",
  bg = "bg",
  borderTop = "none",
  padding = "normal",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`${bgMap[bg]} ${borderMap[borderTop]} ${paddingMap[padding]} ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--container-marketing)] px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
