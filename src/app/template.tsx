"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15, filter: shouldReduceMotion ? "none" : "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: shouldReduceMotion ? "none" : "blur(0px)" }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15, filter: shouldReduceMotion ? "none" : "blur(4px)" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.4,
        ease: "easeInOut",
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
