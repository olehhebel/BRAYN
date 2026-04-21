import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function AIEntryTeaser() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  const messages = [
    { from: 'coach', text: `${userName ? userName + ', your' : 'Your'} first radar is done. Now I want to take you deeper — into a live session where we actually work on your move.` },
    { from: 'user', text: "What does that look like?" },
    { from: 'coach', text: `A real conversation. I ask. You respond. We build something real together — not a quiz, not a template. Live career coaching, on demand.` },
  ]

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">AI COACHING · PREVIEW</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `1.5px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{coachEmoji}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: rd.color }}>{rd.coach}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>BRAYN AI Coach · Live</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00DA30', animation: 'pulse 1.5s infinite' }} />
          <div style={{ fontSize: 11, color: '#00DA30', fontWeight: 700 }}>LIVE</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
          }}>
            {msg.from === 'coach' && (
              <div style={{ fontSize: 20, marginRight: 8, alignSelf: 'flex-end' }}>{coachEmoji}</div>
            )}
            <div style={{
              maxWidth: '80%',
              background: msg.from === 'coach'
                ? `${rd.color}18`
                : 'rgba(255,255,255,0.08)',
              border: msg.from === 'coach'
                ? `1px solid ${rd.color}33`
                : '1px solid rgba(255,255,255,0.12)',
              borderRadius: msg.from === 'coach' ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
              padding: '12px 16px',
              fontSize: 14, lineHeight: 1.6,
              color: '#fff',
            }}>{msg.text}</div>
          </div>
        ))}

        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: 14,
          padding: '14px 16px', marginTop: 8,
          border: '1px dashed rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 18, opacity: 0.4 }}>🔒</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Unlock BRAYN AI to start your live coaching session
          </div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/unlock-ai')}>
          UNLOCK BRAYN AI
        </button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          Not now
        </button>
      </div>
    </div>
  )
}
