import JobForm from '../features/jobs/components/JobForm';
import { useCreateJob } from '../features/jobs/hooks/useCreateJob';
import { useSaveDraft } from '../features/jobs/hooks/useSaveDraft';

function CreateJobPage() {
  const createJob = useCreateJob();
  const saveDraft = useSaveDraft();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Post a Project</h1>
      <p className="font-body text-sm text-muted mb-6">
        Describe what you need and start receiving proposals from Campus-Giggers.
      </p>

      <div className="bg-surface border border-border rounded-xl p-6">
        <JobForm
          onSubmit={(data) => createJob.mutate(data)}
          onSaveDraft={(data) => saveDraft.mutate(data)}
          submitLabel="Publish Job"
          isSubmitting={createJob.isPending}
          isSavingDraft={saveDraft.isPending}
        />
      </div>
    </div>
  );
}

export default CreateJobPage;