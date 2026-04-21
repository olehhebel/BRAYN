import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Micro3() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { proof: 'Role Target Card' }

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">ACTIVATION · 3 OF 3</div>
      <div className="screen-headline">{"WHAT YOU'LL"}<br />BUILD.</div>
      <div style={{ flex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 24, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#D5F20E', marginBottom: 12 }}>YOUR FIRST PROOF ARTIFACT</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>{rd.proof}</div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
            This is what you produce at the end of Phase 1. Not a grade. Not a certificate. A real artifact that reflects your thinking and signals your readiness.
          </div>
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/goodies')}>NEXT</button>
      </div>
    </div>
  )
}
