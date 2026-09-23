import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { User, Mail, Phone } from 'lucide-react';
import { useAdminRegister } from '../../features/admin/hooks/useAdminAuth';
import AdminAuthLayout from '../../features/admin/components/AdminAuthLayout';
import PasswordInput from '../../components/ui/PasswordInput';

const fieldClass =
  'w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function AdminRegisterPage() {
  const adminRegister = useAdminRegister();
  const { register, handleSubmit } = useForm();

  return (
    <AdminAuthLayout
      title="Register as Admin"
      subtitle="Your account will stay pending until an existing admin approves it."
    >
      <form onSubmit={handleSubmit((data) => adminRegister.mutate(data))} className="space-y-4">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input placeholder="Your full name" {...register('fullName')} className={fieldClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Contact Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input placeholder="9876543210" {...register('contactNo')} className={fieldClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input type="email" placeholder="admin@campusgig.com" {...register('email')} className={fieldClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Password</label>
          <PasswordInput register={register} name="password" />
        </div>

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
    </AdminAuthLayout>
  );
}

export default AdminRegisterPage;