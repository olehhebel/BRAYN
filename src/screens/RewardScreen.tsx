import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import CtaButton from '../components/CtaButton';
import styles from './RewardScreen.module.css';

export default function RewardScreen() {
  const navigate = useNavigate();
  return (
    <ScreenWrapper>
      <Topbar step="Step 5 of 6" />
      <ProgressBar value={83} />
      <div className={styles.body}>
        <div className={styles.label}>🎁 WELCOME GIFT</div>
        <h1 className={styles.headline}>You've earned your starter rewards</h1>
        <p className={styles.sub}>These resources power your first steps in BRAYN.</p>
        <div className={styles.cards}>
          <div className={styles.card} style={{ borderColor: 'rgba(255,215,0,0.3)', background: 'var(--gold-dim)' }}>
            <div className={styles.cardIcon}>⚡</div>
            <div className={styles.cardValue} style={{ color: 'var(--gold)' }}>300</div>
            <div className={styles.cardName}>Neurons</div>
            <div className={styles.cardDesc}>Starter fuel for your actions</div>
          </div>
          <div className={styles.card} style={{ borderColor: 'rgba(168,85,247,0.3)', background: 'var(--accent-dim)' }}>
            <div className={styles.cardIcon}>🕐</div>
            <div className={styles.cardValue} style={{ color: 'var(--accent)' }}>2</div>
            <div className={styles.cardName}>Minutes</div>
            <div className={styles.cardDesc}>Live coaching time unlocked</div>
          </div>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/resources')}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
