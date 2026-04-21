import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const PLANS = [
  {
    id: 'annual',
    label: 'ANNUAL',
    badge: 'BEST VALUE',
    price: '$9.99',
    period: '/month',
    billed: 'Billed $99.99/year',
    highlight: true,
  },
  {
    id: 'monthly',
    label: 'MONTHLY',
    badge: null,
    price: '$14.99',
    period: '/month',
    billed: 'Cancel anytime',
    highlight: false,
  },
]

export default function AIPackageSelect() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [selected, setSelected] = useState('annual')

  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label" style={{ textAlign: 'center' }}>AI PACKAGE</div>
      <div className="screen-headline" style={{ textAlign: 'center', fontSize: 26 }}>CHOOSE YOUR<br />BRAYN AI PLAN</div>
      <div className="screen-sub" style={{ textAlign: 'center', marginBottom: 24 }}>
        Full access to {rd.coach} and all AI coaching tools.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {PLANS.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            style={{
              borderRadius: 20, padding: '20px 22px',
              border: `2px solid ${selected === plan.id ? '#D5F20E' : 'rgba(255,255,255,0.12)'}`,
              background: selected === plan.id ? 'rgba(213,242,14,0.08)' : 'rgba(255,255,255,0.04)',
              cursor: 'pointer', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {plan.badge && (
              <div style={{
                position: 'absolute', top: 12, right: 14,
                background: '#D5F20E', color: '#151515',
                fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
                padding: '3px 8px', borderRadius: 100,
              }}>{plan.badge}</div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: selected === plan.id ? '#D5F20E' : 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              {plan.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{plan.price}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{plan.period}</div>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{plan.billed}</div>
          </div>
        ))}

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '14px 16px', marginTop: 4 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.6 }}>
            7-day free trial included · Cancel anytime · No hidden fees
          </div>
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/ai-coach-home')}>
          START FREE TRIAL
        </button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          Skip
        </button>
      </div>
    </div>
  )
}
