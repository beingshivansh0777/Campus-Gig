import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, X } from "lucide-react";
import { useAuthStore } from "../../features/auth/authStore";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import NotificationPanel from "../../features/notifications/components/NotificationPanel";
import Avatar from "../ui/Avatar";

function Navbar() {
  const navigate = useNavigate();
  const { token, user, isGig, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setDrawerOpen(false);
    navigate("/login");
  };

  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileNotifOpen, setMobileNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const mobileNotifRef = useRef(null);
  const {
    notifications,
    unreadCount,
    isLoading: notifLoading,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    if (!notifOpen) return;
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  useEffect(() => {
    if (!mobileNotifOpen) return;
    function handleClickOutside(event) {
      if (
        mobileNotifRef.current &&
        !mobileNotifRef.current.contains(event.target)
      ) {
        setMobileNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileNotifOpen]);

  const handleNotifToggle = (setter, current) => {
    setter(() => {
      const next = !current;
      if (next && unreadCount > 0) markAllAsRead();
      return next;
    });
  };

  const primaryLinks = isGig
    ? [
        { to: "/jobs", label: "Find Work" },
        { to: "/proposals", label: "My Proposals" },
        { to: "/saved-jobs", label: "Saved Jobs" },
        { to: "/contracts", label: "Contracts" },
      ]
    : [
        { to: "/jobs/create", label: "Post a Project" },
        { to: "/jobs/my-jobs", label: "My Jobs" },
        { to: "/proposals-received", label: "Proposals" },
      ];

  const secondaryLinks = isGig
    ? []
    : [{ to: "/contracts", label: "Contracts" }];
  const allLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-lg bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent transition-transform duration-200 hover:scale-105 inline-block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Campus-Gig
          </Link>

          {token && (
            <nav className="hidden md:flex items-center gap-6">
              {allLinks.map((link) => (
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
                {/* Desktop bell */}
                <div className="relative hidden md:block" ref={notifRef}>
                  <button
                    onClick={() => handleNotifToggle(setNotifOpen, notifOpen)}
                    className="relative flex text-muted hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[10px] font-bold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  {notifOpen && (
                    <NotificationPanel
                      notifications={notifications}
                      isLoading={notifLoading}
                      onClose={() => setNotifOpen(false)}
                    />
                  )}
                </div>

                {/* Desktop avatar dropdown */}
                <div className="relative hidden md:block" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex items-center gap-2 text-sm font-body text-ink group"
                  >
                    <Avatar
                      src={user?.profileImage}
                      name={user?.firstName}
                      size="sm"
                    />
                    <ChevronDown
                      size={16}
                      className={`text-muted transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-52 bg-surface border border-border rounded-lg shadow-sm py-1 origin-top-right transition-all duration-150 ${
                      menuOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
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
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body text-error hover:bg-error/5 hover:pl-5 transition-all duration-150"
                    >
                      Log out
                    </button>
                  </div>
                </div>

                {/* Mobile: bell + avatar (avatar opens the right drawer) */}
                <div className="md:hidden flex items-center gap-2">
                  <div className="relative" ref={mobileNotifRef}>
                    <button
                      onClick={() =>
                        handleNotifToggle(setMobileNotifOpen, mobileNotifOpen)
                      }
                      className="relative flex items-center justify-center w-10 h-10 rounded-lg text-muted hover:bg-background transition"
                      aria-label="Notifications"
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 bg-error text-white text-[10px] font-bold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>
                    {mobileNotifOpen && (
                      <div className="absolute right-0 mt-2 z-50">
                        <NotificationPanel
                          notifications={notifications}
                          isLoading={notifLoading}
                          onClose={() => setMobileNotifOpen(false)}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex items-center justify-center rounded-full transition active:scale-90"
                    aria-label="Open menu"
                  >
                    <Avatar
                      src={user?.profileImage}
                      name={user?.firstName}
                      size="sm"
                    />
                  </button>
                </div>
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
      </header>

      {/* Right-side mobile drawer — kept OUTSIDE <header> so the header's
          backdrop-blur-sm doesn't create a containing block that traps
          our position:fixed drawer inside the header's small box. */}
      {token && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            className={`md:hidden fixed inset-0 bg-ink/60 z-40 transition-opacity duration-300 ${
              drawerOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />
          <div
            role="dialog"
            aria-modal="true"
            className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white border-l border-border z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="shrink-0 flex items-center justify-between px-4 h-16 border-b border-border bg-white">
              <div className="flex items-center gap-2.5">
                <Avatar
                  src={user?.profileImage}
                  name={user?.firstName}
                  size="sm"
                />
                <span className="font-body font-semibold text-sm text-ink">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-ink hover:bg-background transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 bg-white">
              <Link
                to="/profile"
                onClick={() => setDrawerOpen(false)}
                className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setDrawerOpen(false)}
                className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
              >
                Dashboard
              </Link>

              <div className="border-t border-border my-2" />

              {allLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setDrawerOpen(false)}
                  className="block px-2 py-2.5 text-sm font-body text-ink hover:bg-background hover:pl-4 rounded-lg transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border my-2" />

              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2.5 text-sm font-body text-error hover:bg-error/5 hover:pl-4 rounded-lg transition-all duration-150"
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;