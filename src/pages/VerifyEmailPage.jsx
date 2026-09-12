import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';
import { useSendOtp, useVerifyEmail } from '../features/auth/hooks/userVerifyEmail';

const RESEND_SECONDS = 90;

function VerifyEmailPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const sendOtp = useSendOtp();
  const verifyEmail = useVerifyEmail();

  const [otp, setOtp] = useState('');
  const [sentOnce, setSentOnce] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  // Countdown effect — ticks every second while secondsLeft > 0
  useEffect(() => {
    if (secondsLeft <= 0) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [secondsLeft]);

  const handleSend = () => {
    sendOtp.mutate(undefined, {
      onSuccess: () => {
        setSentOnce(true);
        setSecondsLeft(RESEND_SECONDS);
      },
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    verifyEmail.mutate(otp, {
      onSuccess: () => navigate('/dashboard'),
    });
  };

  if (user?.isVerified) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <ShieldCheck className="mx-auto text-success mb-3" size={40} />
        <h1 className="font-display text-xl font-bold text-ink">Your email is already verified</h1>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Verify your email</h1>
      <p className="font-body text-sm text-muted mb-6">
        We'll send a verification code to confirm your account.
      </p>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2.5">
          <Mail size={16} className="text-muted" />
          <span className="text-sm font-body text-ink">{user?.email}</span>
        </div>

        {!sentOnce ? (
          <button
            onClick={handleSend}
            disabled={sendOtp.isPending}
            className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
          >
            {sendOtp.isPending ? 'Sending...' : 'Send Code'}
          </button>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-body font-medium text-ink mb-1.5">
                Enter Code
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-mono text-sm text-ink text-center tracking-widest placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>

            <button
              type="submit"
              disabled={verifyEmail.isPending}
              className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
            >
              {verifyEmail.isPending ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="text-center">
              {secondsLeft > 0 ? (
                <p className="text-xs font-body text-muted">
                  Resend code in {secondsLeft}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sendOtp.isPending}
                  className="text-xs font-body font-semibold text-primary hover:underline disabled:opacity-50"
                >
                  Resend Code
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;