import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, FileText, Flag, LogOut, Bot } from 'lucide-react';
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

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 bg-ink text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <span className="font-display font-bold text-lg">Campus-Gig</span>
          <p className="text-xs text-white/40 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition ${
                  isActive ? 'bg-white/10 text-white font-semibold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 m-3 rounded-lg text-sm font-body text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;