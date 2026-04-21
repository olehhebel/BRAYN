import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function YourWay() {
  const navigate = useNavigate()
  const { goal, routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Thinking, Decisions & Cognitive Agility', focus: 'Clarifying your next best route', proof: 'Role Target Card' }

  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'
  const SENZOR_COLOR = '#FF1296'

  return (
    <div className="screen screen-onboarding fade-in" style={{ overflowY: 'auto' }}>
      <div className="screen-label">YOUR WAY</div>
      <div className="screen-headline" style={{ color: rd.color }}>{goal || 'Your Path'}</div>

      {/* Coach Visuals */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {/* Primary Coach: Kayra (or route coach) */}
        <div style={{
          flex: 1, background: `${rd.color}18`, border: `1.5px solid ${rd.color}`,
          borderRadius: 18, padding: '14px 16px',
          boxShadow: `0 0 24px ${rd.color}33`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `radial-gradient(circle, ${rd.color}55, ${rd.color}11)`,
            border: `2px solid ${rd.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, animation: 'pulse 3s ease-in-out infinite',
            boxShadow: `0 0 20px ${rd.color}55`,
          }}>{coachEmoji}</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: rd.color, letterSpacing: '0.08em' }}>KAYRA</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: '0.1em' }}>PRIMARY COACH</div>
          </div>
        </div>

        {/* Secondary Coach: Senzor */}
        <div style={{
          flex: 1, background: `${SENZOR_COLOR}14`, border: `1.5px solid ${SENZOR_COLOR}66`,
          borderRadius: 18, padding: '14px 16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `radial-gradient(circle, ${SENZOR_COLOR}44, ${SENZOR_COLOR}11)`,
            border: `1.5px solid ${SENZOR_COLOR}88`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, opacity: 0.85,
          }}>🔬</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: SENZOR_COLOR, letterSpacing: '0.08em' }}>SENZOR</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: '0.1em' }}>SUPPORT COACH</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
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
