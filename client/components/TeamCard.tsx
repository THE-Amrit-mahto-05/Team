"use client"

import { motion } from "framer-motion"

export default function TeamCard({ member }: { member: any }) {
  return (
    <motion.div
      data-cursor-hover="true"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="border border-white/10 rounded-xl p-6 bg-black/50 backdrop-blur-sm hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors duration-300"
    >
      <img
        src={member.photo_url}
        className="w-24 h-24 rounded-full object-cover"
        alt={member.name}
      />

      <h3 className="text-xl mt-5 font-semibold">
        {member.name}
      </h3>

      <p className="text-gray-400 text-sm mt-1">
        {member.role}
      </p>

      <p className="text-gray-300 text-sm mt-4">
        {member.bio}
      </p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 mt-5 inline-block hover:text-blue-300 transition-colors"
        >
          LinkedIn →
        </a>
      )}
    </motion.div>
  )
}