import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import TestLibrary from './pages/TestLibrary';
import CreateTest from './pages/CreateTest';
import TestPlans from './pages/TestPlans';
import CreatePlan from './pages/CreatePlan';
import Runs from './pages/Runs';
import ExecuteRun from './pages/ExecuteRun';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="library" element={<TestLibrary />} />
        <Route path="library/create" element={<CreateTest />} />
        <Route path="library/edit/:id" element={<CreateTest />} />
        <Route path="plans" element={<TestPlans />} />
        <Route path="plans/create" element={<CreatePlan />} />
        <Route path="plans/edit/:id" element={<CreatePlan />} />
        <Route path="runs" element={<Runs />} />
        <Route path="runs/:id" element={<ExecuteRun />} />
      </Route>
    </Routes>
  );
}

export default App;
