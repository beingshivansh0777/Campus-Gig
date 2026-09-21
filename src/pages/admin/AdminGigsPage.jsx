import { useNavigate } from 'react-router-dom';
import { useAdminGigs } from '../../features/admin/hooks/useAdminEntities';
import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'owner', label: 'Owner', render: (r) => `${r.owner?.firstName} ${r.owner?.lastName}` },
  { key: 'college', label: 'College' },
  { key: 'category', label: 'Category', render: (r) => r.category?.replace(/_/g, ' ') },
  { key: 'availabilityStatus', label: 'Status' },
];

function AdminGigsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminGigs({ pageNumber: 1, pageSize: 50 });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Gigs</h1>
      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/gigs/${row.id}`)}
        emptyMessage="No gigs found."
      />
    </div>
  );
}

export default AdminGigsPage;