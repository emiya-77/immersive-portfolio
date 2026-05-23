"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "./useScrollProgress";
import { zones } from "./zones";

export default function CameraRig() {
    const { camera } = useThree();
    const progress = useScrollProgress((s) => s.progress);

    const target = useRef(new THREE.Vector3());

    useFrame(() => {
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

        const swayX = Math.sin(t * 3) * 1.5;

        target.current.set(swayX, targetY, targetZ);

        camera.position.lerp(target.current, 0.04);

        camera.lookAt(0, 1.5, 0);
    });

    return null;
}