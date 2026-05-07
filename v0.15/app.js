/* global requestAnimationFrame, performance, localStorage */
'use strict';

// ═══════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════
const state = {
  name: '',
  whoAreYou: null,
  whatWant: null,
  timePerDay: null,
  coach: null,
  coachColor: null,
  calibrationMode: null,
  textCalibrationStep: 0,
  textCalibrationAnswers: [],
  resources: { neurons: 0, minutes: 0, beats: 0 },
  avatarSet: false,
  avatarDataUrl: null,
  currentScreen: 'splash',
  history: []
};

// ═══════════════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════════════
const COACH_NAMES = { kayra: 'Kayra', orra: 'Orra', maverick: 'Maverick', senzor: 'Senzor' };
const COACH_INITIALS = { kayra: 'K', orra: 'O', maverick: 'M', senzor: 'S' };

const COACH_BRANCH_INFO = {
  kayra: {
    branch: 'Career Navigation & Leadership',
    why: 'Career direction gives everything else meaning.',
    focus: 'Articulating your value and next move.',
    proof: 'A refined career narrative you can use now.'
  },
  orra: {
    branch: 'Communication & Presence',
    why: 'How you communicate shapes every outcome.',
    focus: 'Confident expression in key situations.',
    proof: 'A communication framework you own.'
  },
  maverick: {
    branch: 'Entrepreneurship & Idea Execution',
    why: 'Ideas without execution stay ideas.',
    focus: 'Moving from concept to first validated step.',
    proof: 'A structured idea canvas you can act on.'
  }
};

const KNOWLEDGE_CHECKS = {
  kayra: {
    question: 'What is the most effective way to accelerate career growth?',
    options: ['Wait for your manager to notice your work', 'Actively seek feedback and act on it fast', 'Stay focused only in your comfort zone'],
    correct: 1
  },
  orra: {
    question: 'What is the foundation of confident communication?',
    options: ['Speaking louder and more often', 'Active listening combined with clear intent', 'Memorising scripts and talking points'],
    correct: 1
  },
  maverick: {
    question: 'What separates ideas that succeed from those that stay as ideas?',
    options: ['Luck and perfect timing', 'Consistent execution and fast iteration', 'The brilliance of the idea itself'],
    correct: 1
  },
  senzor: {
    question: 'What helps most when you feel stuck or uncertain about your direction?',
    options: ['Waiting until clarity arrives on its own', 'Exploring your own thinking patterns and blocks', 'Ignoring the uncertainty and pushing forward'],
    correct: 1
  }
};

const CALIBRATION_QUESTIONS = [
  'What is your goal? Tell me more about it.',
  'What would truly help you reach this goal?',
  'What is stopping you right now?',
  'What kind of support would help you most?',
  'When you reach this goal, who will you become?'
];

const ALL_SCREENS = [
  'splash','signup','faceId','introVideo',
  'transition1','nameInput','transition2','whoAreYou',
  'transition3','whatWant','transition4','timeWheel',
  'notificationPermission','resourceSuccess','resourceEducation',
  'firstProofTrophy','braynIdFirstLook','aiPathGeneration',
  'learningContract','coachVideo','knowledgeCheck','resourceSuccessRepeat','tokenReward',
  'senzorIntro','identityInfographic','senzorContract',
  'brainIdAchievements','calibrationIntro','micPermission','textCalibration',
  'avatarUpload','finalGeneration','expandedContract','galaxyRoom','aiHubTip','braynIdHub'
];

// Resource bar shows ONLY during resource reward moments
const RESOURCE_BAR_SHOWN = new Set([
  'resourceSuccess', 'resourceSuccessRepeat', 'tokenReward'
]);

// ═══════════════════════════════════════════════════════════
//  PERSISTENCE
// ═══════════════════════════════════════════════════════════
function saveState() {
  try { localStorage.setItem('brayn_state', JSON.stringify(state)); } catch (_) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem('brayn_state');
    if (saved) Object.assign(state, JSON.parse(saved));
  } catch (_) {}
}

// ═══════════════════════════════════════════════════════════
//  COACH ROUTING
// ═══════════════════════════════════════════════════════════
function computeCoach() {
  const w = state.whoAreYou;
  const g = state.whatWant;
  if (w === 'building' || g === 'ideas') return { coach: 'maverick', color: '#FF6B35' };
  if (g === 'communicate') return { coach: 'orra', color: '#00E5FF' };
  const kayraWho = ['first-role','junior','stuck','changing'];
  const kayraGoal = ['next-role','grow-faster','career-pivot','direction'];
  if (kayraWho.includes(w) || kayraGoal.includes(g)) return { coach: 'kayra', color: '#D5F20E' };
  return { coach: 'senzor', color: '#FF2D78' };
}

// ═══════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════
let _navLock = false;

function navigate(screenName) {
  _navLock = false;
  clearTransitionTimer();
  const prev = state.currentScreen;
  state.history.push(prev);
  state.currentScreen = screenName;
  renderScreen(screenName, false);
  saveState();
}

// ═══════════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════════
function showToast(message, duration) {
  duration = duration || 2500;
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { toast.classList.add('visible'); });
  });
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 350);
  }, duration);
}

// ═══════════════════════════════════════════════════════════
//  RESOURCE BAR
// ═══════════════════════════════════════════════════════════
function updateResourceBar(screenName) {
  const bar = document.getElementById('resource-bar');
  if (!bar) return;
  if (!RESOURCE_BAR_SHOWN.has(screenName)) {
    bar.className = 'hidden';
    return;
  }
  bar.className = '';
  bar.innerHTML =
    '<div class="resource-bar-inner">' +
      '<span class="resource"><span class="res-icon">⚡</span><span id="res-neurons">' + state.resources.neurons + '</span></span>' +
      '<div class="res-divider"></div>' +
      '<span class="resource"><span class="res-icon">⏱</span><span id="res-minutes">' + state.resources.minutes + '</span></span>' +
      '<div class="res-divider"></div>' +
      '<span class="resource"><span class="res-icon">🎵</span><span id="res-beats">' + state.resources.beats + '</span></span>' +
    '</div>';
}

// ═══════════════════════════════════════════════════════════
//  COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════
function animateCounter(el, target, duration) {
  if (!el) return;
  duration = duration || 1200;
  const start = parseInt(el.textContent, 10) || 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════════════
//  PARTICLES
// ═══════════════════════════════════════════════════════════
function createParticles(container, count, colors) {
  colors = colors || ['#D5F20E','#00E5FF','#FF6B35','#FF2D78'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 4;
    p.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + (Math.random() * 100) + '%',
      'background:' + colors[Math.floor(Math.random() * colors.length)],
      'animation-duration:' + (4 + Math.random() * 8) + 's',
      'animation-delay:' + (Math.random() * 6) + 's',
      'border-radius:50%',
      'opacity:0'
    ].join(';');
    container.appendChild(p);
  }
}

// ═══════════════════════════════════════════════════════════
//  TRANSITION TIMER
// ═══════════════════════════════════════════════════════════
let _transitionTimer = null;

function clearTransitionTimer() {
  if (_transitionTimer) { clearTimeout(_transitionTimer); _transitionTimer = null; }
}

function setTransitionTimer(ms, fn) {
  clearTransitionTimer();
  _transitionTimer = setTimeout(fn, ms);
}

// ═══════════════════════════════════════════════════════════
//  SCREEN RENDER
// ═══════════════════════════════════════════════════════════
function renderScreen(screenName, isBack) {
  const container = document.getElementById('screen-container');
  if (!container) return;
  updateResourceBar(screenName);
  renderDebugPanel();

  const newScreen = document.createElement('div');
  newScreen.className = 'screen ' + (isBack ? 'slide-from-left' : 'slide-from-right');
  newScreen.id = 'screen-' + screenName;
  newScreen.innerHTML = getScreenHTML(screenName);

  const existing = container.querySelector('.screen.active');
  if (existing) {
    existing.classList.remove('active');
    existing.classList.add(isBack ? 'slide-out-right' : 'slide-out-left');
    const captured = existing;
    setTimeout(() => { if (captured.parentNode) captured.parentNode.removeChild(captured); }, 420);
  }

  container.appendChild(newScreen);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      newScreen.classList.remove('slide-from-right', 'slide-from-left');
      newScreen.classList.add('active');
    });
  });

  setTimeout(() => { initScreen(screenName, newScreen); }, 60);
}

// ═══════════════════════════════════════════════════════════
//  COACH PORTRAIT HTML
// ═══════════════════════════════════════════════════════════
function coachPortraitHTML(size) {
  size = size || 56;
  const c = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';
  const initial = COACH_INITIALS[c] || '?';
  return '<div class="coach-portrait" style="width:' + size + 'px;height:' + size + 'px;background:' + color + '22;border:2px solid ' + color + ';color:' + color + '">' + initial + '</div>';
}

