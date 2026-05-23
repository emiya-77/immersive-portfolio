"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/experience/Experience";
import Overlay from "@/components/ui/Overlay";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* FIXED 3D WORLD */}
      <div className="fixed inset-0">
        <Canvas
          camera={{
            position: [0, 2, 8],
            fov: 50,
          }}
        >
          <Experience />
        </Canvas>

        <Overlay />
      </div>

      {/* INVISIBLE SCROLL TIMELINE */}
      <div className="h-[500vh]" />
    </main>
  );
}