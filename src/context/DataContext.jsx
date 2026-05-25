import { create } from 'zustand'

const systemSpecs = {
  overview: {
    name: 'HYDROS Station Overview',
    description: 'Complete hyperbaric underwater dissolved oxygen respirant system for 6 divers at 20m depth',
    specs: [
      { label: 'Operating Depth', value: '20', unit: 'm' },
      { label: 'Divers Supported', value: '6', unit: '' },
      { label: 'Station Mass', value: '2,346', unit: 'kg' },
      { label: 'Station Height', value: '2.0', unit: 'm' },
      { label: 'Station Width', value: '4.0', unit: 'm' },
      { label: 'Hydrostatic Pressure', value: '201,105', unit: 'Pa' },
      { label: 'O₂ Demand (6 divers)', value: '0.129', unit: 'kg/hour' },
      { label: 'Safety Factor', value: '3.32', unit: '✓ ASME compliant' },
    ]
  },
  turbines: {
    name: 'Axial-Flow Turbine Array',
    description: 'Three turbines drawing seawater at 1.5 m/s through the membrane chamber',
    specs: [
      { label: 'Quantity', value: '3', unit: 'turbines' },
      { label: 'Blade Diameter', value: '760', unit: 'mm' },
      { label: 'Flow Velocity', value: '1.5', unit: 'm/s' },
      { label: 'Total Throughput', value: '109,800', unit: 'L/min' },
      { label: 'Theoretical Power', value: '1,251', unit: 'W (Betz Law)' },
      { label: 'Practical Output', value: '450–500', unit: 'W' },
      { label: 'Material', value: 'Al 5083', unit: 'marine grade' },
      { label: 'Safety Margin', value: '×73', unit: 'vs. minimum flow' },
    ]
  },
  membrane: {
    name: 'Polysulfone Membrane Chamber',
    description: 'Hollow-fiber extraction using Henry\'s Law & Fick\'s diffusion at 20m depth',
    specs: [
      { label: 'Vessel Material', value: 'Ti-6Al-4V', unit: 'titanium' },
      { label: 'Vessel Diameter', value: '350', unit: 'mm' },
      { label: 'Active Length', value: '2,760', unit: 'mm' },
      { label: 'Fiber Bundle Radius', value: '200', unit: 'mm' },
      { label: 'Active Surface Area', value: '3.47', unit: 'm²' },
      { label: 'Extraction Efficiency', value: '20%', unit: 'per pass' },
      { label: 'Dissolved O₂ Input', value: '7.2', unit: 'mg/L @ 20m' },
      { label: 'Reynolds Number', value: '1,006,500', unit: 'fully turbulent' },
    ]
  },
  scrubber: {
    name: 'CO₂ Scrubber Unit',
    description: 'Sodasorb soda lime neutralizing CO₂ in closed-loop breathing',
    specs: [
      { label: 'Vessel Material', value: '316L Stainless', unit: 'steel' },
      { label: 'Outer Diameter', value: '180', unit: 'mm' },
      { label: 'Height', value: '600', unit: 'mm' },
      { label: 'Soda Lime Charge', value: '2.5', unit: 'kg' },
      { label: 'Duration @ 6 Divers', value: '48.5', unit: 'hours' },
      { label: 'Target pCO₂', value: '< 500', unit: 'Pa' },
      { label: 'Safety Standard', value: 'NOAA Diving', unit: 'certified' },
      { label: 'Vessel Mass', value: '42', unit: 'kg' },
    ]
  },
  buffer: {
    name: 'Oxygen Buffer Tank',
    description: 'Hemispherical-cap pressure vessel for oxygen demand smoothing',
    specs: [
      { label: 'Material', value: '316L Stainless', unit: 'steel' },
      { label: 'Internal Volume', value: '228', unit: 'litres' },
      { label: 'Volume @ 1 atm', value: '684', unit: 'litres equivalent' },
      { label: 'Operating Pressure', value: '3.0', unit: 'atm' },
      { label: 'End Cap Design', value: 'Hemispherical', unit: 'stress-optimized' },
      { label: 'Cap Function', value: 'Equal stress', unit: 'distribution' },
      { label: 'Total Mass', value: '68', unit: 'kg' },
      { label: 'Connection Type', value: 'Manifold', unit: 'parallel' },
    ]
  },
  manifold: {
    name: '6-Diver Distribution Manifold',
    description: 'Parallel header distributing equal O₂ flow to all divers',
    specs: [
      { label: 'Material', value: '316L Stainless', unit: 'steel' },
      { label: 'Header Diameter', value: '100', unit: 'mm' },
      { label: 'Header Length', value: '3.0', unit: 'm' },
      { label: 'Port Diameter', value: '50', unit: 'mm each' },
      { label: 'Port Quantity', value: '6', unit: 'divers' },
      { label: 'Port Spacing', value: '500', unit: 'mm' },
      { label: 'O₂ Per Diver', value: '0.000357', unit: 'kg/min' },
      { label: 'Manifold Mass', value: '35', unit: 'kg' },
    ]
  },
  hoses: {
    name: 'Diver Umbilical Hoses',
    description: 'Dual-channel reinforced neoprene: inbound O₂ + exhaled gas return',
    specs: [
      { label: 'Quantity', value: '6', unit: 'hoses' },
      { label: 'Material', value: 'Neoprene', unit: '+SS316 fittings' },
      { label: 'Outer Diameter', value: '25', unit: 'mm' },
      { label: 'Length per Hose', value: '2,400', unit: 'mm' },
      { label: 'Pressure Rating', value: '3.5', unit: 'atm' },
      { label: 'Channels', value: 'Dual', unit: 'supply + return' },
      { label: 'Connection Type', value: 'Quick-release', unit: 'SS316' },
      { label: 'Total Mass', value: '30', unit: 'kg' },
    ]
  },
  frame: {
    name: 'Structural Support Frame',
    description: 'ASTM A36 steel frame transmitting all loads & buoyancy forces',
    specs: [
      { label: 'Material Grade', value: 'ASTM A36', unit: 'carbon steel' },
      { label: 'Beam Profile', value: '150 mm OD', unit: '6 mm wall' },
      { label: 'Yield Strength', value: '250', unit: 'MPa' },
      { label: 'Applied Stress @ 20m', value: '75.3', unit: 'MPa' },
      { label: 'Safety Factor', value: '3.32', unit: '> 3.0 ASME ✓' },
      { label: 'Frame Dimensions', value: '4.0 × 3.0 × 2.0', unit: 'm (W×D×H)' },
      { label: 'Frame Mass', value: '1,507', unit: 'kg (64% total)' },
      { label: 'Primary Function', value: 'Load-bearing', unit: 'skeleton' },
    ]
  },
  emergency: {
    name: 'Emergency O₂ Reserve',
    description: 'Two independent backup tanks - diver activated in primary failure',
    specs: [
      { label: 'Quantity', value: '2', unit: 'cylinders' },
      { label: 'Volume Each', value: '12', unit: 'litres' },
      { label: 'Operating Pressure', value: '207', unit: 'bar' },
      { label: 'Material', value: 'Aluminium 7075-T6', unit: 'ultra-high strength' },
      { label: 'Total Emergency Duration', value: '34', unit: 'minutes (6 divers)' },
      { label: 'Activation Method', value: 'Manual valve', unit: 'diver-controlled' },
      { label: 'Safety Factor', value: '≥ 3.0', unit: 'ASME compliant' },
      { label: 'Total Mass', value: '22', unit: 'kg' },
    ]
  },
  balloon: {
    name: 'Buoyancy Balloon & Mooring System',
    description: 'TPU balloon with tension mooring for passive depth equilibrium at 20m',
    specs: [
      { label: 'Material', value: 'TPU', unit: 'thermoplastic polyurethane' },
      { label: 'Radius', value: '850', unit: 'mm' },
      { label: 'Displacement Volume', value: '2.57', unit: 'm³' },
      { label: 'Buoyancy Force', value: '25,838', unit: 'N' },
      { label: 'Station Weight', value: '23,014', unit: 'N' },
      { label: 'Net Upward Force', value: '+2,824', unit: 'N (self-correcting)' },
      { label: 'Mooring Cords', value: '4 × 14mm', unit: 'wire rope' },
      { label: 'Cord Safety Factor', value: '113', unit: '>> 3.0 minimum' },
    ]
  },
}

export const useStore = create((set) => ({
  systemSpecs,
  getSpec: (systemKey) => systemSpecs[systemKey] || systemSpecs.overview,
}))

export const DataProvider = ({ children }) => children
