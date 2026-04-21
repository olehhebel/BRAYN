import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CareerRadarHero() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness' }

  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 32 }}>
        {[1, 0.7, 0.45, 0.2].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${scale * 100}%`, height: `${scale * 100}%`,
            borderRadius: '50%', border: `1px solid ${rd.color}${i === 0 ? '60' : '25'}`,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '50%', height: 1,
          background: `linear-gradient(90deg, ${rd.color}, transparent)`,
          transformOrigin: '0 50%',
          animation: 'spin 3s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: rd.color,
        }}>360</div>
      </div>

      <div className="screen-headline" style={{ fontSize: 30, textAlign: 'center' }}>CAREER<br />RADAR 360</div>
      <div className="screen-sub" style={{ textAlign: 'center' }}>
        Your first premium BRAYN tool. A full career position scan — personalized to your path.
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/career-radar-setup')}>
          LAUNCH RADAR
        </button>
      </div>
    </div>
  )
}
