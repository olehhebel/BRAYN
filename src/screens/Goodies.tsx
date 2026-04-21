import { useNavigate } from 'react-router-dom'

const GOODIES = [
  { icon: '📄', name: 'First Proof', status: 'Unlocks in Phase 1' },
  { icon: '📈', name: 'Progress Chart', status: 'Unlocks after 7 days' },
  { icon: '🗺️', name: 'Skill Map', status: 'Unlocks in Phase 2' },
  { icon: '🤖', name: 'Coach Access', status: 'Unlocks with MINUTES' },
]

export default function Goodies() {
  const navigate = useNavigate()
  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">YOUR STASH</div>
      <div className="screen-headline">YOUR GOODIES<br />STASH.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: 1 }}>
        {GOODIES.map(g => (
          <div key={g.name} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '20px 16px',
            border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 36 }}>{g.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{g.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{g.status}</div>
          </div>
        ))}
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/start-card')}>UNLOCK AS YOU GROW</button>
      </div>
    </div>
  )
}
