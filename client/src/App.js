import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import TestPage from "./pages/TestPage";
import Aptitude from "./pages/Aptitude";
// import Dashboard from "./pages/User/Dashboard";
// import PrivateRoute from "./components/Routes/Private";
import PreAssessmentTest from "./pages/PreAssessmentTest";
import PsychometricPage from "./pages/PsychometricPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="" element={<Dashboard />} />
        </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/test" element={<TestPage />} />
        <Route path="/aptitude/:categoryId" element={<Aptitude />} />
        <Route path="/preassessment" element={<PreAssessmentTest />} />
        <Route path="/preassessment/psychometric-test" element={<PsychometricPage />} />
      </Routes>
    </>
  );
}

export default App;
