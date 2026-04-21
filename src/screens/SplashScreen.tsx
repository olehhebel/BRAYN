import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/signin', { replace: true }), 3000);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <div className={styles.splash}>
      <div className={styles.logo}>BRAYN</div>
      <div className={styles.tagline}>Your personal growth engine</div>
      <div className={styles.loader}><div className={styles.loaderFill} /></div>
    </div>
  );
}
