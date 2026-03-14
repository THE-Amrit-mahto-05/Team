"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", y: 20 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  )
}