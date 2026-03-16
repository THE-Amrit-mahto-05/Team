"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const characters = "01";

export default function BinaryRain() {
  const [columns, setColumns] = useState<{ id: number; delay: number; duration: number; left: string }[]>([]);

  useEffect(() => {
    const cols = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      left: `${(i / 20) * 100}%`,
    }));
    setColumns(cols);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none select-none z-20">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 text-[9px] font-mono text-teal-400 whitespace-pre leading-none flex flex-col"
          style={{ left: col.left }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            ease: "linear",
            delay: col.delay,
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="my-0.5">
              {characters[Math.floor(Math.random() * characters.length)]}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
