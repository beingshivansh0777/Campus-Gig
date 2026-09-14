import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContract } from "../features/contracts/hooks/useContract";
import {
  useUpdateProgress,
  useActivateContract,
  useCompleteContract,
} from "../features/contracts/hooks/useContractActions";
import { useAuthStore } from "../features/auth/authStore";
import BreakContractModal from "../features/contracts/components/BreakContractModal";
import {
  CONTRACT_STATUS_LABELS,
  PROGRESS_STATUS_LABELS,
  PROGRESS_ORDER,
} from "../lib/constants";

function ContractDetailPage() {
  const { contractId } = useParams();
  const { data: contract, isLoading, isError } = useContract(contractId);
  const isGig = useAuthStore((state) => state.isGig);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState("");

  const updateProgress = useUpdateProgress(contractId);
  const activateContract = useActivateContract(contractId);
  const completeContract = useCompleteContract(contractId);

  // Keep the dropdown's selection in sync once contract data loads or changes
  useEffect(() => {
    if (contract?.progressStatus) {
      setSelectedProgress(contract.progressStatus);
    }
  }, [contract?.progressStatus]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  if (isError || !contract) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="font-body text-sm text-muted">
          This contract couldn't be found.
        </p>
      </div>
    );
  }

  const otherPartyLabel = isGig ? contract.client : contract.gigName;
  const currentProgressIndex = PROGRESS_ORDER.indexOf(contract.progressStatus);
  const nextProgress = PROGRESS_ORDER[currentProgressIndex + 1];
  const isTerminal = ["COMPLETE", "CANCEL", "WITHDRAWN"].includes(
    contract.status
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-4 mb-1">
        <h1 className="font-display text-2xl font-bold text-ink">
          {contract.jobTitle}
        </h1>
        <span className="text-xs font-body font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">
          {CONTRACT_STATUS_LABELS[contract.status] || contract.status}
        </span>
      </div>
      <p className="text-sm font-body text-muted mb-6">
        {isGig ? "Client" : "Freelancer"}: {otherPartyLabel}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="font-mono font-bold text-lg text-ink">
            ₹{contract.agreementAmount}
          </p>
          <p className="text-xs font-body text-faint mt-0.5">
            Agreement Amount
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="font-body font-bold text-sm text-ink">
            {new Date(contract.deadline).toLocaleDateString()}
          </p>
          <p className="text-xs font-body text-faint mt-0.5">
            Expected Delivery
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-6">
        <h2 className="font-body font-semibold text-sm text-ink mb-3">
          Progress
        </h2>
        <div className="flex items-center gap-2 mb-4">
          {PROGRESS_ORDER.map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div
                className={`h-2 flex-1 rounded-full ${
                  i <= currentProgressIndex ? "bg-primary" : "bg-border"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm font-body text-muted mb-4">
          Current:{" "}
          <span className="text-ink font-medium">
            {PROGRESS_STATUS_LABELS[contract.progressStatus]}
          </span>
        </p>

        {isGig &&
          contract.status === "ACTIVE" &&
          contract.progressStatus !== "COMPLETED" && (
            <div className="flex items-center gap-3">
              <select
                value={selectedProgress}
                onChange={(e) => setSelectedProgress(e.target.value)}
                className="border border-border bg-surface rounded-lg px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              >
                <option value={contract.progressStatus}>
                  {PROGRESS_STATUS_LABELS[contract.progressStatus]} (current)
                </option>
                {nextProgress && (
                  <option value={nextProgress}>
                    {PROGRESS_STATUS_LABELS[nextProgress]}
                  </option>
                )}
              </select>
              <button
                onClick={() => updateProgress.mutate(selectedProgress)}
                disabled={
                  updateProgress.isPending ||
                  selectedProgress === contract.progressStatus
                }
                className="bg-primary text-white text-sm font-body font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {updateProgress.isPending ? "Updating..." : "Update"}
              </button>
            </div>
          )}

        {isGig && contract.status === "PENDING" && (
          <p className="text-sm font-body text-faint italic">
            Waiting for the client to activate this contract before you can
            start.
          </p>
        )}
      </div>

      {/* Actions */}
      {!isTerminal && (
        <div className="flex flex-wrap items-center gap-3">
          {!isGig && contract.status === "PENDING" && (
            <button
              onClick={() => activateContract.mutate()}
              disabled={activateContract.isPending}
              className="bg-primary text-white text-sm font-body font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
            >
              {activateContract.isPending
                ? "Activating..."
                : "Activate Contract"}
            </button>
          )}

          {!isGig && contract.status === "ACTIVE" && (
            <button
              onClick={() => completeContract.mutate()}
              disabled={
                completeContract.isPending ||
                contract.progressStatus !== "COMPLETED"
              }
              title={
                contract.progressStatus !== "COMPLETED"
                  ? "Work must be marked Completed before you can close this contract"
                  : ""
              }
              className="bg-success text-white text-sm font-body font-semibold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {completeContract.isPending ? "Completing..." : "Mark Complete"}
            </button>
          )}

          <button
            onClick={() => setShowBreakModal(true)}
            className="text-sm font-body font-semibold text-error border border-error/20 px-4 py-2 rounded-lg hover:bg-error/5 transition"
          >
            {contract.status === "PENDING" ? "Withdraw" : "Cancel Contract"}
          </button>
        </div>
      )}

      {showBreakModal && (
        <BreakContractModal
          contractId={contractId}
          onClose={() => setShowBreakModal(false)}
        />
      )}
    </div>
  );
}

export default ContractDetailPage;