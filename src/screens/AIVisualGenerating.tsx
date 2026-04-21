import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  'Analyzing your route...',
  'Mapping your identity signals...',
  'Calibrating coach memory...',
  'Building your projection...',
  'Finalizing your visual...',
]

export default function AIVisualGenerating() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2
        if (next >= 100) { clearInterval(interval); return 100 }
        return next
      })
      setStep(s => Math.min(s + 0.1, STEPS.length - 1))
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => navigate('/ai-projection'), 600)
      return () => clearTimeout(t)
    }
  }, [progress, navigate])

  const stepIndex = Math.floor(step)

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="screen-label" style={{ textAlign: 'center' }}>AI VISUAL</div>
      <div className="screen-headline" style={{ fontSize: 28 }}>GENERATING<br />YOUR PROJECTION</div>

      <div style={{ width: '100%', margin: '32px 0' }}>
        <div style={{
          width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4,
        }}>
          <div style={{
            width: `${progress}%`, height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #D5F20E, #00DA30)',
            transition: 'width 0.1s linear',
          }} />
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
          {Math.round(progress)}%
        </div>
      </div>

      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', minHeight: 24, transition: 'opacity 0.3s' }}>
        {STEPS[stepIndex]}
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" style={{ opacity: progress < 100 ? 0.3 : 1 }} disabled={progress < 100} onClick={() => navigate('/ai-projection')}>
          GOT IT
        </button>
      </div>
    </div>
  )
}
