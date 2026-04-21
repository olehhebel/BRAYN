import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function YourWay() {
  const navigate = useNavigate()
  const { goal, routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Thinking, Decisions & Cognitive Agility', focus: 'Clarifying your next best route', proof: 'Role Target Card' }

  return (
    <div className="screen screen-onboarding fade-in" style={{ overflowY: 'auto' }}>
      <div className="screen-label">YOUR WAY</div>
      <div className="screen-headline" style={{ color: rd.color }}>{goal || 'Your Path'}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px', border: `1px solid ${rd.color}40` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: rd.color, marginBottom: 4 }}>PRIMARY COACH</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{rd.coach}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>PRIMARY BRANCH</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{rd.primaryBranch}</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>SUPPORT BRANCH</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{rd.supportBranch}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>CURRENT GROWTH PRIORITY</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{rd.focus}</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: `${rd.color}20`, borderRadius: 14, padding: '14px 16px', border: `1px solid ${rd.color}40` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: rd.color }}>PHASE 1</div>
            <div style={{ fontSize: 14, marginTop: 6, color: '#fff', fontWeight: 600 }}>Build your foundation</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>PHASE 2</div>
            <div style={{ fontSize: 14, marginTop: 6, color: '#fff', fontWeight: 600 }}>Apply and grow</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#D5F20E', marginBottom: 4 }}>FIRST PROOF DIRECTION</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{rd.proof}</div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/why-path')}>CONTINUE</button>
      </div>
    </div>
  )
}
