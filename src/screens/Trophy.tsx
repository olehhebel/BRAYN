import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const SPARKS = [
  { top: '8%', left: '12%', size: 6, delay: '0s', dur: '2.2s' },
  { top: '14%', left: '78%', size: 8, delay: '0.4s', dur: '2.6s' },
  { top: '72%', left: '8%', size: 5, delay: '0.8s', dur: '2s' },
  { top: '78%', left: '82%', size: 7, delay: '1.1s', dur: '2.4s' },
  { top: '45%', left: '5%', size: 4, delay: '0.3s', dur: '2.8s' },
  { top: '50%', left: '90%', size: 5, delay: '1.5s', dur: '2.1s' },
  { top: '25%', left: '88%', size: 6, delay: '0.7s', dur: '2.5s' },
  { top: '85%', left: '45%', size: 4, delay: '1.2s', dur: '2.3s' },
]

export default function Trophy() {
  const navigate = useNavigate()
  const { userName } = useAppContext()

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Spark particles */}
      {SPARKS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.size, height: s.size,
          borderRadius: '50%',
          background: '#D5F20E',
          boxShadow: `0 0 ${s.size * 2}px #D5F20E`,
          animation: `sparkle ${s.dur} ${s.delay} ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="screen-label" style={{ letterSpacing: '0.2em' }}>SEED PROOF</div>

      {/* Glowing proof card */}
      <div style={{
        width: '100%', maxWidth: 320,
        background: 'rgba(255,255,255,0.06)',
        border: '2px solid #D5F20E',
        borderRadius: 28,
        padding: 28,
        boxShadow: '0 0 60px #D5F20E55, 0 0 120px #D5F20E22, inset 0 0 40px rgba(213,242,14,0.04)',
        animation: 'floatSlow 4s ease-in-out infinite',
        position: 'relative',
      }}>
        {/* Inner glow ring */}
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 28,
          background: 'linear-gradient(135deg, #D5F20E22, transparent, #D5F20E11)',
          pointerEvents: 'none',
        }} />

        <div style={{ fontSize: 64, marginBottom: 16, filter: 'drop-shadow(0 0 20px #D5F20E)' }}>🏆</div>

        <div style={{ fontSize: 11, color: '#D5F20E', fontWeight: 700, letterSpacing: '0.2em', marginBottom: 8 }}>BRAYN SEED PROOF</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
          {userName ? `${userName.toUpperCase()}` : 'BRAYNER'}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 20, lineHeight: 1.5 }}>
          First step. Path confirmed.<br />Career journey initiated.
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>ISSUED BY</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#D5F20E', marginTop: 2 }}>BRAYN</div>
          </div>
          <div style={{
            background: '#D5F20E22', border: '1px solid #D5F20E55',
            borderRadius: 8, padding: '4px 10px',
          }}>
            <div style={{ fontSize: 10, color: '#D5F20E', fontWeight: 700, letterSpacing: '0.1em' }}>PHASE 1 · ACTIVE</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <div className="screen-headline" style={{ fontSize: 22 }}>
          {userName ? `${userName},` : ''}<br />{"YOU'RE A BRAYNER."}
        </div>
        <div className="screen-sub" style={{ marginBottom: 0 }}>
          Your first trophy is here. You've taken the first step to a smarter career.
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/notifications')}>CLAIM IT</button>
      </div>
    </div>
  )
}
