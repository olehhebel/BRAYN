import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultShareBar from '../components/ResultShareBar'

export default function GenesisReward() {
  const navigate = useNavigate()
  const captureRef = useRef<HTMLDivElement>(null)

  const rewards = [
    { icon: '⚡', amount: '+50', name: 'NEURONS', desc: 'Route calibration bonus' },
    { icon: '🕐', amount: '+10', name: 'MINUTES', desc: 'First Genesis session' },
    { icon: '✨', amount: '+120', name: 'BRAYNBITS', desc: 'Career Radar 360 XP' },
  ]

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      {/* Capture target */}
      <div ref={captureRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ fontSize: 72, animation: 'glow 2s ease-in-out infinite', marginBottom: 8 }}>🏅</div>
        <div className="screen-headline" style={{ fontSize: 26, marginBottom: 8 }}>REWARD<br />PAYOUT</div>
        <div className="screen-sub" style={{ marginBottom: 28 }}>First Genesis session complete. Resources credited.</div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <ResultShareBar captureRef={captureRef} filename="brayn-reward-payout.png" shareTitle="My BRAYN Reward Payout 🏅" />
        <button className="cta-btn" onClick={() => navigate('/genesis-artifact')}>
          UNLOCK YOUR ARTIFACT
        </button>
      </div>
    </div>
  )
}
