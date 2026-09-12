import { useParams } from 'react-router-dom';
import JobForm from '../features/jobs/components/JobForm';
import { useJob } from '../features/jobs/hooks/useJob';
import { useEditJob } from '../features/jobs/hooks/useEditJob';

function EditJobPage() {
  const { jobId } = useParams();
  const { data: job, isLoading } = useJob(jobId);
  const editJob = useEditJob(jobId);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  const defaultValues = job && {
    title: job.title,
    description: job.description,
    jobCategory: job.category,
    experienceLevel: job.experience,
    budget: job.budget,
    deadline: job.deadline,
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Edit Project</h1>
      <p className="font-body text-sm text-muted mb-6">Update your project details.</p>

      <div className="bg-surface border border-border rounded-xl p-6">
        <JobForm
          defaultValues={defaultValues}
          onSubmit={(data) => editJob.mutate(data)}
          submitLabel="Save Changes"
          isSubmitting={editJob.isPending}
        />
      </div>
    </div>
  );
}

export default EditJobPage;