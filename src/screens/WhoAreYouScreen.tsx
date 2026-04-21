import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import Bubble from '../components/Bubble';
import CtaButton from '../components/CtaButton';
import { useAppDispatch } from '../store';
import { WHO_OPTIONS } from '../data';
import styles from './WhoAreYouScreen.module.css';

export default function WhoAreYouScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    dispatch({ type: 'SET_WHO', payload: selected });
    navigate('/goal');
  };

  return (
    <ScreenWrapper onboarding>
      <Topbar backTo="/name" step="Step 2 of 6" />
      <ProgressBar value={33} />
      <div className={styles.body}>
        <h1 className={styles.headline}>Who are you?</h1>
        <p className={styles.sub}>Pick the one that fits you best right now.</p>
        <div className={styles.options}>
          {WHO_OPTIONS.map(opt => (
            <Bubble key={opt} selected={selected === opt} onClick={() => setSelected(opt)}>
              {opt}
            </Bubble>
          ))}
        </div>
      </div>
      <CtaButton onClick={handleContinue} disabled={!selected}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
