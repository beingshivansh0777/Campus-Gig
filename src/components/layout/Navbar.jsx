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
        { to: '/proposals-received', label: 'Proposals' },
      ];

  const secondaryLinks = isGig ? [] : [{ to: '/contracts', label: 'Contracts' }];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-bold text-lg bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent transition-transform duration-200 hover:scale-105 inline-block"
        >
          Campus-Gig
        </Link>

        {token && (
          <nav className="hidden md:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-sm font-body text-muted hover:text-ink transition-colors duration-200 py-1 group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-linear-to-r from-primary to-accent-pink transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {token ? (
            <>
              <button
                className="hidden md:flex text-muted hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>

              <div className="relative hidden md:block" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-body text-ink group"
                >
                  <span className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent-pink text-white flex items-center justify-center font-semibold text-sm transition-transform duration-200 group-hover:scale-105 ring-2 ring-transparent group-hover:ring-primary/20">
                    {user?.firstName?.[0] || 'U'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted transition-transform duration-200 ${
                      menuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-sm py-1 origin-top-right transition-all duration-150 ${
                    menuOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-body text-ink hover:bg-background hover:pl-5 transition-all duration-150"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-body text-ink hover:bg-background hover:pl-5 transition-all duration-150"
                  >
                    Dashboard
                  </Link>

                  <div className="border-t border-border my-1" />

                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-body text-ink hover:bg-background hover:pl-5 transition-all duration-150"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-border my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-body text-error hover:bg-error/5 hover:pl-5 transition-all duration-150"
                  >
                    Log out
                  </button>
                </div>
              </div>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden text-ink transition-transform duration-200 active:scale-90"
                aria-label="Menu"
              >
                <div className="relative w-5.5 h-5.5">
                  <X
                    size={22}
                    className={`absolute inset-0 transition-all duration-200 ${
                      mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                    }`}
                  />
                  <Menu
                    size={22}
                    className={`absolute inset-0 transition-all duration-200 ${
                      mobileOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                    }`}
                  />
                </div>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-body text-ink hover:text-primary transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-body font-semibold bg-linear-to-r from-primary to-accent-pink text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen && token ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-border bg-surface px-4 py-3 space-y-1">
          {[...primaryLinks, ...secondaryLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border my-1" />
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
          >
            Profile
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-2.5 text-sm font-body text-error hover:bg-error/5 hover:pl-4 rounded-lg transition-all duration-150"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;