'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing'

export default function CinematicScene() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#0a0a10' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />

                {/* A row of boxes to visualize the Depth of Field blur effect */}
                <mesh position={[-2, 0, -3]}>
                    <boxGeometry />
                    <meshBasicMaterial color="red" />
                </mesh>

                {/* Focused central glowing box */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry />
                    <meshBasicMaterial color={[1.5, 4, 1.5]} /> {/* Emissive color for Bloom */}
                </mesh>

                <mesh position={[2, 0, 3]}>
                    <boxGeometry />
                    <meshBasicMaterial color="blue" />
                </mesh>

                {/* 
          THE POSTPROCESSING PIPELINE
          Rule: Order matters. Effects process top-to-bottom!
        */}
                <EffectComposer>
                    {/* 1. Calculate camera lens focal depth */}
                    <DepthOfField focusDistance={0.02} focalLength={0.5} bokehScale={5} />

                    {/* 2. Catch the central emissive green box and make it glow */}
                    <Bloom luminanceThreshold={1.0} intensity={2.0} mipmapBlur />

                    {/* 3. Darken the browser corners */}
                    <Vignette offset={0.3} darkness={0.8} />

                    {/* 4. Layer subtle grit texture across the whole screen */}
                    <Noise opacity={0.04} />
                </EffectComposer>

                <OrbitControls />
            </Canvas>
        </div>
    )
}
