import { useState } from 'react';
import {
  Check,
  ShieldCheck,
  X,
  Mail,
  Phone,
  CalendarDays,
} from 'lucide-react';

import AdminTable from '../../features/admin/components/AdminTable';
import { useAdminAccess } from '../../features/admin/hooks/useAdminAuth';

const INITIAL_PENDING_ADMINS = [
  {
    id: 101,
    fullName: 'Test Admin',
    email: 'testadmin@example.com',
    contactNo: '9876543210',
    adminAccessStatus: 'PENDING',
    adminStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_APPROVED_ADMINS = [
  {
    id: 1,
    fullName: 'Shivansh Mishra',
    email: 'shivanshmishradev@gmail.com',
    contactNo: '-',
    adminAccessStatus: 'ALLOWED',
    adminStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
];

const pendingColumns = [
  {
    key: 'fullName',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'contactNo',
    label: 'Contact',
    render: (row) => row.contactNo || '-',
  },
  {
    key: 'adminAccessStatus',
    label: 'Status',
    render: (row) => (
      <span className="font-medium text-ink">
        {row.adminAccessStatus}
      </span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Registered',
    render: (row) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : '-',
  },
];

const approvedColumns = [
  {
    key: 'fullName',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'adminStatus',
    label: 'Admin Status',
    render: (row) => (
      <span className="font-medium text-ink">
        {row.adminStatus}
      </span>
    ),
  },
  {
    key: 'adminAccessStatus',
    label: 'Access',
    render: (row) => (
      <span className="font-medium text-ink">
        {row.adminAccessStatus}
      </span>
    ),
  },
  {
    key: 'createdAt',
    label: 'Registered',
    render: (row) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : '-',
  },
];

function AdminAccessPage() {
  const [pendingAdmins, setPendingAdmins] = useState(
    INITIAL_PENDING_ADMINS
  );

  const [approvedAdmins, setApprovedAdmins] = useState(
    INITIAL_APPROVED_ADMINS
  );

  const adminAccess = useAdminAccess();

  const handleAccessUpdate = (admin, status) => {
    adminAccess.mutate(
      {
        id: admin.id,
        status,
      },
      {
        onSuccess: () => {
          setPendingAdmins((current) =>
            current.filter((item) => item.id !== admin.id)
          );

          if (status === 'ALLOWED') {
            setApprovedAdmins((current) => [
              ...current,
              {
                ...admin,
                adminAccessStatus: 'ALLOWED',
              },
            ]);
          }
        },
      }
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">
          Admin Access
        </h1>

        <p className="text-sm text-muted font-body mt-1">
          Manage administrator access requests.
        </p>
      </div>

      {/* =========================
          PENDING ADMINS
      ========================= */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck
            size={19}
            className="text-primary"
          />

          <h2 className="font-display text-lg font-semibold text-ink">
            Pending Admins
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <AdminTable
            columns={pendingColumns}
            data={pendingAdmins}
            isLoading={false}
            emptyMessage="No pending admin requests."
          />

          {pendingAdmins.length > 0 && (
            <div className="mt-3 bg-surface border border-border rounded-xl overflow-hidden">
              {pendingAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-end gap-2 px-5 py-3 border-b border-border last:border-0"
                >
                  <button
                    type="button"
                    disabled={adminAccess.isPending}
                    onClick={() =>
                      handleAccessUpdate(
                        admin,
                        'ALLOWED'
                      )
                    }
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-ink text-white text-sm font-body font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Check size={15} />
                    Approve
                  </button>

                  <button
                    type="button"
                    disabled={adminAccess.isPending}
                    onClick={() =>
                      handleAccessUpdate(
                        admin,
                        'DENIED'
                      )
                    }
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-surface text-ink text-sm font-body font-semibold hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <X size={15} />
                    Deny
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {pendingAdmins.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-6 text-center">
              <p className="text-sm text-muted font-body">
                No pending admin requests.
              </p>
            </div>
          ) : (
            pendingAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-surface border border-border rounded-xl p-4"
              >
                {/* Admin Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold text-ink truncate">
                      {admin.fullName}
                    </h3>

                    <p className="text-xs text-muted font-body mt-0.5">
                      Pending access request
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold px-2 py-1 rounded-md border border-border bg-background text-ink">
                    {admin.adminAccessStatus}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Mail
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body truncate">
                      {admin.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body">
                      {admin.contactNo || '-'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <CalendarDays
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body">
                      {admin.createdAt
                        ? new Date(
                            admin.createdAt
                          ).toLocaleDateString()
                        : '-'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <button
                    type="button"
                    disabled={adminAccess.isPending}
                    onClick={() =>
                      handleAccessUpdate(
                        admin,
                        'ALLOWED'
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-ink text-white text-sm font-body font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Check size={15} />
                    Approve
                  </button>

                  <button
                    type="button"
                    disabled={adminAccess.isPending}
                    onClick={() =>
                      handleAccessUpdate(
                        admin,
                        'DENIED'
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-surface text-ink text-sm font-body font-semibold hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <X size={15} />
                    Deny
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* =========================
          APPROVED ADMINS
      ========================= */}
      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck
            size={19}
            className="text-primary"
          />

          <h2 className="font-display text-lg font-semibold text-ink">
            Approved Admins
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <AdminTable
            columns={approvedColumns}
            data={approvedAdmins}
            isLoading={false}
            emptyMessage="No approved admins found."
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {approvedAdmins.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-6 text-center">
              <p className="text-sm text-muted font-body">
                No approved admins found.
              </p>
            </div>
          ) : (
            approvedAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-surface border border-border rounded-xl p-4"
              >
                {/* Admin Header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold text-ink truncate">
                      {admin.fullName}
                    </h3>

                    <p className="text-xs text-muted font-body mt-0.5">
                      Administrator
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold px-2 py-1 rounded-md border border-border bg-background text-ink">
                    {admin.adminAccessStatus}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Mail
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body truncate">
                      {admin.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <ShieldCheck
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body">
                      Admin Status:{' '}
                      {admin.adminStatus || '-'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <CalendarDays
                      size={15}
                      className="text-muted shrink-0"
                    />

                    <span className="text-sm text-ink font-body">
                      {admin.createdAt
                        ? new Date(
                            admin.createdAt
                          ).toLocaleDateString()
                        : '-'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminAccessPage;