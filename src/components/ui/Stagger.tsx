"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const containerTags = { div: motion.div, ul: motion.ul, ol: motion.ol } as const;
const itemTags = { div: motion.div, li: motion.li } as const;

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof containerTags;
  /** true = เล่นตอน mount (above-fold เช่น hero), false = เล่นตอนเลื่อนเจอ */
  onMount?: boolean;
}

// container ที่ไล่ลูกทีละชิ้น (stagger)
export function Stagger({ children, className = "", as = "div", onMount = false }: ContainerProps) {
  const reduce = useReducedMotion();
  const Tag = containerTags[as];
  const Plain = as;
  if (reduce) return <Plain className={className}>{children}</Plain>;
  return (
    <Tag
      className={className}
      variants={containerV}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {children}
    </Tag>
  );
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof itemTags;
}

// ลูกแต่ละชิ้นใน Stagger
export function StaggerItem({ children, className = "", as = "div" }: ItemProps) {
  const reduce = useReducedMotion();
  const Tag = itemTags[as];
  const Plain = as;
  if (reduce) return <Plain className={className}>{children}</Plain>;
  return (
    <Tag className={className} variants={itemV}>
      {children}
    </Tag>
  );
}
