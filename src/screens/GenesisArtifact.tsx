import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ResultShareBar from '../components/ResultShareBar'

const SPARKS = [
  { top: '6%', left: '8%', size: 6, delay: '0s', dur: '2.2s' },
  { top: '10%', left: '82%', size: 8, delay: '0.5s', dur: '2.6s' },
  { top: '75%', left: '5%', size: 5, delay: '0.9s', dur: '2s' },
  { top: '80%', left: '85%', size: 7, delay: '1.2s', dur: '2.4s' },
  { top: '50%', left: '92%', size: 4, delay: '0.4s', dur: '2.8s' },
  { top: '22%', left: '90%', size: 5, delay: '1.6s', dur: '2.1s' },
  { top: '88%', left: '40%', size: 4, delay: '1s', dur: '2.3s' },
]

export default function GenesisArtifact() {
  const navigate = useNavigate()
  const { routeData, userName, goal, setGenesisComplete } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', proof: 'Role Target Card', focus: 'Clarifying your next best route' }
  const artifactId = `BRN-${Math.floor(10000 + Math.random() * 90000)}`
  const captureRef = useRef<HTMLDivElement>(null)

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Spark particles */}
      {SPARKS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.size, height: s.size, borderRadius: '50%',
          background: rd.color,
          boxShadow: `0 0 ${s.size * 2}px ${rd.color}`,
          animation: `sparkle ${s.dur} ${s.delay} ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Capture target */}
      <div ref={captureRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="screen-label" style={{ textAlign: 'center' }}>ARTIFACT UNLOCK</div>

        <div style={{ fontSize: 11, color: '#D5F20E', fontWeight: 700, letterSpacing: '0.2em', marginBottom: 12, textAlign: 'center' }}>
          FIRST PROOF ARTIFACT
        </div>

        {/* Glowing artifact card with float */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: `2px solid ${rd.color}`,
          borderRadius: 24, padding: 28, marginBottom: 28,
          boxShadow: `0 0 60px ${rd.color}66, 0 0 120px ${rd.color}22, inset 0 0 40px ${rd.color}08`,
          animation: 'floatSlow 4s ease-in-out infinite',
          position: 'relative',
        }}>
          {/* Shimmer overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 22,
            background: `linear-gradient(135deg, ${rd.color}18, transparent 50%, ${rd.color}08)`,
            pointerEvents: 'none',
          }} />

          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: -6, borderRadius: 28,
            border: `1px solid ${rd.color}33`,
            animation: 'pulse 2.5s ease-in-out infinite',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.15em' }}>BRAYN ARTIFACT</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{artifactId}</div>
            </div>
            <div style={{ fontSize: 28, filter: `drop-shadow(0 0 12px ${rd.color})` }}>📄</div>
          </div>

          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 6 }}>{rd.proof}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>Generated from Career Radar 360</div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'HOLDER', value: userName || 'BRAYNER' },
              { label: 'GOAL', value: goal || 'Career growth' },
              { label: 'COACH', value: rd.coach },
              { label: 'FOCUS', value: rd.focus },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>{row.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{row.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: `${rd.color}22`, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color, animation: 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: 12, color: rd.color, fontWeight: 700 }}>PHASE 1 COMPLETE</div>
          </div>
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <ResultShareBar captureRef={captureRef} filename="brayn-artifact.png" shareTitle="My BRAYN First Artifact 📄" />
        <button className="cta-btn" onClick={() => { setGenesisComplete(true); navigate('/brayn-id-intro') }}>
          SAVE TO MY STASH
        </button>
      </div>
    </div>
  )
}
