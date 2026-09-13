import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

function Navbar() {
  const navigate = useNavigate();
  const { token, user, isGig, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the profile dropdown when clicking anywhere outside it
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setMobileOpen(false);
    navigate('/login');
  };

  const primaryLinks = isGig
  ? [
      { to: '/jobs', label: 'Find Work' },
      { to: '/proposals', label: 'My Proposals' },
      { to: '/saved-jobs', label: 'Saved Jobs' },
      { to: '/contracts', label: 'Active Contracts' },
    ]
  : [
      { to: '/jobs/create', label: 'Post a Project' },
      { to: '/jobs/my-jobs', label: 'My Jobs' },
    ];

const secondaryLinks = isGig ? [] : [{ to: '/contracts', label: 'Contracts' }];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-lg bg-linear-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
        >
          Campus-Gig
        </Link>

        {token && (
          <nav className="hidden md:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-body text-muted hover:text-ink transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <button className="hidden md:block text-muted hover:text-ink transition" aria-label="Notifications">
                <Bell size={20} />
              </button>

              <div className="relative hidden md:block" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-body text-ink"
                >
                  <span className="w-8 h-8 rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899] text-white flex items-center justify-center font-semibold text-sm">
                    {user?.firstName?.[0] || 'U'}
                  </span>
                  <ChevronDown size={16} className="text-muted" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-sm py-1">
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

                    <div className="border-t border-border my-1" />

                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-body text-ink hover:bg-background transition"
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="border-t border-border my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body text-error hover:bg-background transition"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden text-ink"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-body text-ink hover:text-primary transition">
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-body font-semibold bg-linear-to-r from-[#7C3AED] to-[#EC4899] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileOpen && token && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-1">
          {[...primaryLinks, ...secondaryLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background rounded-lg transition"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border my-1" />
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background rounded-lg transition"
          >
            Profile
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background rounded-lg transition"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-2.5 text-sm font-body text-error hover:bg-background rounded-lg transition"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;