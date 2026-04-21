import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function AICoachHome() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'
  const [isListening, setIsListening] = useState(false)
  const [textInput, setTextInput] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">BRAYN AI · COACH HOME</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
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

      {/* Voice input — primary, large prominent area */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>VOICE INPUT</div>
        <button
          onClick={() => setIsListening(l => !l)}
          style={{
            width: '100%', borderRadius: 18,
            background: isListening ? 'rgba(254,99,5,0.15)' : `${rd.color}18`,
            border: isListening ? '2px solid #FE6305' : `2px solid ${rd.color}55`,
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: isListening ? '#FE630533' : `${rd.color}22`,
            border: isListening ? '2px solid #FE6305' : `1.5px solid ${rd.color}66`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
            boxShadow: isListening ? '0 0 30px #FE630555' : `0 0 20px ${rd.color}33`,
            animation: isListening ? 'pulse 1s ease-in-out infinite' : 'none',
          }}>🎙️</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: isListening ? '#FE6305' : '#fff', letterSpacing: '0.06em' }}>
              {isListening ? '⏹ STOP LISTENING' : 'START VOICE SESSION'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
              {isListening ? 'Tap to stop · Recording...' : 'Talk to your coach live'}
            </div>
          </div>
        </button>
      </div>

      {/* Text input — distinct secondary area */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>TEXT INPUT</div>
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'flex-end', gap: 10,
        }}>
          <textarea
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder={`Message ${rd.coach}...`}
            rows={2}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, resize: 'none', lineHeight: 1.5,
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => setTextInput('')}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: textInput.trim() ? rd.color : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
              color: textInput.trim() ? '#151515' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}
          >›</button>
        </div>
      </div>

      <div className="cta-area" style={{ paddingTop: 16, gap: 10 }}>
        <button
          className="secondary-btn"
          style={{ borderColor: '#D5F20E55', color: '#D5F20E', fontSize: 13 }}
          onClick={() => navigate('/galaxy-all')}
        >
          🌌 EXIT TO GALAXY
        </button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          BACK TO HOME
        </button>
      </div>
    </div>
  )
}
