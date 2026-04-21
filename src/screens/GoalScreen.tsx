import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import ProgressBar from '../components/ProgressBar';
import Bubble from '../components/Bubble';
import CtaButton from '../components/CtaButton';
import { useAppDispatch } from '../store';
import { GOAL_OPTIONS, GOAL_ROUTING } from '../data';
import styles from './GoalScreen.module.css';

export default function GoalScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState('');

  const route = selected ? GOAL_ROUTING[selected] : null;
  const coachColor = route?.color;

  const handleContinue = () => {
    dispatch({ type: 'SET_GOAL', payload: selected, route });
    navigate('/time');
  };

  return (
    <ScreenWrapper onboarding>
      <Topbar backTo="/who" step="Step 3 of 6" />
      <ProgressBar value={50} />
      <div className={styles.body}>
        <h1 className={styles.headline}>What's your goal?</h1>
        <p className={styles.sub}>This shapes your personal learning path.</p>
        <div className={styles.options}>
          {GOAL_OPTIONS.map(opt => {
            const optRoute = GOAL_ROUTING[opt];
            return (
              <Bubble
                key={opt}
                selected={selected === opt}
                onClick={() => setSelected(opt)}
                color={optRoute?.color}
              >
                {opt}
              </Bubble>
            );
          })}
        </div>
      </div>
      <CtaButton onClick={handleContinue} disabled={!selected} color={coachColor}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
