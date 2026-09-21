import { Link } from 'react-router-dom';
import { useCookieConsentStore } from '../cookieConsentStore';

function CookieConsentBanner() {
  const consentGiven = useCookieConsentStore((state) => state.preferences.consentGiven);
  const isPreferencesOpen = useCookieConsentStore((state) => state.isPreferencesOpen);
  const acceptAll = useCookieConsentStore((state) => state.acceptAll);
  const rejectOptional = useCookieConsentStore((state) => state.rejectOptional);
  const openPreferences = useCookieConsentStore((state) => state.openPreferences);

  if (consentGiven || isPreferencesOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 flex justify-center" role="region" aria-label="Cookie consent">
      <div className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-lg p-5">
        <h2 className="font-body font-semibold text-sm text-ink mb-1.5">We value your privacy</h2>
        <p className="text-sm font-body text-muted leading-relaxed mb-4">
          Campus-GIG uses cookies and similar technologies to keep the platform secure, remember your
          preferences, improve your experience, and understand how our services are used. You can accept
          all cookies or manage your preferences.{' '}
          <Link to="/privacy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            onClick={acceptAll}
            className="flex-1 sm:flex-none bg-primary text-white font-body font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-primary-hover transition"
          >
            Accept All
          </button>
          <button
            onClick={rejectOptional}
            className="flex-1 sm:flex-none text-sm font-body font-semibold text-ink border border-border px-4 py-2.5 rounded-lg hover:border-ink/30 transition"
          >
            Reject Optional
          </button>
          <button
            onClick={openPreferences}
            className="flex-1 sm:flex-none text-sm font-body font-medium text-muted hover:text-ink px-4 py-2.5 transition"
          >
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentBanner;