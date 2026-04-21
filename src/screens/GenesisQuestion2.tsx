import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisQuestion2() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [val, setVal] = useState('')

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">PERSONAL INPUT · 2 OF 2</div>

      <div style={{
        background: `${rd.color}12`, borderRadius: 16, padding: '16px 20px',
        border: `1px solid ${rd.color}30`, marginBottom: 24,
      }}>
        <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>{rd.coach?.toUpperCase()}</div>
        <div style={{ fontSize: 16, color: '#fff', lineHeight: 1.6, fontWeight: 500 }}>
          {"What's the one thing you most want to change about your career situation right now?"}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <textarea
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Type your answer..."
          rows={5}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.06)',
            border: `1.5px solid ${val.length > 5 ? rd.color : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 14, padding: '16px 18px',
            fontSize: 15, color: '#fff', resize: 'none',
            outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8, textAlign: 'right' }}>
          {val.length} characters
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={val.trim().length < 5} onClick={() => navigate('/genesis-tool-transition')}>
          SUBMIT TO RADAR
        </button>
        <button className="secondary-btn" onClick={() => navigate('/genesis-tool-transition')}>Skip</button>
      </div>
    </div>
  )
}
