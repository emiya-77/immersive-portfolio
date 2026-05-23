/* eslint-disable react-hooks/purity */
"use client";

import { useMemo } from "react";

export default function Background() {
    const mountains = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            position: [
                (i - 6) * 12,
                -2,
                -40 - Math.random() * 30,
            ] as [number, number, number],

            scale: 6 + Math.random() * 8,
        }));
    }, []);

    return (
        <group>
            {mountains.map((m, i) => (
                <mesh
                    key={i}
                    position={m.position}
                    scale={m.scale}
                >
                    <coneGeometry args={[2, 6, 4]} />

                    <meshStandardMaterial
                        color="#081010"
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
        </group>
    );
}