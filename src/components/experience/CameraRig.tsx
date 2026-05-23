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

        // base path through forest
        let targetZ = 8;
        let targetY = 2;

        // INTRO (start)
        if (t <= zones.projects) {
            const localT = t / zones.projects;

            targetZ = 8 - localT * 10;
            targetY = 2 + Math.sin(localT * Math.PI) * 1;
        }

        // PROJECTS (deep forest)
        else if (t <= zones.skills) {
            const localT =
                (t - zones.projects) /
                (zones.skills - zones.projects);

            targetZ = -2 - localT * 12;
            targetY = 2 + localT * 2;
        }

        // SKILLS (open area)
        else if (t <= zones.contact) {
            const localT =
                (t - zones.skills) /
                (zones.contact - zones.skills);

            targetZ = -14 - localT * 10;
            targetY = 4;
        }

        target.current.set(0, targetY, targetZ);

        camera.position.lerp(target.current, 0.06);

        camera.lookAt(0, 1.5, 0);
    });

    return null;
}