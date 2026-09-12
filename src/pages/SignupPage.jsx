import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import SignupForm from '../features/auth/components/SignupForm';

function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start posting projects or picking up work."
      footer={
        <p className="text-xs font-body text-muted text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}

export default SignupPage;