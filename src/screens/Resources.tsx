import { useNavigate } from 'react-router-dom'

const RESOURCES = [
  { icon: '⚡', name: 'NEURONS', desc: 'Fuel your daily actions & growth' },
  { icon: '��', name: 'MINUTES', desc: 'Power live coaching with BRAYN AI' },
  { icon: '🧬', name: 'AXONS', desc: 'Unlock advanced learning' },
  { icon: '✨', name: 'BRAYNBITS', desc: 'Track your experience' },
]

export default function Resources() {
  const navigate = useNavigate()
  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label">RESOURCES</div>
      <div className="screen-headline" style={{ fontSize: 22 }}>YOUR PROGRESS RUNS ON FOUR RESOURCES</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {RESOURCES.map(r => (
          <div key={r.name} style={{
            background: 'rgba(255,255,255,0.07)', borderRadius: 16,
            padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontSize: 32 }}>{r.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '0.1em', color: '#D5F20E' }}>{r.name}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/trophy')}>GOT IT</button>
      </div>
    </div>
  )
}
