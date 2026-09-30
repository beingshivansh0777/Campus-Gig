import { Link } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";

import LoginForm from "../features/auth/components/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your dashboard."
      eyebrow="WELCOME BACK"
      heading="Your work."
      highlightedHeading="Your opportunities."
      description="Connect with the right people, discover new opportunities, and keep your projects moving forward."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;