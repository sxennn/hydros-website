import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function HydrosScene({ activeSystem, animationMode }) {
  const turbinesRef = useRef([])
  const flowParticlesRef = useRef(null)

  useFrame(({ clock }) => {
    turbinesRef.current.forEach(turbine => {
      if (turbine) turbine.rotation.x += 0.02
    })

    if (flowParticlesRef.current && animationMode === 'flow') {
      const positions = flowParticlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = (positions[i + 1] + 0.01) % 3
      }
      flowParticlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const getHighlightColor = (name) => activeSystem === name ? 0x7755ff : 0x000000

  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={60} />
      <OrbitControls autoRotate autoRotateSpeed={1.5} />
      <Environment preset="night" />
      <ambientLight intensity={0.6} color="#6b5aff" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#9966ff" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#66ccff" />

      <group>
        {/* FRAME */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 2, 3]} />
          <meshStandardMaterial color="#555555" roughness={0.5} metalness={0.6} emissive={getHighlightColor('frame')} emissiveIntensity={0.3} />
        </mesh>

        {/* TURBINES */}
        {[[-1.5, 0.5, -1.8], [0, 0.5, -1.8], [1.5, 0.5, -1.8]].map((pos, i) => (
          <group key={`turbine-${i}`} position={pos}>
            <mesh>
              <coneGeometry args={[0.15, 0.3, 16]} />
              <meshStandardMaterial color="#00d4ff" emissive="#0099ff" emissiveIntensity={0.4} />
            </mesh>
            <group ref={(el) => { turbinesRef.current[i] = el }}>
              {[0, 120, 240].map((angle) => (
                <mesh key={`blade-${angle}`} rotation={[0, THREE.MathUtils.degToRad(angle), 0]} position={[0.25, 0, 0]}>
                  <boxGeometry args={[0.5, 0.05, 0.02]} />
                  <meshStandardMaterial color="#00ffff" emissive="#0088ff" emissiveIntensity={0.4} />
                </mesh>
              ))}
            </group>
            <mesh>
              <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#0099cc" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* MEMBRANE */}
        <group position={[0, 0.3, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 3, 16]} />
            <meshStandardMaterial color="#ffd700" emissive={getHighlightColor('membrane')} emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 2.76, 12]} />
            <meshStandardMaterial color="#ffeb3b" emissive="#ff8800" emissiveIntensity={0.2} wireframe />
          </mesh>
          {[-1.5, 1.5].map((x) => (
            <mesh key={`end-cap-${x}`} position={[x, 0, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#ffaa00" roughness={0.4} metalness={0.6} />
            </mesh>
          ))}
        </group>

        {/* SCRUBBER */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 16]} />
          <meshStandardMaterial color="#22dd22" emissive={getHighlightColor('scrubber')} emissiveIntensity={0.4} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#11cc11" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* BUFFER */}
        <group position={[1.2, 0.3, 1.2]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 2, 16]} />
            <meshStandardMaterial color="#ff1493" emissive={getHighlightColor('buffer')} emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
          </mesh>
          {[-1, 1].map((dir) => (
            <mesh key={`hemi-${dir}`} position={[0, dir * 1, 0]}>
              <sphereGeometry args={[0.18, 16, 8]} />
              <meshStandardMaterial color="#dd0099" roughness={0.4} metalness={0.6} />
            </mesh>
          ))}
        </group>

        {/* MANIFOLD */}
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
          <meshStandardMaterial color="#9933ff" emissive={getHighlightColor('manifold')} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* DIVER PORTS */}
        {Array.from({ length: 6 }).map((_, i) => {
          const xPos = -1.25 + (i * 0.5)
          const colors = ['#ff3333', '#ff6633', '#ffff33', '#33ff33', '#3333ff', '#ff33ff']
          return (
            <mesh key={`port-${i}`} position={[xPos, -0.5, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={0.3} />
            </mesh>
          )
        })}

        {/* HOSES */}
        {Array.from({ length: 6 }).map((_, i) => {
          const xPos = -1.25 + (i * 0.5)
          return (
            <mesh key={`hose-${i}`} position={[xPos, -0.8, 0.2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
              <meshStandardMaterial color="#0066ff" roughness={0.5} metalness={0.4} />
            </mesh>
          )
        })}

        {/* EMERGENCY */}
        {[[-0.8, 0.8, 1.2], [0.8, 0.8, 1.2]].map((pos, i) => (
          <mesh key={`emergency-${i}`} position={pos}>
            <cylinderGeometry args={[0.08, 0.08, 1.1, 12]} />
            <meshStandardMaterial color="#ff8800" emissive={getHighlightColor('emergency')} emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* BALLOON */}
        <mesh position={[0, 3.2, 0]}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial color="#66ccff" emissive={getHighlightColor('balloon')} emissiveIntensity={0.4} metalness={0.5} roughness={0.4} transparent opacity={0.8} />
        </mesh>

        {/* MOORING CABLES */}
        {[[-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].map((offset, i) => (
          <mesh key={`cable-${i}`} position={[offset[0], 2.4, offset[1]]}>
            <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
            <meshStandardMaterial color="#cccccc" roughness={0.6} metalness={0.8} />
          </mesh>
        ))}

        {/* FLOW PARTICLES */}
        <points ref={flowParticlesRef} position={[-2, 0.3, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={100} array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 3))} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#00aaff" sizeAttenuation />
        </points>
      </group>
    </>
  )
}

export default HydrosScene
