import React from 'react'
import { useStore } from '../context/DataContext'

function UI({ activeSystem, setActiveSystem, animationMode, setAnimationMode }) {
  const { getSpec } = useStore()
  const spec = getSpec(activeSystem)

  const systems = [
    { key: 'overview', label: 'Overview', emoji: '📊' },
    { key: 'turbines', label: 'Turbines', emoji: '🌪️' },
    { key: 'membrane', label: 'Membrane', emoji: '🫧' },
    { key: 'scrubber', label: 'Scrubber', emoji: '🧹' },
    { key: 'buffer', label: 'Buffer Tank', emoji: '🔋' },
    { key: 'manifold', label: 'Manifold', emoji: '⚡' },
    { key: 'hoses', label: 'Hoses', emoji: '🔗' },
    { key: 'frame', label: 'Frame', emoji: '🏗️' },
  ]

  const modes = [
    { key: 'flow', label: 'Seawater Flow' },
    { key: 'extraction', label: 'O₂ Extraction' },
    { key: 'circulation', label: 'Gas Loop' },
    { key: 'static', label: 'Static View' },
  ]

  return (
    <div className="ui-container">
      <div className="header">
        <h1>🌊 HYDROS Station</h1>
        <p>Interactive 3D visualization of the underwater oxygen extraction system</p>
      </div>

      <div className="side-panel">
        <h2>{spec.name}</h2>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '15px' }}>{spec.description}</p>
        
        <div style={{ borderTop: '1px solid rgba(147, 112, 219, 0.2)', paddingTop: '15px' }}>
          {spec.specs.map((item, idx) => (
            <div key={idx} className="info-item">
              <div className="info-label">{item.label}</div>
              <div className="info-value">
                {item.value}
                <span className="info-unit">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="control-panel">
        <div className="control-section">
          <label>🔍 SELECT COMPONENT</label>
          <div className="control-grid">
            {systems.map((sys) => (
              <button
                key={sys.key}
                className={`control-btn ${activeSystem === sys.key ? 'active' : ''}`}
                onClick={() => setActiveSystem(sys.key)}
              >
                {sys.emoji} {sys.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <label>🎬 ANIMATION MODE</label>
          <div className="control-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {modes.map((mode) => (
              <button
                key={mode.key}
                className={`control-btn ${animationMode === mode.key ? 'active' : ''}`}
                onClick={() => setAnimationMode(mode.key)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section" style={{ marginBottom: 0 }}>
          <label>💡 CONTROLS: Click & drag to rotate • Scroll to zoom • Click buttons to highlight components</label>
        </div>
      </div>
    </div>
  )
}

export default UI
