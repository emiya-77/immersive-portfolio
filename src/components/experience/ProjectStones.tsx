/* eslint-disable react-hooks/purity */
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "./projects";
import { useScrollProgress } from "./useScrollProgress";
import { useActiveProject } from "../shared/useActiveProject";

export default function ProjectStones() {
    const progress = useScrollProgress((s) => s.progress);
    const setActiveId = useActiveProject((s) => s.setActiveId);

    const { camera } = useThree();
    const group = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!group.current) return;

        let closestId: string | null = null;
        let closestDist = Infinity;

        group.current.children.forEach((child, index) => {
            const mesh = child as THREE.Mesh;
            const material =
                mesh.material as THREE.MeshStandardMaterial;

            const project = projects[index];

            const dist = camera.position.distanceTo(
                new THREE.Vector3(...project.position)
            );

            // nearest project detection
            if (dist < closestDist) {
                closestDist = dist;
                closestId = project.id;
            }

            // proximity influence
            const proximity = THREE.MathUtils.clamp(
                1 - dist / 10,
                0,
                1
            );

            // scale reaction
            const targetScale = 1 + proximity * 0.8;

            mesh.scale.lerp(
                new THREE.Vector3(
                    targetScale,
                    targetScale,
                    targetScale
                ),
                0.08
            );

            // opacity response
            material.opacity =
                0.15 + proximity * 0.85;

            // emissive glow response
            material.emissive = new THREE.Color(
                0.2 * proximity,
                0.5 * proximity,
                0.8 * proximity
            );

            material.emissiveIntensity =
                0.2 + proximity * 1.5;
        });

        setActiveId(closestId);
    });

    return (
        <group ref={group}>
            {projects.map((project) => (
                <mesh
                    key={project.id}
                    position={[
                        project.position[0],
                        project.position[1] +
                        Math.sin(Date.now() * 0.001 + project.position[2]) *
                        0.08,
                        project.position[2],
                    ]}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="#88ccff"
                        transparent
                        opacity={0}
                        roughness={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
}