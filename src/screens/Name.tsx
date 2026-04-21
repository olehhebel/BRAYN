import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Name() {
  const navigate = useNavigate()
  const { setUserName } = useAppContext()
  const [val, setVal] = useState('')

  const handleContinue = () => {
    if (val.trim().length >= 2) {
      setUserName(val.trim())
      navigate('/who')
    }
  }

  return (
    <div className="screen screen-onboarding fade-in" style={{ justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="screen-label">STEP 1</div>
        <div className="screen-headline">WHAT SHOULD<br />WE CALL YOU?</div>
        <div className="screen-sub">This becomes part of your BRAYN ID.</div>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleContinue()}
          placeholder="Your name"
          autoFocus
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: 14, padding: '18px 20px', fontSize: 18, color: '#fff',
            fontWeight: 600, outline: 'none', width: '100%', transition: 'border-color 0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = '#D5F20E' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)' }}
        />
      </div>
      <div className="cta-area">
        <button className="cta-btn" disabled={val.trim().length < 2} onClick={handleContinue}>
          LOCK IT IN
        </button>
      </div>
    </div>
  )
}
