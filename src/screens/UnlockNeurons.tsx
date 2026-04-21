import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const SPARKS = [
  { top: '12%', left: '10%', size: 5, delay: '0s', dur: '2.4s' },
  { top: '18%', left: '80%', size: 7, delay: '0.5s', dur: '2.8s' },
  { top: '65%', left: '6%', size: 4, delay: '1s', dur: '2.1s' },
  { top: '70%', left: '84%', size: 6, delay: '1.4s', dur: '2.5s' },
  { top: '40%', left: '88%', size: 4, delay: '0.3s', dur: '2.7s' },
]

export default function UnlockNeurons() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }

  return (
    <div className="screen screen-dark fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Spark particles */}
      {SPARKS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.size, height: s.size, borderRadius: '50%',
          background: '#D5F20E',
          boxShadow: `0 0 ${s.size * 2}px #D5F20E`,
          animation: `sparkle ${s.dur} ${s.delay} ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: 28, textTransform: 'uppercase' }}>
        UNLOCK · 300 NEURONS
      </div>

      {/* Glowing neuron orb */}
      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #D5F20Ecc, #D5F20E44 55%, #D5F20E11)',
        border: '2px solid #D5F20E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, marginBottom: 28,
        boxShadow: '0 0 60px #D5F20E88, 0 0 120px #D5F20E33',
        animation: 'floatSlow 3.5s ease-in-out infinite',
        position: 'relative',
      }}>
        ⚡
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: '1px solid #D5F20E33',
          animation: 'pulse 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
        UNLOCK YOUR<br />FIRST NANOFRAMEWORK
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
        Use 300 Neurons to activate Career Radar 360 — your first structured growth tool with {rd.coach}.
      </div>

      {/* Value breakdown */}
      <div style={{
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: '18px 20px', marginBottom: 20, textAlign: 'left',
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 14 }}>WHAT YOU GET</div>
        {[
          { icon: '🎯', text: 'Career Radar 360 scan' },
          { icon: '📄', text: 'First proof artifact' },
          { icon: '⚡', text: '+120 BraynBits XP reward' },
          { icon: '🌿', text: `${rd.coach} coaching session unlocked` },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{item.text}</div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Cost</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 22 }}>⚡</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#D5F20E' }}>300 NEURONS</div>
          </div>
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/genesis-module')}>
          SPEND 300 NEURONS · UNLOCK
        </button>
        <button className="secondary-btn" onClick={() => navigate('/genesis-branch')}>
          NOT NOW
        </button>
      </div>
    </div>
  )
}
