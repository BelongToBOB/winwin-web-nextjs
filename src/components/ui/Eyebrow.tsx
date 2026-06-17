interface Props {
  children: React.ReactNode;
  /** สีตัวอักษร/ขีดนำ — gold (ค่าเริ่มต้น), teal, หรือ muted */
  tone?: "accent" | "teal" | "muted";
  /** แสดงขีดนำหน้าแบบต้นแบบ (LIMITLESS CLUB · AI EXPERT JOURNEY) */
  mark?: boolean;
  className?: string;
}

const toneMap = {
  accent: "text-accent",
  teal: "text-teal",
  muted: "text-fg-muted",
};

const markToneMap = {
  accent: "bg-accent",
  teal: "bg-teal",
  muted: "bg-fg-muted",
};

export default function Eyebrow({ children, tone = "accent", mark = false, className = "" }: Props) {
  return (
    <p
      className={`flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] ${toneMap[tone]} ${className}`}
    >
      {mark && <span className={`h-px w-8 ${markToneMap[tone]}`} aria-hidden="true" />}
      {children}
    </p>
  );
}
