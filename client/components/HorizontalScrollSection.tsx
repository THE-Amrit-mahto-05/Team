"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { TeamMember } from "@/lib/api";
import ThreadMember from "./ThreadMember";
import ThreadConnection from "./ThreadConnection";

interface HorizontalScrollSectionProps {
  team: TeamMember[];
}

export default function HorizontalScrollSection({ team }: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stepWidth = 450;
  const centerY = 350;
  const vOffset = 180;

  const totalTravel = (team.length - 1) * stepWidth;
  const x = useTransform(scrollYProgress, [0.1, 1], [0, -totalTravel]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const titleLeft = useTransform(scrollYProgress, [0, 0.08], ["50%", "0%"]);
  const titleTop = useTransform(scrollYProgress, [0, 0.08], ["50%", "0%"]);
  const titleX = useTransform(scrollYProgress, [0, 0.08], ["-50%", "0%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], ["-50%", "0%"]);

  const smoothLeft = useSpring(titleLeft, { stiffness: 120, damping: 30 });
  const smoothTop = useSpring(titleTop, { stiffness: 120, damping: 30 });
  const smoothX = useSpring(titleX, { stiffness: 120, damping: 30 });
  const smoothY = useSpring(titleY, { stiffness: 120, damping: 30 });

  const titleScale = useSpring(
    useTransform(scrollYProgress, [0, 0.08], [1, 0.35]),
    { stiffness: 120, damping: 30 }
  );

  const backgroundOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.03, 0.12], [0, 1]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) {
    return (
      <div className="relative pt-32 pb-20 px-6 max-w-lg mx-auto overflow-visible">
        <h1 className="text-6xl font-bold tracking-tighter uppercase mb-16 text-center">OUR TEAM</h1>
        <div className="flex flex-col gap-40 items-center">
          {team.map((member, index) => (
            <div key={member.id} className="relative h-[200px] w-full flex items-center justify-center">
               <ThreadMember member={member} yOffset={0} index={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative text-white pointer-events-none"
      style={{ height: `${Math.max(400, team.length * 80)}vh` }}
    >

      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,192,0.03),transparent_70%)] pointer-events-none z-0"
      />

      <motion.div
        style={{
          left: smoothLeft,
          top: smoothTop,
          x: smoothX,
          y: smoothY,
          scale: titleScale,
          transformOrigin: "left top",
          opacity: contentOpacity
        }}
        className="fixed z-[100] pointer-events-none whitespace-nowrap flex flex-col items-start"
      >
        <h1 className="text-[8vw] font-bold tracking-[-0.04em] uppercase leading-[0.9] text-white">
          OUR TEAM
        </h1>
      </motion.div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-start">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(0,212,192,0.04),transparent_70%)] pointer-events-none" />

        <motion.div
          style={{ x: springX, opacity: contentOpacity }}
          className="relative flex items-center h-[700px] w-fit"
        >
          <div className="relative flex items-center ml-[20vw] pr-[20vw]">

            {/* Decorative Background "Ghost" Network */}
            <svg
              width={team.length * stepWidth}
              height="700"
              className="absolute top-0 left-0 pointer-events-none opacity-20 z-0"
            >
              {Array.from({ length: team.length + 5 }).map((_, i) => (
                <g key={`ghost-${i}`}>
                   <circle 
                    cx={i * stepWidth * 0.8} 
                    cy={centerY + (i % 3 - 1) * 220} 
                    r="1.5" 
                    fill="rgba(0, 212, 192, 0.2)" 
                  />
                  <line 
                    x1={i * stepWidth * 0.8} 
                    y1={centerY + (i % 3 - 1) * 220} 
                    x2={(i + 1) * stepWidth * 0.8} 
                    y2={centerY + ((i+1) % 5 - 2) * 180} 
                    stroke="rgba(0, 212, 192, 0.05)" 
                    strokeWidth="0.5" 
                  />
                </g>
              ))}
            </svg>

            <svg
              width={team.length * stepWidth}
              height="700"
              className="absolute top-0 left-0 pointer-events-none z-10"
            >
              {team.map((_, index) => {
                if (index === 0) return null;

                const prevIdx = index - 1;
                const radius = 82;

                const prevCenterX = prevIdx * stepWidth + stepWidth / 2;
                const prevCenterY = centerY + (prevIdx === 0 ? 0 : (prevIdx % 2 === 0 ? vOffset : -vOffset));

                const currentCenterX = index * stepWidth + stepWidth / 2;
                const currentCenterY = centerY + (index % 2 === 0 ? vOffset : -vOffset);

                const startX = prevCenterX + radius;
                const startY = prevCenterY;

                const endX = currentCenterX - radius;
                const endY = currentCenterY;

                const startRange = 0.05 + (prevIdx / (team.length - 1)) * 0.8;
                const endRange = 0.05 + (index / (team.length - 1)) * 0.8;

                return (
                  <ThreadConnection
                    key={`conn-${index}`}
                    startX={startX}
                    startY={startY}
                    endX={endX}
                    endY={endY}
                    scrollYProgress={scrollYProgress}
                    startRange={startRange}
                    endRange={endRange}
                  />
                );
              })}
            </svg>

            <div className="relative z-10 h-[700px]" style={{ width: team.length * stepWidth }}>
              {team.map((member, index) => {
                const isCEO = index === 0;
                const yOffset = isCEO ? 0 : (index % 2 === 0 ? vOffset : -vOffset);

                return (
                  <div
                    key={member.id}
                    className="absolute top-0 h-full"
                    style={{
                      width: stepWidth,
                      left: index * stepWidth
                    }}
                  >
                    <ThreadMember member={member} yOffset={yOffset} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/10 overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="w-full h-full bg-teal-500 origin-left"
          />
        </div>
      </div>
    </div>
  );
}