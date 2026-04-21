import styles from './Bubble.module.css';

interface Props {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}

export default function Bubble({ selected, onClick, children, color }: Props) {
  const accentColor = color || 'var(--accent)';
  return (
    <button
      className={`${styles.bubble} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      style={selected ? {
        borderColor: accentColor,
        background: `${accentColor}1a`,
        boxShadow: `0 0 0 1px ${accentColor}`,
      } : undefined}
    >
      <span
        className={styles.dot}
        style={selected ? { borderColor: accentColor, background: accentColor } : undefined}
      >
        {selected && <span className={styles.check}>✓</span>}
      </span>
      {children}
    </button>
  );
}
