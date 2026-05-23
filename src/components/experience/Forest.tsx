/* eslint-disable react-hooks/purity */
"use client";

import { useMemo } from "react";
import { useScene } from "./useScene";

type TreeData = {
    position: [number, number, number];
    scale: number;
};

export default function Forest() {
    const scene = useScene();

    const trees = useMemo<TreeData[]>(() => {
        return Array.from({ length: scene.treeDensity }, () => ({
            position: [
                (Math.random() - 0.5) * 50,
                0,
                (Math.random() - 0.5) * 50,
            ],
            scale: 0.6 + Math.random() * 2,
        }));
    }, [scene.treeDensity]);

    return (
        <group>
            {trees.map((tree, index) => (
                <group
                    key={index}
                    position={tree.position}
                    scale={tree.scale}
                >
                    <mesh position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.08, 0.12, 2, 8]} />
                        <meshStandardMaterial color="#111111" />
                    </mesh>

                    <mesh position={[0, 2.5, 0]}>
                        <coneGeometry args={[0.8, 2.5, 8]} />
                        <meshStandardMaterial color="#0b1510" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}