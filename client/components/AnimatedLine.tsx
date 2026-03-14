"use client";

import { motion } from "framer-motion";

interface AnimatedLineProps {
  path: string;
}

export default function AnimatedLine({ path }: AnimatedLineProps) {
  return (
    <g>
      <path
        d={path}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1"
        fill="transparent"
      />
      <motion.path
        d={path}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
        fill="transparent"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
      <motion.path
        d={path}
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 0.8, 0],
          pathOffset: [0, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
      />
      <defs>
        <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </g>
  );
}