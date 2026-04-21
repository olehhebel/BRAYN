import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import styles from './ActivationLayer.module.css';

const STEPS = [
  { icon: '⚡', label: 'BOOST', desc: 'A focused micro-session with your coach' },
  { icon: '📄', label: 'PROOF', desc: 'A tangible output that shows your progress' },
  { icon: '📈', label: 'GROWTH', desc: 'Skills and trajectory that compound over time' },
];

export default function ActivationLayer2() {
  const navigate = useNavigate();
  const { route } = useAppState();
  const color = route?.color ?? '#00DA30';

  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.stepBadge} style={{ color }}>Insight 2 of 3</div>
        <h2 className={styles.headline}>How BRAYN works</h2>
        <p className={styles.sub}>Three steps. Every session. Compounding forever.</p>
        <div className={styles.loopCards}>
          {STEPS.map((s, i) => (
            <div key={s.label}>
              <div className={styles.loopCard} style={{ borderColor: color + (i === 0 ? '66' : '22') }}>
                <div className={styles.loopIcon}>{s.icon}</div>
                <div className={styles.loopLabel} style={{ color }}>{s.label}</div>
                <div className={styles.loopDesc}>{s.desc}</div>
              </div>
              {i < STEPS.length - 1 && <div className={styles.arrow} style={{ color }}>↓</div>}
            </div>
          ))}
        </div>
      </div>
      <CtaButton onClick={() => navigate('/activation-3')} color={color}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
