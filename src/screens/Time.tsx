import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const OPTIONS = ['10 min per day', '20 min per day', '30 min per day', '45+ min per day']

export default function Time() {
  const navigate = useNavigate()
  const { setTimeBudget } = useAppContext()
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label">STEP 4</div>
      <div className="screen-headline">HOW MUCH TIME<br />CAN YOU GIVE<br />BRAYN EACH DAY?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {OPTIONS.map(o => (
          <button key={o} className={`option-pill${selected === o ? ' selected' : ''}`} onClick={() => setSelected(o)}>
            {o}
          </button>
        ))}
      </div>
      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={() => { setTimeBudget(selected); navigate('/reward') }}>
          SET MY SCHEDULE
        </button>
      </div>
    </div>
  )
}
