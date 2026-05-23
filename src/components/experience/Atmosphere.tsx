/* eslint-disable react-hooks/purity */
"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Atmosphere() {
    const group = useRef<THREE.Group>(null);

    const planes = useMemo(() => {
        return Array.from({ length: 12 }, () => ({
            position: [
                (Math.random() - 0.5) * 40,
                Math.random() * 10,
                (Math.random() - 0.5) * 60,
            ] as [number, number, number],
            speed: 0.02 + Math.random() * 0.03,
            scale: 8 + Math.random() * 12,
        }));
    }, []);

    useFrame((state) => {
        if (!group.current) return;

        group.current.children.forEach((child, i) => {
            child.position.y += planes[i].speed;

            // loop upward drift
            if (child.position.y > 15) {
                child.position.y = -5;
            }

            child.rotation.z =
                Math.sin(state.clock.elapsedTime * 0.1 + i) *
                0.1;
        });
    });

    return (
        <group ref={group}>
            {planes.map((p, i) => (
                <mesh
                    key={i}
                    position={p.position}
                    scale={p.scale}
                >
                    <planeGeometry args={[1, 1]} />

                    <meshBasicMaterial
                        color="#0b1a14"
                        transparent
                        opacity={0.03}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
}