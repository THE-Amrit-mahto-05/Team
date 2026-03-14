"use client";

import { motion } from "framer-motion";

interface ThreadMemberProps {
  member: any;
  yOffset: number;
  index: number;
}

export default function ThreadMember({ member, yOffset, index }: ThreadMemberProps) {
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
      className="absolute group z-10"
      style={{
        left: "calc(40% - 27px)",
        top: `${centerY + yOffset - 37}px`,
        transform: "translate(-50%, -50%)"
      }}
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.3, rotate: 3 }}
          className="relative z-10"
        >
          <div className="w-40 h-40 rounded-full border-2 border-white/5 bg-zinc-950 overflow-hidden p-1 group-hover:border-white/20 transition-all duration-700 shadow-2xl relative">
            <div className="w-full h-full rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>
          </div>

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
            className="absolute inset-0 bg-white/10 blur-3xl rounded-full -z-10"
          />
        </motion.div>

        <div className="absolute top-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 text-center w-64 pointer-events-none">
          <motion.h3 className="text-white text-lg font-medium tracking-tight">
            {member.name}
          </motion.h3>
          <motion.p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-1">
            {member.role}
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