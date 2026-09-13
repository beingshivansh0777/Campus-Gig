import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../features/auth/components/LoginForm';

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your dashboard."
      footer={
        <div className="space-y-2 text-center">
          <p className="text-xs font-body text-[#8B87A0]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#7C3AED] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-xs font-body text-[#8B87A0]">
            <Link to="/forgot-password" className="text-[#7C3AED] font-semibold hover:underline">
              Forgot password?
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
