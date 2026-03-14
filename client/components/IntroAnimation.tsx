"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

const createRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const NeuralWeave = ({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const nodes = useMemo(() => {
    const random = createRandom(1337);
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      vx: (random() - 0.5) * 0.04,
      vy: (random() - 0.5) * 0.04,
      packets: [] as { progress: number; targetIdx: number; t: number }[]
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      
      const mx = (mouseX.get() + w / 2);
      const my = (mouseY.get() + h / 2);

      // Background Synergy Hub Pulse
      const hubSize = 200 + Math.sin(time) * 20;
      const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, hubSize);
      gradient.addColorStop(0, "rgba(74, 175, 255, 0.05)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      nodes.forEach((node, i) => {
        // Subtle drift toward center (Growth/Synergy)
        const dx = 50 - node.x;
        const dy = 50 - node.y;
        node.vx += dx * 0.0001;
        node.vy += dy * 0.0001;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;

        const nx = (node.x / 100) * w;
        const ny = (node.y / 100) * h;

        // Connections & Data Packets
        nodes.forEach((node2, j) => {
          if (i <= j) return;
          const n2x = (node2.x / 100) * w;
          const n2y = (node2.y / 100) * h;
          const dist = Math.hypot(nx - n2x, ny - n2y);
          
          if (dist < 250) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - dist / 250)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nx, ny);
            ctx.lineTo(n2x, n2y);
            ctx.stroke();

            // Symbolic Data Packet (Collaborative Flow)
            if (Math.random() < 0.001) {
              node.packets.push({ progress: 0, targetIdx: j, t: Math.random() });
            }
          }
        });

        // Render Packets
        node.packets = node.packets.filter(p => {
          p.progress += 0.01;
          const targetNode = nodes[p.targetIdx];
          const tx = (targetNode.x / 100) * w;
          const ty = (targetNode.y / 100) * h;
          
          const px = nx + (tx - nx) * p.progress;
          const py = ny + (ty - ny) * p.progress;

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(p.progress * Math.PI)})`;
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();

          return p.progress < 1;
        });

        // Mouse reactive lines
        const mDist = Math.hypot(nx - mx, ny - my);
        if (mDist < 250) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 200, 255, ${0.4 * (1 - mDist / 250)})`;
          ctx.moveTo(nx, ny);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(100, 200, 255, 0.3)";
        ctx.arc(nx, ny, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [nodes, mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default function IntroAnimation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const textX = useTransform(springX, (v) => v * 0.04);
  const textY = useTransform(springY, (v) => v * 0.04);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden cursor-none"
    >
      <NeuralWeave mouseX={springX} mouseY={springY} />

      {/* Central Core (Symbolic Hub) */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          boxShadow: [
            "0 0 100px rgba(74, 175, 255, 0.1)",
            "0 0 150px rgba(74, 175, 255, 0.3)",
            "0 0 100px rgba(74, 175, 255, 0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-4 h-4 bg-blue-500 rounded-full blur-[2px] z-10"
      />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(40px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main Title with Energy Glow */}
          <h1 className="text-8xl md:text-[15rem] font-black text-white uppercase italic tracking-[-0.05em] select-none leading-tight mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            OUR TEAM
          </h1>
          
          {/* Cybernetic Underline Pulse */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 2, ease: "circOut" }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_15px_#3b82f6]"
          />

          {/* Assembly Particles Overlay */}
          <motion.div 
            animate={{ 
              opacity: [0, 0.6, 0],
              background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 10%)",
              backgroundSize: "20px 20px"
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
          />
        </motion.div>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </motion.div>
  );
}
