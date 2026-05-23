/* eslint-disable react-hooks/purity */
"use client";

import { useMemo } from "react";

type TreeData = {
    position: [number, number, number];
    scale: number;
};

export default function Forest() {
    const trees = useMemo<TreeData[]>(() => {
        return Array.from({ length: 80 }, () => ({
            position: [
                (Math.random() - 0.5) * 40,
                0,
                (Math.random() - 0.5) * 40,
            ],
            scale: 0.5 + Math.random() * 2,
        }));
    }, []);

    return (
        <group>
            {trees.map((tree, index) => (
                <group
                    key={index}
                    position={tree.position}
                    scale={tree.scale}
                >
                    {/* Trunk */}
                    <mesh position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.08, 0.12, 2, 8]} />
                        <meshStandardMaterial color="#111111" />
                    </mesh>

                    {/* Top foliage */}
                    <mesh position={[0, 2.5, 0]}>
                        <coneGeometry args={[0.8, 2.5, 8]} />
                        <meshStandardMaterial color="#0b1510" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}