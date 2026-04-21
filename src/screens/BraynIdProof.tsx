import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function BraynIdProof() {
  const navigate = useNavigate()
  const { routeData, userName, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', proof: 'Role Target Card', primaryBranch: 'Career Strategy & Workforce Readiness' }
  const idNumber = `BRAYN-${Math.floor(10000 + Math.random() * 90000)}`

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="screen-label" style={{ textAlign: 'center' }}>YOUR BRAYN ID</div>

      <div style={{
        width: '100%', borderRadius: 28,
        background: 'rgba(255,255,255,0.06)',
        border: `2px solid ${rd.color}`,
        padding: 28, marginBottom: 24,
        boxShadow: `0 0 80px ${rd.color}44, 0 0 160px ${rd.color}18`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.2em', color: rd.color }}>BRAYN</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.1em' }}>IDENTITY CARD</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `${rd.color}22`, border: `1px solid ${rd.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🪪</div>
        </div>

        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{userName || 'BRAYNER'}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 24, letterSpacing: '0.1em' }}>{idNumber}</div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'GOAL', value: goal || 'Find my direction' },
            { label: 'PRIMARY COACH', value: rd.coach },
            { label: 'BRANCH', value: rd.primaryBranch },
            { label: 'FIRST ARTIFACT', value: rd.proof },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', flexShrink: 0, paddingTop: 2 }}>{row.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textAlign: 'right' }}>{row.value}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20, background: `${rd.color}18`, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color, animation: 'pulse 1.5s infinite' }} />
          <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.1em' }}>GENESIS COMPLETE · PHASE 1</div>
        </div>
      </div>

      <div className="screen-sub" style={{ textAlign: 'center', margin: '0 0 4px' }}>
        This is your permanent proof of progress. It grows with you.
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/ai-entry-teaser')}>
          {"SEE WHAT'S NEXT"}
        </button>
      </div>
    </div>
  )
}
