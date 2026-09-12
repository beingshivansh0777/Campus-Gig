import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Mail, Phone, Calendar, User } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

const fieldClass =
  'w-full border border-border bg-surface rounded-lg pl-9 pr-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function EditProfileForm() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const { register, handleSubmit, reset } = useForm();

  // Pre-fill the form once profile data arrives
  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        dob: profile.dob,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data) => updateProfile.mutate(data);

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-border/30 rounded-lg" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">First Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input {...register('firstName')} className={fieldClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Last Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input {...register('lastName')} className={fieldClass} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="email" {...register('email')} className={fieldClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Phone Number</label>
        <div className="relative">
          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input {...register('phoneNumber')} className={fieldClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Date of Birth</label>
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="date" {...register('dob')} className={fieldClass} />
        </div>
      </div>

      <button
        type="submit"
        disabled={updateProfile.isPending}
        className="bg-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
      >
        {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

export default EditProfileForm;