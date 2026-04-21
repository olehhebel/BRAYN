import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const OPTIONS = [
  'Too many options',
  'Low confidence',
  "I don't know what skill matters first",
  'I overthink and delay action',
  'I struggle in real conversations',
  'I need something practical',
  "I don't feel real progress yet",
  'Other',
]

export default function CalibrationBlocker() {
  const navigate = useNavigate()
  const { routeData, setMainBlocker } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">CALIBRATION · 3 OF 6</div>
      <div style={{
        background: `${rd.color}15`, borderRadius: 16, padding: '14px 18px',
        border: `1px solid ${rd.color}30`, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
          {"What's been your main blocker so far?"}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>
        {OPTIONS.map(o => (
          <button key={o} className={`option-pill${selected === o ? ' selected' : ''}`} onClick={() => setSelected(o)}>
            {o}
          </button>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={() => { setMainBlocker(selected); navigate('/calibration-support') }}>
          {"THAT'S IT"}
        </button>
      </div>
    </div>
  )
}
