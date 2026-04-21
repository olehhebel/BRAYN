import styles from './CtaButton.module.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export default function CtaButton({ onClick, disabled, color, children, variant = 'primary' }: Props) {
  return (
    <div className={styles.area}>
      <button
        className={`${styles.btn} ${disabled ? styles.disabled : variant === 'outline' ? styles.outline : styles.primary}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={!disabled && color ? { background: color } : undefined}
      >
        {children}
      </button>
    </div>
  );
}
