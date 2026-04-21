import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CalibrationAvatar() {
  const navigate = useNavigate()
  const { setAvatarProvided } = useAppContext()

  return (
    <div className="screen screen-onboarding fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="screen-label" style={{ textAlign: 'center' }}>CALIBRATION · 2 OF 5</div>
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, marginBottom: 28,
      }}>👤</div>

      <div className="screen-headline" style={{ fontSize: 26 }}>PHOTO</div>
      <div className="screen-sub">
        Add a photo to personalize your BRAYN ID and AI visual experience.
        <br /><span style={{ fontSize: 13, opacity: 0.6 }}>Optional — you can always add it later.</span>
      </div>

      <div className="cta-area" style={{ width: '100%' }}>
        <button className="cta-btn" onClick={() => { setAvatarProvided(true); navigate('/calibration-blocker') }}>
          SET AVATAR
        </button>
        <button className="secondary-btn" onClick={() => navigate('/calibration-blocker')}>
          Set later
        </button>
      </div>
    </div>
  )
}
