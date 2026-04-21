import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  return (
    <div className="screen screen-onboarding fade-in">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
        <div style={{
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(213,242,14,0.9) 0%, rgba(213,242,14,0.3) 40%, transparent 70%)',
          boxShadow: '0 0 80px rgba(213,242,14,0.5)',
          animation: 'pulse 3s ease-in-out infinite',
          marginBottom: 40,
        }} />
        <div className="screen-headline" style={{ textAlign: 'center', fontSize: 32 }}>
          YOUR CAREER.<br />FINALLY<br />MAKES SENSE.
        </div>
        <div className="screen-sub" style={{ textAlign: 'center' }}>
          BRAYN learns how you think and builds your personal growth path.
        </div>
      </div>
      <div className="cta-area">
        <button className="secondary-btn" style={{ background: '#fff', color: '#151515', border: 'none', fontWeight: 700 }} onClick={() => navigate('/name')}>
          🍎 Continue with Apple
        </button>
        <button className="secondary-btn" style={{ background: '#fff', color: '#151515', border: 'none', fontWeight: 700 }} onClick={() => navigate('/name')}>
          🔵 Continue with Google
        </button>
      </div>
    </div>
  )
}
