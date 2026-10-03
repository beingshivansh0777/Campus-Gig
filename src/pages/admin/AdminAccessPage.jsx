import { useState } from "react";

import {
  Check,
  ShieldCheck,
  X,
  Mail,
  Phone,
  CalendarDays,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

import AdminTable from "../../features/admin/components/AdminTable";

import {
  useAdminAccess,
  useAdminAdmins,
} from "../../features/admin/hooks/useAdminAuth";

import { useAdminAuthStore } from "../../features/admin/adminAuthStore";

const FILTER_OPTIONS = [
  { label: "All Administrators", value: "" },
  { label: "Allowed", value: "ALLOWED" },
  { label: "Pending", value: "PENDING" },
  { label: "Denied", value: "DENIED" },
];

const STATUS_DOT = {
  ALLOWED: "bg-emerald-400",
  PENDING: "bg-amber-400",
  DENIED: "bg-red-400",
};

const StatusBadge = ({ status }) => {
  const styles = {
    ALLOWED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    DENIED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const labels = {
    ALLOWED: "Allowed",
    PENDING: "Pending",
    DENIED: "Denied",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-border/40 text-muted border-border"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          STATUS_DOT[status] || "bg-muted"
        }`}
      />

      {labels[status] || status || "UNKNOWN"}
    </span>
  );
};

const AdminControls = ({ filter, onFilterChange, resultCount }) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-muted" />

        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-body text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {typeof resultCount === "number" && (
        <span className="text-xs font-medium text-muted">
          {resultCount} {resultCount === 1 ? "result" : "results"} on this page
        </span>
      )}
    </div>
  );
};

const AdminMobileCard = ({ admin, onApprove, onDeny, isUpdating }) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 transition hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {admin.fullName?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-ink">
              {admin.fullName || "Unnamed Admin"}
            </h3>

            <p className="truncate text-xs text-muted">
              {admin.email || "No email"}
            </p>
          </div>
        </div>

        <StatusBadge status={admin.accessStatus} />
      </div>

      <div className="mt-4 space-y-2.5 border-t border-border pt-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Phone size={15} className="shrink-0" />
          <span>{admin.contactNumber || "No contact number"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <CalendarDays size={15} className="shrink-0" />

          <span>
            {admin.createdAt
              ? new Date(admin.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>

      {admin.accessStatus === "PENDING" && (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onApprove(admin.id)}
            disabled={isUpdating}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check size={16} />
            Approve
          </button>

          <button
            type="button"
            onClick={() => onDeny(admin.id)}
            disabled={isUpdating}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} />
            Deny
          </button>
        </div>
      )}
    </div>
  );
};

const AdminAccessPage = () => {
  const { email } = useAdminAuthStore();

  const mainAdminEmail = import.meta.env.VITE_MAIN_ADMIN_EMAIL;

  const isMainAdmin =
    email && mainAdminEmail
      ? email.toLowerCase() === mainAdminEmail.toLowerCase()
      : false;

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const {
    data: admins = [],
    isLoading,
    isError,
  } = useAdminAdmins(
    {
      page,
      size: pageSize,
      keyword: filter,
    },
    isMainAdmin,
  );

  const adminAccessMutation = useAdminAccess();

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleApprove = (id) => {
    adminAccessMutation.mutate({
      id,
      status: "ALLOWED",
    });
  };

  const handleDeny = (id) => {
    adminAccessMutation.mutate({
      id,
      status: "DENIED",
    });
  };

  const canGoPrevious = page > 1;
  const canGoNext = admins.length === pageSize;

  const handlePrevious = () => {
    if (canGoPrevious) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setPage((prev) => prev + 1);
    }
  };

  if (!isMainAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <ShieldCheck size={28} className="text-red-400" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-ink">
            Access Restricted
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Only the Main Administrator can manage administrator access.
          </p>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "admin",
      label: "Admin",
      render: (admin) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {admin.fullName?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-ink">
              {admin.fullName || "Unnamed Admin"}
            </p>

            <p className="truncate text-xs text-muted">
              {admin.email || "No email"}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "contact",
      label: "Contact",
      render: (admin) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Mail size={13} />
            <span>{admin.email || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <Phone size={13} />
            <span>{admin.contactNumber || "N/A"}</span>
          </div>
        </div>
      ),
    },

    {
      key: "createdAt",
      label: "Created On",
      render: (admin) =>
        admin.createdAt
          ? new Date(admin.createdAt).toLocaleDateString()
          : "N/A",
    },

    {
      key: "status",
      label: "Status",
      render: (admin) => <StatusBadge status={admin.accessStatus} />,
    },

    {
      key: "actions",
      label: "Actions",
      render: (admin) =>
        admin.accessStatus === "PENDING" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleApprove(admin.id);
              }}
              disabled={adminAccessMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={14} />
              Approve
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeny(admin.id);
              }}
              disabled={adminAccessMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={14} />
              Deny
            </button>
          </div>
        ) : (
          <StatusBadge status={admin.status} />
        ),
    },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 space-y-6 pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck size={18} className="text-primary" />
              </span>

              <h1 className="text-2xl font-semibold text-ink">Admin Access</h1>
            </div>

            <p className="mt-1.5 text-sm text-muted">
              Manage administrator access and approval requests.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
            <Users size={16} className="text-primary" />

            <span className="text-sm font-medium text-ink">Administrators</span>
          </div>
        </div>

        <AdminControls
          filter={filter}
          onFilterChange={handleFilterChange}
          resultCount={!isLoading ? admins.length : undefined}
        />

        {isError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              Failed to load administrators. Please try again.
            </p>
          </div>
        )}

        <div className="hidden md:block">
          <AdminTable
            columns={columns}
            data={admins}
            isLoading={isLoading}
            emptyMessage="No administrators found."
          />
        </div>

        <div className="space-y-3 md:hidden">
          {isLoading ? (
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-xl bg-border/30"
              />
            ))
          ) : admins.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-10 text-center">
              <p className="text-sm text-muted">No administrators found.</p>
            </div>
          ) : (
            admins.map((admin) => (
              <AdminMobileCard
                key={admin.id}
                admin={admin}
                onApprove={handleApprove}
                onDeny={handleDeny}
                isUpdating={adminAccessMutation.isPending}
              />
            ))
          )}
        </div>
      </div>

      {!isLoading && admins.length > 0 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-muted font-body">Page {page}</p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!canGoPrevious}
              onClick={handlePrevious}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-sm font-body text-ink hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!canGoNext}
              onClick={handleNext}
              className="px-4 py-2 border border-border rounded-lg bg-surface text-sm font-body text-ink hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccessPage;
