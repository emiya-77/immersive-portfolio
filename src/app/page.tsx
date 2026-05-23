"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/experience/Experience";
import Overlay from "@/components/ui/Overlay";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 50,
        }}
      >
        <Experience />
      </Canvas>

      <Overlay />
    </main>
  );
}