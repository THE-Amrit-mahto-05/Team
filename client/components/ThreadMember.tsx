"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BinaryRain from "./BinaryRain";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
}

interface ThreadMemberProps {
  member: TeamMember;
  yOffset: number;
  index: number;
}

export default function ThreadMember({ member, yOffset, index }: ThreadMemberProps) {
  const [isHovered, setIsHovered] = useState(false);
  const centerY = 350;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: (index % 5) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute group z-[150] cursor-pointer"
      style={{
        left: "calc(45% - 50px)",
        top: `${centerY + yOffset - 10}px`,
        transform: "translate(-50%, -50%)"
      }}
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.15, rotate: 1 }}
          className="relative z-10"
        >
          <div className="w-40 h-40 rounded-full border-2 border-teal-500/20 bg-zinc-950 overflow-hidden p-1 group-hover:border-teal-400/50 transition-all duration-500 shadow-2xl relative">
            <AnimatePresence>
              {isHovered && <BinaryRain key="binary-rain" />}
            </AnimatePresence>

            <div className={`w-full h-full rounded-full overflow-hidden relative transition-all duration-700 ${isHovered ? 'animate-pulse' : ''}`}>
              <div className={isHovered ? 'glitch-image' : ''}>
                <Image
                  src={member.photo_url}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>
            </div>
          </div>

          {/* Cyber Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500/0 group-hover:border-teal-400/60 transition-all duration-500 -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500/0 group-hover:border-teal-400/60 transition-all duration-500 translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500/0 group-hover:border-teal-400/60 transition-all duration-500 -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500/0 group-hover:border-teal-400/60 transition-all duration-500 translate-x-2 translate-y-2" />

          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
            className="absolute inset-0 bg-teal-500/10 blur-3xl rounded-full -z-10"
          />
        </motion.div>

        <div className="absolute top-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 text-center w-64 pointer-events-none">
          <motion.div className="flex items-center justify-center gap-2">
            {isHovered && <span className="text-[10px] text-teal-500/60 font-mono animate-pulse">[SECURE]</span>}
            <h3 className="text-white text-lg font-medium tracking-tight">
              {member.name}
            </h3>
          </motion.div>
          <motion.p className="text-teal-500/50 text-[10px] font-mono uppercase tracking-[0.2em] mt-1">
            {isHovered ? `>> ${member.role} <<` : member.role}
          </motion.p>
        </div>

        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 pointer-events-none z-50">
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl text-[11px] text-zinc-400 leading-relaxed shadow-2xl text-center">
            {member.bio}
          </div>
        </div>
      </div>
    </motion.div>
  );
}