// ═══════════════════════════════════════════════════════════
//  SCREEN HTML GENERATORS
// ═══════════════════════════════════════════════════════════
function getScreenHTML(name) {
  switch (name) {
    case 'splash':           return htmlSplash();
    case 'signup':           return htmlSignup();
    case 'faceId':           return htmlFaceId();
    case 'introVideo':       return htmlIntroVideo();
    case 'transition1':      return htmlTransition('transition1', 'nameInput', 3000);
    case 'transition2':      return htmlTransition('transition2', 'whoAreYou', 3000);
    case 'transition3':      return htmlTransition('transition3', 'whatWant', 3000);
    case 'transition4':      return htmlTransition('transition4', 'timeWheel', 1000);
    case 'nameInput':        return htmlNameInput();
    case 'whoAreYou':        return htmlWhoAreYou();
    case 'whatWant':         return htmlWhatWant();
    case 'timeWheel':        return htmlTimeWheel();
    case 'notificationPermission': return htmlNotificationPermission();
    case 'resourceSuccess':  return htmlResourceSuccess();
    case 'resourceEducation':return htmlResourceEducation();
    case 'firstProofTrophy': return htmlFirstProofTrophy();
    case 'braynIdFirstLook': return htmlBraynIdFirstLook();
    case 'aiPathGeneration': return htmlAiPathGeneration();
    case 'learningContract': return htmlLearningContract();
    case 'coachVideo':       return htmlCoachVideo();
    case 'knowledgeCheck':   return htmlKnowledgeCheck();
    case 'resourceSuccessRepeat': return htmlResourceSuccessRepeat();
    case 'tokenReward':      return htmlTokenReward();
    case 'senzorIntro':      return htmlSenzorIntro();
    case 'identityInfographic': return htmlIdentityInfographic();
    case 'senzorContract':   return htmlSenzorContract();
    case 'brainIdAchievements': return htmlBrainIdAchievements();
    case 'calibrationIntro': return htmlCalibrationIntro();
    case 'micPermission':    return htmlMicPermission();
    case 'textCalibration':  return htmlTextCalibration();
    case 'avatarUpload':     return htmlAvatarUpload();
    case 'finalGeneration':  return htmlFinalGeneration();
    case 'expandedContract': return htmlExpandedContract();
    case 'galaxyRoom':       return htmlGalaxyRoom();
    case 'aiHubTip':         return htmlAiHubTip();
    case 'braynIdHub':       return htmlBraynIdHub();
    default:                 return '<div class="screen-content"><h2 class="headline">Screen not found: ' + name + '</h2></div>';
  }
}

// ── SPLASH ──────────────────────────────────────────────────
function htmlSplash() {
  return (
    '<div class="splash-screen">' +
      '<div class="particles-bg" id="splash-particles"></div>' +
      '<div class="brayn-logo-tap" id="brayn-logo-main">' +
        '<div class="brayn-logo-text">BRAYN</div>' +
        '<div class="brayn-version">v0.15</div>' +
      '</div>' +
    '</div>'
  );
}

// ── SIGNUP ──────────────────────────────────────────────────
function htmlSignup() {
  return (
    '<div class="screen-content">' +
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-top:40px">' +
        '<div class="brayn-logo-tap" id="brayn-logo-signup" style="margin-bottom:32px">' +
          '<div style="font-size:28px;font-weight:900;color:var(--neon-green);letter-spacing:4px;text-shadow:0 0 20px rgba(213,242,14,0.5)">BRAYN</div>' +
        '</div>' +
        '<h1 class="headline">Your growth<br>starts here.</h1>' +
        '<p class="subtitle">Create your BRAYN account</p>' +
        '<div style="height:40px"></div>' +
        '<div class="btn-stack">' +
          '<button class="social-btn" id="btn-apple">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
            'Continue with Apple' +
          '</button>' +
          '<button class="social-btn" id="btn-google">' +
            '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' +
            'Continue with Google' +
          '</button>' +
        '</div>' +
        '<p class="privacy-note">By continuing you agree to our Terms of Service and Privacy Policy.</p>' +
      '</div>' +
    '</div>'
  );
}

// ── FACE ID ─────────────────────────────────────────────────
function htmlFaceId() {
  return (
    '<div class="screen-content">' +
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">' +
        '<h1 class="headline">Set up Face ID</h1>' +
        '<p class="subtitle">Use biometrics for secure, instant access</p>' +
        '<div class="face-scan-container">' +
          '<div class="face-scan-ring"><div class="face-icon">🫤</div></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary" id="btn-faceid">Enable Face ID</button>' +
      '<button class="btn-secondary" id="btn-faceid-skip">Skip for Now</button>' +
    '</div>'
  );
}

// ── INTRO VIDEO ─────────────────────────────────────────────
function htmlIntroVideo() {
  return (
    '<div class="screen-content">' +
      '<h1 class="headline">Welcome to BRAYN</h1>' +
      '<p class="subtitle">Your AI-powered growth engine</p>' +
      '<div class="video-placeholder" id="intro-video">' +
        '<button class="video-skip-btn" id="btn-intro-skip">Skip</button>' +
        '<div class="play-icon">▶</div>' +
        '<div class="video-label">BRAYN Intro</div>' +
        '<div class="video-transition-text">Transition video will be here.</div>' +
      '</div>' +
    '</div>'
  );
}

// ── TRANSITION ──────────────────────────────────────────────
function htmlTransition(id, next, duration) {
  const bars = Array.from({length: 12}, (_, i) =>
    '<div class="waveform-bar" style="height:' + (8 + Math.random() * 12) + 'px;animation-delay:' + (i * 0.08) + 's;animation-duration:' + (0.6 + Math.random() * 0.6) + 's"></div>'
  ).join('');
  return (
    '<div class="transition-screen" data-next="' + next + '" data-duration="' + duration + '" id="' + id + '-inner">' +
      '<div class="particles-bg" id="' + id + '-particles"></div>' +
      '<div class="waveform">' + bars + '</div>' +
      '<div class="video-transition-text">Transition video will be here.</div>' +
    '</div>'
  );
}

// ── NAME INPUT ──────────────────────────────────────────────
function htmlNameInput() {
  const displayName = state.name && state.name.length >= 2 ? 'Cool, ' + state.name + '.' : 'What should we call you?';
  return (
    '<div class="screen-content">' +
      '<div style="padding-top:20px">' +
        '<h1 class="headline" id="name-headline">' + escapeHtml(displayName) + '</h1>' +
        '<input class="name-input" id="name-field" type="text" placeholder="Your name…" autocomplete="given-name" maxlength="40" value="' + escapeHtml(state.name) + '">' +
      '</div>' +
      '<div style="flex:1"></div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary' + (state.name.length >= 2 ? '' : ' disabled') + '" id="btn-name-continue">Continue</button>' +
    '</div>'
  );
}

// ── WHO ARE YOU ─────────────────────────────────────────────
function htmlWhoAreYou() {
  const choices = [
    { id:'figuring',    label:'Still figuring things out' },
    { id:'first-role',  label:'Looking for my first real role' },
    { id:'junior',      label:'Junior specialist' },
    { id:'stuck',       label:'I feel stuck in my current role' },
    { id:'changing',    label:'Changing direction' },
    { id:'building',    label:'Building something of my own' },
    { id:'other-who',   label:'Other' }
  ];
  const hasSelection = !!state.whoAreYou;
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<h1 class="headline">Who are you<br>right now?</h1>' +
      '<div class="choice-list">' +
        choices.map(c => {
          const sel = state.whoAreYou === c.id;
          const color = sel ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
          return (
            '<button class="choice-card' + (sel ? ' selected' : '') + '" data-choice="' + c.id + '" style="' + (sel ? 'border-color:var(--neon-green);background:rgba(213,242,14,0.07)' : '') + '">' +
              '<span>' + escapeHtml(c.label) + '</span>' +
              '<span class="check-icon" style="color:' + color + ';border-color:' + color + '">' + (sel ? '✓' : '') + '</span>' +
            '</button>'
          );
        }).join('') +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary' + (hasSelection ? '' : ' disabled') + '" id="btn-who-continue">' + (hasSelection ? 'Continue' : 'Choose to continue') + '</button>' +
    '</div>'
  );
}

// ── WHAT WANT ───────────────────────────────────────────────
function htmlWhatWant() {
  const choices = [
    { id:'direction',     label:'Find my direction' },
    { id:'communicate',   label:'Communicate with more confidence' },
    { id:'next-role',     label:'Get my next role' },
    { id:'grow-faster',   label:'Grow faster where I am' },
    { id:'career-pivot',  label:'Make a career pivot' },
    { id:'ideas',         label:'Turn ideas into action' },
    { id:'other-goal',    label:'Other' }
  ];
  const hasSelection = !!state.whatWant;
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<h1 class="headline">What do you want<br>most right now?</h1>' +
      '<div class="choice-list">' +
        choices.map(c => {
          const sel = state.whatWant === c.id;
          const color = sel ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
          return (
            '<button class="choice-card' + (sel ? ' selected' : '') + '" data-choice="' + c.id + '" style="' + (sel ? 'border-color:var(--neon-green);background:rgba(213,242,14,0.07)' : '') + '">' +
              '<span>' + escapeHtml(c.label) + '</span>' +
              '<span class="check-icon" style="color:' + color + ';border-color:' + color + '">' + (sel ? '✓' : '') + '</span>' +
            '</button>'
          );
        }).join('') +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary' + (hasSelection ? '' : ' disabled') + '" id="btn-want-continue">' + (hasSelection ? 'Build My Path' : 'Choose to continue') + '</button>' +
    '</div>'
  );
}

