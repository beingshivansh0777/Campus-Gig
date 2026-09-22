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
      footer={
        <div className="space-y-2 text-center">
          <p className="text-xs font-body text-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <p className="text-xs font-body text-muted">
            <Link
              to="/forgot-password"
              className="text-primary font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </p>

          <p className="text-xs font-body text-faint">
            <Link to="/admin/login" className="hover:text-muted transition">
              Admin login
            </Link>
          </p>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
