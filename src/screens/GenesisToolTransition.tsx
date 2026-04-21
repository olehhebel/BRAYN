import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisToolTransition() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }

  useEffect(() => {
    const t = setTimeout(() => navigate('/career-radar-hero'), 2800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '3px solid transparent',
        borderTop: `3px solid ${rd.color}`,
        borderRight: '3px solid rgba(213,242,14,0.2)',
        animation: 'spin 1s linear infinite',
        marginBottom: 32,
      }} />
      <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>
        ACTIVATING
      </div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Career Radar 360</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>Processing your inputs...</div>
    </div>
  )
}
