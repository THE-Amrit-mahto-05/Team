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
  const [loadingStatus, setLoadingStatus] = useState("Initialising Threads")
  const { scrollY } = useScroll()
  
  const introOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const introScale = useTransform(scrollY, [0, 400], [1, 0.8])
  const introPointerEvents = useTransform(scrollY, (v) => v > (typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 50) ? "none" : ("auto" as const))

  useEffect(() => {
    // 1. Check Cache
    const cachedData = localStorage.getItem("cached_team_data")
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData)
        requestAnimationFrame(() => {
          setTeam(parsed)
        })
      } catch (e) {
        console.error("Failed to parse cached team data:", e)
      }
    }

    // 2. Fetch Fresh Data
    const fetchTeam = async () => {
      try {
        const res = await getTeam()
        setTeam(res.data)
        // 3. Update Cache
        localStorage.setItem("cached_team_data", JSON.stringify(res.data))
      } catch (err) {
        console.error("Could not fetch team:", err)
      }
    }

    fetchTeam()

    // Status message rotation for cold starts
    const timeouts = [
      setTimeout(() => setLoadingStatus("Establishing Connection"), 3000),
      setTimeout(() => setLoadingStatus("Waking up the server"), 7000),
      setTimeout(() => setLoadingStatus("Almost there..."), 15000),
    ]

    return () => timeouts.forEach(t => clearTimeout(t))
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
          <div className="min-h-screen flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-24 h-24 mb-8">
              {/* Cinematic Spinner */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-r-2 border-blue-500/50 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-b-2 border-l-2 border-cyan-500/30 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={loadingStatus}
              className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-light"
            >
              {loadingStatus}...
            </motion.div>
          </div>
        ) : (
          <div className="pointer-events-none [&>*]:pointer-events-auto">
            <HorizontalScrollSection team={team} />

            <section className="h-screen flex items-center justify-center relative border-t border-white/5 pointer-events-auto">
              <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tighter mb-6 uppercase">Ready to join?</h2>
                <div className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs uppercase tracking-widest inline-block">
                  View Openings
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}