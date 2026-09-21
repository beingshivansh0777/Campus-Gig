import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAdminRegister } from '../../features/admin/hooks/useAdminAuth';

function AdminRegisterPage() {
  const adminRegister = useAdminRegister();
  const { register, handleSubmit } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl p-6 border border-border">
        <h1 className="font-display text-xl font-bold text-ink mb-1">Register as Admin</h1>
        <p className="text-sm font-body text-muted mb-5">
          Your account will stay pending until an existing admin approves it.
        </p>

        <form onSubmit={handleSubmit((data) => adminRegister.mutate(data))} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
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
            disabled={adminRegister.isPending}
            className="w-full bg-ink text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {adminRegister.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-xs font-body text-faint text-center mt-4">
          <Link to="/admin/login" className="hover:text-ink transition">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegisterPage;