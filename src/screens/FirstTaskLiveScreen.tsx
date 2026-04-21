import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import { KAYRA_VARIANTS, ORRA_CONTENT, MAVERICK_CONTENT } from '../data';
import styles from './FirstTaskLiveScreen.module.css';

const HEADLINES: Record<string, string> = {
  Kayra: 'Your journey starts with clarity',
  Orra: 'Your voice is your strongest tool',
  Maverick: 'Ideas are worthless until they move',
};

const OUTCOMES: Record<string, string> = {
  Kayra: 'get your first career clarity output',
  Orra: 'build your first real conversation script',
  Maverick: 'validate your first executable idea',
};

export default function FirstTaskLiveScreen() {
  const navigate = useNavigate();
  const { route, goal } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';

  let content = ORRA_CONTENT;
  if (coach === 'Kayra') {
    content = KAYRA_VARIANTS[goal] ?? KAYRA_VARIANTS['Find my direction'];
  } else if (coach === 'Maverick') {
    content = MAVERICK_CONTENT;
  }

  return (
    <ScreenWrapper>
      <div className={styles.badge} style={{ background: color + '15', borderColor: color + '44' }}>
        <span className={styles.pulseDot} style={{ background: color }} />
        <span style={{ color, fontWeight: 800, fontSize: 12, letterSpacing: '0.1em' }}>FIRST TASK IS LIVE</span>
      </div>
      <div className={styles.main}>
        <h1 className={styles.headline}>{HEADLINES[coach]}</h1>
        <p className={styles.sub}>
          {coach} has prepared your first Boost. Complete it to {OUTCOMES[coach]}.
        </p>
        <div className={styles.boostCard} style={{ borderColor: color + '44', background: color + '0d' }}>
          <div className={styles.boostTop}>
            <div className={styles.boostBadge} style={{ background: color + '22', color }}>BOOST</div>
            <div className={styles.boostDuration} style={{ color: color + 'cc' }}>{content.boostDuration}</div>
          </div>
          <div className={styles.boostName}>{content.boostName}</div>
          <div className={styles.boostDesc}>{content.phase1Desc}</div>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/activation-1')} color={color}>
        START BOOST
      </CtaButton>
    </ScreenWrapper>
  );
}
