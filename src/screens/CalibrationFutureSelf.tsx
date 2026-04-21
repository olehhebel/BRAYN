import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const IDENTITY_CUES = [
  'Someone others turn to for advice',
  'A confident decision-maker',
  'A person who acts before overthinking',
  'A leader with real impact',
  'Someone who built something that matters',
  'A person who never stopped growing',
]

export default function CalibrationFutureSelf() {
  const navigate = useNavigate()
  const { routeData, setFutureSelfIdentity } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">CALIBRATION · 5 OF 6</div>
      <div style={{
        background: `${rd.color}15`, borderRadius: 16, padding: '14px 18px',
        border: `1px solid ${rd.color}30`, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
          Who will you become when you reach your goal?
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {IDENTITY_CUES.map(c => (
          <button key={c} className={`option-pill${selected === c ? ' selected' : ''}`} onClick={() => setSelected(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => { setFutureSelfIdentity(selected); navigate('/ai-generating') }}>
          {selected ? "THAT'S WHO I'LL BE" : 'SKIP'}
        </button>
      </div>
    </div>
  )
}
