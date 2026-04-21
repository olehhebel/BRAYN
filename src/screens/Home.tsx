import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Home() {
  const navigate = useNavigate()
  const { userName, routeData, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route', primaryBranch: 'Career Strategy & Workforce Readiness' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  const stats = [
    { label: 'NEURONS', value: '50', icon: '⚡' },
    { label: 'MINUTES', value: '10', icon: '🕐' },
    { label: 'BRAYNBITS', value: '120', icon: '✨' },
  ]

  return (
    <div className="screen screen-dark fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.15em' }}>WELCOME BACK</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginTop: 2 }}>{userName || 'BRAYNER'}</div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
          border: `1.5px solid ${rd.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>{coachEmoji}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            borderRadius: 12, padding: '10px 8px', textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#D5F20E', marginTop: 2 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${rd.color}18, rgba(255,255,255,0.03))`,
        borderRadius: 20, padding: 22,
        border: `1.5px solid ${rd.color}44`,
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color, animation: 'pulse 1.5s infinite' }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: rd.color }}>TODAY'S SESSION</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{rd.focus}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>With {rd.coach} · ~5 min</div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '14px 16px',
        border: '1px solid rgba(255,255,255,0.08)', marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 24 }}>🎯</div>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>GOAL</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{goal || 'Find my direction'}</div>
        </div>
      </div>

      <div onClick={() => navigate('/stash')} style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '14px 16px',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 24 }}>📦</div>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em' }}>YOUR STASH</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>1 Artifact Unlocked</div>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20 }}>›</div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/daily-brief')}>
          START TODAY'S SESSION
        </button>
      </div>
    </div>
  )
}
