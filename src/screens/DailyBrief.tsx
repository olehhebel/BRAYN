import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function DailyBrief() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  const briefMessages: Record<string, string> = {
    'Kayra': `"Today we're building on your Career Radar results. One question. One honest answer. That's enough to move the needle."`,
    'Orra': `"I want you to think about how you show up in conversations today. Not what you say — how you make people feel when you speak."`,
    'Maverick': `"Your idea doesn't need to be perfect. It needs to be real. Today we're making it real."`,
  }
  const message = briefMessages[rd.coach || 'Kayra'] || briefMessages['Kayra']

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">DAILY BRIEF</div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, marginTop: 8 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `2px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 12,
          boxShadow: `0 0 40px ${rd.color}44`,
          animation: 'pulse 2.5s ease-in-out infinite',
        }}>{coachEmoji}</div>
        <div style={{ fontWeight: 800, fontSize: 18, color: rd.color }}>{rd.coach}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>YOUR BRAYN COACH</div>
      </div>

      <div style={{
        background: `${rd.color}12`, borderRadius: 20, padding: 24,
        border: `1px solid ${rd.color}33`, flex: 1,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ fontSize: 16, lineHeight: 1.75, color: '#fff', flex: 1 }}>
          {message}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: `${rd.color}cc` }}>
          — {rd.coach},{' '}
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div style={{
        marginTop: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 16px',
        border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontSize: 18 }}>🎯</div>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>TODAY'S FOCUS</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{rd.focus}</div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/session-focus')}>LET'S GO</button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>NOT NOW</button>
      </div>
    </div>
  )
}
