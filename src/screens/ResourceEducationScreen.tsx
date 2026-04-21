import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import CtaButton from '../components/CtaButton';
import styles from './ResourceEducationScreen.module.css';

const RESOURCES = [
  { icon: '⚡', name: 'NEURONS', color: 'var(--gold)', dim: 'var(--gold-dim)', desc: 'Fuel your daily actions & growth' },
  { icon: '🕐', name: 'MINUTES', color: 'var(--accent)', dim: 'var(--accent-dim)', desc: 'Power live coaching with BRAYN AI' },
  { icon: '🔗', name: 'AXONS', color: 'var(--orra)', dim: 'var(--orra-dim)', desc: 'Unlock advanced learning paths' },
  { icon: '💎', name: 'BRAYNBITS', color: 'var(--kayra)', dim: 'var(--kayra-dim)', desc: 'Track your experience & rank up' },
];

export default function ResourceEducationScreen() {
  const navigate = useNavigate();
  return (
    <ScreenWrapper>
      <Topbar backTo="/reward" step="Step 6 of 6" />
      <ProgressBar value={100} />
      <div className={styles.body}>
        <h1 className={styles.headline}>Your progress runs on four resources</h1>
        <div className={styles.cards}>
          {RESOURCES.map(r => (
            <div key={r.name} className={styles.card} style={{ borderColor: r.color + '33', background: r.dim }}>
              <div className={styles.icon}>{r.icon}</div>
              <div className={styles.info}>
                <div className={styles.name} style={{ color: r.color }}>{r.name}</div>
                <div className={styles.desc}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CtaButton onClick={() => navigate('/trophy')}>
        GOT IT
      </CtaButton>
    </ScreenWrapper>
  );
}
