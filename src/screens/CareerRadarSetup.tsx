import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const DOMAINS = ['Technology', 'Marketing', 'Finance', 'Operations', 'Sales', 'Creative', 'Healthcare', 'Education', 'Other']
const EXPERIENCE_LEVELS = ['0–1 year', '2–3 years', '4–6 years', '7–10 years', '10+ years']

export default function CareerRadarSetup() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [domain, setDomain] = useState('')
  const [experience, setExperience] = useState('')

  return (
    <div className="screen screen-dark fade-in" style={{ overflowY: 'auto' }}>
      <div className="screen-label">CAREER RADAR 360 · SETUP</div>
      <div className="screen-headline" style={{ fontSize: 24 }}>TWO QUICK<br />INPUTS.</div>
      <div className="screen-sub">This calibrates the radar to your actual field.</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: rd.color, letterSpacing: '0.1em', marginBottom: 10 }}>YOUR DOMAIN</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setDomain(d)} style={{
                background: domain === d ? rd.color : 'rgba(255,255,255,0.07)',
                color: domain === d ? '#151515' : '#fff',
                border: `1.5px solid ${domain === d ? rd.color : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 100, padding: '8px 16px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{d}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: rd.color, letterSpacing: '0.1em', marginBottom: 10 }}>YEARS OF EXPERIENCE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EXPERIENCE_LEVELS.map(e => (
              <button key={e} className={`option-pill${experience === e ? ' selected' : ''}`} onClick={() => setExperience(e)}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={!domain || !experience} onClick={() => navigate('/career-radar-processing-1')}>
          RUN CAREER RADAR
        </button>
      </div>
    </div>
  )
}
