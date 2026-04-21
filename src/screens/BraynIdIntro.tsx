import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function BraynIdIntro() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { color: '#00DA30' }

  useEffect(() => {
    const t = setTimeout(() => navigate('/brayn-id-proof'), 2800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.4)', marginBottom: 32, textTransform: 'uppercase',
      }}>BRAYN ID</div>

      <div style={{
        width: 120, height: 120, borderRadius: 24,
        background: `linear-gradient(135deg, ${rd.color}44, ${rd.color}11)`,
        border: `2px solid ${rd.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 52, marginBottom: 32,
        boxShadow: `0 0 80px ${rd.color}66`,
        animation: 'pulse 2s ease-in-out infinite',
      }}>🪪</div>

      <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
        MINTING YOUR<br />BRAYN ID
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
        Your artifact is being permanently<br />recorded to your identity.
      </div>

      <div style={{ marginTop: 36, display: 'flex', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: rd.color, opacity: 0.4 + i * 0.2,
            animation: `pulse ${0.8 + i * 0.3}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}
