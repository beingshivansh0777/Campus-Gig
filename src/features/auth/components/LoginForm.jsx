import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { loginSchema } from '../../../lib/validators/authSchemas';
import { useLogin } from '../hooks/useLogin';
import PasswordInput from '../../../components/ui/PasswordInput';
import FormError from '../../../components/ui/FormError';
import { getErrorMessage } from '../../../lib/errorMessages';

function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
     resolver: zodResolver(loginSchema),
     mode:'onBlur'
   });

  const onSubmit = (data) => login.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={login.isError ? getErrorMessage(login.error) : null} />

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register('email')}
            className="w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
        {errors.email && <p className="text-error text-xs mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Password</label>
        <PasswordInput register={register} name="password" error={errors.password} />
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {login.isPending ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default LoginForm;