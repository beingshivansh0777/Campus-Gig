import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuthStore } from '../authStore';

function VerifyEmailBanner() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.isVerified) return null;

  return (
    <div className="bg-warning/10 border-b border-warning/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
        <AlertCircle size={16} className="text-warning shrink-0" />
        <p className="text-sm font-body text-ink flex-1 min-w-50">
          Your email isn't verified yet. Some actions are locked until you verify.
        </p>
        <Link
          to="/verify-email"
          className="text-sm font-body font-semibold text-primary hover:underline"
        >
          Verify now
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailBanner;