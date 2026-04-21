import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function UnlockAI() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  const benefits = [
    { icon: '🎙️', title: 'Live Voice Sessions', desc: `Real-time coaching with ${rd.coach}` },
    { icon: '⚡', title: 'Unlimited MINUTES', desc: 'No session caps. Coach whenever you need.' },
    { icon: '🧬', title: 'AXON Unlocks', desc: 'Access advanced nanoframeworks' },
    { icon: '📊', title: 'Progress Intelligence', desc: 'Track signal strength and momentum' },
    { icon: '🪪', title: 'Living BRAYN ID', desc: 'Your ID evolves as you grow' },
  ]

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">BRAYN AI · ACCESS GATE</div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24, marginTop: 4 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `2px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 12,
          boxShadow: `0 0 60px ${rd.color}55`,
          animation: 'pulse 2.5s ease-in-out infinite',
        }}>{coachEmoji}</div>
        <div style={{ fontWeight: 900, fontSize: 22, color: '#fff' }}>UNLOCK BRAYN AI</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, textAlign: 'center' }}>
          Full access to your coach and all AI tools
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {benefits.map(b => (
          <div key={b.title} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{b.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{b.desc}</div>
            </div>
            <div style={{ marginLeft: 'auto', color: rd.color, fontSize: 16 }}>✓</div>
          </div>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/ai-package')}>
          SEE PLANS
        </button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          Skip for now
        </button>
      </div>
    </div>
  )
}
