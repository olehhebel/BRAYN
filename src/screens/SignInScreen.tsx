import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import styles from './SignInScreen.module.css';

export default function SignInScreen() {
  const navigate = useNavigate();
  const go = () => navigate('/name');
  return (
    <ScreenWrapper center onboarding>
      <div className={styles.content}>
        <div className={styles.glow} />
        <div className={styles.logo}>BRAYN</div>
        <div className={styles.tagline}>Your personal growth engine</div>
        <div className={styles.icon}>🧠</div>
        <div className={styles.buttons}>
          <button className={styles.apple} onClick={go}>
            <span>🍎</span> Continue with Apple
          </button>
          <button className={styles.google} onClick={go}>
            <span>G</span> Continue with Google
          </button>
        </div>
        <p className={styles.legal}>By continuing you agree to our Terms & Privacy</p>
      </div>
    </ScreenWrapper>
  );
}
