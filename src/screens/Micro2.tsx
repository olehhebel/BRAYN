import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Micro2() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">ACTIVATION · 2 OF 3</div>
      <div className="screen-headline">YOUR FIRST<br />BOOST PREVIEW.</div>
      <div style={{ flex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 24, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#D5F20E', marginBottom: 12 }}>BOOST EXERCISE</div>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: '#fff' }}>
            In 2 minutes: Write one sentence that describes where you want to be in 90 days. No pressure — just the clearest version of your goal you can say right now.
          </div>
          <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Focus: {rd.focus}</div>
          </div>
        </div>
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/micro3')}>NEXT</button>
      </div>
    </div>
  )
}
