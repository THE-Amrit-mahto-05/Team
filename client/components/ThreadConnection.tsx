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
      <path
        d={path}
        stroke="rgba(0, 100, 255, 0.1)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="transparent"
      />
      <motion.path
        d={path}
        stroke="rgba(0, 150, 255, 0.4)"
        strokeWidth="1.5"
        fill="transparent"
        style={{ pathLength, opacity: 1 }}
        initial={{ pathLength: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      />

      <motion.circle
        r="3"
        fill="#0099ff"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
          delay: randomDelay
        }}
        style={{ offsetPath: `path('${path}')` }}
      >
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
      </motion.circle>

      <motion.circle
        cx={startX}
        cy={startY}
        r="2"
        fill="#0099ff"
        initial={{ opacity: 0 }}
        style={{ opacity: pathLength }}
      />
      <motion.circle
        cx={endX}
        cy={endY}
        r="2"
        fill="#0099ff"
        initial={{ opacity: 0 }}
        style={{ opacity: pathLength }}
      />

      <path
        d={path}
        stroke="#0099ff"
        strokeWidth="4"
        fill="transparent"
        className="opacity-0 blur-md group-hover:opacity-10 transition-opacity duration-500"
      />
    </g>
  );
}