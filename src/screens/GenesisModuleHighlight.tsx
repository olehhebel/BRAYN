import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisModuleHighlight() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route', proof: 'Role Target Card' }

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">FIRST NANOFRAMEWORK</div>
      <div className="screen-headline">CAREER<br />RADAR 360</div>
      <div className="screen-sub">Your recommended first action. No other choices — just this.</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${rd.color}20, rgba(255,255,255,0.04))`,
          borderRadius: 20, padding: 24,
          border: `2px solid ${rd.color}`,
          boxShadow: `0 0 40px ${rd.color}22`,
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Career Radar 360</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16 }}>
            Map where you actually stand today. Identify your strongest signal. Get your first proof artifact.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Scan your current position', 'Identify your strongest asset', 'Produce your first output'].map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: rd.color, color: '#151515',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ fontSize: 12, color: rd.color, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>FIRST PROOF ARTIFACT</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{rd.proof}</div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-confirm')}>{"I'M IN"}</button>
      </div>
    </div>
  )
}
