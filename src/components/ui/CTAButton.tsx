import Link from "next/link";

interface Props {
  href: string;
  variant?: "line" | "yellow" | "white-outline";
  size?: "normal" | "large";
  className?: string;
  target?: string;
  children: React.ReactNode;
}

const sizeMap = {
  normal: "px-6 py-3 text-sm",
  large: "px-8 py-4 text-base",
};

const variantMap = {
  line: "bg-[#00B900] hover:bg-[#009b00] text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-400 text-black",
  "white-outline": "border-2 border-white/20 hover:border-white/40 text-white",
};

export default function CTAButton({
  href,
  variant = "yellow",
  size = "normal",
  className = "",
  target,
  children,
}: Props) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 hover:scale-105 ${sizeMap[size]} ${variantMap[variant]} ${className}`;

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
