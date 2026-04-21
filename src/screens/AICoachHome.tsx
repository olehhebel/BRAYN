import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function AICoachHome() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'
  const [isListening, setIsListening] = useState(false)

  const sessionModes = [
    { icon: '🎙️', label: 'VOICE SESSION', desc: 'Talk to your coach live', active: true },
    { icon: '💬', label: 'TEXT SESSION', desc: 'Type your responses', active: true },
    { icon: '🧭', label: 'GUIDED BOOST', desc: 'Structured 5-min focus', active: true },
  ]

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">BRAYN AI · COACH HOME</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `2px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, flexShrink: 0,
          boxShadow: `0 0 40px ${rd.color}44`,
          animation: 'pulse 3s ease-in-out infinite',
        }}>{coachEmoji}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: rd.color }}>{rd.coach}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>BRAYN AI Coach · Ready</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00DA30', animation: 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: 11, color: '#00DA30', fontWeight: 700 }}>ONLINE</div>
          </div>
        </div>
      </div>

      <div style={{
        background: `${rd.color}12`, borderRadius: 18, padding: '16px 20px',
        border: `1px solid ${rd.color}33`, marginBottom: 20,
      }}>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: '#fff' }}>
          {`"${userName ? userName + ', I' : 'I'}'m ready when you are. What do you want to work on today? Your focus is ${rd.focus} — let's go there."`}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: `${rd.color}aa` }}>— {rd.coach}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {sessionModes.map(mode => (
          <div key={mode.label} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          }} onClick={() => setIsListening(!isListening)}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{mode.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#fff' }}>{mode.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{mode.desc}</div>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: `${rd.color}22`, border: `1px solid ${rd.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>›</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          className="cta-btn"
          onClick={() => setIsListening(l => !l)}
          style={{ background: isListening ? '#FE6305' : '#D5F20E' }}
        >
          {isListening ? '⏹ STOP SESSION' : '🎙️ START VOICE SESSION'}
        </button>
      </div>

      <div className="cta-area" style={{ paddingTop: 12 }}>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          BACK TO HOME
        </button>
      </div>
    </div>
  )
}
