import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './screens/Splash'
import SignIn from './screens/SignIn'
import Name from './screens/Name'
import Who from './screens/Who'
import Goal from './screens/Goal'
import Time from './screens/Time'
import Reward from './screens/Reward'
import Resources from './screens/Resources'
import Trophy from './screens/Trophy'
import Notifications from './screens/Notifications'
import Cooking from './screens/Cooking'
import YourWay from './screens/YourWay'
import WhyPath from './screens/WhyPath'
import FirstTask from './screens/FirstTask'
import Micro1 from './screens/Micro1'
import Micro2 from './screens/Micro2'
import Micro3 from './screens/Micro3'
import Goodies from './screens/Goodies'
import StartCard from './screens/StartCard'
import CalibrationCoachIntro from './screens/CalibrationCoachIntro'
import CalibrationGoalImportance from './screens/CalibrationGoalImportance'
import CalibrationAvatar from './screens/CalibrationAvatar'
import CalibrationBlocker from './screens/CalibrationBlocker'
import CalibrationSupport from './screens/CalibrationSupport'
import CalibrationFutureSelf from './screens/CalibrationFutureSelf'
import AIVisualGenerating from './screens/AIVisualGenerating'
import AIVisualProjection from './screens/AIVisualProjection'
import GenesisGalaxyEntry from './screens/GenesisGalaxyEntry'
import GenesisBranchRoom from './screens/GenesisBranchRoom'
import GenesisModuleHighlight from './screens/GenesisModuleHighlight'
import GenesisStartConfirm from './screens/GenesisStartConfirm'
import GenesisLiveEntry from './screens/GenesisLiveEntry'
import GenesisBriefing from './screens/GenesisBriefing'
import GenesisQuestion1 from './screens/GenesisQuestion1'
import GenesisQuestion2 from './screens/GenesisQuestion2'
import GenesisToolTransition from './screens/GenesisToolTransition'
import CareerRadarHero from './screens/CareerRadarHero'
import CareerRadarSetup from './screens/CareerRadarSetup'
import CareerRadarProcessing1 from './screens/CareerRadarProcessing1'
import CareerRadarProcessing2 from './screens/CareerRadarProcessing2'
import CareerRadarInsights from './screens/CareerRadarInsights'
import GenesisCoachCompletion from './screens/GenesisCoachCompletion'
import GenesisReward from './screens/GenesisReward'
import GenesisArtifact from './screens/GenesisArtifact'
import Home from './screens/Home'
import DailyBrief from './screens/DailyBrief'
import SessionFocus from './screens/SessionFocus'
import SessionComplete from './screens/SessionComplete'
import Stash from './screens/Stash'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/name" element={<Name />} />
      <Route path="/who" element={<Who />} />
      <Route path="/goal" element={<Goal />} />
      <Route path="/time" element={<Time />} />
      <Route path="/reward" element={<Reward />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/trophy" element={<Trophy />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/cooking" element={<Cooking />} />
      <Route path="/your-way" element={<YourWay />} />
      <Route path="/why-path" element={<WhyPath />} />
      <Route path="/first-task" element={<FirstTask />} />
      <Route path="/micro1" element={<Micro1 />} />
      <Route path="/micro2" element={<Micro2 />} />
      <Route path="/micro3" element={<Micro3 />} />
      <Route path="/goodies" element={<Goodies />} />
      <Route path="/start-card" element={<StartCard />} />
      <Route path="/calibration-coach" element={<CalibrationCoachIntro />} />
      <Route path="/calibration-goal" element={<CalibrationGoalImportance />} />
      <Route path="/calibration-avatar" element={<CalibrationAvatar />} />
      <Route path="/calibration-blocker" element={<CalibrationBlocker />} />
      <Route path="/calibration-support" element={<CalibrationSupport />} />
      <Route path="/calibration-future" element={<CalibrationFutureSelf />} />
      <Route path="/ai-generating" element={<AIVisualGenerating />} />
      <Route path="/ai-projection" element={<AIVisualProjection />} />
      <Route path="/genesis-galaxy" element={<GenesisGalaxyEntry />} />
      <Route path="/genesis-branch" element={<GenesisBranchRoom />} />
      <Route path="/genesis-module" element={<GenesisModuleHighlight />} />
      <Route path="/genesis-confirm" element={<GenesisStartConfirm />} />
      <Route path="/genesis-live" element={<GenesisLiveEntry />} />
      <Route path="/genesis-briefing" element={<GenesisBriefing />} />
      <Route path="/genesis-q1" element={<GenesisQuestion1 />} />
      <Route path="/genesis-q2" element={<GenesisQuestion2 />} />
      <Route path="/genesis-tool-transition" element={<GenesisToolTransition />} />
      <Route path="/career-radar-hero" element={<CareerRadarHero />} />
      <Route path="/career-radar-setup" element={<CareerRadarSetup />} />
      <Route path="/career-radar-processing-1" element={<CareerRadarProcessing1 />} />
      <Route path="/career-radar-processing-2" element={<CareerRadarProcessing2 />} />
      <Route path="/career-radar-insights" element={<CareerRadarInsights />} />
      <Route path="/genesis-coach-completion" element={<GenesisCoachCompletion />} />
      <Route path="/genesis-reward" element={<GenesisReward />} />
      <Route path="/genesis-artifact" element={<GenesisArtifact />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daily-brief" element={<DailyBrief />} />
      <Route path="/session-focus" element={<SessionFocus />} />
      <Route path="/session-complete" element={<SessionComplete />} />
      <Route path="/stash" element={<Stash />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
