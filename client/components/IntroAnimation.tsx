import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import RobotBackground from "./RobotBackground";

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
      <RobotBackground />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-[#ffd700]/20 rounded-full blur-[140px] z-10"
      />

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-20 text-center w-full px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          {/* HTML Title removed as it is now rendered in 3D inside RobotBackground */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
