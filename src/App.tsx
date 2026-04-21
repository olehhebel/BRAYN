import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store';
import PhoneShell from './components/PhoneShell';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import BraynNameScreen from './screens/BraynNameScreen';
import WhoAreYouScreen from './screens/WhoAreYouScreen';
import GoalScreen from './screens/GoalScreen';
import TimeBudgetScreen from './screens/TimeBudgetScreen';
import RewardScreen from './screens/RewardScreen';
import ResourceEducationScreen from './screens/ResourceEducationScreen';
import TrophyScreen from './screens/TrophyScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import RouteCookingScreen from './screens/RouteCookingScreen';
import YourWayScreen from './screens/YourWayScreen';
import WhyThisPathScreen from './screens/WhyThisPathScreen';
import FirstTaskLiveScreen from './screens/FirstTaskLiveScreen';
import ActivationLayer1 from './screens/ActivationLayer1';
import ActivationLayer2 from './screens/ActivationLayer2';
import ActivationLayer3 from './screens/ActivationLayer3';
import GoodiesStashScreen from './screens/GoodiesStashScreen';
import SeedProofScreen from './screens/SeedProofScreen';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/name" element={<BraynNameScreen />} />
            <Route path="/who" element={<WhoAreYouScreen />} />
            <Route path="/goal" element={<GoalScreen />} />
            <Route path="/time" element={<TimeBudgetScreen />} />
            <Route path="/reward" element={<RewardScreen />} />
            <Route path="/resources" element={<ResourceEducationScreen />} />
            <Route path="/trophy" element={<TrophyScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/cooking" element={<RouteCookingScreen />} />
            <Route path="/your-way" element={<YourWayScreen />} />
            <Route path="/why-path" element={<WhyThisPathScreen />} />
            <Route path="/first-task" element={<FirstTaskLiveScreen />} />
            <Route path="/activation-1" element={<ActivationLayer1 />} />
            <Route path="/activation-2" element={<ActivationLayer2 />} />
            <Route path="/activation-3" element={<ActivationLayer3 />} />
            <Route path="/goodies" element={<GoodiesStashScreen />} />
            <Route path="/seed-proof" element={<SeedProofScreen />} />
          </Routes>
        </PhoneShell>
      </HashRouter>
    </AppProvider>
  );
}
