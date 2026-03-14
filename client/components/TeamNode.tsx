"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
}

interface TeamNodeProps {
  member: TeamMember;
  x: string | number;
  y: string | number;
  delay?: number;
}

export default function TeamNode({ member, x, y, delay = 0 }: TeamNodeProps) {
  const randomDelay = useMemo(() => {
    // Use a simple hash of the member name to get a stable "random" delay
    const seed = member.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed % 20) / 10; // Result between 0 and 2
  }, [member.name]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay
      }}
      className="absolute flex flex-col items-center group cursor-pointer"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      data-cursor-hover="true"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: randomDelay
        }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-full border-2 border-white/10 overflow-hidden bg-zinc-900 group-hover:border-white/40 transition-colors duration-500 shadow-xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <Image
            src={member.photo_url}
            alt={member.name}
            width={80}
            height={80}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full blur-sm group-hover:bg-white/50 transition-colors" />
      </motion.div>

      <div className="mt-4 text-center pointer-events-none">
        <h3 className="text-white text-sm font-bold tracking-tight uppercase group-hover:text-white transition-colors">
          {member.name}
        </h3>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
          {member.role}
        </p>
      </div>

      <div className="absolute top-24 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg text-[11px] text-zinc-400 text-center leading-relaxed shadow-2xl">
          {member.bio}
        </div>
      </div>
    </motion.div>
  );
}