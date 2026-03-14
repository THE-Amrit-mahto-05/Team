"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TeamGraphProps {
  children: ReactNode;
}

export default function TeamGraph({ children }: TeamGraphProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative w-full h-[700px] border-x border-white/5 bg-zinc-950/20 rounded-3xl overflow-visible"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      {children}
    </motion.div>
  );
}