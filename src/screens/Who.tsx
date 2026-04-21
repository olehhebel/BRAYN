import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const OPTIONS = [
  "I'm still figuring things out",
  "I'm looking for my first real role",
  "I'm a junior specialist",
  "I feel stuck in my current role",
  "I'm changing direction",
  "I'm building something of my own",
  "Other",
]

export default function Who() {
  const navigate = useNavigate()
  const { setWhoAreYou } = useAppContext()
  const [selected, setSelected] = useState('')

  return (
    <div className="screen screen-onboarding fade-in">
      <div className="screen-label">STEP 2</div>
      <div className="screen-headline">WHO ARE YOU<br />RIGHT NOW?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {OPTIONS.map(o => (
          <button key={o} className={`option-pill${selected === o ? ' selected' : ''}`} onClick={() => setSelected(o)}>
            {o}
          </button>
        ))}
      </div>
      <div className="cta-area">
        <button className="cta-btn" disabled={!selected} onClick={() => { setWhoAreYou(selected); navigate('/goal') }}>
          {"THAT'S ME"}
        </button>
      </div>
    </div>
  )
}
