import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const BRANCHES = [
  {
    name: 'Career Strategy & Workforce Readiness',
    shortName: 'CAREER STRATEGY',
    coach: 'KAYRA',
    color: '#00DA30',
    emoji: '🌿',
    size: 90,
    top: '8%', left: '12%',
  },
  {
    name: 'Impactful Communication & Influence',
    shortName: 'COMMUNICATION',
    coach: 'ORRA',
    color: '#00FFFF',
    emoji: '🌊',
    size: 76,
    top: '18%', left: '58%',
  },
  {
    name: 'Thinking, Decisions & Cognitive Agility',
    shortName: 'COGNITIVE AGILITY',
    coach: 'SENZOR',
    color: '#FF1296',
    emoji: '🔬',
    size: 70,
    top: '52%', left: '8%',
  },
  {
    name: 'Entrepreneurship, Execution & Opportunity Design',
    shortName: 'ENTREPRENEURSHIP',
    coach: 'MAVERICK',
    color: '#FE6305',
    emoji: '🔥',
    size: 80,
    top: '58%', left: '52%',
  },
]

export default function GenesisGalaxyEntry() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness' }

  return (
    <div className="screen screen-dark fade-in" style={{ overflowY: 'auto' }}>
      <div className="screen-label">GALAXY · PATH ROOM</div>
      <div className="screen-headline" style={{ fontSize: 26 }}>YOUR PATH<br />IS LIVE.</div>
      <div className="screen-sub">One room is lit. Your first branch is ready.</div>

      {/* Planet map */}
      <div style={{ position: 'relative', width: '100%', height: 280, marginTop: 8, marginBottom: 8, flexShrink: 0 }}>
        {/* Ambient glow backdrop */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 24,
          background: 'radial-gradient(ellipse at 40% 45%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {BRANCHES.map(branch => {
          const isActive = branch.name === rd.primaryBranch
          return (
            <div key={branch.name} style={{
              position: 'absolute',
              top: branch.top, left: branch.left,
              width: branch.size, height: branch.size,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              {/* Planet orb */}
              <div style={{
                width: branch.size, height: branch.size,
                borderRadius: '50%',
                background: isActive
                  ? `radial-gradient(circle at 35% 35%, ${branch.color}bb, ${branch.color}44 55%, ${branch.color}11)`
                  : `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), rgba(255,255,255,0.03))`,
                border: isActive ? `2px solid ${branch.color}` : '1.5px solid rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 40px ${branch.color}66, 0 0 80px ${branch.color}22` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: branch.size * 0.38,
                animation: isActive ? 'floatSlow 4s ease-in-out infinite' : 'none',
                opacity: isActive ? 1 : 0.35,
                cursor: 'default',
                transition: 'all 0.3s',
                position: 'relative',
              }}>
                {branch.emoji}
                {/* Ring for active */}
                {isActive && (
                  <div style={{
                    position: 'absolute', inset: -6, borderRadius: '50%',
                    border: `1px solid ${branch.color}44`,
                    animation: 'pulse 2.5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }} />
                )}
              </div>

              {/* Label below planet */}
              <div style={{
                marginTop: 6, textAlign: 'center', lineHeight: 1.2,
                opacity: isActive ? 1 : 0.3,
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: '0.12em',
                  color: isActive ? branch.color : 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                }}>{branch.coach}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active branch info card */}
      {(() => {
        const activeBranch = BRANCHES.find(b => b.name === rd.primaryBranch) || BRANCHES[0]
        return (
          <div style={{
            background: `${activeBranch.color}14`, border: `1.5px solid ${activeBranch.color}55`,
            borderRadius: 16, padding: '14px 18px', marginBottom: 8,
          }}>
            <div style={{ fontSize: 10, color: activeBranch.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>ACTIVE · YOUR PRIMARY ROOM</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{activeBranch.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Coach: {activeBranch.coach}</div>
          </div>
        )
      })()}

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-branch')}>
          ENTER MY ROOM
        </button>
      </div>
    </div>
  )
}
