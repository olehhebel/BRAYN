import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import styles from './TrophyScreen.module.css';

export default function TrophyScreen() {
  const navigate = useNavigate();
  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.trophyWrap}>
          <div className={styles.glow} />
          <div className={styles.trophy}>🏆</div>
        </div>
        <h1 className={styles.headline}>You're a BRAYNER</h1>
        <p className={styles.sub}>Your personal growth journey starts now.</p>
        <CtaButton onClick={() => navigate('/notifications')}>
          LET'S GO
        </CtaButton>
      </div>
    </ScreenWrapper>
  );
}
