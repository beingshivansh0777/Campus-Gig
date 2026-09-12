import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import {
  forgotPasswordRequestSchema,
  resetPasswordSchema,
} from '../../../lib/validators/authSchemas';
import { useRequestOtp, useResetPassword } from '../hooks/useForgotPassword';
import PasswordInput from '../../../components/ui/PasswordInput';

const fieldClass =
  'w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');

  const requestOtp = useRequestOtp();
  const resetPassword = useResetPassword();

  const requestForm = useForm({ resolver: zodResolver(forgotPasswordRequestSchema),
    mode : 'onBlur'
   });
  const resetForm = useForm({ resolver: zodResolver(resetPasswordSchema) , mode:'onBlur' });

  const handleRequestOtp = (data) => {
    requestOtp.mutate(data.email, {
      onSuccess: () => {
        setEmail(data.email);
        setStep('reset');
      },
    });
  };

  const handleResetPassword = (data) => {
    resetPassword.mutate(
      { email, otp: data.otp, newPassword: data.newPassword },
      { onSuccess: () => navigate('/login') }
    );
  };

  if (step === 'request') {
    return (
      <form onSubmit={requestForm.handleSubmit(handleRequestOtp)} className="space-y-4">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              placeholder="example@gmail.com"
              {...requestForm.register('email')}
              className={fieldClass}
            />
          </div>
          {requestForm.formState.errors.email && (
            <p className="text-error text-xs mt-1.5">
              {requestForm.formState.errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={requestOtp.isPending}
          className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
        >
          {requestOtp.isPending ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
      <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2.5">
        <ShieldCheck size={16} className="text-primary shrink-0" />
        <p className="text-xs font-body text-ink">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">OTP</label>
        <input
          {...resetForm.register('otp')}
          placeholder="000000"
          className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-mono text-sm text-ink tracking-widest placeholder:text-muted/50 placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
        {resetForm.formState.errors.otp && (
          <p className="text-error text-xs mt-1.5">{resetForm.formState.errors.otp.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">New Password</label>
        <PasswordInput
          register={resetForm.register}
          name="newPassword"
          error={resetForm.formState.errors.newPassword}
        />
      </div>

      <button
        type="submit"
        disabled={resetPassword.isPending}
        className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
      >
        {resetPassword.isPending ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;