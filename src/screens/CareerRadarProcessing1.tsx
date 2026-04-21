import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MESSAGES = [
  'Scanning your career signals...',
  'Mapping skill strength vectors...',
  'Analyzing path momentum...',
  'Calibrating route dimensions...',
]

export default function CareerRadarProcessing1() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/career-radar-processing-2'), 3500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        COSMIC ANALYSIS
      </div>

      <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 36 }}>
        {[1, 0.7, 0.45].map((scale, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: `${scale * 100}%`, height: `${scale * 100}%`,
            borderRadius: '50%', border: `1px solid rgba(255,255,255,${0.3 - i * 0.08})`,
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '50%', height: 2,
          background: 'linear-gradient(90deg, #D5F20E, transparent)',
          transformOrigin: '0 50%',
          animation: 'spin 1.5s linear infinite',
        }} />
      </div>

      {MESSAGES.map((msg, i) => (
        <div key={msg} style={{
          fontSize: 13, color: `rgba(255,255,255,${0.3 + i * 0.15})`,
          marginBottom: 8,
          animation: `fadeIn ${0.5 + i * 0.4}s ease forwards`,
        }}>{msg}</div>
      ))}
    </div>
  )
}
