import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
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
        <div className="space-y-3 text-center">
          {/* Signup */}
          <p className="text-xs font-body text-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline underline-offset-4 transition"
            >
              Sign up
            </Link>
          </p>

          {/* Forgot Password */}
          <p className="text-xs font-body text-muted">
            <Link
              to="/forgot-password"
              className="text-primary font-semibold hover:underline underline-offset-4 transition"
            >
              Forgot password?
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border" />

            <span className="text-[10px] font-body uppercase tracking-[0.18em] text-faint">
              Admin
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Admin Login */}
          <Link
            to="/admin/login"
            className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-body font-semibold text-ink hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
          >
            <ShieldCheck
              size={15}
              className="text-muted group-hover:text-primary transition-colors"
            />

            <span>Admin login</span>
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
