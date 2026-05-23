/* eslint-disable react-hooks/purity */
'use client'
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// 1. DUST PARTICLES COMPONENT
function AtmosphericDust({ count = 800 }) {
    const pointsRef = useRef()

    // Generate random coordinates in a sphere-like spread
    const pointsPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 25
        }
        return positions
    }, [count])

    // Float and rotate the dust cloud
    useFrame((state, delta) => {
        pointsRef.current.rotation.y += 0.015 * delta
        pointsRef.current.rotation.x += 0.005 * delta

        const time = state.clock.getElapsedTime()
        pointsRef.current.position.y = Math.sin(time * 0.15) * 0.15
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[pointsPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#a5f3fc" // Cyan tinted dust
                size={0.06}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.4}
                depthWrite={false}
            />
        </points>
    )
}

// 2. CENTRAL HERO OBJECT (Combines Mesh, Geometry, Materials, and Interaction)
function HeroArtifact() {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame((state, delta) => {
        // Rotation calculations using delta
        meshRef.current.rotation.x += 0.4 * delta
        meshRef.current.rotation.y += 0.6 * delta

        // Floating animation using state.clock
        const time = state.clock.getElapsedTime()
        meshRef.current.position.y = Math.sin(time * 1.5) * 0.4

        // Subtle alignment skew using state.pointer
        const targetZ = state.pointer.x * 0.3
        meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.1
    })

    return (
        <mesh
            ref={meshRef}
            scale={clicked ? 1.4 : 1.0}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Complex 3D shape (Icosahedron) */}
            <icosahedronGeometry args={[1.5, 0]} />

            {/* 
        HDR BLOOM ENGINE TIP: 
        When color values go beyond 1 (like 4 or 12), they become emissive HDR light sources.
        The EffectComposer catches this hyper-brightness and causes it to bleed outward into a glow!
      */}
            <meshStandardMaterial
                color={hovered ? [4, 0.2, 1.2] : [0.2, 2.5, 4]} // Glow pink on hover, glow cyan on idle
                emissive={!hovered ? [1, 0.3, 0.2] : [0.1, 1.2, 2]}
                emissiveIntensity={2}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    )
}

// 3. MASTER SCENE CONTAINER
export default function MasterScene() {
    const backgroundColor = '#07070c'

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>

            <Canvas
                camera={{ position: [0, 0, 8], fov: 55 }}
                style={{ background: backgroundColor }}
            >
                {/* ATMOSPHERE: The fog matches the background color to create depth */}
                <fog attach="fog" args={[backgroundColor, 4, 15]} />

                {/* BASIC LIGHTING */}
                <ambientLight intensity={0.2} />

                {/* ENVIRONMENT LIGHTING: Provides realistic reflections on the metal artifact */}
                <Environment preset="night" />

                {/* HERO COMPONENT */}
                <HeroArtifact />

                {/* DUST SYSTEM */}
                <AtmosphericDust count={1000} />

                {/* POST-PROCESSING PIPELINE: Captures emissive materials and turns them into a bloom glow */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={1.0} // Only make things brighter than 1.0 glow
                        intensity={1.5}          // Strength of the glow blur
                        mipmapBlur={true}        // Smoothes out the edges of the bloom
                    />
                </EffectComposer>

                {/* MOUSE CONTROLS: Allows you to drag and rotate around the whole scene */}
                <OrbitControls
                    enableZoom={true}
                    maxDistance={12}
                    minDistance={4}
                    enablePan={false}
                />
            </Canvas>

        </div>
    )
}
