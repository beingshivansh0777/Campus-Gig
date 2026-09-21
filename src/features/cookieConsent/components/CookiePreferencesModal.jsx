import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCookieConsentStore } from '../cookieConsentStore';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';

const CATEGORIES = [
  {
    key: 'necessary',
    label: 'Necessary Cookies',
    description:
      'These cookies are required for Campus-GIG to function properly. They support authentication, security, sessions, and essential platform features.',
    locked: true,
  },
  {
    key: 'functional',
    label: 'Functional Cookies',
    description:
      'These cookies remember your preferences and settings to provide a more personalized experience.',
  },
  {
    key: 'analytics',
    label: 'Analytics Cookies',
    description:
      'These cookies help us understand how users interact with Campus-GIG so we can improve performance, usability, and platform features.',
  },
];

function CookiePreferencesModal() {
  const isOpen = useCookieConsentStore((state) => state.isPreferencesOpen);
  const preferences = useCookieConsentStore((state) => state.preferences);
  const savePreferences = useCookieConsentStore((state) => state.savePreferences);
  const closePreferences = useCookieConsentStore((state) => state.closePreferences);

  const [localPrefs, setLocalPrefs] = useState(preferences);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLocalPrefs(preferences);
      closeButtonRef.current?.focus();
    }
  }, [isOpen, preferences]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') closePreferences();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePreferences]);

  if (!isOpen) return null;

  const handleToggle = (key, value) => {
    setLocalPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    savePreferences(localPrefs);
    closePreferences();
  };

  return (
    <div
      className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      <div className="bg-surface rounded-xl border border-border w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          ref={closeButtonRef}
          onClick={closePreferences}
          className="absolute top-4 right-4 text-faint hover:text-ink transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 id="cookie-preferences-title" className="font-display text-lg font-bold text-ink mb-1">
          Cookie Preferences
        </h2>
        <p className="text-sm font-body text-muted mb-5">
          Manage which cookies Campus-GIG can use. Read our{' '}
          <Link to="/privacy" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>{' '}
          for more details.
        </p>

        <div className="space-y-4 mb-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  <p className="font-body font-semibold text-sm text-ink">{cat.label}</p>
                  {cat.locked && <span className="text-xs font-body text-faint">Always Active</span>}
                </div>
                <ToggleSwitch
                  checked={cat.locked ? true : !!localPrefs[cat.key]}
                  disabled={cat.locked}
                  onChange={(value) => handleToggle(cat.key, value)}
                  label={cat.label}
                />
              </div>
              <p className="text-xs font-body text-muted leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover transition"
          >
            Save Preferences
          </button>
          <button
            onClick={closePreferences}
            className="text-sm font-body font-medium text-muted hover:text-ink transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiePreferencesModal;