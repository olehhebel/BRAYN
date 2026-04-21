import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisStartConfirm() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }

  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${rd.color}55, ${rd.color}11)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, marginBottom: 28,
        boxShadow: `0 0 60px ${rd.color}55`,
        animation: 'pulse 2s ease-in-out infinite',
      }}>⚡</div>

      <div className="screen-headline" style={{ fontSize: 28 }}>
        {userName ? `${userName},` : ''}<br />
        THIS IS YOUR<br />FIRST REAL STEP.
      </div>
      <div className="screen-sub">
        Career Radar 360 with {rd.coach}. Focus: {rd.focus}.
        <br />About 10 minutes. One artifact at the end.
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/genesis-live')}>
          START CAREER RADAR 360
        </button>
      </div>
    </div>
  )
}
