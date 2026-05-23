"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "./useScrollProgress";
import { zones } from "./zones";

export default function CameraRig() {
    const progress = useScrollProgress((s) => s.progress);

    const target = useRef(new THREE.Vector3());

    useFrame((state) => {
        const { camera } = state;
        const t = progress;

        let targetZ = 8;
        let targetY = 2;

        // INTRO
        if (t <= zones.projects) {
            const localT = t / zones.projects;

            targetZ = 8 - localT * 12;
            targetY = 2 + Math.sin(localT * Math.PI) * 1;
        }

        // PROJECTS
        else if (t <= zones.skills) {
            const localT =
                (t - zones.projects) /
                (zones.skills - zones.projects);

            targetZ = -4 - localT * 16;
            targetY = 2 + localT * 2;
        }

        // SKILLS
        else if (t <= zones.contact) {
            const localT =
                (t - zones.skills) /
                (zones.contact - zones.skills);

            targetZ = -20 - localT * 14;
            targetY = 4;
        }

        // cinematic sway
        const swayX =
            Math.sin(t * 3) * 1.5;

        // breathing motion
        const breatheY =
            Math.sin(state.clock.elapsedTime * 0.8) *
            0.08;

        // subtle forward drift
        const driftZ =
            Math.sin(state.clock.elapsedTime * 0.3) *
            0.2;

        target.current.set(
            swayX,
            targetY + breatheY,
            targetZ + driftZ
        );

        // inertia / lag
        camera.position.lerp(
            target.current,
            0.035
        );

        // dynamic look target
        const lookX =
            Math.sin(t * 2) * 0.5;

        const lookY =
            1.5 + breatheY * 0.5;

        const lookZ =
            targetZ - 10;

        camera.lookAt(
            lookX,
            lookY,
            lookZ
        );

        // cinematic tilt
        camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
    });

    return null;
}