import type { GoalRoute } from './types';

export const WHO_OPTIONS = [
  "I'm still figuring things out",
  "I'm looking for my first real role",
  "I'm a junior specialist",
  "I feel stuck in my current role",
  "I'm changing direction",
  "I'm building something of my own",
];

export const GOAL_OPTIONS = [
  "Find my direction",
  "Get my next role",
  "Grow faster where I am",
  "Make a career pivot",
  "Communicate with more confidence",
  "Turn ideas into action",
];

export const TIME_OPTIONS = [
  "10 min per day",
  "20 min per day",
  "30 min per day",
  "45+ min per day",
];

export const GOAL_ROUTING: Record<string, GoalRoute> = {
  "Find my direction": {
    coach: "Kayra",
    color: "#00DA30",
    primaryBranch: "Career Strategy & Workforce Readiness",
    supportBranch: "Thinking, Decisions & Cognitive Agility",
    focus: "Clarifying your next best route",
    proof: "Role Target Card",
  },
  "Get my next role": {
    coach: "Kayra",
    color: "#00DA30",
    primaryBranch: "Career Strategy & Workforce Readiness",
    supportBranch: "Impactful Communication & Influence",
    focus: "Building job-readiness and visible fit",
    proof: "First Role Readiness Pack",
  },
  "Grow faster where I am": {
    coach: "Kayra",
    color: "#00DA30",
    primaryBranch: "Career Strategy & Workforce Readiness",
    supportBranch: "Impactful Communication & Influence",
    focus: "Bridging the gap to the next level",
    proof: "Growth Gap Map",
  },
  "Make a career pivot": {
    coach: "Kayra",
    color: "#00DA30",
    primaryBranch: "Career Strategy & Workforce Readiness",
    supportBranch: "Thinking, Decisions & Cognitive Agility",
    focus: "Turning past experience into a new route",
    proof: "Pivot Narrative Card",
  },
  "Communicate with more confidence": {
    coach: "Orra",
    color: "#00FFFF",
    primaryBranch: "Impactful Communication & Influence",
    supportBranch: "Career Strategy & Workforce Readiness",
    focus: "Real-conversation confidence",
    proof: "Conversation Script",
  },
  "Turn ideas into action": {
    coach: "Maverick",
    color: "#FE6305",
    primaryBranch: "Entrepreneurship, Execution & Opportunity Design",
    supportBranch: "Thinking, Decisions & Cognitive Agility",
    focus: "Structured first execution step",
    proof: "Idea Validation One-Pager",
  },
};

export const KAYRA_VARIANTS: Record<string, {
  pathTitle: string;
  whyPath: string;
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  boostName: string;
  boostDuration: string;
  growthPriority: string;
}> = {
  "Find my direction": {
    pathTitle: "Career Clarity Path",
    whyPath: "You chose to find direction. Kayra builds a visible route out of ambiguity — reducing noise so you see your next real step clearly.",
    phase1Title: "Clarity Phase",
    phase1Desc: "Define your direction, audit your skills, and create a first career map. Kayra guides you through practical reflection — no theory, just traction.",
    phase2Title: "Readiness Build",
    phase2Desc: "Strengthen gaps, prepare visible proof, and position yourself for real opportunities.",
    boostName: "Role Direction Boost",
    boostDuration: "~15 min",
    growthPriority: "Eliminate career fog — map options, test assumptions, commit to a trajectory.",
  },
  "Get my next role": {
    pathTitle: "Role Readiness Path",
    whyPath: "You chose to get your next role. Kayra prepares you with precision — identifying gaps, building proof, and creating a readiness plan that actually gets you there.",
    phase1Title: "Gap Audit",
    phase1Desc: "Map the distance between your current profile and your target role. Kayra surfaces blind spots and creates a focused action list.",
    phase2Title: "Portfolio & Proof",
    phase2Desc: "Build tangible proof points that make your readiness visible to anyone evaluating you.",
    boostName: "Role Readiness Boost",
    boostDuration: "~15 min",
    growthPriority: "Close the gap between where you are and the role you want — with a visible, structured readiness plan.",
  },
  "Grow faster where I am": {
    pathTitle: "Growth Acceleration Path",
    whyPath: "You chose to grow faster where you are. Kayra identifies what's actually holding you back and builds a focused acceleration plan — not more tasks, but sharper moves.",
    phase1Title: "Leverage Mapping",
    phase1Desc: "Identify the highest-impact growth moves in your current role. Kayra helps you focus on what actually accelerates careers.",
    phase2Title: "Visibility Phase",
    phase2Desc: "Make your growth visible to the people who decide your trajectory — managers, stakeholders, decision-makers.",
    boostName: "Growth Gap Boost",
    boostDuration: "~12 min",
    growthPriority: "Accelerate in your current role — find leverage points, increase visibility, and outperform expectations without burnout.",
  },
  "Make a career pivot": {
    pathTitle: "Pivot Strategy Path",
    whyPath: "You chose to make a career pivot. Kayra doesn't do wishful thinking — she builds a structured pivot narrative that connects your past to your future in a way that makes sense to others.",
    phase1Title: "Narrative Build",
    phase1Desc: "Craft your pivot story. Kayra guides you to connect dots between your past experience and your desired direction.",
    phase2Title: "Position & Validate",
    phase2Desc: "Test your pivot narrative with real feedback and refine your positioning until it opens the right doors.",
    boostName: "Pivot Narrative Boost",
    boostDuration: "~18 min",
    growthPriority: "Build a compelling pivot story — connect your experience to your new direction so it reads as intentional, not random.",
  },
};

export const ORRA_CONTENT = {
  pathTitle: "Communication Performance Path",
  whyPath: "You want to communicate with more confidence. Orra trains you for real conversations — not theory slides, but live-moment readiness that changes how people hear you.",
  phase1Title: "Confidence Activation",
  phase1Desc: "Build your personal communication script. Orra walks you through real scenarios — how to open, hold attention, and close with impact.",
  phase2Title: "Performance Under Pressure",
  phase2Desc: "Handle tough questions, pushback, and high-stakes moments. Train your responses until they feel natural under pressure.",
  boostName: "Conversation Script Boost",
  boostDuration: "~12 min",
  growthPriority: "Own the room in real moments — speak with clarity, handle pressure, and turn conversations into career leverage.",
};

export const MAVERICK_CONTENT = {
  pathTitle: "Builder Execution Path",
  whyPath: "You chose to turn ideas into action. Maverick doesn't do brainstorming loops — he builds an execution rhythm that moves your ideas from notes into structured, testable progress.",
  phase1Title: "Validation Phase",
  phase1Desc: "Take your strongest idea and run it through Maverick's validation framework. Output: a testable concept with real structure, not another brainstorm doc.",
  phase2Title: "First Pitch Build",
  phase2Desc: "Package what you've validated into something presentable. Maverick guides you to build a pitch that earns attention and feedback.",
  boostName: "Idea Validation Boost",
  boostDuration: "~18 min",
  growthPriority: "Stop planning in circles — validate fast, build proof, and move your idea into something others can see and respond to.",
};
