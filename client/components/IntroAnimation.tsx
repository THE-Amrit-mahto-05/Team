"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

const createRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NeuralWeave = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useMemo(() => {
    const random = createRandom(42);
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      vx: (random() - 0.5) * 0.05,
      vy: (random() - 0.5) * 0.05,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const currentNodes = [...nodes];

    const render = () => {
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(100, 200, 255, 0.15)";
      ctx.fillStyle = "rgba(100, 200, 255, 0.5)";

      const mx = (mouseX.get() + w / 2);
      const my = (mouseY.get() + h / 2);

      currentNodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;

        const nx = (node.x / 100) * w;
        const ny = (node.y / 100) * h;

        // Draw connections
        currentNodes.forEach((node2, j) => {
          if (i === j) return;
          const n2x = (node2.x / 100) * w;
          const n2y = (node2.y / 100) * h;
          const dist = Math.hypot(nx - n2x, ny - n2y);
          if (dist < 200) {
            ctx.beginPath();
            ctx.lineWidth = (1 - dist / 200) * 0.5;
            ctx.moveTo(nx, ny);
            ctx.lineTo(n2x, n2y);
            ctx.stroke();
          }
        });

        // Mouse interaction
        const mDist = Math.hypot(nx - mx, ny - my);
        if (mDist < 300) {
          ctx.beginPath();
          ctx.lineWidth = (1 - mDist / 300) * 0.8;
          ctx.moveTo(nx, ny);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(nx, ny, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [nodes, mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

export default function IntroAnimation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const textX = useTransform(springX, (v) => v * 0.03);
  const textY = useTransform(springY, (v) => v * 0.03);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden cursor-none"
    >
      <NeuralWeave mouseX={springX} mouseY={springY} />

      {/* Synergistic Glow Layers */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"
      />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ letterSpacing: "1em", opacity: 0, filter: "blur(20px)" }}
          animate={{ letterSpacing: "-0.05em", opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-8xl md:text-[14rem] font-black text-white uppercase italic tracking-[-0.05em] select-none leading-none">
            OUR TEAM
          </h1>
          
          {/* Energy Pulses */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.5, 0],
              background: [
                "linear-gradient(90deg, transparent 0%, #4af 50%, transparent 100%)",
                "linear-gradient(90deg, transparent 100%, #4af 150%, transparent 200%)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-4 text-blue-400 font-mono text-xs uppercase tracking-[0.5em]"
        >
          Synergy & Infrastructure Ready
        </motion.div>
      </motion.div>

      {/* Ambient Dust */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grain-y.com/images/grain.png')]" />
    </motion.div>
  );
}