// ── TIME WHEEL ──────────────────────────────────────────────
function htmlTimeWheel() {
  const values = [5, 10, 20, 30, 40];
  const items = ['', '', ...values, '', ''].map(v =>
    v === '' ? '<li class="wheel-item"><span></span></li>' :
    '<li class="wheel-item" data-value="' + v + '">' + v + '<span class="unit">min</span></li>'
  ).join('');
  const hasInteracted = !!state.timePerDay;
  return (
    '<div class="screen-content" style="align-items:stretch">' +
      '<h1 class="headline" style="padding-top:20px">How much time can<br>you give each day?</h1>' +
      '<p class="subtitle">Be honest — consistency beats ambition</p>' +
      '<div class="wheel-wrapper" style="margin-top:24px">' +
        '<div class="wheel-overlay-top"></div>' +
        '<div class="wheel-center-line"></div>' +
        '<div class="wheel-center-line wheel-center-line-bottom"></div>' +
        '<ul class="wheel-list" id="time-wheel-list">' + items + '</ul>' +
        '<div class="wheel-overlay-bottom"></div>' +
      '</div>' +
      '<p class="helper text-center" style="margin-top:8px">Scroll to select your daily time commitment</p>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary' + (hasInteracted ? '' : ' disabled') + '" id="btn-time-continue">Next</button>' +
    '</div>'
  );
}

// ── NOTIFICATION PERMISSION ─────────────────────────────────
function htmlNotificationPermission() {
  return (
    '<div class="screen-content">' +
      '<h1 class="headline" style="padding-top:20px">Stay on track</h1>' +
      '<p class="subtitle">Get daily reminders and progress updates from your coach</p>' +
      '<div class="notif-icon-container">' +
        '<div class="bell-icon">🔔</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary no-pulse" id="btn-notif-allow">Allow Notifications</button>' +
      '<button class="btn-secondary" id="btn-notif-skip">Not Now</button>' +
    '</div>'
  );
}

// ── RESOURCE SUCCESS ────────────────────────────────────────
function htmlResourceSuccess() {
  return (
    '<div class="screen-content">' +
      '<div style="padding-top:20px">' +
        '<h1 class="headline">Well done.</h1>' +
        '<p class="subtitle">Check your goodies stash.</p>' +
      '</div>' +
      '<div style="margin-top:32px">' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">💡</span><span>Neurons</span></div>' +
          '<div class="resource-reward-amount" id="reward-neurons">0</div>' +
        '</div>' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">⏱</span><span>Minutes</span></div>' +
          '<div class="resource-reward-amount" id="reward-minutes">0</div>' +
        '</div>' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">🎵</span><span>BRAYN Beats</span></div>' +
          '<div class="resource-reward-amount" id="reward-beats">0</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-take-resources">Take It</button>' +
    '</div>'
  );
}

// ── RESOURCE EDUCATION ──────────────────────────────────────
function htmlResourceEducation() {
  return (
    '<div class="screen-content screen-scrollable">' +
      '<h1 class="headline" style="padding-top:20px">Your progress runs<br>on four resources.</h1>' +
      '<div style="margin-top:24px">' +
        '<div class="edu-card">' +
          '<div class="edu-icon">⚡</div>' +
          '<div class="edu-text"><div class="edu-label">Neurons</div><div class="edu-desc">Fuel for smart growth. Earned by learning and reflection.</div></div>' +
        '</div>' +
        '<div class="edu-card">' +
          '<div class="edu-icon">⏱</div>' +
          '<div class="edu-text"><div class="edu-label">Minutes</div><div class="edu-desc">Time you invest daily. Every minute compounds.</div></div>' +
        '</div>' +
        '<div class="edu-card">' +
          '<div class="edu-icon">🔷</div>' +
          '<div class="edu-text"><div class="edu-label">Axons</div><div class="edu-desc">Premium path boosters. Unlock deeper content and tools.</div></div>' +
        '</div>' +
        '<div class="edu-card">' +
          '<div class="edu-icon">🎵</div>' +
          '<div class="edu-text"><div class="edu-label">BRAYN Beats</div><div class="edu-desc">Rhythm and streak energy. Keep the momentum alive.</div></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-edu-gotit">Got It</button>' +
    '</div>'
  );
}

// ── FIRST PROOF TROPHY ──────────────────────────────────────
function htmlFirstProofTrophy() {
  return (
    '<div class="screen-content">' +
      '<div class="trophy-container">' +
        '<div class="trophy-icon">🏆</div>' +
        '<h1 class="headline text-center">First proof unlocked.</h1>' +
        '<p class="subtitle text-center">Your BRAYN ID is now alive.</p>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary no-pulse" id="btn-trophy-continue">Continue</button>' +
      '<button class="btn-secondary" id="btn-trophy-share">Share</button>' +
    '</div>'
  );
}

// ── BRAYN ID FIRST LOOK ─────────────────────────────────────
function htmlBraynIdFirstLook() {
  const color = state.coachColor || '#D5F20E';
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<div style="padding-top:20px;display:flex;flex-direction:column;align-items:center;text-align:center">' +
        '<div style="font-size:72px;margin-bottom:8px;animation:trophyBounce 0.8s ease-out">🪪</div>' +
        '<h1 class="headline">Your BRAYN ID<br>just activated.</h1>' +
        '<p class="subtitle" style="margin-bottom:24px">Your first proof is permanently stored here.</p>' +
        '<div class="brayn-id-proof-card" style="border-color:' + color + '55;width:100%">' +
          '<div class="bid-row">' +
            '<span class="bid-label">FIRST PROOF</span>' +
            '<span class="bid-value" style="color:' + color + '">🏆 Seed Trophy</span>' +
          '</div>' +
          '<div class="bid-row">' +
            '<span class="bid-label">STORES</span>' +
            '<span class="bid-value">Proofs · Tokens · Trophies</span>' +
          '</div>' +
          '<div class="bid-row">' +
            '<span class="bid-label">FUTURE</span>' +
            '<span class="bid-value">Artifacts &amp; Growth Signals</span>' +
          '</div>' +
          '<div class="bid-row" style="border-bottom:none">' +
            '<span class="bid-label">STATUS</span>' +
            '<span class="bid-value" style="color:' + color + '">Active</span>' +
          '</div>' +
        '</div>' +
        '<p class="helper" style="margin-top:16px;padding:0 8px;line-height:1.6">BRAYN ID is your permanent proof of growth. It stores every proof, token, trophy, and artifact you earn — and evolves as you progress.</p>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-braynid-firstlook-continue">Build My Path →</button>' +
    '</div>'
  );
}

// ── AI PATH GENERATION ──────────────────────────────────────
function htmlAiPathGeneration() {
  const steps = [
    'Reading your context…',
    'Choosing your coach…',
    'Building your learning contract…',
    'Preparing your first proof…'
  ];
  return (
    '<div class="generation-screen">' +
      '<div class="gen-logo">BRAYN</div>' +
      '<div class="gen-steps">' +
        steps.map((s, i) =>
          '<div class="gen-step" id="gen-step-' + i + '">' +
            '<div class="gen-dot"></div>' +
            '<span>' + s + '</span>' +
          '</div>'
        ).join('') +
      '</div>' +
    '</div>'
  );
}

// ── LEARNING CONTRACT ───────────────────────────────────────
function htmlLearningContract() {
  const c = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';
  const name = COACH_NAMES[c] || 'Your Coach';
  const info = COACH_BRANCH_INFO[c] || COACH_BRANCH_INFO.kayra;
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<div style="padding-top:16px">' +
        coachPortraitHTML(52) +
        '<h1 class="headline-sm">Your Learning Contract<br>is ready.</h1>' +
        '<div class="contract-card" style="border-color:' + color + '44">' +
          '<div class="contract-row">' +
            '<span class="contract-label">Primary Branch</span>' +
            '<span class="contract-value" style="color:' + color + '">' + escapeHtml(info.branch) +
              '<button class="info-popover-btn" data-popover="branch">?</button>' +
              '<div class="info-popover" id="popover-branch">Your main learning area, chosen based on your goals and current situation.</div>' +
            '</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Support Branch</span>' +
            '<span class="contract-value">Learncenter' +
              '<button class="info-popover-btn" data-popover="support">?</button>' +
              '<div class="info-popover" id="popover-support">Additional resources and community support to reinforce your main path.</div>' +
            '</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Primary Coach</span>' +
            '<span class="contract-value" style="color:' + color + '">' + escapeHtml(name) +
              '<button class="info-popover-btn" data-popover="coach">?</button>' +
              '<div class="info-popover" id="popover-coach">Your AI coach, matched to your personality and goal profile.</div>' +
            '</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Why this matters</span>' +
            '<span class="contract-value">' + escapeHtml(info.why) + '</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">First focus</span>' +
            '<span class="contract-value">' + escapeHtml(info.focus) + '</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">First proof</span>' +
            '<span class="contract-value">' + escapeHtml(info.proof) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-contract-start">Start My Path</button>' +
    '</div>'
  );
}

// ── COACH VIDEO ─────────────────────────────────────────────
function htmlCoachVideo() {
  const c = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';
  const name = COACH_NAMES[c] || 'Your Coach';
  return (
    '<div class="screen-content">' +
      '<h1 class="headline" style="padding-top:16px">Meet ' + escapeHtml(name) + '</h1>' +
      '<p class="subtitle">Your AI coach, ready to go.</p>' +
      '<div class="video-placeholder" style="border-color:' + color + '44">' +
        '<button class="video-skip-btn" id="btn-coach-video-skip">Skip</button>' +
        coachPortraitHTML(56) +
        '<div class="video-label" style="color:' + color + '">' + escapeHtml(name) + ' — Introduction</div>' +
        '<div class="video-transition-text">Transition video will be here.</div>' +
      '</div>' +
    '</div>'
  );
}

