import { useNavigate } from 'react-router-dom';
import { useAdminClients } from '../../features/admin/hooks/useAdminEntities';
import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  { key: 'firstName', label: 'Name', render: (r) => `${r.firstName} ${r.lastName}` },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'isVerified', label: 'Verified', render: (r) => (r.isVerified ? 'Yes' : 'No') },
  { key: 'createdAt', label: 'Joined', render: (r) => new Date(r.createdAt).toLocaleDateString() },
];

function AdminClientsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminClients({ pageNumber: 1, pageSize: 50 });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Clients</h1>
      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/clients/${row.id}`)}
        emptyMessage="No clients found."
      />
    </div>
  );
}

export default AdminClientsPage;