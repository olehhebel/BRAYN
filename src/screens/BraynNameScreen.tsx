import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import CtaButton from '../components/CtaButton';
import { useAppDispatch } from '../store';
import styles from './BraynNameScreen.module.css';

export default function BraynNameScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  const handleContinue = () => {
    dispatch({ type: 'SET_NAME', payload: name.trim() });
    navigate('/who');
  };

  return (
    <ScreenWrapper onboarding>
      <Topbar backTo="/signin" step="Step 1 of 6" />
      <ProgressBar value={16} />
      <div className={styles.body}>
        <h1 className={styles.headline}>Choose your BRAYN name</h1>
        <p className={styles.sub}>This is how you'll be known in your journey.</p>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value.slice(0, 24))}
          autoFocus
          autoComplete="off"
          autoCapitalize="words"
        />
        <div className={styles.charCount}>{name.length}/24</div>
      </div>
      <CtaButton onClick={handleContinue} disabled={name.trim().length < 2}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
