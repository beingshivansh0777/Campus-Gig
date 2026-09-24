import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, FileText, Flag, LogOut, Bot, X } from 'lucide-react';
import { useAdminAuthStore } from '../adminAuthStore';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/gigs', label: 'Gigs', icon: Bot },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/admin/job-applications', label: 'Applications', icon: FileText },
  { to: '/admin/reports', label: 'Reports', icon: Flag },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAdminAuthStore((state) => state.logout);
  const admin = useAdminAuthStore((state) => state.admin);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/admin/login');
  };

  const NavLinks = ({ onNavigate }) => (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition ${
              isActive ? 'bg-white/10 text-white font-semibold' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-ink text-white flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <span className="font-display font-bold text-lg">Campus-Gig</span>
          <p className="text-xs text-white/40 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLinks />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 m-3 rounded-lg text-sm font-body text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 bg-ink text-white shrink-0">
          <span className="font-display font-bold text-base">Campus-Gig</span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm"
            aria-label="Open admin menu"
          >
            {admin?.name?.[0]?.toUpperCase() || 'A'}
          </button>
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Right-side mobile drawer */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-ink text-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 shrink-0">
          <div>
            <span className="font-display font-bold text-base">Campus-Gig</span>
            <p className="text-xs text-white/40">Admin Panel</p>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavLinks onNavigate={() => setDrawerOpen(false)} />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 m-3 rounded-lg text-sm font-body text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
}

export default AdminLayout;