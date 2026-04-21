import { useNavigate } from 'react-router-dom'

export default function Notifications() {
  const navigate = useNavigate()
  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 72, animation: 'glow 2s ease-in-out infinite', marginBottom: 24 }}>🔔</div>
      <div className="screen-headline">STAY ON<br />YOUR PATH</div>
      <div className="screen-sub">
        Daily nudges keep your momentum alive. Never lose track of your growth.
      </div>
      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/cooking')}>ALLOW NOTIFICATIONS</button>
        <button className="secondary-btn" onClick={() => navigate('/cooking')}>Not now</button>
      </div>
    </div>
  )
}
