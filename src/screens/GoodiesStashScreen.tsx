import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import styles from './GoodiesStashScreen.module.css';

const GOODIES = [
  { icon: '⚡', label: '300 Neurons', desc: 'Starter fuel', color: 'var(--gold)', dim: 'var(--gold-dim)' },
  { icon: '🕐', label: '2 Minutes', desc: 'Live coaching time', color: 'var(--accent)', dim: 'var(--accent-dim)' },
  { icon: '🔗', label: '1 Axon', desc: 'First unlock', color: 'var(--orra)', dim: 'var(--orra-dim)' },
  { icon: '💎', label: '50 BRAYNBits', desc: 'Opening balance', color: 'var(--kayra)', dim: 'var(--kayra-dim)' },
  { icon: '🏆', label: 'Founding BRAYNER Badge', desc: 'Limited edition', color: 'var(--accent)', dim: 'var(--accent-dim)' },
];

export default function GoodiesStashScreen() {
  const navigate = useNavigate();
  const { route } = useAppState();
  const color = route?.color;
  return (
    <ScreenWrapper>
      <Topbar label="STARTER PACK" coachColor={color} />
      <div className={styles.body}>
        <h1 className={styles.headline}>Your Starter Pack</h1>
        <p className={styles.sub}>You've unlocked your BRAYN starter resources.</p>
        <div className={styles.list}>
          {GOODIES.map(g => (
            <div key={g.label} className={styles.goodie} style={{ background: g.dim, borderColor: g.color + '33' }}>
              <div className={styles.goodieIcon}>{g.icon}</div>
              <div className={styles.goodieInfo}>
                <div className={styles.goodieName} style={{ color: g.color }}>{g.label}</div>
                <div className={styles.goodieDesc}>{g.desc}</div>
              </div>
              <div className={styles.check} style={{ color: g.color }}>✓</div>
            </div>
          ))}
        </div>
      </div>
      <CtaButton onClick={() => navigate('/seed-proof')} color={color}>
        CLAIM YOUR START CARD
      </CtaButton>
    </ScreenWrapper>
  );
}
