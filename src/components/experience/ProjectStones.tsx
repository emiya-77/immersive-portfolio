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
            const project = projects[index];

            const dist = camera.position.distanceTo(
                new THREE.Vector3(...project.position)
            );

            if (dist < closestDist) {
                closestDist = dist;
                closestId = project.id;
            }

            // highlight logic
            const scale = dist < 4 ? 1.5 : 1;

            mesh.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

            const material = mesh.material as THREE.MeshStandardMaterial;

            material.opacity = THREE.MathUtils.clamp(
                (progress - 0.25) * 3,
                0,
                1
            );
        });

        setActiveId(closestId);
    });

    return (
        <group ref={group}>
            {projects.map((project) => (
                <mesh key={project.id} position={project.position}>
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