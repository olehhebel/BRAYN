import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Topbar from '../components/Topbar';
import CtaButton from '../components/CtaButton';
import { useAppState } from '../store';
import { KAYRA_VARIANTS, ORRA_CONTENT, MAVERICK_CONTENT } from '../data';
import styles from './WhyThisPathScreen.module.css';

export default function WhyThisPathScreen() {
  const navigate = useNavigate();
  const { route, goal } = useAppState();
  const coach = route?.coach ?? 'Kayra';
  const color = route?.color ?? '#00DA30';

  let content = ORRA_CONTENT;
  if (coach === 'Kayra') {
    const variant = KAYRA_VARIANTS[goal] ?? KAYRA_VARIANTS['Find my direction'];
    content = variant;
  } else if (coach === 'Maverick') {
    content = MAVERICK_CONTENT;
  }

  const bullets = [
    `Primary: ${route?.primaryBranch ?? ''}`,
    `Support: ${route?.supportBranch ?? ''}`,
    `First proof: ${route?.proof ?? ''}`,
  ];

  return (
    <ScreenWrapper onboarding>
      <Topbar backTo="/your-way" label="WHY THIS PATH" coachColor={color} />
      <div className={styles.body}>
        <div className={styles.coachBadge} style={{ background: color + '15', borderColor: color + '44' }}>
          <div className={styles.avatar} style={{ background: color + '22', borderColor: color + '66' }}>
            <span style={{ color }}>{coach[0]}</span>
          </div>
          <span className={styles.coachName} style={{ color }}>{coach}</span>
        </div>
        <h1 className={styles.headline}>{content.pathTitle}</h1>
        <p className={styles.body2}>{content.whyPath}</p>
        <div className={styles.bullets}>
          {bullets.map((b, i) => (
            <div key={i} className={styles.bullet}>
              <div className={styles.bulletDot} style={{ background: color }} />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
      <CtaButton onClick={() => navigate('/first-task')} color={color}>
        I'M READY
      </CtaButton>
    </ScreenWrapper>
  );
}
