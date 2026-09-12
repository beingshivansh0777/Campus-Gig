import { useParams } from 'react-router-dom';
import JobForm from '../features/jobs/components/JobForm';
import { useDraft } from '../features/jobs/hooks/useDraft';
import { useUpdateDraft } from '../features/jobs/hooks/useUpdateDraft';
import { useCreateJob } from '../features/jobs/hooks/useCreateJob';

function EditDraftPage() {
  const { draftId } = useParams();
  const { data: draft, isLoading } = useDraft(draftId);
  const updateDraft = useUpdateDraft();
  const createJob = useCreateJob();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Edit Draft</h1>
      <p className="font-body text-sm text-muted mb-6">
        Update your draft, or publish it now to start receiving proposals.
      </p>

      <div className="bg-surface border border-border rounded-xl p-6">
        <JobForm
          defaultValues={draft}
          onSubmit={(data) => createJob.mutate({ ...data, draftId })}
          onSaveDraft={(data) => updateDraft.mutate({ ...data, draftId })}
          submitLabel="Publish Job"
          isSubmitting={createJob.isPending}
          isSavingDraft={updateDraft.isPending}
        />
      </div>
    </div>
  );
}

export default EditDraftPage;