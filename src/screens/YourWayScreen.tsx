import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import { KAYRA_VARIANTS, ORRA_CONTENT, MAVERICK_CONTENT } from '../data';
import styles from './YourWayScreen.module.css';

export default function YourWayScreen() {
  const navigate = useNavigate();
  const { route, goal, braynName } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';

  let content = ORRA_CONTENT;
  if (coach === 'Kayra') {
    const variant = KAYRA_VARIANTS[goal] ?? KAYRA_VARIANTS['Find my direction'];
    content = variant;
  } else if (coach === 'Maverick') {
    content = MAVERICK_CONTENT;
  }

  const coachInitial = coach[0];

  return (
    <ScreenWrapper onboarding>
      <Topbar label="YOUR PATH" coachColor={color} />
      <div className={styles.body}>
        <div className={styles.coachHeader}>
          <div className={styles.avatar} style={{ background: color + '22', borderColor: color + '55' }}>
            <span style={{ color }}>{coachInitial}</span>
          </div>
          <div>
            <div className={styles.coachName} style={{ color }}>{coach}</div>
            <div className={styles.coachRole}>Your Primary Coach</div>
          </div>
        </div>

        <div className={styles.card} style={{ borderColor: color + '33', background: color + '0d' }}>
          <div className={styles.cardLabel} style={{ color }}>PATH</div>
          <div className={styles.cardTitle}>{content.pathTitle}</div>
          <p className={styles.cardDesc}>{content.whyPath}</p>
        </div>

        <div className={styles.branchCard}>
          <div className={styles.branchRow}>
            <div className={styles.branchDot} style={{ background: color }} />
            <div>
              <div className={styles.branchLabel}>Primary Branch</div>
              <div className={styles.branchValue}>{route?.primaryBranch}</div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.branchRow}>
            <div className={styles.branchDot} style={{ background: 'var(--accent)' }} />
            <div>
              <div className={styles.branchLabel}>Support Branch</div>
              <div className={styles.branchValue}>{route?.supportBranch}</div>
            </div>
          </div>
        </div>

        <div className={styles.phaseRow}>
          <div className={styles.phase} style={{ borderColor: color + '55', background: color + '0d' }}>
            <div className={styles.phaseNum} style={{ color }}>Phase 1</div>
            <div className={styles.phaseTitle}>{content.phase1Title}</div>
            <div className={styles.phaseDesc}>{content.phase1Desc}</div>
          </div>
          <div className={styles.phase} style={{ opacity: 0.5 }}>
            <div className={styles.phaseNum}>Phase 2</div>
            <div className={styles.phaseTitle}>{content.phase2Title}</div>
            <div className={styles.phaseDesc}>{content.phase2Desc}</div>
          </div>
        </div>

        <div className={styles.boostCard} style={{ borderColor: color + '44' }}>
          <div className={styles.boostLabel}>⚡ FIRST ACTION</div>
          <div className={styles.boostName}>{content.boostName}</div>
          <div className={styles.boostDuration}>{content.boostDuration}</div>
        </div>

        <div className={styles.priorityCard}>
          <div className={styles.priorityLabel}>🎯 Growth Priority</div>
          <p className={styles.priorityText}>{content.growthPriority}</p>
        </div>

        <div className={styles.idCard} style={{ borderColor: color + '33' }}>
          <div className={styles.idLabel}>🪪 BRAYN ID</div>
          <div className={styles.idName}>{braynName || 'BRAYNER'}</div>
          <div className={styles.idStatus} style={{ color }}>● Active</div>
        </div>
      </div>
      <CtaButton onClick={() => navigate('/why-path')} color={color}>
        CONTINUE
      </CtaButton>
    </ScreenWrapper>
  );
}
