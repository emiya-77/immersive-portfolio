"use client"

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// 1. This component lives INSIDE the Canvas so it can safely use useFrame
function InteractiveBox() {
    const meshRef = useRef()

    // Local state for user interactions (hover and click)
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        // A. Using delta: Ensures smooth, framerate-independent constant rotation
        meshRef.current.rotation.x += 1 * delta
        meshRef.current.rotation.y += 0.5 * delta

        // B. Using state.clock: Makes the box float up and down like a buoy
        const time = state.clock.getElapsedTime()
        meshRef.current.position.y = Math.sin(time * 2) * 0.3

        // C. Using state.pointer: Gently tilts the box toward the mouse position
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
            meshRef.current.rotation.z,
            state.pointer.x * 0.5,
            0.1
        )
    })

    return (
        <mesh
            ref={meshRef}
            // Click to toggle size scale
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            // Hover events to change cursor style
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Box shape: width, height, depth */}
            <boxGeometry args={[1, 1, 1]} />

            {/* Material reacts to lighting. Color changes based on hover state */}
            <meshStandardMaterial
                color={hovered ? 'hotpink' : 'orange'}
                roughness={0.3}
                metalness={0.1}
            />
        </mesh>
    )
}

// 2. Main Scene Wrapper
export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            {/* The Canvas sets up the renderer and a default perspective camera */}
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>

                {/* Lights: Without these, meshStandardMaterial would be pure black */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />

                {/* The interactive object child component */}
                <InteractiveBox />

            </Canvas>
        </div>
    )
}
