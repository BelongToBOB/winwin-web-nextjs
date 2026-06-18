import Eyebrow from "./Eyebrow";

interface Props {
  eyebrow?: React.ReactNode;
  eyebrowTone?: "accent" | "teal" | "muted";
  eyebrowMark?: boolean;
  title: string;
  /** คำใน title ที่จะไฮไลต์เป็นสี accent/teal (แบบต้นแบบ) */
  highlight?: string | string[];
  highlightTone?: "accent" | "teal";
  lead?: React.ReactNode;
  align?: "left" | "center";
  /** ขนาดหัวข้อ: h2 (ค่าเริ่มต้น section) หรือ display (hero) */
  size?: "display" | "h1" | "h2";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

const sizeMap = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
};

const highlightToneMap = {
  accent: "text-accent",
  teal: "text-teal",
};

/** ตัด title ตามคำ highlight แล้ว render คำนั้นเป็นสี accent/teal */
function renderTitle(title: string, highlight: string | string[] | undefined, toneClass: string) {
  if (!highlight) return title;
  const terms = (Array.isArray(highlight) ? highlight : [highlight]).filter(Boolean);
  if (terms.length === 0) return title;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = title.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className={toneClass}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function SectionHeading({
  eyebrow,
  eyebrowTone = "accent",
  eyebrowMark = false,
  title,
  highlight,
  highlightTone = "accent",
  lead,
  align = "left",
  size = "h2",
  as: Tag = "h2",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${align === "center" ? "max-w-3xl" : ""} ${className}`}>
      {eyebrow && (
        <Eyebrow tone={eyebrowTone} mark={eyebrowMark}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className={`${sizeMap[size]} font-semibold text-fg`}>
        {renderTitle(title, highlight, highlightToneMap[highlightTone])}
      </Tag>
      {lead && <p className="text-lead text-fg-2 max-w-2xl">{lead}</p>}
    </div>
  );
}
