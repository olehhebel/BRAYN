import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import styles from './ActivationLayer.module.css';

const INSIGHTS: Record<string, { headline: string; value: string; icon: string }> = {
  Kayra: {
    icon: '🧭',
    headline: 'Career clarity starts with a single honest question',
    value: '"What would I do if I knew I wouldn\'t fail?" — Kayra uses this as your starting compass.',
  },
  Orra: {
    icon: '🎙️',
    headline: 'One great conversation can change your trajectory',
    value: 'Orra trains you to own the moments that matter — not just say the right words, but make them land.',
  },
  Maverick: {
    icon: '🚀',
    headline: 'Validated ideas move. Unvalidated ideas stall.',
    value: 'Maverick skips the brainstorm loops. Your first action is a single testable assumption.',
  },
};

export default function ActivationLayer1() {
  const navigate = useNavigate();
  const { route } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';
  const insight = INSIGHTS[coach];

  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.stepBadge} style={{ color }}>Insight 1 of 3</div>
        <div className={styles.icon}>{insight.icon}</div>
        <h2 className={styles.headline}>{insight.headline}</h2>
        <div className={styles.card} style={{ borderColor: color + '33', background: color + '0d' }}>
          <p className={styles.value}>{insight.value}</p>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/activation-2')} color={color}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