// ── KNOWLEDGE CHECK ─────────────────────────────────────────
function htmlKnowledgeCheck() {
  const c = state.coach || 'kayra';
  const check = KNOWLEDGE_CHECKS[c] || KNOWLEDGE_CHECKS.kayra;
  const letters = ['A','B','C'];
  return (
    '<div class="screen-content" style="padding-top:20px">' +
      '<h2 class="headline-sm">Quick check.</h2>' +
      '<p class="subtitle">Let\'s see how aligned we are.</p>' +
      '<div style="margin-top:28px">' +
        '<p class="kc-question">' + escapeHtml(check.question) + '</p>' +
        check.options.map((opt, i) =>
          '<div class="kc-option" data-index="' + i + '" data-correct="' + (i === check.correct ? 'true' : 'false') + '">' +
            '<span class="kc-letter">' + letters[i] + '</span>' +
            escapeHtml(opt) +
          '</div>'
        ).join('') +
      '</div>' +
    '</div>'
  );
}

// ── RESOURCE SUCCESS REPEAT ─────────────────────────────────
function htmlResourceSuccessRepeat() {
  return (
    '<div class="screen-content">' +
      '<div style="padding-top:20px">' +
        '<h1 class="headline">Keep it up.</h1>' +
        '<p class="subtitle">More resources earned.</p>' +
      '</div>' +
      '<div style="margin-top:32px">' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">💡</span><span>Neurons</span></div>' +
          '<div class="resource-reward-amount" id="reward2-neurons">0</div>' +
        '</div>' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">⏱</span><span>Minutes</span></div>' +
          '<div class="resource-reward-amount" id="reward2-minutes">0</div>' +
        '</div>' +
        '<div class="resource-reward-row">' +
          '<div class="resource-reward-left"><span class="resource-reward-icon">🎵</span><span>BRAYN Beats</span></div>' +
          '<div class="resource-reward-amount" id="reward2-beats">0</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-collect-resources">Collect</button>' +
    '</div>'
  );
}

// ── TOKEN REWARD ────────────────────────────────────────────
function htmlTokenReward() {
  const color = state.coachColor || '#D5F20E';
  return (
    '<div class="screen-content">' +
      '<div class="token-reveal-container">' +
        '<div class="token-shape earned" style="background:' + color + '22;box-shadow:0 0 40px ' + color + '66">' +
          '<span style="font-size:36px">⭐</span>' +
        '</div>' +
        '<h1 class="headline text-center">Token unlocked.</h1>' +
        '<p class="subtitle text-center">This is your first visible proof of progress.</p>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-add-token">Add to BRAYN ID</button>' +
    '</div>'
  );
}

// ── SENZOR INTRO ────────────────────────────────────────────
function htmlSenzorIntro() {
  return (
    '<div class="screen-content">' +
      '<h1 class="headline" style="padding-top:16px">Meet Senzor</h1>' +
      '<p class="subtitle">Your guide through uncertainty.</p>' +
      '<div class="video-placeholder" style="border-color:#FF2D7844">' +
        '<button class="video-skip-btn" id="btn-senzor-skip">Skip</button>' +
        '<div class="coach-portrait" style="width:56px;height:56px;background:#FF2D7822;border:2px solid #FF2D78;color:#FF2D78;font-size:22px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center">S</div>' +
        '<div class="video-label" style="color:#FF2D78">Senzor — Introduction</div>' +
        '<div class="video-transition-text">Transition video will be here.</div>' +
      '</div>' +
    '</div>'
  );
}

// ── IDENTITY INFOGRAPHIC ────────────────────────────────────
function htmlIdentityInfographic() {
  return (
    '<div class="screen-content">' +
      '<h1 class="headline" style="padding-top:20px">Who are you<br>becoming?</h1>' +
      '<p class="subtitle">Senzor helps turn uncertainty into a clearer growth signal.</p>' +
      '<div class="radar-container">' +
        '<svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<circle cx="110" cy="110" r="75" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<circle cx="110" cy="110" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<circle cx="110" cy="110" r="25" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<line x1="110" y1="10" x2="110" y2="210" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<line x1="10" y1="110" x2="210" y2="110" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<line x1="39" y1="39" x2="181" y2="181" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<line x1="181" y1="39" x2="39" y2="181" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>' +
          '<polygon points="110,35 170,80 155,155 65,155 50,80" fill="rgba(255,45,120,0.15)" stroke="#FF2D78" stroke-width="1.5" opacity="0.8"/>' +
          '<circle cx="110" cy="35" r="4" fill="#FF2D78"/>' +
          '<circle cx="170" cy="80" r="4" fill="#FF2D78"/>' +
          '<circle cx="155" cy="155" r="4" fill="#FF2D78"/>' +
          '<circle cx="65" cy="155" r="4" fill="#FF2D78"/>' +
          '<circle cx="50" cy="80" r="4" fill="#FF2D78"/>' +
          '<text x="110" y="22" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">Clarity</text>' +
          '<text x="188" y="82" text-anchor="start" fill="rgba(255,255,255,0.5)" font-size="10">Focus</text>' +
          '<text x="165" y="170" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">Action</text>' +
          '<text x="55" y="170" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">Courage</text>' +

        '</svg>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-see-contract">See My Contract</button>' +
    '</div>'
  );
}

// ── SENZOR CONTRACT ─────────────────────────────────────────
function htmlSenzorContract() {
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<div style="padding-top:16px">' +
        '<div class="coach-portrait" style="width:52px;height:52px;background:#FF2D7822;border:2px solid #FF2D78;color:#FF2D78;font-size:20px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:12px">S</div>' +
        '<h1 class="headline-sm">Your clarity contract<br>is ready.</h1>' +
        '<div class="contract-card" style="border-color:#FF2D7844">' +
          '<div class="contract-row">' +
            '<span class="contract-label">Primary Branch</span>' +
            '<span class="contract-value" style="color:#FF2D78">Thinking, Decisions &amp; Cognitive Agility</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Support Branch</span>' +
            '<span class="contract-value">Learncenter</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Primary Coach</span>' +
            '<span class="contract-value" style="color:#FF2D78">Senzor</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">Why this matters</span>' +
            '<span class="contract-value">How you think shapes every decision you make.</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">First focus</span>' +
            '<span class="contract-value">Mapping your current mental blocks and patterns.</span>' +
          '</div>' +
          '<div class="contract-row">' +
            '<span class="contract-label">First proof</span>' +
            '<span class="contract-value">A personal decision clarity framework.</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-senzor-contract-start">Start My Path</button>' +
    '</div>'
  );
}

// ── BRAYN ID ACHIEVEMENTS ───────────────────────────────────
function htmlBrainIdAchievements() {
  const color = state.coachColor || '#D5F20E';
  const hexes = Array.from({length: 12}, (_, i) =>
    '<div class="token-hex' + (i === 0 ? ' earned' : ' bw') + '" id="token-hex-' + i + '" style="' + (i === 0 ? 'background:' + color + '22;box-shadow:0 0 20px ' + color + '55' : '') + '">' +
      '<span style="font-size:' + (i === 0 ? '18' : '14') + 'px">' + (i === 0 ? '⭐' : '◻') + '</span>' +
    '</div>'
  ).join('');
  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<div style="padding-top:20px">' +
        '<h1 class="headline">Your BRAYN ID<br>just got stronger.</h1>' +
        '<p class="subtitle">This is where your artifacts, tokens, and proofs will live.</p>' +
        '<div class="token-grid" style="margin-top:24px">' + hexes + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-braynid-continue">Continue</button>' +
    '</div>'
  );
}

// ── CALIBRATION INTRO ───────────────────────────────────────
function htmlCalibrationIntro() {
  return (
    '<div class="screen-content">' +
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center">' +
        '<h1 class="headline">Let\'s calibrate<br>your goal.</h1>' +
        '<p class="subtitle">A better signal gives your coach a sharper path, stronger support, and more useful next steps.</p>' +
        '<div class="calibration-icon">🎯</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary no-pulse" id="btn-calib-voice">Talk to My Coach</button>' +
      '<button class="btn-secondary" id="btn-calib-text">Use Text Instead</button>' +
    '</div>'
  );
}

// ── MIC PERMISSION ──────────────────────────────────────────
function htmlMicPermission() {
  return (
    '<div class="screen-content">' +
      '<div class="mic-icon-container">' +
        '<div class="mic-icon">🎙</div>' +
        '<h1 class="headline text-center">Allow microphone<br>access</h1>' +
        '<p class="subtitle text-center">Your coach uses voice to understand your goal better</p>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary no-pulse" id="btn-allow-mic">Allow Microphone</button>' +
      '<button class="btn-secondary" id="btn-use-text-instead">Use Text Instead</button>' +
    '</div>'
  );
}

// ── TEXT CALIBRATION ────────────────────────────────────────
function htmlTextCalibration() {
  const c = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';
  const initial = COACH_INITIALS[c] || '?';
  const step = state.textCalibrationStep || 0;
  const question = CALIBRATION_QUESTIONS[Math.min(step, CALIBRATION_QUESTIONS.length - 1)];

  let messagesHTML = '';
  for (let i = 0; i < step; i++) {
    messagesHTML +=
      '<div class="coach-bubble-row">' +
        '<div class="coach-avatar-small" style="background:' + color + '22;border:1px solid ' + color + ';color:' + color + '">' + initial + '</div>' +
        '<div class="chat-bubble coach">' + escapeHtml(CALIBRATION_QUESTIONS[i]) + '</div>' +
      '</div>';
    if (state.textCalibrationAnswers[i]) {
      messagesHTML += '<div class="chat-bubble user">' + escapeHtml(state.textCalibrationAnswers[i]) + '</div>';
    }
  }
  messagesHTML +=
    '<div class="coach-bubble-row" id="current-question">' +
      '<div class="coach-avatar-small" style="background:' + color + '22;border:1px solid ' + color + ';color:' + color + '">' + initial + '</div>' +
      '<div class="chat-bubble coach">' + escapeHtml(question) + '</div>' +
    '</div>';

  const dots = CALIBRATION_QUESTIONS.map((_, i) =>
    '<div class="chat-progress-dot' + (i <= step ? ' active' : '') + '"></div>'
  ).join('');

  return (
    '<div class="chat-container">' +
      '<div class="chat-progress">' + dots + '</div>' +
      '<div class="chat-messages" id="chat-messages">' + messagesHTML + '</div>' +
      '<div class="chat-input-row">' +
        '<input class="chat-input" id="chat-input" type="text" placeholder="Type your answer…" autocomplete="off">' +
        '<button class="chat-send-btn" id="chat-send" disabled>➤</button>' +
      '</div>' +
    '</div>'
  );
}

