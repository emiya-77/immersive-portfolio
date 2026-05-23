/* eslint-disable react-hooks/purity */
"use client";

import { useMemo } from "react";

export default function Foreground() {
    const objects = useMemo(() => {
        return Array.from({ length: 25 }, () => ({
            position: [
                (Math.random() - 0.5) * 12,
                0,
                -Math.random() * 40,
            ] as [number, number, number],
            scale: 1 + Math.random() * 3,
        }));
    }, []);

    return (
        <group>
            {objects.map((obj, i) => (
                <mesh
                    key={i}
                    position={obj.position}
                    scale={obj.scale}
                >
                    <cylinderGeometry args={[0.1, 0.15, 6, 8]} />

                    <meshStandardMaterial
                        color="#050505"
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}
        </group>
    );
}