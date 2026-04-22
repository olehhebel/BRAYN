import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function StartCard() {
  const navigate = useNavigate()
  const { userName, goal, routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [id] = useState(() => `BRAYN-${Math.floor(1000 + Math.random() * 9000)}`)

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="screen-label" style={{ textAlign: 'center' }}>SEED PROOF</div>
      <div style={{
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${rd.color}`, borderRadius: 24, padding: 28, marginBottom: 32,
        boxShadow: `0 0 40px ${rd.color}33`,
      }}>
        <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 20 }}>BRAYN ID CARD</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{userName || 'BRAYNER'}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>{id}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>GOAL</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{goal || 'Find my direction'}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>PRIMARY COACH</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: rd.color }}>{rd.coach}</div>
      </div>
      <div className="screen-headline" style={{ textAlign: 'center', fontSize: 22 }}>YOUR BRAYN<br />JOURNEY STARTS NOW.</div>
      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/calibration-coach')}>BEGIN</button>
      </div>
    </div>
  )
}
