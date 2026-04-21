import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function SessionComplete() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }

  const rewards = [
    { icon: '⚡', amount: '+15', name: 'NEURONS', desc: 'Daily session bonus' },
    { icon: '🕐', amount: '+5', name: 'MINUTES', desc: 'Focus time logged' },
    { icon: '✨', amount: '+35', name: 'BRAYNBITS', desc: 'Session XP' },
  ]

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 72, marginBottom: 8 }}>⚡</div>
      <div className="screen-headline" style={{ fontSize: 26, marginBottom: 8 }}>SESSION<br />COMPLETE</div>
      <div className="screen-sub" style={{ marginBottom: 28 }}>You showed up. That's the whole game.</div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {rewards.map(r => (
          <div key={r.name} style={{
            background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontSize: 28 }}>{r.icon}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', color: '#fff' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{r.desc}</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#D5F20E' }}>{r.amount}</div>
          </div>
        ))}
      </div>

      <div style={{
        width: '100%', background: `${rd.color}18`, borderRadius: 14, padding: '14px 18px',
        border: `1px solid ${rd.color}33`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontSize: 20 }}>🔥</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: rd.color }}>STREAK: 1 DAY</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Come back tomorrow to keep it going</div>
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/home')}>BACK TO HOME</button>
      </div>
    </div>
  )
}
