import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Trophy() {
  const navigate = useNavigate()
  const { userName } = useAppContext()
  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 100, animation: 'pulse 2s ease-in-out infinite' }}>🏆</div>
      <div className="screen-headline" style={{ marginTop: 24 }}>
        {userName ? `${userName},` : ''}<br />{"YOU'RE A BRAYNER."}
      </div>
      <div className="screen-sub">
        Your first trophy is here. You have taken the first step to a smarter career.
      </div>
      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => navigate('/notifications')}>CLAIM IT</button>
      </div>
    </div>
  )
}
