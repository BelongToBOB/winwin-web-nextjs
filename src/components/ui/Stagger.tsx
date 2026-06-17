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

interface WrapProps {
  children: React.ReactNode;
  className?: string;
  /** true = เล่นตอน mount (above-fold เช่น hero), false = เล่นตอนเลื่อนเจอ */
  onMount?: boolean;
}

// container ที่ไล่ลูกทีละชิ้น (stagger)
export function Stagger({ children, className = "", onMount = false }: WrapProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={containerV}
      initial="hidden"
      {...(onMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {children}
    </motion.div>
  );
}

// ลูกแต่ละชิ้นใน Stagger
export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemV}>
      {children}
    </motion.div>
  );
}
