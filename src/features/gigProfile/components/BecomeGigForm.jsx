import { useForm, Controller } from 'react-hook-form';
import { useBecomeGig } from '../hooks/useBecomeGig';
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

function BecomeGigForm() {
  const becomeGig = useBecomeGig();
  const { register, handleSubmit, control } = useForm({
    defaultValues: { skillsId: [] },
  });

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      jobCategory: data.jobCategory,
      availabilityStatus: 'AVAILABLE',
      description: data.description,
      college: data.college,
      department: data.department,
      semester: Number(data.semester),
      dob: data.dob,
      skillsId: data.skillsId.map((s) => s.id),
    };
    becomeGig.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Professional Title
        </label>
        <input
          {...register('title')}
          placeholder="e.g. Full Stack Developer"
          className={fieldClass}
        />
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Primary Category
        </label>
        <select {...register('jobCategory')} className={fieldClass}>
          <option value="">Select a category</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">About You</label>
        <textarea
          {...register('description')}
          rows={4}
          placeholder="Describe your experience and what you can offer..."
          className={fieldClass}
        />
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Semester</label>
          <input type="number" min="1" max="10" {...register('semester')} className={fieldClass} />
        </div>
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Date of Birth
          </label>
          <input type="date" {...register('dob')} className={fieldClass} />
        </div>
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
        disabled={becomeGig.isPending}
        className="w-full bg-primary text-white font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
      >
        {becomeGig.isPending ? 'Creating your Gig profile...' : 'Create Gig Profile'}
      </button>
    </form>
  );
}

export default BecomeGigForm;