import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminTechnicalSupports } from "../../features/admin/hooks/useAdminAuth";
import AdminTable from "../../features/admin/components/AdminTable";

const columns = [
  {
    key: "subject",
    label: "Subject",
    render: (r) => (
      <span className="font-medium text-ink">{r.subject || "-"}</span>
    ),
  },

  {
    key: "reportedBy",
    label: "Reported By",
    render: (r) => {
      const user = r.userResponseDTO;
      if (!user) return "-";
      const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      return name || user.email || "-";
    },
  },

  {
    key: "status",
    label: "Status",
    render: (r) => {
      const status = r.status?.replace(/_/g, " ") || "-";

      const statusStyles = {
        RESOLVED: "bg-green-100 text-green-700 border border-green-200",
        OPEN: 'bg-violet-100 text-violet-700 border border-violet-200',
        PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        IN_PROGRESS: "bg-blue-100 text-blue-700 border border-blue-200",
      };

      const badgeClass =
        statusStyles[r.status] ||
        "bg-gray-100 text-gray-600 border border-gray-200";

      return (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {status}
        </span>
      );
    },
  },

  {
    key: "createdAt",
    label: "Filed",
    render: (r) =>
      r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
  },
];

function AdminTechnicalSupportPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminTechnicalSupports({
    pageNumber: page,
    pageSize: 15,
    direction: "DESC",
    field: "createdAt",
  });

  return (
    <div className="min-h-full flex flex-col">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">
        Technical Support
      </h1>

      <AdminTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/admin/technical-support/${row.id}`)}
        emptyMessage="No technical support issues found."
      />

      {!isLoading && data?.length > 0 && (
        <div className="flex items-center justify-between mt-auto pt-8 pb-2">
          <p className="text-sm text-muted font-body">Page {page}</p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-sm font-body text-ink hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!data || data.length < 15}
              onClick={() => setPage((current) => current + 1)}
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
