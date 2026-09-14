import AuthLayout from '../components/layout/AuthLayout';

import ForgotPasswordForm from '../features/auth/components/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a code."
      eyebrow="ACCOUNT RECOVERY"
      heading="Get back"
      highlightedHeading="in control."
      description="Securely recover your account and get back to managing your projects, opportunities, and connections on Campus-Gig."
      bottomHighlights={[
        "Secure recovery",
        "Quick verification",
        "Protected account",
      ]}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;