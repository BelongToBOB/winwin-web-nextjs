interface Props {
  children: React.ReactNode;
  /** default = chip กลาง, accent = ทอง (MOST POPULAR/Early Bird), teal = ครบ/ส่วนลด */
  variant?: "default" | "accent" | "teal" | "negative";
  className?: string;
}

const variantMap = {
  default: "bg-surface-3 text-fg-2",
  accent: "bg-accent/10 text-accent border border-accent/25",
  teal: "bg-teal-soft text-teal border border-teal/25",
  negative: "bg-negative/10 text-negative border border-negative/25",
};

export default function Badge({ children, variant = "default", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
