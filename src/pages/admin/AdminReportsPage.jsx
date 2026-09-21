
import { useNavigate } from 'react-router-dom';
import { useAdminReports } from '../../features/admin/hooks/useAdminEntities';
import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  { key: 'reason', label: 'Reason', render: (r) => r.reason?.replace(/_/g, ' ') },
  { key: 'reportedBy', label: 'Reported By' },
  { key: 'reportStatus', label: 'Status' },
  { key: 'createdAt', label: 'Filed', render: (r) => new Date(r.createdAt).toLocaleDateString() },
];

function AdminReportsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminReports({ pageNumber: 1, pageSize: 50 });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Reports</h1>
      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/reports/${row.id}`)}
        emptyMessage="No reports filed."
      />
    </div>
  );
}

export default AdminReportsPage;