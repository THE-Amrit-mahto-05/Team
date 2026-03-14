"use client"

import { useEffect, useState } from "react"
import { getTeam } from "@/lib/api"
import HorizontalScrollSection from "@/components/HorizontalScrollSection"

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
}

export default function TeamPage() {

  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    getTeam().then(res => setTeam(res.data)).catch(err => console.error("Could not fetch team:", err))
  }, [])

  if (team.length === 0) return (
    <div className="bg-black min-h-screen flex items-center justify-center text-zinc-500 uppercase tracking-widest text-xs">
      Initialising Threads...
    </div>
  )

  return (
    <main className="bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] z-[99]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <HorizontalScrollSection team={team} />

      <section className="h-screen flex items-center justify-center bg-black relative border-t border-white/5">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-6 uppercase">Ready to join?</h2>
          <div className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs uppercase tracking-widest inline-block">
            View Openings
          </div>
        </div>
      </section>
    </main>
  )
}