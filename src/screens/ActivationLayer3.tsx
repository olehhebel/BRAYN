import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import styles from './ActivationLayer.module.css';

const MESSAGES: Record<string, string> = {
  Kayra: "I've built your Career Clarity Path based on your goals. Every session we run together will sharpen your direction and get you closer to a role that actually fits. No noise. Just progress.",
  Orra: "I've prepared your Communication Performance Path. We start where confidence is built — in real moments, not theory. I'll train your voice, your presence, and your ability to hold a room.",
  Maverick: "Your Builder Execution Path is live. I don't do vision boards. We validate fast, build real things, and move your idea into the world. Your first session starts now.",
};

export default function ActivationLayer3() {
  const navigate = useNavigate();
  const { route } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';

  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.stepBadge} style={{ color }}>Insight 3 of 3</div>
        <div className={styles.coachAvatar} style={{ background: color + '20', borderColor: color + '66' }}>
          <span style={{ color, fontSize: 36, fontWeight: 900 }}>{coach[0]}</span>
        </div>
        <h2 className={styles.headline}>{coach} is ready</h2>
        <div className={styles.card} style={{ borderColor: color + '33', background: color + '0a' }}>
          <p className={styles.message}>"{MESSAGES[coach]}"</p>
          <div className={styles.sig} style={{ color }}>— {coach}</div>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/goodies')} color={color}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
