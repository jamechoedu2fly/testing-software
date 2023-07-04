import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import TestPage from "./pages/TestPage";
import Aptitude from "./pages/Aptitude";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import PreAssessmentTest from "./pages/PreAssessmentTest";
import PsychometricPage from "./pages/PsychometricPage";
import Result from "./pages/Result";
import Profile from "./pages/User/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateQuestion from "./pages/Admin/CreateQuestion";
import ErrorPage from "./components/Layout/ErrorPage";
import Chart from 'chart.js/auto';


function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard/user" element={<Dashboard />} />
        <Route path="/dashboard/user/profile" element={< Profile/>} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
        <Route path="/dashboard/admin/create-question" element={<CreateQuestion />} /> */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-question" element={<CreateQuestion />} />
          <Route path="admin/*" element={<ErrorPage />} />
          <Route />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/test" element={<TestPage />} />
        <Route path="/aptitude/:categoryId" element={<Aptitude />} />
        <Route path="/preassessment" element={<PreAssessmentTest />} />
        <Route
          path="/preassessment/psychometric-test"
          element={<PsychometricPage />}
        />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
