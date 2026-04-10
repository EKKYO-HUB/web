"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageProgressBar() {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className="fixed left-0 top-0 z-[100] h-[2px] bg-ekkyo-accent"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onAnimationComplete={(definition) => {
        // bar fades out after completing
      }}
      style={{ opacity: 1 }}
    >
      <motion.div
        className="h-full w-full bg-ekkyo-accent"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
    </motion.div>
  );
}
