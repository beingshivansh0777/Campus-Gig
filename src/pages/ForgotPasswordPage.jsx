import AuthLayout from '../components/layout/AuthLayout';
import ForgotPasswordForm from '../features/auth/components/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a code."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;