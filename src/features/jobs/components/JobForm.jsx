import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '../../../lib/validators/jobSchemas';
import { JOB_CATEGORIES, EXPERIENCE_LEVELS } from '../../../lib/constants';

const fieldClass =
  'w-full border border-border bg-surface rounded-lg px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition';

function JobForm({
  defaultValues,
  onSubmit,
  onSaveDraft,
  submitLabel = 'Publish Job',
  isSubmitting,
  isSavingDraft,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const handleDraftClick = () => {
    onSaveDraft(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Project Title
        </label>
        <input
          {...register('title')}
          placeholder="e.g. Build a React admin dashboard"
          className={fieldClass}
        />
        {errors.title && <p className="text-error text-xs mt-1.5">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-ink mb-1.5">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={6}
          placeholder="Describe the project scope, requirements, and expectations..."
          className={fieldClass}
        />
        {errors.description && (
          <p className="text-error text-xs mt-1.5">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Category</label>
          <select {...register('jobCategory')} className={fieldClass}>
            <option value="">Select category</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          {errors.jobCategory && (
            <p className="text-error text-xs mt-1.5">{errors.jobCategory.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Experience Level
          </label>
          <select {...register('experienceLevel')} className={fieldClass}>
            <option value="">Select level</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <p className="text-error text-xs mt-1.5">{errors.experienceLevel.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">
            Budget (₹)
          </label>
          <input
            type="number"
            step="1"
            {...register('budget')}
            placeholder="e.g. 5000"
            className={fieldClass}
          />
          {errors.budget && <p className="text-error text-xs mt-1.5">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-body font-medium text-ink mb-1.5">Deadline</label>
          <input type="date" {...register('deadline')} className={fieldClass} />
          {errors.deadline && (
            <p className="text-error text-xs mt-1.5">{errors.deadline.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>

        {onSaveDraft && (
          <button
            type="button"
            onClick={handleDraftClick}
            disabled={isSavingDraft}
            className="bg-surface text-ink font-body font-semibold text-sm px-5 py-2.5 rounded-lg border border-border hover:border-ink/30 disabled:opacity-50 transition"
          >
            {isSavingDraft ? 'Saving draft...' : 'Save as Draft'}
          </button>
        )}
      </div>
    </form>
  );
}

export default JobForm;