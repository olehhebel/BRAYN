import { type ReactNode } from 'react';
import styles from './PhoneShell.module.css';

export default function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.app}>
      <div className={styles.shell}>
        {children}
      </div>
    </div>
  );
}
