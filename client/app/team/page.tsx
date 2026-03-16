"use client";

import { useEffect, useState } from "react"
import { getTeam, TeamMember } from "@/lib/api"
import HorizontalScrollSection from "@/components/HorizontalScrollSection"
import IntroAnimation from "@/components/IntroAnimation"
import RobotBackground from "@/components/RobotBackground"
import TechBackground from "@/components/TechBackground"
import { motion, useScroll, useTransform } from "framer-motion"

export default function TeamPage() {

  const [team, setTeam] = useState<TeamMember[]>([])
  const { scrollY } = useScroll()
  
  const introOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const introScale = useTransform(scrollY, [0, 400], [1, 0.8])
  const introPointerEvents = useTransform(scrollY, (v) => v > 50 ? "none" : ("auto" as const))

  useEffect(() => {
    getTeam().then(res => setTeam(res.data)).catch(err => console.error("Could not fetch team:", err))
  }, [])

  return (
    <main className="min-h-screen text-white relative bg-black">
      <RobotBackground showTitle={false} />
      <div className="fixed inset-0 z-0">
        <TechBackground />
      </div>
      
      <motion.div 
        style={{ 
          opacity: introOpacity, 
          scale: introScale,
          pointerEvents: introPointerEvents 
        }}
        className="fixed inset-0 z-[100]"
      >
        <IntroAnimation />
      </motion.div>

      <div className="relative z-[200]">
        {team.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center text-zinc-500 uppercase tracking-widest text-xs">
            Initialising Threads...
          </div>
        ) : (
          <>
            <HorizontalScrollSection team={team} />

            <section className="h-screen flex items-center justify-center relative border-t border-white/5">
              <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tighter mb-6 uppercase">Ready to join?</h2>
                <div className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs uppercase tracking-widest inline-block">
                  View Openings
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}