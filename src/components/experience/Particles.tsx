/* eslint-disable react-hooks/purity */
"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;

export default function Particles() {
    const pointsRef = useRef<THREE.Points>(null);

    const circleTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Draw a smooth, anti-aliased radial circle gradient
            const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 16, 16);
        }
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    const positions = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = Math.random() * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        pointsRef.current.rotation.y =
            state.clock.elapsedTime * 0.01;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                // count={positions.length / 3}
                // array={positions}
                // itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.15}
                color="#b9d5ff"
                map={circleTexture}
                transparent={true}
                alphaTest={0.01}
                opacity={0.8}
                depthWrite={false}
            />
        </points>
    );
}