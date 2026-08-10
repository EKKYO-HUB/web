"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/* コンセプト詩を連(スタンザ)ごとにスクロール表示する。
   MotionConfig reducedMotion="user" で OS 設定を尊重（即時表示にフォールバック）。 */

export function Stanza({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ConceptPoem({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
