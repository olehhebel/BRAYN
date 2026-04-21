import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Stash() {
  const navigate = useNavigate()
  const { routeData, userName, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', proof: 'Role Target Card', focus: 'Clarifying your next best route' }

  const resources = [
    { icon: '⚡', name: 'NEURONS', amount: 170, desc: 'Cognitive fuel · Used to unlock frameworks', color: '#D5F20E' },
    { icon: '🕐', name: 'MINUTES', amount: 45, desc: 'Coach session time · Earned through completions', color: '#00FFFF' },
  ]

  const lockedItems = [
    { icon: '📈', name: 'Progress Chart', unlock: 'Unlocks after 7 days' },
    { icon: '🗺️', name: 'Skill Map', unlock: 'Unlocks in Phase 2' },
    { icon: '🤖', name: 'Full Coach Access', unlock: 'Unlocks with MINUTES' },
  ]

  return (
    <div className="screen screen-dark fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%', width: 36, height: 36,
            color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div className="screen-label" style={{ margin: 0 }}>YOUR STASH</div>
      </div>

      <div className="screen-headline">ARTIFACTS &<br />REWARDS.</div>
      <div className="screen-sub">Everything you've earned through BRAYN.</div>

      {/* Resource Items */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>RESOURCES</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {resources.map(r => (
            <div key={r.name} style={{
              flex: 1, background: `${r.color}10`, borderRadius: 16, padding: '14px 16px',
              border: `1.5px solid ${r.color}44`,
              boxShadow: `0 0 20px ${r.color}18`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: r.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{r.amount}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: r.color, letterSpacing: '0.12em', marginTop: 2 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.4 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Card */}
      <div style={{
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: `2px solid ${rd.color}`,
        borderRadius: 20, padding: 24, marginBottom: 14,
        boxShadow: `0 0 40px ${rd.color}33`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.15em' }}>BRAYN ARTIFACT</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>PHASE 1 · UNLOCKED</div>
          </div>
          <div style={{ fontSize: 22 }}>📄</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{rd.proof}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Generated from Career Radar 360</div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'HOLDER', value: userName || 'BRAYNER' },
            { label: 'GOAL', value: goal || 'Career growth' },
            { label: 'COACH', value: rd.coach },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{row.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{row.value}</div>
            </div>
          ))}
        </div>
      </div>

      {lockedItems.map(item => (
        <div key={item.name} style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '14px 16px',
          border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 10, opacity: 0.5,
        }}>
          <div style={{ fontSize: 28 }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{item.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>🔒 {item.unlock}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