// ── AVATAR UPLOAD ───────────────────────────────────────────
function htmlAvatarUpload() {
  const avatarContent = state.avatarDataUrl
    ? '<img src="' + state.avatarDataUrl + '" alt="avatar">'
    : '<span style="font-size:40px">➕</span>';
  return (
    '<div class="screen-content">' +
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">' +
        '<h1 class="headline">Add yourself<br>to the journey.</h1>' +
        '<p class="subtitle">Upload a photo so BRAYN can personalize your path visuals.</p>' +
        '<div class="avatar-circle" id="avatar-circle">' + avatarContent + '</div>' +
        '<input type="file" id="avatar-file-input" accept="image/*" style="display:none">' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer btn-stack">' +
      '<button class="btn-primary no-pulse" id="btn-set-avatar">Set Avatar</button>' +
      '<button class="btn-secondary" id="btn-avatar-later">Set Later</button>' +
    '</div>'
  );
}

// ── FINAL GENERATION ────────────────────────────────────────
function htmlFinalGeneration() {
  const steps = [
    'Personalizing your path…',
    'Syncing with your coach…',
    'Finalizing your contract…'
  ];
  return (
    '<div class="generation-screen">' +
      '<div class="gen-logo">BRAYN</div>' +
      '<div class="gen-steps">' +
        steps.map((s, i) =>
          '<div class="gen-step" id="final-step-' + i + '">' +
            '<div class="gen-dot"></div>' +
            '<span>' + s + '</span>' +
          '</div>'
        ).join('') +
      '</div>' +
    '</div>'
  );
}

// ── EXPANDED CONTRACT ───────────────────────────────────────
function htmlExpandedContract() {
  const c = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';
  const name = COACH_NAMES[c] || 'Coach';
  const initial = COACH_INITIALS[c] || '?';
  const info = COACH_BRANCH_INFO[c] || COACH_BRANCH_INFO.kayra;
  const displayName = state.name || 'You';

  const rooms = {
    kayra: 'Career Accelerator Room',
    orra: 'Communication Mastery Room',
    maverick: 'Idea Lab Room',
    senzor: 'Cognitive Clarity Room'
  };

  const steps = {
    kayra: ['Define your value proposition this week','Request one piece of feedback from a senior peer','Draft your career narrative in 60 seconds'],
    orra: ['Identify one key conversation to improve','Practice structured response frameworks','Record and review your own communication'],
    maverick: ['Map your idea to a real problem','Identify your first potential user','Ship a minimum viable version in 7 days'],
    senzor: ['Journal your three biggest current blocks','Take the cognitive pattern audit','Design your personal decision framework']
  };

  const milestones = {
    kayra: 'Deliver a refined career narrative to one trusted contact',
    orra: 'Lead one important conversation with confidence',
    maverick: 'Present your idea to at least one real person',
    senzor: 'Complete your personal clarity map'
  };

  const whyPossible = {
    kayra: 'You\'ve already taken the hardest step: being honest about where you are.',
    orra: 'Communication is a skill — it improves with deliberate practice every day.',
    maverick: 'Every successful product started as an unproven idea. Yours is next.',
    senzor: 'Uncertainty is information. Senzor helps you decode it.'
  };

  return (
    '<div class="screen-content screen-scrollable" style="padding-bottom:16px">' +
      '<h1 class="headline" style="padding-top:20px">Your full path<br>is ready.</h1>' +
      '<div class="expanded-contract">' +
        '<div class="coach-avatar-row">' +
          '<div class="coach-portrait" style="width:52px;height:52px;background:' + color + '22;border:2px solid ' + color + ';color:' + color + ';font-size:20px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">' + initial + '</div>' +
          '<div>' +
            '<div style="font-size:15px;font-weight:600;color:' + color + '">' + escapeHtml(name) + '</div>' +
            '<div style="font-size:13px;color:var(--text-secondary)">' + escapeHtml(displayName) + '\'s personal coach</div>' +
          '</div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">Your goal</div>' +
          '<div class="info-card"><p style="font-size:14px;color:var(--text-secondary)">' + escapeHtml(info.why) + '</p></div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">Primary Room</div>' +
          '<div class="info-card" style="border-color:' + color + '44"><p style="font-size:14px;color:' + color + '">' + escapeHtml(rooms[c] || 'Learning Room') + '</p></div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">Your next 3 steps</div>' +
          '<div class="step-list">' +
            (steps[c] || steps.kayra).map(s =>
              '<div class="step-item"><div class="step-dot" style="background:' + color + '"></div><span>' + escapeHtml(s) + '</span></div>'
            ).join('') +
          '</div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">First milestone</div>' +
          '<div class="info-card"><p style="font-size:14px;color:var(--text-secondary)">' + escapeHtml(milestones[c] || '') + '</p></div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">Why this goal is possible</div>' +
          '<div class="info-card"><p style="font-size:14px;color:var(--text-secondary)">' + escapeHtml(whyPossible[c] || '') + '</p></div>' +
        '</div>' +
        '<div class="contract-section">' +
          '<div class="section-label">What BRAYN helps with next</div>' +
          '<div class="info-card"><p style="font-size:14px;color:var(--text-secondary)">Daily micro-sessions, reflection prompts, and proof generation with ' + escapeHtml(name) + '.</p></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="screen-footer">' +
      '<button class="btn-primary no-pulse" id="btn-enter-path">Enter My Path</button>' +
    '</div>'
  );
}

// ── TAB BAR HTML HELPER ─────────────────────────────────────
function tabBarHTML(activeTab) {
  const color = state.coachColor || '#D5F20E';
  const tabs = [
    { id: 'galaxy',   icon: '🌌', label: 'Galaxy' },
    { id: 'ai-hub',   icon: '🤖', label: 'AI Hub' },
    { id: 'brayn-id', icon: '🪪', label: 'BRAYN ID' },
  ];
  return (
    '<div class="tab-bar">' +
      tabs.map(t =>
        '<div class="tab-item' + (t.id === activeTab ? ' active' : '') + '" data-tab="' + t.id + '"' +
          (t.id === activeTab ? ' style="color:' + color + '"' : '') + '>' +
          '<div class="tab-icon">' + t.icon + '</div>' +
          '<div class="tab-label">' + t.label + '</div>' +
        '</div>'
      ).join('') +
    '</div>'
  );
}

// ── GALAXY ROOM ─────────────────────────────────────────────
function htmlGalaxyRoom() {
  const coach = state.coach || 'kayra';
  const color = state.coachColor || '#D5F20E';

  const ROOMS = [
    { coach: 'kayra',    color: '#D5F20E', emoji: '🌿', name: 'Career Strategy',     why: 'Your career direction goal leads here — this room helps you articulate your value and navigate your next move.' },
    { coach: 'orra',     color: '#00E5FF', emoji: '🌊', name: 'Communication',        why: 'Your focus on communication and influence shapes every outcome — this room builds real confidence.' },
    { coach: 'maverick', color: '#FF6B35', emoji: '🔥', name: 'Entrepreneurship',     why: 'Your path to building and executing lives here — ideas become actions in this room.' },
    { coach: 'senzor',   color: '#FF2D78', emoji: '🔬', name: 'Thinking & Clarity',   why: 'Cognitive agility and decision clarity are your foundation — Senzor guides you here.' },
  ];

  const activeRoom = ROOMS.find(r => r.coach === coach) || ROOMS[0];

  const roomsHTML = ROOMS.map(room => {
    const isActive = room.coach === coach;
    return (
      '<div class="galaxy-room-card' + (isActive ? ' active' : '') + '"' +
        (isActive ? ' style="border-color:' + room.color + ';background:' + room.color + '15"' : '') + '>' +
        '<div class="galaxy-room-orb"' +
          ' style="background:' + (isActive ? 'radial-gradient(circle at 35% 35%,' + room.color + 'bb,' + room.color + '33)' : 'rgba(255,255,255,0.06)') + ';' +
          'border-color:' + (isActive ? room.color : 'rgba(255,255,255,0.1)') + ';' +
          'opacity:' + (isActive ? '1' : '0.35') + ';' +
          (isActive ? 'box-shadow:0 0 20px ' + room.color + '66' : '') + '">' +
          room.emoji +
        '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:14px;font-weight:700;color:' + (isActive ? '#fff' : 'rgba(255,255,255,0.45)') + '">' + room.name + '</div>' +
          (isActive
            ? '<div style="font-size:10px;font-weight:700;color:' + room.color + ';margin-top:3px;letter-spacing:0.05em">YOUR ROOM · ACTIVE</div>'
            : '<div style="font-size:10px;color:rgba(255,255,255,0.25);margin-top:3px">🔒 Locked</div>'
          ) +
        '</div>' +
      '</div>'
    );
  }).join('');

  return (
    '<div class="galaxy-screen">' +
      '<div class="galaxy-bg"></div>' +
      '<div class="stars-layer"></div>' +
      '<div class="particles-bg" id="galaxy-particles"></div>' +
      '<div style="position:relative;z-index:1;flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:24px var(--screen-pad) 16px">' +
        '<h1 class="headline">Welcome to<br>your Galaxy.</h1>' +
        '<p class="subtitle">One room is live. Others unlock as you grow.</p>' +
        '<div class="galaxy-rooms-list" style="margin-top:20px">' + roomsHTML + '</div>' +
        '<div class="galaxy-why-card" style="border-color:' + color + '44;margin-top:16px">' +
          '<div style="font-size:10px;font-weight:700;color:' + color + ';letter-spacing:0.1em;margin-bottom:6px">WHY THIS ROOM</div>' +
          '<p style="font-size:14px;color:var(--text-secondary);line-height:1.5">' + escapeHtml(activeRoom.why) + '</p>' +
        '</div>' +
        '<div style="margin-top:20px;padding-bottom:8px">' +
          '<button class="btn-primary no-pulse" id="btn-galaxy-continue">Enter My Room</button>' +
        '</div>' +
      '</div>' +
      tabBarHTML('galaxy') +
    '</div>'
  );
}

