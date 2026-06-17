import Link from "next/link";

interface Props {
  href: string;
  variant?: "yellow" | "outline" | "teal" | "line" | "white-outline";
  size?: "normal" | "large";
  className?: string;
  target?: string;
  children: React.ReactNode;
}

const sizeMap = {
  normal: "px-6 py-3 text-sm",
  large: "px-8 py-4 text-base",
};

// token-based variants (matches reference: filled gold + gold outline + teal)
const variantMap = {
  yellow: "bg-accent text-on-accent hover:bg-accent-hover shadow-glow",
  outline: "border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent",
  teal: "border border-teal/40 text-teal hover:bg-teal-soft hover:border-teal",
  line: "bg-line hover:bg-line-hover text-white",
  "white-outline": "border border-white/20 hover:border-white/40 text-fg",
};

export default function CTAButton({
  href,
  variant = "yellow",
  size = "normal",
  className = "",
  target,
  children,
}: Props) {
  const classes = `mkt-focus inline-flex items-center justify-center font-semibold rounded-pill transition-all duration-200 ease-out hover:-translate-y-0.5 ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  if (target === "_blank") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
