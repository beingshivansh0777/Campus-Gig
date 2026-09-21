import { Link } from "react-router-dom";
import { useCookieConsentStore } from "../../features/cookieConsent/cookieConsentStore";

function Footer() {
  const { openPreferences } = useCookieConsentStore();

  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display font-bold text-lg bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent mb-2">
              Campus-Gig
            </p>

            <p className="text-sm font-body text-muted leading-relaxed">
              Campus-GIG connects talented freelancers with clients to turn
              skills, ideas, and opportunities into real-world work.
            </p>
          </div>

          <div>
            <p className="text-sm font-body font-semibold text-ink mb-3">
              For Clients
            </p>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs/create"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Post a Project
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-body font-semibold text-ink mb-3">
              For Giggers
            </p>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Find Work
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Become a Campus-Gigger
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-body font-semibold text-ink mb-3">
              Company
            </p>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Contact / Support
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-sm font-body text-muted hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="text-sm font-body text-muted hover:text-primary transition text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs font-body text-faint text-center">
            © 2026 Campus-Gig. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
