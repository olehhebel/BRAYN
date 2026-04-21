import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const OPTIONS = [
  'A simple plan',
  'More confidence',
  'Practical steps',
  'Clear priorities',
  'Accountability',
  'Reminders',
  'Other',
]

export default function CalibrationSupport() {
  const navigate = useNavigate()
  const { routeData, setPreferredSupportMode } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">CALIBRATION · 4 OF 6</div>
      <div style={{
        background: `${rd.color}15`, borderRadius: 16, padding: '14px 18px',
        border: `1px solid ${rd.color}30`, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
          What kind of support would help you move forward?
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {OPTIONS.map(o => (
          <button key={o} className={`option-pill${selected === o ? ' selected' : ''}`} onClick={() => setSelected(o)}>
            {o}
          </button>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={() => { setPreferredSupportMode(selected); navigate('/calibration-future') }}>
          THIS HELPS
        </button>
      </div>
    </div>
  )
}