// ── AI HUB TIP ──────────────────────────────────────────────
function htmlAiHubTip() {
  const color = state.coachColor || '#D5F20E';

  const COACHES = [
    { id: 'kayra',    color: '#D5F20E', initial: 'K', name: 'Kayra',    role: 'Career Strategy & Leadership' },
    { id: 'orra',     color: '#00E5FF', initial: 'O', name: 'Orra',     role: 'Communication & Presence' },
    { id: 'maverick', color: '#FF6B35', initial: 'M', name: 'Maverick', role: 'Entrepreneurship & Execution' },
    { id: 'senzor',   color: '#FF2D78', initial: 'S', name: 'Senzor',   role: 'Thinking & Cognitive Clarity' },
  ];

  const coachCardsHTML = COACHES.map(c => {
    const isActive = c.id === (state.coach || 'kayra');
    return (
      '<div class="ai-coach-card"' + (isActive ? ' style="border-color:' + c.color + ';background:' + c.color + '12"' : '') + '>' +
        '<div class="coach-portrait" style="width:44px;height:44px;background:' + c.color + '22;border:2px solid ' + c.color + ';color:' + c.color + ';font-size:18px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-bottom:0">' + c.initial + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:14px;font-weight:700;color:' + c.color + '">' + c.name + (isActive ? ' <span style=\'font-size:10px;background:' + c.color + ';color:#020B18;padding:2px 6px;border-radius:99px;font-weight:700\'>YOURS</span>' : '') + '</div>' +
          '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px">' + c.role + '</div>' +
        '</div>' +
        '<div class="ai-coach-action-row">' +
          '<button class="ai-action-btn" data-coach="' + c.id + '" data-mode="voice">🎙 Voice</button>' +
          '<button class="ai-action-btn" data-coach="' + c.id + '" data-mode="text">💬 Text</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  return (
    '<div style="display:flex;flex-direction:column;height:100%">' +
      '<div style="flex:1;overflow-y:auto;padding:24px var(--screen-pad) 16px">' +
        '<h1 class="headline">AI Hub</h1>' +
        '<p class="subtitle">Choose a coach and start a live or text session.</p>' +
        '<div class="ai-coach-list" style="margin-top:20px">' + coachCardsHTML + '</div>' +
      '</div>' +
      tabBarHTML('ai-hub') +
    '</div>'
  );
}

// ── BRAYN ID HUB ────────────────────────────────────────────
function htmlBraynIdHub() {
  const color = state.coachColor || '#D5F20E';
  const displayName = state.name || 'Brayner';
  const neurons = state.resources.neurons || 0;
  const minutes = state.resources.minutes || 0;

  return (
    '<div style="display:flex;flex-direction:column;height:100%">' +
      '<div style="flex:1;overflow-y:auto;padding:24px var(--screen-pad) 16px">' +
        '<h1 class="headline">Your BRAYN ID</h1>' +
        '<p class="subtitle">Your proofs, tokens, and trophies.</p>' +
        '<div class="brayn-id-proof-card" style="border-color:' + color + '55;margin-top:20px;text-align:center">' +
          '<div style="font-size:48px;margin-bottom:12px">🏆</div>' +
          '<div style="font-size:11px;font-weight:700;color:' + color + ';letter-spacing:0.15em;margin-bottom:4px">BRAYN SEED PROOF</div>' +
          '<div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:4px">' + escapeHtml(displayName.toUpperCase()) + '</div>' +
          '<div style="font-size:12px;color:var(--text-secondary)">Phase 1 · Active</div>' +
        '</div>' +
        '<div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">' +
          '<div class="bid-stat-card"><div style="font-size:20px">⚡</div><div style="font-size:20px;font-weight:700;color:' + color + '">' + neurons + '</div><div style="font-size:9px;color:var(--text-tertiary);font-weight:700;letter-spacing:0.08em">NEURONS</div></div>' +
          '<div class="bid-stat-card"><div style="font-size:20px">⏱</div><div style="font-size:20px;font-weight:700;color:' + color + '">' + minutes + '</div><div style="font-size:9px;color:var(--text-tertiary);font-weight:700;letter-spacing:0.08em">MINUTES</div></div>' +
          '<div class="bid-stat-card"><div style="font-size:20px">⭐</div><div style="font-size:20px;font-weight:700;color:' + color + '">1</div><div style="font-size:9px;color:var(--text-tertiary);font-weight:700;letter-spacing:0.08em">TOKEN</div></div>' +
        '</div>' +
        '<p class="helper" style="margin-top:16px;text-align:center;line-height:1.6">BRAYN ID stores your proofs, tokens, trophies, and all future growth artifacts. It evolves as you grow.</p>' +
      '</div>' +
      tabBarHTML('brayn-id') +
    '</div>'
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN INITIALIZERS (post-render JS)
// ═══════════════════════════════════════════════════════════
function initScreen(name, el) {
  switch (name) {
    case 'splash':           initSplash(el); break;
    case 'signup':           initSignup(el); break;
    case 'faceId':           initFaceId(el); break;
    case 'introVideo':       initIntroVideo(el); break;
    case 'transition1':      initTransition(el, 'nameInput', 3000); break;
    case 'transition2':      initTransition(el, 'whoAreYou', 3000); break;
    case 'transition3':      initTransition(el, 'whatWant', 3000); break;
    case 'transition4':      initTransition(el, 'timeWheel', 1000); break;
    case 'nameInput':        initNameInput(el); break;
    case 'whoAreYou':        initWhoAreYou(el); break;
    case 'whatWant':         initWhatWant(el); break;
    case 'timeWheel':        initTimeWheel(el); break;
    case 'notificationPermission': initNotification(el); break;
    case 'resourceSuccess':  initResourceSuccess(el); break;
    case 'resourceEducation':initResourceEducation(el); break;
    case 'firstProofTrophy': initFirstProofTrophy(el); break;
    case 'braynIdFirstLook': initBraynIdFirstLook(el); break;
    case 'aiPathGeneration': initAiPathGeneration(el); break;
    case 'learningContract': initLearningContract(el); break;
    case 'coachVideo':       initCoachVideo(el); break;
    case 'knowledgeCheck':   initKnowledgeCheck(el); break;
    case 'resourceSuccessRepeat': initResourceSuccessRepeat(el); break;
    case 'tokenReward':      initTokenReward(el); break;
    case 'senzorIntro':      initSenzorIntro(el); break;
    case 'identityInfographic': initIdentityInfographic(el); break;
    case 'senzorContract':   initSenzorContract(el); break;
    case 'brainIdAchievements': initBrainIdAchievements(el); break;
    case 'calibrationIntro': initCalibrationIntro(el); break;
    case 'micPermission':    initMicPermission(el); break;
    case 'textCalibration':  initTextCalibration(el); break;
    case 'avatarUpload':     initAvatarUpload(el); break;
    case 'finalGeneration':  initFinalGeneration(el); break;
    case 'expandedContract': initExpandedContract(el); break;
    case 'galaxyRoom':       initGalaxyRoom(el); break;
    case 'aiHubTip':         initAiHubTip(el); break;
    case 'braynIdHub':       initBraynIdHub(el); break;
  }
}

function initSplash(el) {
  const pBg = el.querySelector('#splash-particles');
  if (pBg) createParticles(pBg, 20);
  setTransitionTimer(2000, () => navigate('signup'));
}

function initSignup(el) {
  const apple = el.querySelector('#btn-apple');
  const google = el.querySelector('#btn-google');
  if (apple) apple.addEventListener('click', () => navigate('faceId'));
  if (google) google.addEventListener('click', () => navigate('faceId'));
}

function initFaceId(el) {
  const enable = el.querySelector('#btn-faceid');
  const skip = el.querySelector('#btn-faceid-skip');
  if (enable) enable.addEventListener('click', () => navigate('introVideo'));
  if (skip) skip.addEventListener('click', () => navigate('introVideo'));
}

function initIntroVideo(el) {
  const skip = el.querySelector('#btn-intro-skip');
  if (skip) skip.addEventListener('click', () => { clearTransitionTimer(); navigate('transition1'); });
  setTransitionTimer(3000, () => navigate('transition1'));
}

function initTransition(el, nextScreen, duration) {
  const pBg = el.querySelector('[id$="-particles"]');
  if (pBg) createParticles(pBg, 16, ['#D5F20E','#00E5FF','#FF6B35','#FF2D78']);
  setTransitionTimer(duration, () => navigate(nextScreen));
}

function initNameInput(el) {
  const field = el.querySelector('#name-field');
  const headline = el.querySelector('#name-headline');
  const btn = el.querySelector('#btn-name-continue');
  if (!field || !btn) return;

  field.addEventListener('input', () => {
    const val = field.value.trim();
    state.name = val;
    if (headline) headline.textContent = val.length >= 2 ? 'Cool, ' + escapeHtml(val) + '.' : 'What should we call you?';
    if (val.length >= 2) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
    saveState();
  });

  btn.addEventListener('click', () => {
    if (state.name.length >= 2) navigate('transition2');
  });

  setTimeout(() => { if (field) field.focus(); }, 300);
}

function initWhoAreYou(el) {
  const cards = el.querySelectorAll('.choice-card');
  const btn = el.querySelector('#btn-who-continue');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const choice = card.dataset.choice;
      state.whoAreYou = choice;
      saveState();

      cards.forEach(c => {
        const isSelected = c.dataset.choice === choice;
        c.classList.toggle('selected', isSelected);
        c.style.borderColor = isSelected ? 'var(--neon-green)' : '';
        c.style.background = isSelected ? 'rgba(213,242,14,0.07)' : '';
        const icon = c.querySelector('.check-icon');
        if (icon) {
          icon.style.color = isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
          icon.style.borderColor = isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
        }
      });

      if (btn) {
        btn.classList.remove('disabled');
        btn.textContent = 'Continue';
      }
    });
  });

  if (btn) {
    btn.addEventListener('click', () => {
      if (state.whoAreYou) navigate('transition3');
    });
  }
}

