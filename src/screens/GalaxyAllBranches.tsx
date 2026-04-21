import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const BRANCHES = [
  {
    name: 'Career Strategy & Workforce Readiness',
    coach: 'KAYRA',
    color: '#00DA30',
    emoji: '🌿',
    desc: 'Direction, roles, and career positioning',
  },
  {
    name: 'Impactful Communication & Influence',
    coach: 'ORRA',
    color: '#00FFFF',
    emoji: '🌊',
    desc: 'Real-world presence and persuasion',
  },
  {
    name: 'Thinking, Decisions & Cognitive Agility',
    coach: 'SENZOR',
    color: '#FF1296',
    emoji: '🔬',
    desc: 'Mental frameworks and decision quality',
  },
  {
    name: 'Entrepreneurship, Execution & Opportunity Design',
    coach: 'MAVERICK',
    color: '#FE6305',
    emoji: '🔥',
    desc: 'Ideas turned into tangible outcomes',
  },
]

const COACHES = [
  { name: 'KAYRA', color: '#00DA30', emoji: '🌿', role: 'Career architect. Maps your route forward.' },
  { name: 'SENZOR', color: '#FF1296', emoji: '🔬', role: 'Cognitive enhancer. Sharpens your mind.' },
  { name: 'ORRA', color: '#00FFFF', emoji: '🌊', role: 'Communication catalyst. Amplifies your voice.' },
  { name: 'MAVERICK', color: '#FE6305', emoji: '🔥', role: 'Execution engine. Turns ideas into results.' },
]

export default function GalaxyAllBranches() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { primaryBranch: 'Career Strategy & Workforce Readiness' }

  return (
    <div className="screen screen-dark fade-in" style={{ overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button
          onClick={() => navigate('/ai-coach-home')}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%', width: 36, height: 36,
            color: '#fff', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div className="screen-label" style={{ margin: 0 }}>GALAXY · ALL BRANCHES & COACHES</div>
      </div>

      <div className="screen-headline" style={{ fontSize: 24 }}>THE BRAYN<br />UNIVERSE.</div>
      <div className="screen-sub">Four branches. Four AI coaches. One growth system.</div>

      {/* Branches */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>BRANCHES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BRANCHES.map(branch => {
            const isActive = branch.name === rd.primaryBranch
            return (
              <div key={branch.name} style={{
                background: isActive ? `${branch.color}14` : 'rgba(255,255,255,0.04)',
                border: isActive ? `1.5px solid ${branch.color}` : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18, padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: isActive ? `0 0 24px ${branch.color}22` : 'none',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Planet orb */}
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                  background: `radial-gradient(circle at 35% 35%, ${branch.color}99, ${branch.color}33 60%, ${branch.color}11)`,
                  border: `1.5px solid ${branch.color}${isActive ? '' : '55'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: isActive ? `0 0 30px ${branch.color}55` : `0 0 10px ${branch.color}22`,
                  animation: isActive ? 'floatSlow 4s ease-in-out infinite' : 'none',
                  opacity: isActive ? 1 : 0.6,
                }}>{branch.emoji}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: isActive ? '#fff' : 'rgba(255,255,255,0.7)' }}>{branch.name}</div>
                    {isActive && (
                      <div style={{ fontSize: 9, fontWeight: 700, color: branch.color, background: `${branch.color}22`, borderRadius: 4, padding: '2px 6px', letterSpacing: '0.1em', flexShrink: 0 }}>
                        ACTIVE
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>{branch.desc}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: branch.color, letterSpacing: '0.1em' }}>COACH: {branch.coach}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Coaches */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>AI COACHES</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {COACHES.map(coach => (
            <div key={coach.name} style={{
              flex: '1 1 calc(50% - 4px)', minWidth: 140,
              background: `${coach.color}10`,
              border: `1.5px solid ${coach.color}44`,
              borderRadius: 16, padding: '14px',
              boxShadow: `0 0 16px ${coach.color}18`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', marginBottom: 10,
                background: `radial-gradient(circle at 35% 35%, ${coach.color}77, ${coach.color}22)`,
                border: `1.5px solid ${coach.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
                boxShadow: `0 0 20px ${coach.color}44`,
              }}>{coach.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: coach.color, letterSpacing: '0.08em', marginBottom: 4 }}>{coach.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{coach.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Galaxy tagline */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '14px 18px', marginBottom: 8, textAlign: 'center',
      }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Every branch is a dimension of your growth.<br />
          Your route activates one coach. Others unlock later.
        </div>
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/ai-coach-home')}>
          BACK TO COACH
        </button>
        <button className="secondary-btn" onClick={() => navigate('/home')}>
          HOME
        </button>
      </div>
    </div>
  )
}
