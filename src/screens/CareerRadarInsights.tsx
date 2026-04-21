import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CareerRadarInsights() {
  const navigate = useNavigate()
  const { routeData, goal, mainBlocker } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route', proof: 'Role Target Card', primaryBranch: 'Career Strategy & Workforce Readiness' }
  const [current, setCurrent] = useState(0)

  const insights = [
    {
      id: 'I-01', title: 'Your Strongest Signal',
      body: `Your goal — "${goal || 'career growth'}" — carries strong momentum. BRAYN reads this as a high-readiness path. You're not starting from zero.`,
      icon: '📡',
    },
    {
      id: 'I-02', title: 'Your Core Blocker',
      body: `Your identified blocker: "${mainBlocker || 'moving forward'}". This is the single pattern we'll address first. Named blockers are 3x easier to overcome.`,
      icon: '🔍',
    },
    {
      id: 'I-03', title: 'Route Fit Score',
      body: `${rd.primaryBranch} is your primary room. Your path shows strong alignment here. ${rd.coach} is calibrated to your specific focus and support style.`,
      icon: '🎯',
    },
    {
      id: 'I-04', title: 'First Action Priority',
      body: `Focus: "${rd.focus}". One thing at a time. Every session in BRAYN returns to this priority until it's proven and ready to upgrade.`,
      icon: '⚡',
    },
    {
      id: 'I-05', title: 'Your First Proof',
      body: `Your first artifact: ${rd.proof}. This isn't just a completion badge — it's a real output that signals your readiness to move to the next phase.`,
      icon: '📄',
    },
  ]

  const insight = insights[current]

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">CAREER RADAR 360 · INSIGHTS</div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {insights.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            height: 4, flex: 1, borderRadius: 4, cursor: 'pointer',
            background: i === current ? rd.color : 'rgba(255,255,255,0.15)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{
        flex: 1, background: `linear-gradient(135deg, ${rd.color}18, rgba(255,255,255,0.03))`,
        borderRadius: 20, padding: 24,
        border: `1.5px solid ${rd.color}44`,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 16 }}>
          {insight.id} · {rd.coach?.toUpperCase()}
        </div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{insight.icon}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 14 }}>{insight.title}</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{insight.body}</div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        {current > 0 && (
          <button className="secondary-btn" style={{ flex: 1 }} onClick={() => setCurrent(c => c - 1)}>
            {'← Previous'}
          </button>
        )}
        <button className="cta-btn" style={{ flex: 2 }} onClick={() => {
          if (current < insights.length - 1) setCurrent(c => c + 1)
          else navigate('/genesis-coach-completion')
        }}>
          {current < insights.length - 1 ? 'NEXT →' : 'COMPLETE'}
        </button>
      </div>
    </div>
  )
}
