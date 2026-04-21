import { type ReactNode } from 'react';
import styles from './ScreenWrapper.module.css';

interface Props {
  children: ReactNode;
  center?: boolean;
}

export default function ScreenWrapper({ children, center }: Props) {
  return (
    <div className={`${styles.screen} ${center ? styles.center : ''}`}>
      {children}
    </div>
  );
}
