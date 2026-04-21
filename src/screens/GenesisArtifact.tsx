import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisArtifact() {
  const navigate = useNavigate()
  const { routeData, userName, goal, setGenesisComplete } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', proof: 'Role Target Card', focus: 'Clarifying your next best route' }
  const artifactId = `BRN-${Math.floor(10000 + Math.random() * 90000)}`

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="screen-label" style={{ textAlign: 'center' }}>ARTIFACT UNLOCK</div>

      <div style={{ fontSize: 11, color: '#D5F20E', fontWeight: 700, letterSpacing: '0.2em', marginBottom: 12, textAlign: 'center' }}>
        FIRST PROOF ARTIFACT
      </div>

      <div style={{
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: `2px solid ${rd.color}`,
        borderRadius: 24, padding: 28, marginBottom: 28,
        boxShadow: `0 0 60px ${rd.color}44, 0 0 120px ${rd.color}22`,
        animation: 'glow 2.5s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.15em' }}>BRAYN ARTIFACT</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{artifactId}</div>
          </div>
          <div style={{ fontSize: 24 }}>📄</div>
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
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color }} />
          <div style={{ fontSize: 12, color: rd.color, fontWeight: 700 }}>PHASE 1 COMPLETE</div>
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => { setGenesisComplete(true); navigate('/') }}>
          SAVE TO MY STASH
        </button>
      </div>
    </div>
  )
}
