import { useNavigate } from 'react-router-dom';
import styles from './Topbar.module.css';

interface Props {
  step?: string;
  backTo?: string;
  coachColor?: string;
  label?: string;
}

export default function Topbar({ step, backTo, coachColor, label }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.topbar}>
      {backTo ? (
        <button className={styles.back} onClick={() => navigate(backTo)} aria-label="Go back">←</button>
      ) : (
        <span style={{ width: 36 }} />
      )}
      <span className={styles.step} style={coachColor ? { color: coachColor } : undefined}>
        {label || step}
      </span>
      <span style={{ width: 36 }} />
    </div>
  );
}
