import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function FirstTask() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const color = routeData?.color || '#00DA30'

  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}99, ${color}22)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, marginBottom: 32,
        boxShadow: `0 0 60px ${color}66`,
        animation: 'pulse 2s ease-in-out infinite',
      }}>⚡</div>
      <div className="screen-headline">YOUR FIRST<br />BOOST IS LIVE.</div>
      <div className="screen-sub">Your path is set. Time to start your first Boost.</div>
      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/micro1')}>START MY FIRST BOOST</button>
      </div>
    </div>
  )
}
