/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface RouteData {
  coach: string
  color: string
  primaryBranch: string
  supportBranch: string
  focus: string
  proof: string
}

export interface AppState {
  userName: string
  whoAreYou: string
  goal: string
  timeBudget: string
  routeData: RouteData | null
  goalImportanceReason: string
  avatarProvided: boolean
  mainBlocker: string
  preferredSupportMode: string
  futureSelfIdentity: string
  genesisComplete: boolean
}

interface AppContextType extends AppState {
  setUserName: (v: string) => void
  setWhoAreYou: (v: string) => void
  setGoal: (v: string) => void
  setTimeBudget: (v: string) => void
  setRouteData: (v: RouteData | null) => void
  setGoalImportanceReason: (v: string) => void
  setAvatarProvided: (v: boolean) => void
  setMainBlocker: (v: string) => void
  setPreferredSupportMode: (v: string) => void
  setFutureSelfIdentity: (v: string) => void
  setGenesisComplete: (v: boolean) => void
}

export const GOAL_ROUTES: Record<string, RouteData> = {
  'Find my direction': { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Thinking, Decisions & Cognitive Agility', focus: 'Clarifying your next best route', proof: 'Role Target Card' },
  'Get my next role': { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Impactful Communication & Influence', focus: 'Building job-readiness and visible fit', proof: 'First Role Readiness Pack' },
  'Grow faster where I am': { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Impactful Communication & Influence', focus: 'Bridging the gap to the next level', proof: 'Growth Gap Map' },
  'Make a career pivot': { coach: 'Kayra', color: '#00DA30', primaryBranch: 'Career Strategy & Workforce Readiness', supportBranch: 'Thinking, Decisions & Cognitive Agility', focus: 'Turning past experience into a new route', proof: 'Pivot Narrative Card' },
  'Communicate with more confidence': { coach: 'Orra', color: '#00FFFF', primaryBranch: 'Impactful Communication & Influence', supportBranch: 'Career Strategy & Workforce Readiness', focus: 'Real-conversation confidence', proof: 'Conversation Script' },
  'Turn ideas into action': { coach: 'Maverick', color: '#FE6305', primaryBranch: 'Entrepreneurship, Execution & Opportunity Design', supportBranch: 'Thinking, Decisions & Cognitive Agility', focus: 'Structured first execution step', proof: 'Idea Validation One-Pager' },
}

const defaultRoute: RouteData = GOAL_ROUTES['Find my direction']

const AppContext = createContext<AppContextType>({
  userName: '', whoAreYou: '', goal: '', timeBudget: '', routeData: defaultRoute,
  goalImportanceReason: '', avatarProvided: false, mainBlocker: '', preferredSupportMode: '', futureSelfIdentity: '',
  genesisComplete: false,
  setUserName: () => {}, setWhoAreYou: () => {}, setGoal: () => {}, setTimeBudget: () => {}, setRouteData: () => {},
  setGoalImportanceReason: () => {}, setAvatarProvided: () => {}, setMainBlocker: () => {}, setPreferredSupportMode: () => {}, setFutureSelfIdentity: () => {},
  setGenesisComplete: () => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('')
  const [whoAreYou, setWhoAreYou] = useState('')
  const [goal, setGoal] = useState('')
  const [timeBudget, setTimeBudget] = useState('')
  const [routeData, setRouteData] = useState<RouteData | null>(defaultRoute)
  const [goalImportanceReason, setGoalImportanceReason] = useState('')
  const [avatarProvided, setAvatarProvided] = useState(false)
  const [mainBlocker, setMainBlocker] = useState('')
  const [preferredSupportMode, setPreferredSupportMode] = useState('')
  const [futureSelfIdentity, setFutureSelfIdentity] = useState('')
  const [genesisComplete, setGenesisComplete] = useState(false)

  return (
    <AppContext.Provider value={{
      userName, whoAreYou, goal, timeBudget, routeData,
      goalImportanceReason, avatarProvided, mainBlocker, preferredSupportMode, futureSelfIdentity,
      genesisComplete,
      setUserName, setWhoAreYou, setGoal, setTimeBudget, setRouteData,
      setGoalImportanceReason, setAvatarProvided, setMainBlocker, setPreferredSupportMode, setFutureSelfIdentity,
      setGenesisComplete,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() { return useContext(AppContext) }
