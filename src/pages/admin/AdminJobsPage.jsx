import { useNavigate } from 'react-router-dom';
import { useAdminJobs } from '../../features/admin/hooks/useAdminEntities';
import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'clientResponseDTO', label: 'Client', render: (r) => `${r.clientResponseDTO?.firstName} ${r.clientResponseDTO?.lastName}` },
  { key: 'budget', label: 'Budget', render: (r) => `₹${r.budget}` },
  { key: 'jobStatus', label: 'Status' },
  { key: 'publishAt', label: 'Posted', render: (r) => new Date(r.publishAt).toLocaleDateString() },
];

function AdminJobsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminJobs({ pageNumber: 1, pageSize: 50 });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Jobs</h1>
      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/jobs/${row.jobId}`)}
        emptyMessage="No jobs found."
      />
    </div>
  );
}

export default AdminJobsPage;