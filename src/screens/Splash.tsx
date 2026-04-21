import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/signin'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{
      minHeight: '100dvh', background: '#151515', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.8s ease',
    }}>
      <div style={{
        fontSize: 64, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff',
        textShadow: '0 0 60px rgba(213,242,14,0.6), 0 0 120px rgba(213,242,14,0.3)',
        animation: 'pulse 2s ease-in-out infinite',
      }}>BRAYN</div>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)',
        marginTop: 12, textTransform: 'uppercase',
      }}>YOUR MIND. YOUR MACHINE.</div>
    </div>
  )
}
