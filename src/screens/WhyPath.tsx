import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function WhyPath() {
  const navigate = useNavigate()
  const { routeData, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }

  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label">WHY THIS PATH</div>
      <div className="screen-headline">YOUR PATH<br />WAS CHOSEN<br />WITH REASON.</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px' }}>
          <div style={{ color: rd.color, fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', marginBottom: 8 }}>{rd.coach?.toUpperCase()} SAYS</div>
          <div style={{ fontSize: 16, color: '#fff', lineHeight: 1.6 }}>
            "{goal}" is a signal — not just a preference. It tells us where your real momentum wants to go. This path is designed to move you faster with fewer detours.
          </div>
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
          Your focus: <span style={{ color: '#fff', fontWeight: 600 }}>{rd.focus}</span>. Every Boost, every proof, and every session is built around this.
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/first-task')}>{"I'M READY"}</button>
      </div>
    </div>
  )
}
