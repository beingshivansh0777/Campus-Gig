import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAdminTechnicalSupports } from '../../features/admin/hooks/useAdminAuth';

import AdminTable from '../../features/admin/components/AdminTable';

const columns = [
  {
    key: 'subject',
    label: 'Subject',
    render: (r) => (
      <span className="font-medium text-ink">
        {r.subject || '-'}
      </span>
    ),
  },

  {
    key: 'reportedBy',
    label: 'Reported By',
    render: (r) => {
      const user = r.userResponseDTO;

      if (!user) return '-';

      const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();

      return name || user.email || '-';
    },
  },

  {
    key: 'status',
    label: 'Status',
    render: (r) =>
      r.status
        ? r.status.replace(/\_/g, ' ')
        : '-',
  },

  {
    key: 'createdAt',
    label: 'Filed',
    render: (r) =>
      r.createdAt
        ? new Date(r.createdAt).toLocaleDateString()
        : '-',
  },
];

function AdminTechnicalSupportPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminTechnicalSupports({
    pageNumber: page,
    pageSize: 50,
    direction: 'DESC',
    field: 'createdAt',
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">
        Technical Support
      </h1>

      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) =>
          navigate(`/admin/technical-support/${row.id}`)
        }
        emptyMessage="No technical support issues found."
      />

      {!isLoading && data?.length > 0 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-muted font-body">
            Page {page}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
              className="px-4 py-2 border border-border rounded-lg bg-surface text-sm font-body text-ink hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!data || data.length < 50}
              onClick={() =>
                setPage((current) => current + 1)
              }
              className="px-4 py-2 border border-border rounded-lg bg-surface text-sm font-body text-ink hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTechnicalSupportPage;



