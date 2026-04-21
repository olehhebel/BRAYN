import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisLiveEntry() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }

  useEffect(() => {
    const t = setTimeout(() => navigate('/genesis-briefing'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.5)', marginBottom: 20, textTransform: 'uppercase',
      }}>BRAYN</div>

      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: `2px solid ${rd.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: `0 0 60px ${rd.color}88`,
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
          color: rd.color,
        }}>LIVE</div>
      </div>

      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 12 }}>
        GENESIS
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Career Radar 360 · Loading</div>
    </div>
  )
}
