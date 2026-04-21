import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Micro1() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">ACTIVATION · 1 OF 3</div>
      <div className="screen-headline">{"HERE'S A TASTE"}<br />OF BRAYN.</div>
      <div style={{ flex: 1 }}>
        <div style={{
          background: `linear-gradient(135deg, ${rd.color}20, rgba(255,255,255,0.05))`,
          borderRadius: 20, padding: 24, border: `1px solid ${rd.color}40`, marginTop: 8
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: rd.color, marginBottom: 12 }}>INSIGHT FROM {rd.coach?.toUpperCase()}</div>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: '#fff' }}>
            Most people stall not because they lack ability — but because they lack a clear next step. BRAYN does not give you a course. It gives you a route.
          </div>
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/micro2')}>NEXT</button>
      </div>
    </div>
  )
}
