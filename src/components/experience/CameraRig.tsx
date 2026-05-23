"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig() {
    const { camera } = useThree();

    const target = useRef(new THREE.Vector3(0, 2, 8));

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // subtle floating motion
        const floatX = Math.sin(t * 0.3) * 0.5;
        const floatY = Math.sin(t * 0.2) * 0.3;

        target.current.set(floatX, 2 + floatY, 8);

        camera.position.lerp(target.current, 0.02);

        camera.lookAt(0, 1.5, 0);
    });

    return null;
}