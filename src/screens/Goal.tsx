import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext, GOAL_ROUTES } from '../context/AppContext'

const OPTIONS = [
  'Find my direction',
  'Get my next role',
  'Grow faster where I am',
  'Make a career pivot',
  'Communicate with more confidence',
  'Turn ideas into action',
  'Other',
]

export default function Goal() {
  const navigate = useNavigate()
  const { setGoal, setRouteData } = useAppContext()
  const [selected, setSelected] = useState('')

  const handleNext = () => {
    if (!selected) return
    setGoal(selected)
    setRouteData(GOAL_ROUTES[selected] || GOAL_ROUTES['Find my direction'])
    navigate('/time')
  }

  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label">STEP 3</div>
      <div className="screen-headline">{"WHAT'S YOUR"}<br />MAIN GOAL?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {OPTIONS.map(o => (
          <button key={o} className={`option-pill${selected === o ? ' selected' : ''}`} onClick={() => setSelected(o)}>
            {o}
          </button>
        ))}
      </div>
      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  )
}