function initWhatWant(el) {
  const cards = el.querySelectorAll('.choice-card');
  const btn = el.querySelector('#btn-want-continue');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const choice = card.dataset.choice;
      state.whatWant = choice;

      const result = computeCoach();
      state.coach = result.coach;
      state.coachColor = result.color;
      saveState();

      cards.forEach(c => {
        const isSelected = c.dataset.choice === choice;
        c.classList.toggle('selected', isSelected);
        c.style.borderColor = isSelected ? 'var(--neon-green)' : '';
        c.style.background = isSelected ? 'rgba(213,242,14,0.07)' : '';
        const icon = c.querySelector('.check-icon');
        if (icon) {
          icon.style.color = isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
          icon.style.borderColor = isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.2)';
        }
      });

      if (btn) {
        btn.classList.remove('disabled');
        btn.textContent = 'Build My Path';
      }
    });
  });

  if (btn) {
    btn.addEventListener('click', () => {
      if (state.whatWant) navigate('transition4');
    });
  }
}

function initTimeWheel(el) {
  const wheelList = el.querySelector('#time-wheel-list');
  const btn = el.querySelector('#btn-time-continue');
  if (!wheelList) return;

  const values = [5, 10, 20, 30, 40];
  const items = wheelList.querySelectorAll('.wheel-item[data-value]');

  function updateCenterItem() {
    const containerHeight = wheelList.clientHeight;
    const scrollTop = wheelList.scrollTop;
    const centerY = scrollTop + containerHeight / 2;

    let closest = null;
    let closestDist = Infinity;
    items.forEach(item => {
      const itemCenter = item.offsetTop + item.offsetHeight / 2;
      const dist = Math.abs(itemCenter - centerY);
      if (dist < closestDist) {
        closestDist = dist;
        closest = item;
      }
    });

    items.forEach(item => item.classList.remove('center-item'));
    if (closest) {
      closest.classList.add('center-item');
      const newValue = parseInt(closest.dataset.value, 10);
      if (newValue !== state.timePerDay) {
        state.timePerDay = newValue;
        saveState();
        if (btn) btn.classList.remove('disabled');
      }
    }
  }

  // Scroll to saved value or default (10)
  const defaultValue = state.timePerDay || 10;
  const targetItem = wheelList.querySelector('[data-value="' + defaultValue + '"]');
  if (targetItem) {
    const containerHeight = wheelList.clientHeight;
    wheelList.scrollTop = targetItem.offsetTop - containerHeight / 2 + targetItem.offsetHeight / 2;
    updateCenterItem();
  }

  let scrollTimeout;
  wheelList.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateCenterItem, 80);
  }, { passive: true });

  if (btn) {
    btn.addEventListener('click', () => {
      if (state.timePerDay) navigate('notificationPermission');
    });
  }
}

function initNotification(el) {
  const allow = el.querySelector('#btn-notif-allow');
  const skip = el.querySelector('#btn-notif-skip');
  if (allow) allow.addEventListener('click', () => navigate('resourceSuccess'));
  if (skip) skip.addEventListener('click', () => navigate('resourceSuccess'));
}

function initResourceSuccess(el) {
  setTimeout(() => {
    animateCounter(el.querySelector('#reward-neurons'), 200);
    animateCounter(el.querySelector('#reward-minutes'), 60, 1000);
    animateCounter(el.querySelector('#reward-beats'), 30, 800);
  }, 300);

  const btn = el.querySelector('#btn-take-resources');
  if (btn) {
    btn.addEventListener('click', () => {
      state.resources.neurons += 200;
      state.resources.minutes += 60;
      state.resources.beats += 30;
      saveState();
      updateResourceBar(state.currentScreen);
      navigate('resourceEducation');
    });
  }
}

function initResourceEducation(el) {
  const btn = el.querySelector('#btn-edu-gotit');
  if (btn) btn.addEventListener('click', () => navigate('firstProofTrophy'));
}

function initFirstProofTrophy(el) {
  const cont = el.querySelector('#btn-trophy-continue');
  const share = el.querySelector('#btn-trophy-share');
  if (cont) cont.addEventListener('click', () => navigate('braynIdFirstLook'));
  if (share) share.addEventListener('click', () => showToast('Share link copied!'));
}

function initBraynIdFirstLook(el) {
  const btn = el.querySelector('#btn-braynid-firstlook-continue');
  if (btn) btn.addEventListener('click', () => navigate('aiPathGeneration'));
}

function initAiPathGeneration(el) {
  const steps = [0, 1, 2, 3].map(i => el.querySelector('#gen-step-' + i));
  let idx = 0;

  function showNext() {
    if (idx >= steps.length) {
      const nextScreen = state.coach === 'senzor' ? 'senzorIntro' : 'learningContract';
      setTransitionTimer(600, () => navigate(nextScreen));
      return;
    }
    const step = steps[idx];
    if (step) {
      step.classList.add('visible');
      if (idx > 0 && steps[idx - 1]) steps[idx - 1].classList.add('done');
    }
    idx++;
    setTransitionTimer(800, showNext);
  }

  setTransitionTimer(400, showNext);
}

function initLearningContract(el) {
  const btn = el.querySelector('#btn-contract-start');
  if (btn) btn.addEventListener('click', () => navigate('coachVideo'));

  const popoverBtns = el.querySelectorAll('.info-popover-btn');
  popoverBtns.forEach(pbtn => {
    pbtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = pbtn.dataset.popover;
      const popover = el.querySelector('#popover-' + pid);
      const allPopovers = el.querySelectorAll('.info-popover');
      allPopovers.forEach(p => { if (p !== popover) p.classList.remove('visible'); });
      if (popover) popover.classList.toggle('visible');
    });
  });

  el.addEventListener('click', () => {
    el.querySelectorAll('.info-popover').forEach(p => p.classList.remove('visible'));
  });
}

function initCoachVideo(el) {
  const skip = el.querySelector('#btn-coach-video-skip');
  if (skip) skip.addEventListener('click', () => { clearTransitionTimer(); navigate('knowledgeCheck'); });
  setTransitionTimer(3000, () => navigate('knowledgeCheck'));
}

function initKnowledgeCheck(el) {
  const options = el.querySelectorAll('.kc-option');
  let answered = false;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const isCorrect = opt.dataset.correct === 'true';
      opt.classList.add(isCorrect ? 'correct' : 'wrong');

      if (!isCorrect) {
        // Show correct answer after shake
        setTimeout(() => {
          options.forEach(o => {
            if (o.dataset.correct === 'true') o.classList.add('correct');
          });
          setTimeout(() => navigate('resourceSuccessRepeat'), 1200);
        }, 600);
      } else {
        setTimeout(() => navigate('resourceSuccessRepeat'), 1000);
      }
    });
  });
}

function initResourceSuccessRepeat(el) {
  setTimeout(() => {
    animateCounter(el.querySelector('#reward2-neurons'), 100);
    animateCounter(el.querySelector('#reward2-minutes'), 30, 1000);
    animateCounter(el.querySelector('#reward2-beats'), 15, 800);
  }, 300);

  const btn = el.querySelector('#btn-collect-resources');
  if (btn) {
    btn.addEventListener('click', () => {
      state.resources.neurons += 100;
      state.resources.minutes += 30;
      state.resources.beats += 15;
      saveState();
      updateResourceBar(state.currentScreen);
      navigate('tokenReward');
    });
  }
}

function initTokenReward(el) {
  const btn = el.querySelector('#btn-add-token');
  if (btn) btn.addEventListener('click', () => navigate('brainIdAchievements'));
}

function initSenzorIntro(el) {
  const skip = el.querySelector('#btn-senzor-skip');
  if (skip) skip.addEventListener('click', () => { clearTransitionTimer(); navigate('identityInfographic'); });
  setTransitionTimer(3000, () => navigate('identityInfographic'));
}

function initIdentityInfographic(el) {
  const btn = el.querySelector('#btn-see-contract');
  if (btn) btn.addEventListener('click', () => navigate('senzorContract'));
}

