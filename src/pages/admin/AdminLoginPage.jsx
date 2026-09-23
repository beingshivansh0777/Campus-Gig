import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAdminLogin } from '../../features/admin/hooks/useAdminAuth';
import AdminAuthLayout from '../../features/admin/components/AdminAuthLayout';
import PasswordInput from '../../components/ui/PasswordInput';

function AdminLoginPage() {
  const adminLogin = useAdminLogin();
  const { register, handleSubmit } = useForm();

  return (
    <AdminAuthLayout title="Admin Login" subtitle="Restricted access.">
      <form onSubmit={handleSubmit((data) => adminLogin.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Admin Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              placeholder="admin@campusgig.com"
              {...register('email')}
              className="w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Password</label>
          <PasswordInput register={register} name="password" />
        </div>

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
    </AdminAuthLayout>
  );
}

export default AdminLoginPage;