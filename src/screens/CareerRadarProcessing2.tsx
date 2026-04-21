import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CareerRadarProcessing2() {
  const navigate = useNavigate()
  const { routeData } = useAppContext()
  const rd = routeData || { coach: 'Kayra', color: '#00DA30' }
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 3
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => navigate('/career-radar-insights'), 800)
      return () => clearTimeout(t)
    }
  }, [pct, navigate])

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        SYNTHESIZING RESULTS
      </div>

      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: `conic-gradient(${rd.color} ${pct * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32, position: 'relative',
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: '#0E15AB', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: rd.color }}>{pct}%</div>
        </div>
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
        {pct < 100 ? 'Building your radar...' : 'Radar complete.'}
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
        {pct < 100 ? 'Mapping your career position' : '5 insights ready for you'}
      </div>
    </div>
  )
}
