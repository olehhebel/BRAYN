import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import styles from './NotificationsScreen.module.css';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const go = () => navigate('/cooking');
  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.bellWrap}>
          <div className={styles.glow} />
          <div className={styles.bell}>🔔</div>
        </div>
        <h1 className={styles.headline}>Stay on track</h1>
        <p className={styles.sub}>
          Enable notifications to get daily nudges, first-task reminders,
          and progress updates from your coach.
        </p>
        <CtaButton onClick={go}>
          ENABLE NOTIFICATIONS
        </CtaButton>
        <button className={styles.skip} onClick={go}>Not now</button>
      </div>
    </ScreenWrapper>
  );
}
