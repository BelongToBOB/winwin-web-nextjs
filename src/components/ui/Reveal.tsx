"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** หน่วงก่อน reveal (ms) */
  delay?: number;
  /** ทิศทางเข้า */
  from?: "up" | "down" | "left" | "right";
}

const OFFSET = 28;

// Scroll reveal ด้วย Framer Motion — fade + slide, spring-ish ease, เคารพ reduced-motion
export default function Reveal({ children, className = "", delay = 0, from = "up" }: Props) {
  const reduce = useReducedMotion();

  const axis = from === "left" || from === "right" ? "x" : "y";
  const sign = from === "up" || from === "left" ? 1 : -1;

  const variants: Variants = {
    hidden: { opacity: 0, [axis]: OFFSET * sign },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 },
    },
  };

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : variants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}
