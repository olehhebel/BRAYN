import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisBriefing() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness' }
  const coachEmoji = rd.coach === 'Orra' ? '🌊' : rd.coach === 'Maverick' ? '🔥' : '🌿'

  return (
    <div className="screen screen-dark fade-in">
      <div className="screen-label">MISSION BRIEFING</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `${rd.color}22`, border: `1.5px solid ${rd.color}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>{coachEmoji}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: rd.color }}>{rd.coach}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Mission debrief</div>
        </div>
      </div>

      <div className="screen-headline" style={{ fontSize: 24, marginBottom: 20 }}>{"HERE'S WHAT"}<br />WILL HAPPEN.</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { step: '01', title: 'Answer 2 short questions', desc: 'Your inputs train the radar to your actual situation — not a generic template.' },
          { step: '02', title: 'Career Radar 360 runs', desc: 'The system maps your signal strength across the dimensions that matter most for your path.' },
          { step: '03', title: 'Your insights load', desc: 'You get 5 personalized career insights and your first proof artifact unlocks.' },
        ].map(item => (
          <div key={item.step} style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '18px 20px',
            display: 'flex', gap: 16, alignItems: 'flex-start',
          }}>
            <div style={{
              fontSize: 12, fontWeight: 800, color: rd.color, letterSpacing: '0.1em',
              minWidth: 28, paddingTop: 2,
            }}>{item.step}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-q1')}>GOT IT · START</button>
      </div>
    </div>
  )
}
