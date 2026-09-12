import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import JobListingPage from "../pages/JobListingPage";
import CreateJobPage from "../pages/CreateJobPage";
import MyProposalsPage from "../pages/MyProposalsPage";
import MyContractsPage from "../pages/MyContractsPage";
import NotFoundPage from "../pages/NotFoundPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages — no Navbar, use their own split-screen AuthLayout internally */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Everything else — wrapped in AppLayout (Navbar + content) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/proposals" element={<MyProposalsPage />} />
          <Route path="/contracts" element={<MyContractsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
