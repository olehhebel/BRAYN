import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CalibrationCoachIntro() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }

  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">YOUR COACH</div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `2px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 56, marginBottom: 16,
          boxShadow: `0 0 60px ${rd.color}44`,
          animation: 'pulse 3s ease-in-out infinite',
        }}>{coachEmoji}</div>
        <div style={{ fontWeight: 800, fontSize: 24, color: rd.color }}>{rd.coach}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>BRAYN AI Coach · Route Active</div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20,
        border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: rd.color,
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: rd.color }}>ASSISTANT ACTIVE</div>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.6, color: '#fff' }}>
          "{userName ? userName + ',' : ''} I have seen your path. I know why you chose it. Now I need to understand a little more about you — so I can make this route actually work for you."
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', background: `${rd.color}22`,
          border: `1.5px solid ${rd.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>🎙️</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Tap to respond · Tap again to stop</div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/calibration-goal')}>
          {"LET'S DO THIS"}
        </button>
      </div>
    </div>
  )
}
