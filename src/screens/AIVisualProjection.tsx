import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function AIVisualProjection() {
  const navigate = useNavigate()
  const { routeData, userName, futureSelfIdentity } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">AI VISUAL · PROJECTION</div>

      <div style={{
        width: '100%', borderRadius: 24, overflow: 'hidden',
        background: `linear-gradient(135deg, ${rd.color}22, rgba(255,255,255,0.03))`,
        border: `1.5px solid ${rd.color}44`,
        padding: 28, marginBottom: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        boxShadow: `0 0 60px ${rd.color}22`,
      }}>
        <div style={{ display: 'flex', gap: 20, marginBottom: 20, alignItems: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
          }}>👤</div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)' }}>+</div>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `${rd.color}33`, border: `2px solid ${rd.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
            boxShadow: `0 0 30px ${rd.color}44`,
          }}>{coachEmoji}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
            {userName ? userName.toUpperCase() : 'YOU'} · {rd.coach?.toUpperCase()}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
            {futureSelfIdentity || 'A person who never stopped growing'}
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '16px 20px',
        border: '1px solid rgba(255,255,255,0.1)', marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>
          PROJECTION
        </div>
        <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
          Your evolved self at the summit. Built with {rd.coach}, powered by BRAYN.
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-galaxy')}>
          START MY BRAYN JOURNEY
        </button>
      </div>
    </div>
  )
}
