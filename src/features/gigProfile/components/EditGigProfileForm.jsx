import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useGigProfile } from '../hooks/useGigProfile';
import { useUpdateGigProfile } from '../hooks/useUpdateGigProfile';
import SkillsInput from '../../profile/components/SkillsInput';

const JOB_CATEGORIES = [
  'WEB_DEVELOPMENT', 'APP_DEVELOPMENT', 'UI_UX_DESIGN', 'GRAPHIC_DESIGN',
  'CONTENT_WRITING', 'VIDEO_EDITING', 'DIGITAL_MARKETING', 'SEO',
  'DATA_ENTRY', 'DATA_ANALYSIS', 'SOFTWARE_TESTING', 'DATABASE_DEVELOPMENT',
  'JAVA_DEVELOPMENT', 'PYTHON_DEVELOPMENT', 'REACT_DEVELOPMENT',
  'WORDPRESS_DEVELOPMENT', 'TUTORING', 'TRANSLATION', 'FRONTEND_DEVELOPMENT',
  'PHOTOGRAPHY', 'DATA_SCIENCE', 'OTHER',
];

const fieldClass =
  'w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function EditGigProfileForm() {
  const { data: gigProfile, isLoading } = useGigProfile();
  const updateGigProfile = useUpdateGigProfile();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { skillsId: [] },
  });

  useEffect(() => {
    if (gigProfile) {
      reset({
        title: gigProfile.title,
        jobCategory: gigProfile.jobCategory,
        description: gigProfile.description,
        college: gigProfile.college,
        department: gigProfile.department,
        semester: gigProfile.semester,
        availabilityStatus: gigProfile.availabilityStatus,
        skillsId: (gigProfile.gigSkills || []).map((s) => ({ id: s.id, skill: s.skill })),
      });
    }
  }, [gigProfile, reset]);

  const onSubmit = (data) => {
    updateGigProfile.mutate({
      title: data.title,
      jobCategory: data.jobCategory,
      availabilityStatus: data.availabilityStatus,
      description: data.description,
      college: data.college,
      department: data.department,
      semester: Number(data.semester),
      skillsId: data.skillsId.map((s) => s.id),
    });
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-border/30 rounded-lg" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Professional Title
        </label>
        <input {...register('title')} className={fieldClass} />
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Primary Category
        </label>
        <select {...register('jobCategory')} className={fieldClass}>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Availability
        </label>
        <select {...register('availabilityStatus')} className={fieldClass}>
          <option value="AVAILABLE">Available</option>
          <option value="UN_AVAILABLE">Unavailable</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">About You</label>
        <textarea {...register('description')} rows={4} className={fieldClass} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">College</label>
          <input {...register('college')} className={fieldClass} />
        </div>
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Department</label>
          <input {...register('department')} className={fieldClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Semester</label>
        <input type="number" min="1" max="10" {...register('semester')} className={fieldClass} />
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">Skills</label>
        <Controller
          name="skillsId"
          control={control}
          render={({ field }) => <SkillsInput value={field.value} onChange={field.onChange} />}
        />
      </div>

      <button
        type="submit"
        disabled={updateGigProfile.isPending}
        className="bg-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
      >
        {updateGigProfile.isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

export default EditGigProfileForm;