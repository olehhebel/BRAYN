import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import styles from './RouteCookingScreen.module.css';

export default function RouteCookingScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/your-way'), 2500);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.ring} />
        <div className={styles.innerRing} />
        <div className={styles.dot}>🧠</div>
        <h2 className={styles.title}>Building your personal path...</h2>
        <p className={styles.sub}>Analyzing your goals and matching your coach</p>
        <div className={styles.dots}>
          <span /><span /><span />
        </div>
      </div>
    </ScreenWrapper>
  );
}
