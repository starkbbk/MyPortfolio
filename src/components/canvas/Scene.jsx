import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Stars, useScroll, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

import NeutronStar from './NeutronStar'
import CosmicDust from './CosmicDust'
import Planet from './Planet'
import Blackhole from './Blackhole'
import Wormhole from './Wormhole'
import Pulsar from './Pulsar'
import Comet from './Comet'
import ExplodingPlanet from './ExplodingPlanet'
import Overlay from '../dom/Overlay'

function CameraRig() {
    const scroll = useScroll()

    useFrame((state, delta) => {
        const targetY = -scroll.offset * 20
        state.camera.position.y = targetY
        state.camera.lookAt(0, targetY - 2, 0)
    })
    return null
}

export default function Scene() {
    return (
        <>
            <color attach="background" args={['#020210']} /> {/* Deep Cosmic Blue */}

            <fog attach="fog" args={['#100520', 10, 60]} />

            {/* Cosmic Blue/Purple Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[-10, 0, -10]} intensity={3} color="#0055ff" distance={50} />
            <pointLight position={[10, 0, 10]} intensity={3} color="#aa00ff" distance={30} />

            <Environment preset="city" blur={1} />

            <ScrollControls pages={4} damping={0.3}>
                <CameraRig />

                <Scroll>
                    {/* Phase 1: Neutron Star (The Beginning) */}
                    <group position={[0, 0, 0]}>
                        <NeutronStar />
                    </group>

                    {/* Phase 2: Earth (The Blue Marble) */}
                    <group position={[3, -6, -2]}>
                        <Planet type="earth" size={1.5} />
                    </group>

                    {/* Phase 3: Blackhole (Gargantua) */}
                    <group position={[-2, -13, 0]}>
                        <Blackhole />
                        {/* Background Gas Giant */}
                        <group position={[5, 2, -5]}>
                            <Planet type="gas" color="#4400ff" size={2} />
                        </group>
                    </group>

                    {/* Phase 4: Planet Destruction (The End) */}
                    <group position={[0, -20, -1]}>
                        <ExplodingPlanet color="#554433" />
                        {/* Distant Moon witnessing the destruction */}
                        <group position={[-4, 2, -4]}>
                            <Planet type="rocky" color="#888888" size={0.8} />
                        </group>
                        {/* Meteor Shower continuing the destruction */}
                        <Comet start={new THREE.Vector3(-4, 6, 2)} end={new THREE.Vector3(-0.5, 0.5, 0)} speed={4} size={0.15} />
                        <Comet start={new THREE.Vector3(3, 8, -2)} end={new THREE.Vector3(0.2, 0.2, 0)} speed={5} size={0.1} color="#ff8800" />
                        <Comet start={new THREE.Vector3(-2, 5, 4)} end={new THREE.Vector3(-0.1, -0.1, 0.5)} speed={6} size={0.2} color="#ff3300" />
                    </group>

                    {/* Distant Pulsars (Stars with Flames) */}
                    <group position={[-15, -5, -20]} rotation={[0, 0, 0.5]}>
                        <Pulsar />
                    </group>
                    <group position={[15, -15, -15]} rotation={[0, 0, -0.5]}>
                        <Pulsar />
                    </group>

                    {/* Vibrant Gold Cosmic Dust */}
                    <CosmicDust />

                    {/* Twinkling Stars */}
                    <Stars radius={100} depth={50} count={8000} factor={6} saturation={1} fade speed={2} />
                </Scroll>

                <Scroll html style={{ width: '100%' }}>
                    <Overlay />
                </Scroll>
            </ScrollControls>

            <EffectComposer disableNormalPass>
                {/* Cinematic Gold Bloom */}
                <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} intensity={1.5} radius={0.6} />
                <Noise opacity={0.2} /> {/* Heavier grain for Interstellar film look */}
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <ChromaticAberration offset={[0.003, 0.003]} />
            </EffectComposer>
        </>
    )
}
