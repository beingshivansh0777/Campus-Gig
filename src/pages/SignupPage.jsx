import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import SignupForm from "../features/auth/components/SignupForm";
function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Campus-Gig and discover new opportunities, talented people, and projects that match your goals."
      eyebrow="JOIN CAMPUS-GIG"
      heading="Start something"
      highlightedHeading="great."
      description="Create your account and connect with the right people for your next project, opportunity, or collaboration."
      footer={
        <p className="text-xs font-body text-muted text-center">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            {" "}
            Log in{" "}
          </Link>{" "}
        </p>
      }
    >
      {" "}
      <SignupForm />{" "}
    </AuthLayout>
  );
}
export default SignupPage;
