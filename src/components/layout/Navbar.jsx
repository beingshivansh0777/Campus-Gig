import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

function Navbar() {
  const navigate = useNavigate();
  const { token, user, isGig, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-ink">
          Campus-Gig
        </Link>

        {token ? (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-body text-muted hover:text-ink transition">
              Find Work
            </Link>
            {isGig ? (
              <>
                <Link to="/proposals" className="text-sm font-body text-muted hover:text-ink transition">
                  My Proposals
                </Link>
                <Link to="/contracts" className="text-sm font-body text-muted hover:text-ink transition">
                  Active Contracts
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs/create" className="text-sm font-body text-muted hover:text-ink transition">
                  Post a Project
                </Link>
                <Link to="/contracts" className="text-sm font-body text-muted hover:text-ink transition">
                  My Projects
                </Link>
              </>
            )}
          </nav>
        ) : null}

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <button className="text-muted hover:text-ink transition" aria-label="Notifications">
                <Bell size={20} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-body text-ink"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {user?.firstName?.[0] || 'U'}
                  </span>
                  <ChevronDown size={16} className="text-muted" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-sm py-1">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-body text-ink hover:bg-background transition"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-body text-ink hover:bg-background transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body text-error hover:bg-background transition"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-body text-ink hover:text-primary transition">
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-body font-semibold bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;