function initSenzorContract(el) {
  const btn = el.querySelector('#btn-senzor-contract-start');
  if (btn) btn.addEventListener('click', () => navigate('knowledgeCheck'));
}

function initBrainIdAchievements(el) {
  const btn = el.querySelector('#btn-braynid-continue');
  if (btn) btn.addEventListener('click', () => navigate('calibrationIntro'));
}

function initCalibrationIntro(el) {
  const voice = el.querySelector('#btn-calib-voice');
  const text = el.querySelector('#btn-calib-text');
  if (voice) voice.addEventListener('click', () => { state.calibrationMode = 'voice'; saveState(); navigate('micPermission'); });
  if (text) text.addEventListener('click', () => { state.calibrationMode = 'text'; saveState(); navigate('textCalibration'); });
}

function initMicPermission(el) {
  const allow = el.querySelector('#btn-allow-mic');
  const useText = el.querySelector('#btn-use-text-instead');
  if (allow) allow.addEventListener('click', () => { state.calibrationMode = 'voice'; saveState(); navigate('avatarUpload'); });
  if (useText) useText.addEventListener('click', () => { state.calibrationMode = 'text'; saveState(); navigate('textCalibration'); });
}

function initTextCalibration(el) {
  const input = el.querySelector('#chat-input');
  const sendBtn = el.querySelector('#chat-send');
  const messages = el.querySelector('#chat-messages');

  if (!input || !sendBtn) return;

  input.addEventListener('input', () => {
    sendBtn.disabled = input.value.trim().length === 0;
  });

  function scrollToBottom() {
    if (messages) messages.scrollTop = messages.scrollHeight;
  }
  setTimeout(scrollToBottom, 100);

  function sendAnswer() {
    const answer = input.value.trim();
    if (!answer) return;

    if (!state.textCalibrationAnswers) state.textCalibrationAnswers = [];
    state.textCalibrationAnswers[state.textCalibrationStep] = answer;
    state.textCalibrationStep++;
    saveState();

    input.value = '';
    sendBtn.disabled = true;

    if (state.textCalibrationStep >= CALIBRATION_QUESTIONS.length) {
      navigate('avatarUpload');
      return;
    }

    // Add user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = answer;
    if (messages) messages.appendChild(userBubble);

    // Add next coach question
    setTimeout(() => {
      const c = state.coach || 'kayra';
      const color = state.coachColor || '#D5F20E';
      const initial = COACH_INITIALS[c] || '?';
      const nextQ = CALIBRATION_QUESTIONS[state.textCalibrationStep];

      const row = document.createElement('div');
      row.className = 'coach-bubble-row';
      row.innerHTML =
        '<div class="coach-avatar-small" style="background:' + color + '22;border:1px solid ' + color + ';color:' + color + '">' + initial + '</div>' +
        '<div class="chat-bubble coach">' + escapeHtml(nextQ) + '</div>';
      if (messages) messages.appendChild(row);

      // Update progress dots
      const dots = el.querySelectorAll('.chat-progress-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i <= state.textCalibrationStep));

      scrollToBottom();
    }, 500);
  }

  sendBtn.addEventListener('click', sendAnswer);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendAnswer(); } });
}

function initAvatarUpload(el) {
  const circle = el.querySelector('#avatar-circle');
  const fileInput = el.querySelector('#avatar-file-input');
  const setBtn = el.querySelector('#btn-set-avatar');
  const laterBtn = el.querySelector('#btn-avatar-later');

  if (circle && fileInput) {
    circle.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        state.avatarDataUrl = e.target.result;
        state.avatarSet = true;
        saveState();
        circle.innerHTML = '<img src="' + e.target.result + '" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      };
      reader.readAsDataURL(file);
    });
  }

  if (setBtn) {
    setBtn.addEventListener('click', () => {
      if (state.avatarSet) {
        navigate('finalGeneration');
      } else if (fileInput) {
        fileInput.click();
      } else {
        navigate('finalGeneration');
      }
    });
  }
  if (laterBtn) laterBtn.addEventListener('click', () => navigate('finalGeneration'));
}

function initFinalGeneration(el) {
  const steps = [0, 1, 2].map(i => el.querySelector('#final-step-' + i));
  let idx = 0;

  function showNext() {
    if (idx >= steps.length) {
      setTransitionTimer(400, () => navigate('expandedContract'));
      return;
    }
    const step = steps[idx];
    if (step) {
      step.classList.add('visible');
      if (idx > 0 && steps[idx - 1]) steps[idx - 1].classList.add('done');
    }
    idx++;
    setTransitionTimer(800, showNext);
  }

  setTransitionTimer(300, showNext);
}

function initExpandedContract(el) {
  const btn = el.querySelector('#btn-enter-path');
  if (btn) btn.addEventListener('click', () => navigate('galaxyRoom'));
}

function initGalaxyRoom(el) {
  const pBg = el.querySelector('#galaxy-particles');
  if (pBg) createParticles(pBg, 25, ['#ffffff','#D5F20E','#00E5FF']);
  const btn = el.querySelector('#btn-galaxy-continue');
  if (btn) btn.addEventListener('click', () => navigate('aiHubTip'));
  initTabBar(el);
}

function initAiHubTip(el) {
  const actionBtns = el.querySelectorAll('.ai-action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const coachName = btn.dataset.coach;
      const mode = btn.dataset.mode;
      const modeLabel = mode === 'voice' ? 'voice session' : 'text chat';
      showToast('Starting ' + modeLabel + ' with ' + (coachName.charAt(0).toUpperCase() + coachName.slice(1)) + '…');
    });
  });
  initTabBar(el);
}

function initBraynIdHub(el) {
  initTabBar(el);
}

function initTabBar(el) {
  const tabs = el.querySelectorAll('.tab-item[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      if (tabId === 'galaxy') navigate('galaxyRoom');
      else if (tabId === 'ai-hub') navigate('aiHubTip');
      else if (tabId === 'brayn-id') navigate('braynIdHub');
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  DEBUG PANEL
// ═══════════════════════════════════════════════════════════
function renderDebugPanel() {
  const panel = document.getElementById('debug-panel');
  if (!panel) return;

  const isDesktop = window.innerWidth >= 768;
  const forceVisible = panel.dataset.visible === 'true';

  if (!isDesktop && !forceVisible) {
    panel.className = 'debug-panel hidden';
    return;
  }

  panel.className = 'debug-panel';
  panel.innerHTML =
    '<div class="debug-title">Debug Router</div>' +
    '<div class="debug-screens">' +
      ALL_SCREENS.map(s =>
        '<button class="debug-btn' + (s === state.currentScreen ? ' active' : '') + '" data-screen="' + s + '">' + s + '</button>'
      ).join('') +
    '</div>';

  panel.querySelectorAll('.debug-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      clearTransitionTimer();
      navigate(btn.dataset.screen);
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  UTILITY
// ═══════════════════════════════════════════════════════════
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ═══════════════════════════════════════════════════════════
//  HAPTIC FEEDBACK
// ═══════════════════════════════════════════════════════════
function triggerHaptic() {
  try {
    if (navigator.vibrate) navigator.vibrate(12);
  } catch (_) {}
}

// ═══════════════════════════════════════════════════════════
//  CTA ENCOURAGEMENT HINT
// ═══════════════════════════════════════════════════════════
const CTA_HINTS = ['Nice.', 'Good move.', 'Locked in.', "Let's go.", 'Smart step.', 'Great.'];

function showCtaHint(btn) {
  const hint = document.createElement('div');
  hint.className = 'cta-hint';
  hint.textContent = CTA_HINTS[Math.floor(Math.random() * CTA_HINTS.length)];

  const rect = btn.getBoundingClientRect();
  hint.style.cssText = [
    'position:fixed',
    'left:' + (rect.left + rect.width / 2) + 'px',
    'top:' + (rect.top - 12) + 'px',
    'transform:translateX(-50%)',
  ].join(';');

  document.body.appendChild(hint);
  // trigger reflow so animation starts fresh
  hint.getBoundingClientRect();
  hint.classList.add('cta-hint-active');

  setTimeout(() => {
    if (hint.parentNode) hint.parentNode.removeChild(hint);
  }, 900);
}

// ═══════════════════════════════════════════════════════════
//  GLOBAL CTA BUTTON HANDLER (haptic + bounce + hint)
// ═══════════════════════════════════════════════════════════
function setupCtaFeedback() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-primary:not([disabled]):not(.disabled)');
    if (!btn) return;
    triggerHaptic();
    btn.classList.add('btn-tap');
    setTimeout(() => btn.classList.remove('btn-tap'), 420);
    showCtaHint(btn);
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
//  TRIPLE-TAP LOGO HANDLER
// ═══════════════════════════════════════════════════════════
function setupTripleTap() {
  let tapCount = 0;
  let tapTimer = null;

  document.addEventListener('click', (e) => {
    const logo = e.target.closest('.brayn-logo-tap');
    if (!logo) return;
    tapCount++;
    if (tapTimer) clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 800);
    if (tapCount >= 3) {
      tapCount = 0;
      const panel = document.getElementById('debug-panel');
      if (panel) {
        panel.dataset.visible = panel.dataset.visible === 'true' ? 'false' : 'true';
        renderDebugPanel();
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════
function init() {
  loadState();
  state.currentScreen = 'splash';
  state.history = [];

  renderDebugPanel();
  renderScreen('splash', false);
  setupTripleTap();
  setupCtaFeedback();

  window.addEventListener('resize', () => { renderDebugPanel(); }, { passive: true });
}

init();
