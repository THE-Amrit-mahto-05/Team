import { motion, useTransform, MotionValue } from "framer-motion";
import { useMemo } from "react";

interface ThreadConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scrollYProgress: MotionValue<number>;
  startRange: number;
  endRange: number;
}

export default function ThreadConnection({
  startX,
  startY,
  endX,
  endY,
  scrollYProgress,
  startRange,
  endRange
}: ThreadConnectionProps) {
  const midX = startX + (endX - startX) / 2;
  const path = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

  const randomDelay = useMemo(() => {
    const seed = path.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed % 20) / 10;
  }, [path]);

  const pathLength = useTransform(scrollYProgress, [startRange, endRange], [0, 1]);

  return (
    <g>
      {/* Background Track (Very Faint) */}
      <path
        d={path}
        stroke="rgba(0, 150, 255, 0.05)"
        strokeWidth="1"
        fill="transparent"
      />
      
      {/* The Glow Underlay */}
      <motion.path
        d={path}
        stroke="rgba(0, 150, 255, 0.2)"
        strokeWidth="4"
        fill="transparent"
        className="blur-sm"
        style={{ pathLength, opacity: 1 }}
      />

      {/* The Primary Laser Path */}
      <motion.path
        d={path}
        stroke="rgba(0, 230, 255, 0.5)"
        strokeWidth="1.5"
        fill="transparent"
        style={{ pathLength, opacity: 1 }}
        initial={{ pathLength: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      />

      {/* Multiple Data Pulses */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`pulse-${i}`}
          r={1.5 + i * 0.5}
          fill="#00e6ff"
          className="blur-[1px]"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: randomDelay + i * 0.8
          }}
          style={{ 
            offsetPath: `path('${path}')`,
            opacity: useTransform(pathLength, [0.3, 1], [0, 1])
          }}
        />
      ))}

      {/* End Junction Points */}
      <motion.circle
        cx={startX}
        cy={startY}
        r="3"
        fill="#00e6ff"
        className="blur-[2px]"
        initial={{ opacity: 0 }}
        style={{ opacity: pathLength }}
      />
      <motion.circle
        cx={endX}
        cy={endY}
        r="3"
        fill="#00e6ff"
        className="blur-[2px]"
        initial={{ opacity: 0 }}
        style={{ opacity: pathLength }}
      />
    </g>
  );
}