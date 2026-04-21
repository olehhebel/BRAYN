import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import { KAYRA_VARIANTS, ORRA_CONTENT, MAVERICK_CONTENT } from '../data';
import styles from './SeedProofScreen.module.css';

export default function SeedProofScreen() {
  const navigate = useNavigate();
  const { route, goal, braynName } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';

  let content = ORRA_CONTENT;
  if (coach === 'Kayra') {
    content = KAYRA_VARIANTS[goal] ?? KAYRA_VARIANTS['Find my direction'];
  } else if (coach === 'Maverick') {
    content = MAVERICK_CONTENT;
  }

  return (
    <ScreenWrapper center>
      <div className={styles.content}>
        <div className={styles.title}>BRAYN START CARD</div>
        <div className={styles.card} style={{ borderColor: color, boxShadow: `0 0 40px ${color}22` }}>
          <div className={styles.cardHeader} style={{ background: color + '15' }}>
            <div className={styles.cardLogo}>BRAYN</div>
            <div className={styles.cardStatus} style={{ color }}>● READY</div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>BRAYN NAME</div>
              <div className={styles.fieldValue}>{braynName || 'BRAYNER'}</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.field}>
              <div className={styles.fieldLabel}>COACH</div>
              <div className={styles.fieldValue} style={{ color }}>{coach}</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.field}>
              <div className={styles.fieldLabel}>PATH</div>
              <div className={styles.fieldValue}>{content.pathTitle}</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.field}>
              <div className={styles.fieldLabel}>FIRST ACTION</div>
              <div className={styles.fieldValue}>{content.boostName}</div>
            </div>
          </div>
          <div className={styles.cardFooter} style={{ borderTopColor: color + '33' }}>
            <div className={styles.footerLabel}>STATUS</div>
            <div className={styles.footerValue} style={{ color }}>ONBOARDING COMPLETE</div>
          </div>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/', { replace: true })} color={color}>
        ENTER BRAYN
      </CtaButton>
    </ScreenWrapper>
  );
}
