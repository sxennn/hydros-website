import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HydrosScene from './components/HydrosScene'
import UI from './components/UI'
import './styles/App.css'

function App() {
  const [activeSystem, setActiveSystem] = useState('overview')
  const [animationMode, setAnimationMode] = useState('flow')

  return (
    <div className="app-container">
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }} className="canvas" dpr={[1, 2]}>
        <Suspense fallback={null}>
          <HydrosScene activeSystem={activeSystem} animationMode={animationMode} />
        </Suspense>
      </Canvas>
      <UI activeSystem={activeSystem} setActiveSystem={setActiveSystem} animationMode={animationMode} setAnimationMode={setAnimationMode} />
    </div>
  )
}

export default App
