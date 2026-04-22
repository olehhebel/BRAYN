import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ResultShareBar from '../components/ResultShareBar'

export default function BraynIdProof() {
  const navigate = useNavigate()
  const { routeData, userName, goal } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30', proof: 'Role Target Card', primaryBranch: 'Career Strategy & Workforce Readiness' }
  const idNumber = `BRAYN-${Math.floor(10000 + Math.random() * 90000)}`
  const captureRef = useRef<HTMLDivElement>(null)

  const stats = [
    { label: 'SESSIONS', value: '1' },
    { label: 'STREAK', value: '1d' },
    { label: 'ARTIFACTS', value: '1' },
    { label: 'RANK', value: 'SEED' },
  ]

  const trophies = [
    { icon: '🏆', name: 'First Brayner', earned: true },
    { icon: '🎯', name: 'Radar Complete', earned: true },
    { icon: '🌱', name: 'Path Activated', earned: true },
    { icon: '🔒', name: 'Phase 2', earned: false },
  ]

  return (
    <div className="screen screen-onboarding fade-in" style={{ overflowY: 'auto', paddingBottom: 40 }}>

      {/* Capture target — all visible card content above the CTA */}
      <div ref={captureRef}>
        {/* Resource bar header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(0,0,0,0.25)', borderRadius: 12,
          padding: '8px 14px', marginBottom: 20,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#D5F20E' }}>170</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>NEURONS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14 }}>🕐</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#00FFFF' }}>45</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>MIN</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: rd.color, fontWeight: 700, letterSpacing: '0.1em' }}>PHASE 1 · ACTIVE</div>
        </div>

        <div className="screen-label" style={{ textAlign: 'center' }}>YOUR BRAYN ID</div>

        {/* Avatar + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `radial-gradient(circle, ${rd.color}66, ${rd.color}22)`,
            border: `2px solid ${rd.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, flexShrink: 0,
            boxShadow: `0 0 30px ${rd.color}55`,
          }}>🌿</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{userName || 'BRAYNER'}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginTop: 2 }}>{idNumber}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: rd.color, background: `${rd.color}22`, borderRadius: 6, padding: '2px 8px' }}>
                {rd.coach?.toUpperCase()}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Primary Coach</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {stats.map(s => (
            <div key={s.label} style={{
              flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 12,
              padding: '10px 6px', textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.08em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Current task */}
        <div style={{
          background: `${rd.color}14`, border: `1.5px solid ${rd.color}44`,
          borderRadius: 14, padding: '12px 16px', marginBottom: 14,
        }}>
          <div style={{ fontSize: 10, color: rd.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>CURRENT TASK</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Complete Genesis Session 1</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Career Radar 360 · {rd.coach}</div>
        </div>

        {/* Goal */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 4 }}>GROWTH GOAL</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{goal || 'Find my direction'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{rd.primaryBranch}</div>
        </div>

        {/* Trophies */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>TROPHIES</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {trophies.map(t => (
              <div key={t.name} style={{
                background: t.earned ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${t.earned ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12, padding: '10px 12px',
                textAlign: 'center', opacity: t.earned ? 1 : 0.4,
                minWidth: 72,
              }}>
                <div style={{ fontSize: 24 }}>{t.icon}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 700, marginTop: 4, lineHeight: 1.2 }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>EDUCATION</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Self-directed</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Career growth path</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 6 }}>EXPERIENCE</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>In progress</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Phase 1 · Day 1</div>
          </div>
        </div>

        {/* Unlocked artifact */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', border: `2px solid ${rd.color}`,
          borderRadius: 16, padding: '14px 18px', marginBottom: 14,
          boxShadow: `0 0 30px ${rd.color}22`,
        }}>
          <div style={{ fontSize: 10, color: rd.color, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>FIRST ARTIFACT · UNLOCKED</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{rd.proof}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Generated from Career Radar 360</div>
        </div>

        {/* Status badge */}
        <div style={{
          background: `${rd.color}18`, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: rd.color, animation: 'pulse 1.5s infinite' }} />
          <div style={{ fontSize: 11, color: rd.color, fontWeight: 700, letterSpacing: '0.1em' }}>GENESIS COMPLETE · PHASE 1</div>
        </div>

        <div className="screen-sub" style={{ textAlign: 'center', margin: '8px 0 4px', fontSize: 13 }}>
          This is your permanent proof of progress. It grows with you.
        </div>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <ResultShareBar captureRef={captureRef} filename="brayn-proof.png" shareTitle="My BRAYN ID Proof 🌿" />
        <button className="cta-btn" onClick={() => navigate('/ai-entry-teaser')}>
          {"SEE WHAT'S NEXT"}
        </button>
      </div>
    </div>
  )
}
