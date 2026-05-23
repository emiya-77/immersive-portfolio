/* eslint-disable react-hooks/purity */
'use client'
import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Scroll, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// 1. BACKGROUND DUST CLOUD
function SpaceDust({ count = 600 }) {
    const pointsRef = useRef()
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 30
        }
        return arr
    }, [count])

    useFrame((state, delta) => {
        pointsRef.current.rotation.y += 0.01 * delta
        pointsRef.current.rotation.x += 0.005 * delta
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#38bdf8" size={0.05} sizeAttenuation transparent opacity={0.3} depthWrite={false} />
        </points>
    )
}

// 2. CENTRAL HERO SHAPE
function CentralArtifact() {
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.x += 0.2 * delta
        ref.current.rotation.y += 0.3 * delta
    })

    return (
        <mesh ref={ref} position={[0, 0, 0]}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color={[0.1, 3, 5]} emissive={[0.05, 1, 2]} metalness={0.9} roughness={0.1} />
        </mesh>
    )
}

// 3. CINEMATIC CAMERA SYSTEM (Combines Lerp, Smoothness, and Scroll)
function CinematicCamera() {
    const scroll = useScroll()

    // Temporary variables created outside the frame loop to prevent garbage collection memory drops
    const targetPosition = useMemo(() => new THREE.Vector3(), [])
    const targetLookAt = useMemo(() => new THREE.Vector3(), [])

    useFrame((state, delta) => {
        // A. Read the precise current scroll timeline position (0.0 to 1.0)
        const offset = scroll.offset

        // B. Calculate 3 distinct camera view staging coordinates depending on scroll position
        if (offset < 0.33) {
            // Stage 1: Front perspective view
            targetPosition.set(0, 0, 6)
            targetLookAt.set(0, 0, 0)
        } else if (offset < 0.66) {
            // Stage 2: High overhead close-up view
            targetPosition.set(3, 4, 3)
            targetLookAt.set(0, 0.5, 0)
        } else {
            // Stage 3: Distant side angle look
            targetPosition.set(-5, -1, 7)
            targetLookAt.set(0, -0.5, 0)
        }

        // C. Lerp (Smooth movement interpolation): Current position -> Target position
        // We use a safe interpolation calculation factor based on delta time
        const lerpFactor = 1 - Math.exp(-4 * delta)
        state.camera.position.lerp(targetPosition, lerpFactor)

        // D. Smooth LookAt calculations: Continually adjust where the lens focuses
        // Create a virtual moving focus point vector and slide it smoothly
        const currentLookAt = state.camera.userData.currentLookAt || new THREE.Vector3(0, 0, 0)
        currentLookAt.lerp(targetLookAt, lerpFactor)
        state.camera.lookAt(currentLookAt)
        state.camera.userData.currentLookAt = currentLookAt
    })

    return null
}

// 4. MASTER SCENE MANAGER
export default function CinematicScrollScene() {
    const bgColor = '#050508'

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', background: bgColor }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <fog attach="fog" args={[bgColor, 5, 18]} />
                <ambientLight intensity={0.1} />
                <Environment preset="city" />

                {/* 
          SCROLL MANAGER SETUP:
          pages={3} makes the track 3 windows high. 
          damping={0.3} adds visual momentum physics to scrolling gestures.
        */}
                <ScrollControls pages={3} damping={0.3}>

                    {/* 3D Content Tracking Canvas Layer */}
                    <CentralArtifact />
                    <SpaceDust count={800} />
                    <CinematicCamera />

                    {/* HTML Overlay Section Layer */}
                    <Scroll html style={{ width: '100vw' }}>

                        {/* Slide 1 */}
                        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%' }}>
                            <h1 style={{ color: 'white', fontSize: '3.5rem', margin: 0, fontFamily: 'sans-serif' }}>The Quantum Core</h1>
                            <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Scroll downward to observe the architecture.</p>
                        </div>

                        {/* Slide 2 */}
                        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%' }}>
                            <h1 style={{ color: 'white', fontSize: '3.5rem', margin: 0, fontFamily: 'sans-serif' }}>High Fidelity Physics</h1>
                            <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Camera dynamically cuts to an advanced inspection array path.</p>
                        </div>

                        {/* Slide 3 */}
                        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%' }}>
                            <h1 style={{ color: 'white', fontSize: '3.5rem', margin: 0, fontFamily: 'sans-serif' }}>Infinite Scale</h1>
                            <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Seamlessly blending programmatic layouts with WebGL rendering environments.</p>
                        </div>

                    </Scroll>
                </ScrollControls>

                {/* POST PROCESSING FOR GLOW EFFECT */}
                <EffectComposer>
                    <Bloom luminanceThreshold={1.0} intensity={1.5} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
