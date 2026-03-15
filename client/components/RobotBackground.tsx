"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float, Text3D, Center } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FingerSegment({
  position,
  length = 0.38,
  width = 0.055,
  rotation = [0, 0, 0],
  delay = 0,
}: any) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) {
      g.current.rotation.x = rotation[0] + Math.sin(clock.elapsedTime * 1.6 + delay) * 0.018;
    }
  });
  return (
    <group ref={g} position={position} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[width * 1.35, width * 1.35, width * 2.4, 14]} />
        <meshStandardMaterial color="#e8edf2" metalness={1} roughness={0.08} />
      </mesh>
      <mesh position={[0, length / 2, 0]}>
        <boxGeometry args={[width, length, width]} />
        <meshStandardMaterial color="#e8edf2" metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh position={[width * 0.65, length / 2, 0]}>
        <cylinderGeometry args={[0.013, 0.013, length * 0.9, 8]} />
        <meshStandardMaterial color="#c8d0d8" metalness={1} roughness={0.08} />
      </mesh>
    </group>
  );
}

function RoboticHand({ grip = 0.25, teal = false }: any) {
  const g = useRef<THREE.Group>(null);
  const palmColor = "#e8edf2";
  const accentColor = "#c8d0d8";

  useFrame(({ clock, mouse }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      Math.sin(t * 0.45) * 0.13 + mouse.y * 0.25,
      0.08
    );
    g.current.rotation.y = THREE.MathUtils.lerp(
      g.current.rotation.y,
      Math.cos(t * 0.35) * 0.1 + mouse.x * 0.25,
      0.08
    );
  });

  return (
    <group ref={g}>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.22, 0.62]} />
        <meshStandardMaterial color={palmColor} metalness={0.6} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.42, 0.025, 0.42]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.07} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.3]} />
        <meshStandardMaterial
          color={teal ? "#00b09b" : "#c8d0d8"}
          emissive={teal ? "#00b09b" : "#c8d0d8"}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0, 0.315]}>
        <boxGeometry args={[0.22, 0.1, 0.04]} />
        <meshStandardMaterial color={accentColor} metalness={1} roughness={0.08} />
      </mesh>
      <pointLight
        intensity={280}
        distance={4.5}
        color={teal ? "#00b09b" : "#ffffff"}
        position={[0, 0.6, 0.5]}
      />

      {[-0.22, -0.06, 0.1, 0.26].map((x, i) => (
        <group key={i} position={[x, 0.11, 0.12]} rotation={[grip + i * 0.04, 0, 0]}>
          <FingerSegment position={[0, 0, 0]} delay={i * 0.22} />
          <group position={[0, 0.38, 0]}>
            <FingerSegment position={[0, 0, 0]} length={0.28} delay={i * 0.3} rotation={[grip * 1.4, 0, 0]} />
            <group position={[0, 0.28, 0]}>
              <FingerSegment position={[0, 0, 0]} length={0.2} width={0.04} delay={i * 0.4} rotation={[grip * 2, 0, 0]} />
              <mesh position={[0, 0.23, 0]}>
                <sphereGeometry args={[0.028, 8, 8]} />
                <meshStandardMaterial
                  color="#e8edf2"
                  emissive="#ffffff"
                  emissiveIntensity={4}
                />
              </mesh>
            </group>
          </group>
        </group>
      ))}

      <group position={[0.33, 0.02, -0.12]} rotation={[0.15, -0.55, -0.45]}>
        <FingerSegment position={[0, 0, 0]} length={0.28} delay={0.5} />
        <group position={[0, 0.28, 0]}>
          <FingerSegment position={[0, 0, 0]} length={0.22} delay={0.65} rotation={[0.4, 0, 0]} />
        </group>
      </group>
    </group>
  );
}

function JointRing({ r = 0.38, h = 0.45, color = "#c8d0d8" }: any) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[r, r * 0.9, h, 28]} />
      <meshStandardMaterial color={color} metalness={1} roughness={0.06} />
    </mesh>
  );
}

function ArmTube({ length = 2.6, width = 0.38, color = "#e8edf2", pistonColor = "#c8d0d8" }: any) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]} castShadow>
        <boxGeometry args={[width, length, width * 0.8]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh position={[width * 0.55, length / 2, 0]}>
        <cylinderGeometry args={[0.055, 0.055, length * 0.85, 10]} />
        <meshStandardMaterial color={pistonColor} metalness={1} roughness={0.08} />
      </mesh>
    </group>
  );
}

