import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function GenesisGalaxyEntry() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness' }

  return (
    <div className="screen screen-dark fade-in" style={{ overflowY: 'auto' }}>
      <div className="screen-label">GALAXY · PATH ROOM</div>
      <div className="screen-headline" style={{ fontSize: 26 }}>YOUR PATH<br />IS LIVE.</div>
      <div className="screen-sub">One room is lit. Your first branch is ready.</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
        {['Career Strategy & Workforce Readiness', 'Impactful Communication & Influence', 'Thinking, Decisions & Cognitive Agility', 'Entrepreneurship, Execution & Opportunity Design'].map(branch => {
          const isActive = branch === rd.primaryBranch
          return (
            <div key={branch} style={{
              background: isActive ? `${rd.color}18` : 'rgba(255,255,255,0.04)',
              border: isActive ? `1.5px solid ${rd.color}` : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
              opacity: isActive ? 1 : 0.4,
              transition: 'all 0.3s',
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: isActive ? rd.color : 'rgba(255,255,255,0.2)',
                boxShadow: isActive ? `0 0 16px ${rd.color}` : 'none',
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>{branch}</div>
                {isActive && <div style={{ fontSize: 12, color: rd.color, marginTop: 2 }}>ACTIVE · Your primary room</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="cta-area">
        <button className="cta-btn" onClick={() => navigate('/genesis-branch')}>
          ENTER MY ROOM
        </button>
      </div>
    </div>
  )
}
