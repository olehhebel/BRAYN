import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const CHIPS = [
  "It's been on my mind for months",
  'A specific moment triggered this',
  'I feel time pressure',
  'Someone close to me believes in this',
  "I can't keep delaying",
  'I want to prove something to myself',
]

export default function CalibrationGoalImportance() {
  const navigate = useNavigate()
  const { routeData, goal, setGoalImportanceReason } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">CALIBRATION · 1 OF 5</div>
      <div style={{
        background: `${rd.color}15`, borderRadius: 16, padding: '14px 18px',
        border: `1px solid ${rd.color}30`, marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
          Why does "{goal || 'your goal'}" matter to you right now?
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {CHIPS.map(c => (
          <button key={c} className={`option-pill${selected === c ? ' selected' : ''}`} onClick={() => setSelected(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={() => { setGoalImportanceReason(selected); navigate('/calibration-avatar') }}>
          {"THAT'S WHY"}
        </button>
      </div>
    </div>
  )
}
