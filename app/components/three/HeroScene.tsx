'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import type { Group } from 'three';

function Blob() {
    const group = useRef<Group>(null);
    const shell = useRef<Group>(null);

    useFrame((state, delta) => {
        if (!group.current || !shell.current) return;
        // Ease the object toward the cursor instead of snapping to it.
        group.current.rotation.y +=
            (state.pointer.x * 0.6 - group.current.rotation.y) * 0.05;
        group.current.rotation.x +=
            (-state.pointer.y * 0.4 - group.current.rotation.x) * 0.05;
        shell.current.rotation.y += delta * 0.15;
        shell.current.rotation.z += delta * 0.08;
    });

    return (
        <group ref={group}>
            <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
                <mesh>
                    <icosahedronGeometry args={[1.15, 64]} />
                    <MeshDistortMaterial
                        color="#7c3aed"
                        emissive="#2e1065"
                        roughness={0.15}
                        metalness={0.6}
                        distort={0.38}
                        speed={1.8}
                    />
                </mesh>
                <group ref={shell}>
                    <mesh>
                        <icosahedronGeometry args={[1.8, 1]} />
                        <meshBasicMaterial
                            color="#22d3ee"
                            wireframe
                            transparent
                            opacity={0.18}
                        />
                    </mesh>
                </group>
            </Float>
        </group>
    );
}

export default function HeroScene({ active }: { active: boolean }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            frameloop={active ? 'always' : 'never'}
            // Canvas sits behind the hero text, so listen on the whole page to follow the cursor.
            eventSource={document.body}
            eventPrefix="client"
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            aria-hidden
        >
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 4, 5]} intensity={1.6} />
            <pointLight position={[-4, -2, 2]} intensity={30} color="#22d3ee" />
            <pointLight position={[4, 2, -2]} intensity={30} color="#a78bfa" />
            <Blob />
            <Sparkles count={60} scale={7} size={2} speed={0.3} color="#c4b5fd" />
        </Canvas>
    );
}
