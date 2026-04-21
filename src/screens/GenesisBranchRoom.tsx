import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisBranchRoom() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', focus: 'Clarifying your next best route', proof: 'Role Target Card' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">BRANCH ROOM · {rd.coach?.toUpperCase()}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `1.5px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, flexShrink: 0,
          boxShadow: `0 0 30px ${rd.color}44`,
        }}>{coachEmoji}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: rd.color }}>{rd.coach}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{rd.primaryBranch}</div>
        </div>
      </div>

      <div className="screen-headline" style={{ fontSize: 24 }}>YOUR FIRST<br />MODULE IS READY.</div>

      <div style={{
        background: `${rd.color}12`, borderRadius: 20, padding: 22,
        border: `1.5px solid ${rd.color}44`, marginTop: 16, flex: 1,
      }}>
        <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 10 }}>NANOFRAMEWORK · PHASE 1</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Career Radar 360</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
          A structured self-scan that reveals your strongest position today and where your momentum naturally wants to go.
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['~10 min', 'Self-reflection', 'First artifact'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: 100,
              padding: '4px 12px', fontSize: 12, color: 'rgba(255,255,255,0.6)',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-module')}>START</button>
      </div>
    </div>
  )
}
