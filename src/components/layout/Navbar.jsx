import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../features/auth/authStore";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-sm font-body text-[#5B5470] hover:text-[#211A2E] transition-colors group py-2"
    >
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full bg-linearto-r from-[#7C3AED] to-[#EC4899]" />
    </Link>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const { token, user, isGig, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FEFCFB]/90 backdrop-blur-sm border-b border-[#EDE9F5]">
      <style>{`
        @keyframes cg-dot-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .cg-logo-dot {
          animation: cg-dot-pulse 2.2s ease-in-out 1;
        }
        @keyframes cg-dropdown-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cg-dropdown {
          animation: cg-dropdown-in 0.16s ease-out;
          transform-origin: top right;
        }
        @keyframes cg-bell-wiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-12deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-6deg); }
          80% { transform: rotate(4deg); }
        }
        .cg-bell:hover .cg-bell-icon {
          animation: cg-bell-wiggle 0.5s ease-in-out;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="cg-logo-dot absolute inline-flex h-full w-full rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899]" />
          </span>
          <span className="font-display font-bold text-lg bg-linear-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
            Campus-Gig
          </span>
        </Link>

        {token ? (
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/jobs">Find Work</NavLink>
            {isGig ? (
              <>
                <NavLink to="/proposals">My Proposals</NavLink>
                <NavLink to="/contracts">Active Contracts</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/jobs/create">Post a Project</NavLink>
                <NavLink to="/jobs/my-jobs">My Jobs</NavLink>
                <NavLink to="/contracts">Contracts</NavLink>
              </>
            )}
          </nav>
        ) : null}

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <button
                className="cg-bell relative text-[#5B5470] hover:text-[#7C3AED] transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} className="cg-bell-icon" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#F59E0B]" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-body text-[#211A2E]"
                >
                  <span className="w-8 h-8 rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899] text-white flex items-center justify-center font-semibold shadow-sm">
                    {user?.firstName?.[0] || "U"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#5B5470] transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {menuOpen && (
                  <div className="cg-dropdown absolute right-0 mt-2 w-48 bg-white border border-[#EDE9F5] rounded-xl shadow-lg py-1.5 overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-body text-[#211A2E] hover:bg-[#F3EEFB] hover:text-[#7C3AED] transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-body text-[#211A2E] hover:bg-[#FCE9F3] hover:text-[#EC4899] transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body text-error hover:bg-[#FEF2F2] transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-body text-[#211A2E] hover:text-[#7C3AED] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-body font-semibold text-white px-4 py-2 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#EC4899] hover:shadow-md hover:scale-[1.03] transition-all"
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
