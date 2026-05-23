"use client";

import { useScene } from "./useScene";

export default function SceneAnchors() {
    const scene = useScene();

    return (
        <group>
            {/* 🌲 INTRO ANCHOR */}
            {scene.name === "intro" && (
                <mesh position={[0, 2, 0]}>
                    <cylinderGeometry args={[1.5, 2, 8, 16]} />
                    <meshStandardMaterial color="#0b2a1a" />
                </mesh>
            )}

            {/* 📦 PROJECTS ANCHORS */}
            {scene.name === "projects" && (
                <>
                    <mesh position={[-5, 1.5, -10]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color="#88ccff" />
                    </mesh>

                    <mesh position={[5, 1.5, -14]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color="#66aaff" />
                    </mesh>
                </>
            )}

            {/* 🌿 SKILLS ANCHOR */}
            {scene.name === "skills" && (
                <mesh position={[0, 0.5, -25]}>
                    <torusGeometry args={[5, 0.2, 16, 100]} />
                    <meshStandardMaterial color="#88ffaa" />
                </mesh>
            )}

            {/* 🌫 CONTACT ANCHOR */}
            {scene.name === "contact" && (
                <mesh position={[0, 1, -35]}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.3}
                    />
                </mesh>
            )}
        </group>
    );
}