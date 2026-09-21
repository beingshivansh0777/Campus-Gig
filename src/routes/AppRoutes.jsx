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
import NotFoundPage from "../pages/NotFoundPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import MyJobsPage from "../pages/MyJobsPage";
import DraftsPage from "../pages/Draftspage";
import EditDraftPage from "../pages/EditDraftsPage";
import EditJobPage from "../pages/EditJobPage";
import ManageJobPage from "../pages/ManageJobPage";
import JobDetailPage from "../pages/JobDetailPage";
import SavedJobsPage from "../pages/SavedJobsPage";
import ReceivedProposalsPage from "../pages/ReceivedProposalsPage";
import MyContractsPage from "../pages/MyContractsPage";
import ContractDetailPage from "../pages/ContractDetailPage";
import GigProfileViewPage from "../pages/GigProfileViewPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import FAQPage from "../pages/FAQPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import TermsPage from "../pages/TermsPage";
import PrivacyPage from "../pages/PrivacyPage";

// Admin

import AdminProtectedRoute from "./AdminProtectedRoutes";
import AdminLayout from "../features/admin/components/AdminLayout";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminRegisterPage from "../pages/admin/AdminRegisterPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminClientsPage from "../pages/admin/AdminClientsPage";
import AdminClientDetailPage from "../pages/admin/AdminClientDetailPage";
import AdminGigsPage from "../pages/admin/AdminGigsPage";
import AdminGigDetailPage from "../pages/admin/AdminGigDetailPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";
import AdminJobDetailPage from "../pages/admin/AdminJobDetailPage";
import AdminJobApplicationsPage from "../pages/admin/AdminJobApplicationsPage";
import AdminJobApplicationDetailPage from "../pages/admin/AdminJobApplicationDetailPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import AdminReportDetailPage from "../pages/admin/AdminReportDetailPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages — no Navbar, use their own split-screen AuthLayout internally */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Admin auth pages */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/admin/register" element={<AdminRegisterPage />} />

      {/* Admin panel — completely separate from the regular AppLayout */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          />

          <Route path="/admin/clients" element={<AdminClientsPage />} />

          <Route
            path="/admin/clients/:id"
            element={<AdminClientDetailPage />}
          />

          <Route path="/admin/gigs" element={<AdminGigsPage />} />

          <Route
            path="/admin/gigs/:id"
            element={<AdminGigDetailPage />}
          />

          <Route path="/admin/jobs" element={<AdminJobsPage />} />

          <Route
            path="/admin/jobs/:id"
            element={<AdminJobDetailPage />}
          />

          <Route
            path="/admin/job-applications"
            element={<AdminJobApplicationsPage />}
          />

          <Route
            path="/admin/job-applications/:id"
            element={<AdminJobApplicationDetailPage />}
          />

          <Route path="/admin/reports" element={<AdminReportsPage />} />

          <Route
            path="/admin/reports/:id"
            element={<AdminReportDetailPage />}
          />
        </Route>
      </Route>

      {/* Everything else — wrapped in AppLayout (Navbar + content) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/proposals" element={<MyProposalsPage />} />
          <Route path="/contracts" element={<MyContractsPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/jobs/my-jobs" element={<MyJobsPage />} />
          <Route path="/jobs/drafts" element={<DraftsPage />} />
          <Route
            path="/jobs/drafts/:draftId"
            element={<EditDraftPage />}
          />

          <Route
            path="/jobs/edit/:jobId"
            element={<EditJobPage />}
          />

          <Route
            path="/jobs/manage/:jobId"
            element={<ManageJobPage />}
          />

          <Route
            path="/jobs/:jobId"
            element={<JobDetailPage />}
          />

          <Route path="/saved-jobs" element={<SavedJobsPage />} />

          <Route
            path="/proposals-received"
            element={<ReceivedProposalsPage />}
          />

          <Route path="/contracts" element={<MyContractsPage />} />

          <Route
            path="/contracts/:contractId"
            element={<ContractDetailPage />}
          />

          <Route
            path="/gigs/:gigId"
            element={<GigProfileViewPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;