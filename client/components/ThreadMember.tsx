"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
  isMobile?: boolean;
}

export default function ThreadMember({ member, yOffset, index, isMobile = false }: ThreadMemberProps) {
  const [isHovered, setIsHovered] = useState(false);
  const centerY = 350;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: (index % 5) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`${isMobile ? "relative" : "absolute"} z-[150] w-32 h-32 md:w-40 md:h-40`}
      style={isMobile ? {} : {
        left: "calc(45% - 50px)",
        top: `${centerY + yOffset - 10}px`,
        transform: "translate(-50%, -50%)"
      }}
    >
      <div className="relative w-full h-full">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => isMobile && setIsHovered(!isHovered)}
          className="relative z-10 group w-full h-full rounded-full cursor-pointer pointer-events-auto"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-teal-500/20 bg-zinc-950 overflow-hidden p-1 group-hover:border-teal-400/50 transition-all duration-500 shadow-2xl relative">
            <div className="w-full h-full rounded-full overflow-hidden relative transition-all duration-700 opacity-100">
              <Image
                src={member.photo_url}
                alt={member.name}
                width={160}
                height={160}
                className="w-full h-full object-cover transition-all duration-700"
              />
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

        {/* Persistent Labels (Visible by default, hidden on hover) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-64 text-center pointer-events-none"
            >
              <h3 className="text-white text-base font-bold tracking-tight truncate">
                {member.name}
              </h3>
              <p className="text-teal-400/80 text-[11px] font-mono uppercase tracking-[0.2em] mt-1 truncate">
                {member.role}
              </p>
              
              {member.linkedin && (
                <div className="flex justify-center mt-3 pointer-events-auto">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all duration-300"
                  >
                    <svg className="w-3 h-3 fill-teal-500/50 group-hover/link:fill-teal-500 transition-colors" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-[10px] text-teal-500/50 group-hover/link:text-teal-500 font-mono tracking-wider transition-colors pt-0.5">LINKEDIN PROFILE</span>
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic HUD Card */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0, filter: "blur(10px)" }}
              className={`absolute ${isMobile ? "left-1/2 top-[calc(100%+1rem)] -translate-x-1/2" : "left-[calc(100%+2rem)] top-1/2 -translate-y-1/2"} w-[280px] md:w-72 pointer-events-none z-50`}
            >
              <div className="relative overflow-hidden bg-zinc-900/40 backdrop-blur-2xl border border-teal-500/30 p-5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* HUD Scanner Line Animation */}
                <motion.div 
                  initial={{ top: "-100%" }}
                  animate={{ top: "200%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent z-0"
                />

                <div className="relative z-10 space-y-4">
                  {/* Staggered Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-[10px] text-teal-500/60 font-mono tracking-widest uppercase mb-1 block">
                      Identity
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white leading-tight uppercase">
                      {member.name}
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 pt-2 border-t border-teal-500/20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <p className="text-teal-400 text-[11px] font-mono uppercase tracking-wider">
                      {member.role}
                    </p>
                    
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto pointer-events-auto"
                      >
                         <svg className="w-3.5 h-3.5 fill-teal-500 hover:fill-teal-400 transition-colors" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 text-[11px] leading-relaxed font-sans"
                  >
                    <p className="pl-4 border-l border-teal-500/20">
                      {member.bio}
                    </p>
                  </motion.div>
                  
                  {/* Auth Level Removed */}
                </div>

                {/* Corner Accents inside card */}
                <div className="absolute top-0 right-0 p-1">
                  <div className="w-4 h-4 border-t border-r border-teal-500/40 rounded-tr-md" />
                </div>
                <div className="absolute bottom-0 left-0 p-1">
                  <div className="w-4 h-4 border-b border-l border-teal-500/40 rounded-bl-md" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}