function RobotArm({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  teal = false,
  handGrip = 0.25,
  phase = 0,
}: any) {
  const root = useRef<THREE.Group>(null);
  const j1 = useRef<THREE.Group>(null);
  const j2 = useRef<THREE.Group>(null);
  const jointColor = "#c8d0d8";

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime + phase;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        rotation[1] + Math.sin(t * 0.28) * 0.07 + mouse.x * 0.15,
        0.04
      );
      root.current.rotation.z = THREE.MathUtils.lerp(
        root.current.rotation.z,
        rotation[2] + Math.cos(t * 0.22) * 0.05 + mouse.y * 0.12,
        0.04
      );
    }
    if (j1.current) j1.current.rotation.x = 0.55 + Math.sin(t * 0.5) * 0.09;
    if (j2.current) j2.current.rotation.x = -0.75 + Math.cos(t * 0.42) * 0.13;
  });

  return (
    <group ref={root} position={position} rotation={rotation} scale={scale}>
      <JointRing r={0.55} h={0.5} color={jointColor} />

      <group ref={j1} rotation={[0.55, 0, 0]}>
        <JointRing r={0.28} h={0.46} color={jointColor} />
        <ArmTube length={2.6} width={0.38} />

        <group ref={j2} position={[0, 2.6, 0]} rotation={[-0.75, 0, 0]}>
          <JointRing r={0.28} h={0.46} color={jointColor} />

          {teal && (
            <pointLight intensity={600} distance={10} color="#00d4c0" position={[0, 0.5, 1]} />
          )}

          <ArmTube length={2.1} width={0.3} />

          <group position={[0, 2.1, 0]}>
            <JointRing r={0.32} h={0.55} color={jointColor} />

            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.55, 0.12, 32]} />
              <meshStandardMaterial color={jointColor} metalness={1} roughness={0.08} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.07]}>
              <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
              <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
            </mesh>

            <group position={[0, 0.4, 0]} rotation={[0.35, 0, 0]}>
              <RoboticHand grip={handGrip} teal={teal} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}


// Helper function to animate the 3D text (floating slightly and reacting to mouse)
function AnimatedText3D() {
  const g = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (g.current) {
      g.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.1;
      g.current.rotation.y = THREE.MathUtils.lerp(
        g.current.rotation.y,
        mouse.x * 0.15,
        0.05
      );
      g.current.rotation.x = THREE.MathUtils.lerp(
        g.current.rotation.x,
        -mouse.y * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={g} position={[1.5, 0, 3]}>
      <Center>
        <Text3D
          font="/helvetiker_bold.typeface.json"
          size={0.9}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={5}
        >
          OUR TEAM
          <meshStandardMaterial
            color="#e8edf2"
            metalness={0.8}
            roughness={0.2}
            emissive="#00b09b"
            emissiveIntensity={4}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function RobotBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="absolute inset-0 bg-black" />;

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-black"
    >
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={52} />

        <ambientLight intensity={0.3} color="#ffffff" />

        <spotLight
          position={[0, 12, 8]}
          angle={0.32}
          penumbra={0.85}
          intensity={3000}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <spotLight
          position={[9, 14, 6]}
          angle={0.22}
          penumbra={0.7}
          intensity={2800}
          color="#c8e8e0"
          castShadow
        />

        <pointLight position={[10, 2, 4]} intensity={800} color="#00d4c0" />

        <pointLight position={[11, -6, 3]} intensity={450} color="#d060a0" />

        <pointLight position={[-9, -2, 3]} intensity={500} color="#aabbd0" />

        {/* 3D TITLE */}
        <AnimatedText3D />


        <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.18}>
          <group position={[10, -6.5, -2]} rotation={[-0.18, -1.05, 0.22]}>
            <RobotArm scale={2.05} teal handGrip={0.18} phase={0} />
          </group>
        </Float>

        <Float speed={0.65} rotationIntensity={0.07} floatIntensity={0.2}>
          <group position={[-10, -6.5, -2]} rotation={[-0.18, 1.05, -0.22]}>
            <RobotArm scale={2.05} teal handGrip={0.2} phase={2.5} />
          </group>
        </Float>

        <color attach="background" args={["#000000"]} />
      </Canvas>

      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          right: 0,
          width: "55%",
          height: "65%",
          background:
            "radial-gradient(ellipse at 85% 0%, rgba(200,230,220,0.13) 0%, transparent 60%)",
          zIndex: 5,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          zIndex: 6,
        }}
      />
    </div>
  );
}
