import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function SessionFocus() {
  const navigate = useNavigate()
  const { routeData, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', focus: 'Clarifying your next best route' }
  const [response, setResponse] = useState('')

  const prompts: Record<string, string> = {
    'Kayra': `Looking at your goal — "${goal || 'finding your direction'}" — what is one thing that, if done this week, would make you feel like you actually moved forward?`,
    'Orra': `Think of a recent conversation where you felt unheard or overlooked. What would you say differently if you had that moment again?`,
    'Maverick': `Your idea needs a first test. What is the smallest possible action you could take in the next 24 hours to see if it has legs?`,
  }
  const prompt = prompts[rd.coach || 'Kayra'] || prompts['Kayra']
  const ready = response.trim().length >= 10

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">SESSION · FOCUS QUESTION</div>

      <div style={{
        background: `linear-gradient(135deg, ${rd.color}18, rgba(255,255,255,0.03))`,
        borderRadius: 20, padding: 22,
        border: `1.5px solid ${rd.color}44`,
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 12 }}>
          {rd.coach?.toUpperCase()} ASKS
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.7, color: '#fff', fontWeight: 500 }}>
          {prompt}
        </div>
      </div>

      <textarea
        value={response}
        onChange={e => setResponse(e.target.value)}
        placeholder="Write your honest answer here..."
        style={{
          flex: 1, width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${ready ? rd.color + '88' : 'rgba(255,255,255,0.12)'}`,
          borderRadius: 16, padding: 18,
          color: '#fff', fontSize: 15, lineHeight: 1.6,
          resize: 'none', outline: 'none', fontFamily: 'inherit',
          transition: 'border-color 0.3s',
          minHeight: 140,
        }}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>
        {ready ? '✓ Ready to submit' : 'Be honest with yourself.'}
      </div>

      <div className="cta-area">
        <button className="cta-btn" disabled={!ready} onClick={() => navigate('/session-complete')}>
          SUBMIT ANSWER
        </button>
        <button className="secondary-btn" onClick={() => navigate('/session-complete')}>
          SKIP FOR NOW
        </button>
      </div>
    </div>
  )
}
