import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cooking() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/your-way'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '3px solid transparent',
        borderTop: '3px solid #D5F20E',
        borderRight: '3px solid rgba(213,242,14,0.3)',
        animation: 'spin 1s linear infinite',
        marginBottom: 32,
      }} />
      <div className="screen-headline" style={{ textAlign: 'center', fontSize: 24 }}>COOKING<br />YOUR PATH</div>
      <div className="screen-sub" style={{ textAlign: 'center' }}>Personalizing your route...</div>
    </div>
  )
}
