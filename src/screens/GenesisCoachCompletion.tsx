import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ResultShareBar from '../components/ResultShareBar'

export default function GenesisCoachCompletion() {
  const navigate = useNavigate()
  const { routeData, userName } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'
  const captureRef = useRef<HTMLDivElement>(null)

  return (
    <div className="screen screen-dark fade-in">
      {/* Capture target */}
      <div ref={captureRef}>
        <div className="screen-label">YOUR COACH</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: `radial-gradient(circle, ${rd.color}44, ${rd.color}11)`,
            border: `2px solid ${rd.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 48, marginBottom: 14,
            boxShadow: `0 0 60px ${rd.color}55`,
            animation: 'pulse 2.5s ease-in-out infinite',
          }}>{coachEmoji}</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: rd.color }}>{rd.coach}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>BRAYN AI Coach</div>
        </div>

        <div style={{
          background: `${rd.color}12`, borderRadius: 20, padding: 22,
          border: `1px solid ${rd.color}33`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color, animation: 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: rd.color }}>MILESTONE REACHED</div>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: '#fff' }}>
            {`"${userName ? userName + ', t' : 'T'}his is a real milestone. You ran your first structured self-scan, faced your blocker directly, and got your first Career Radar read. Most people never get this far. You did."`}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: `${rd.color}cc` }}>
            — {rd.coach}, your BRAYN coach
          </div>
        </div>
      </div>

      <div className="cta-area">
        <ResultShareBar captureRef={captureRef} filename="brayn-success.png" shareTitle="My BRAYN Milestone 🎯" />
        <button className="cta-btn" onClick={() => navigate('/genesis-reward')}>
          COLLECT YOUR REWARD
        </button>
      </div>
    </div>
  )
}
