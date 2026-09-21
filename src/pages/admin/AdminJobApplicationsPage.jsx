import { useNavigate } from 'react-router-dom';
import { useAdminJobApplications } from '../../features/admin/hooks/useAdminEntities';
import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  { key: 'applicantName', label: 'Applicant' },
  { key: 'clientName', label: 'Client' },
  { key: 'proposedAmount', label: 'Bid', render: (r) => `₹${r.proposedAmount}` },
  { key: 'status', label: 'Status' },
  { key: 'appliedAt', label: 'Applied', render: (r) => new Date(r.appliedAt).toLocaleDateString() },
];

function AdminJobApplicationsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminJobApplications({ pageNumber: 1, pageSize: 50 });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Job Applications</h1>
      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/job-applications/${row.id}`)}
        emptyMessage="No applications found."
      />
    </div>
  );
}

export default AdminJobApplicationsPage;