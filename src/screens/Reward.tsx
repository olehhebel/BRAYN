import { useNavigate } from 'react-router-dom'

export default function Reward() {
  const navigate = useNavigate()
  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>⭐</div>
      <div className="screen-headline" style={{ fontSize: 28 }}>GREAT THINGS<br />HAPPEN WHEN<br />YOU SHOW UP.</div>
      <div className="screen-sub">Consistency beats intensity every time. BRAYN is built to keep you moving forward, one day at a time.</div>
      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/resources')}>{"LET'S GO"}</button>
      </div>
    </div>
  )
}
