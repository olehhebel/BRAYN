import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const OPTIONS = [
  'I have a clear idea of my direction',
  'I have a rough idea but no clear plan',
  "I'm exploring and nothing is fixed yet",
  'I feel stuck and need a reset',
]

export default function GenesisQuestion1() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">GUIDED QUESTION · 1 OF 2</div>

      <div style={{
        background: `${rd.color}12`, borderRadius: 16, padding: '16px 20px',
        border: `1px solid ${rd.color}30`, marginBottom: 24,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 16, color: '#fff', lineHeight: 1.6, fontWeight: 500 }}>
          How would you describe your current career clarity?
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
        <button className="cta-btn" disabled={!selected} onClick={() => navigate('/genesis-q2')}>
          NEXT
        </button>
      </div>
    </div>
  )
}
