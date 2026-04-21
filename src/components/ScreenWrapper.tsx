import { type ReactNode } from 'react';
import styles from './ScreenWrapper.module.css';

interface Props {
  children: ReactNode;
  center?: boolean;
  onboarding?: boolean;
}

export default function ScreenWrapper({ children, center, onboarding }: Props) {
  return (
    <div
      className={`${styles.screen} ${center ? styles.center : ''}`}
      style={onboarding ? { background: 'var(--bg-onboarding)' } : undefined}
    >
      {children}
    </div>
  );
}
