import { useState, useEffect } from 'react';
import { useContracts } from '../features/contracts/hooks/useContracts';
import ContractCard from '../features/contracts/components/ContractCard';
import { CONTRACT_STATUS_LABELS } from '../lib/constants';

function MyContractsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useContracts(
    statusFilter ? { keyword: statusFilter } : {},
    page
  );

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const contracts = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const goToPage = (p) => setPage(Math.min(Math.max(p, 1), totalPages));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Contracts</h1>
      <p className="font-body text-sm text-muted mb-6">
        Track the status and progress of your agreements.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setStatusFilter('')}
          className={`text-sm font-body font-medium px-3 py-1.5 rounded-lg border transition ${
            statusFilter === ''
              ? 'border-primary text-primary bg-primary/5'
              : 'border-border text-muted hover:border-ink/30'
          }`}
        >
          All
        </button>
        {Object.entries(CONTRACT_STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`text-sm font-body font-medium px-3 py-1.5 rounded-lg border transition ${
              statusFilter === key
                ? 'border-primary text-primary bg-primary/5'
                : 'border-border text-muted hover:border-ink/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">Couldn't load contracts.</p>
        </div>
      ) : contracts.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center">
          <p className="font-body text-sm text-muted">No contracts yet.</p>
        </div>
      ) : (
        <>
          <div className={`space-y-3 transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
            {contracts.map((contract) => (
              <ContractCard key={contract.contractId} contract={contract} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm font-body font-medium text-muted border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-ink hover:border-primary/40 transition"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-8 h-8 text-sm font-body font-medium rounded-lg transition ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'text-muted hover:text-ink hover:bg-border/30'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm font-body font-medium text-muted border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-ink hover:border-primary/40 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyContractsPage;