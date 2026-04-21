import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import Bubble from '../components/Bubble';
import CtaButton from '../components/CtaButton';
import { useAppState, useAppDispatch } from '../store';
import { TIME_OPTIONS } from '../data';
import styles from './TimeBudgetScreen.module.css';

export default function TimeBudgetScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { route } = useAppState();
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    dispatch({ type: 'SET_TIME', payload: selected });
    navigate('/reward');
  };

  return (
    <ScreenWrapper>
      <Topbar backTo="/goal" step="Step 4 of 6" />
      <ProgressBar value={66} />
      <div className={styles.body}>
        <h1 className={styles.headline}>How much time can you give your goal each day?</h1>
        <p className={styles.sub}>Be honest — there's no wrong answer.</p>
        <div className={styles.options}>
          {TIME_OPTIONS.map(opt => (
            <Bubble
              key={opt}
              selected={selected === opt}
              onClick={() => setSelected(opt)}
              color={route?.color}
            >
              {opt}
            </Bubble>
          ))}
        </div>
      </div>
      <CtaButton onClick={handleContinue} disabled={!selected} color={route?.color}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
