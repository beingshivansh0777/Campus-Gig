import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAdminLogin } from '../../features/admin/hooks/useAdminAuth';

function AdminLoginPage() {
  const adminLogin = useAdminLogin();
  const { register, handleSubmit } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl p-6 border border-border">
        <h1 className="font-display text-xl font-bold text-ink mb-1">Admin Login</h1>
        <p className="text-sm font-body text-muted mb-5">Restricted access.</p>

        <form onSubmit={handleSubmit((data) => adminLogin.mutate(data))} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            {...register('email')}
            className="w-full border border-border bg-background rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full border border-border bg-background rounded-lg px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          <button
            type="submit"
            disabled={adminLogin.isPending}
            className="w-full bg-ink text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {adminLogin.isPending ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-xs font-body text-faint text-center mt-4">
          <Link to="/admin/register" className="hover:text-ink transition">
            Register as admin
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;