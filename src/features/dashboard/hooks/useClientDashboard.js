import { useMemo } from "react";
import { useMyJobs } from "../../jobs/hooks/useMyJobs";
import { useContracts } from "../../contracts/hooks/useContracts";
import { useAllReceivedProposals } from "../../jobs/hooks/useAllReceivedProposals";

export const useClientDashboard = () => {
  const { data: openJobsPage, isLoading: openJobsLoading } = useMyJobs(
    "OPEN",
    1,
  );

  const { data: closedJobsPage, isLoading: closedJobsLoading } = useMyJobs(
    "CLOSED",
    1,
  );

  const { data: contractsPage, isLoading: contractsLoading } = useContracts();
  const { data: proposals, isLoading: proposalsLoading } =
    useAllReceivedProposals();

  const isLoading =
    openJobsLoading ||
    closedJobsLoading ||
    contractsLoading ||
    proposalsLoading;

  const openJobs = openJobsPage?.content ?? [];
  const closedJobs = closedJobsPage?.content ?? [];
  const contracts = contractsPage?.content ?? [];

  const stats = useMemo(() => {
    const activeContracts = contracts.filter((c) => c.status === "ACTIVE");
    const completedContracts = contracts.filter((c) => c.status === "COMPLETE");
    const totalSpent = completedContracts.reduce(
      (sum, c) => sum + (c.agreementAmount || 0),
      0,
    );

    return {
      activeJobsCount: openJobs.length,
      closedJobsCount: closedJobsPage?.totalElements ?? closedJobs.length,
      activeContractsCount: activeContracts.length,
      completedContractsCount: completedContracts.length,
      totalSpent,
      pendingProposalsCount: proposals?.length ?? 0,
    };
  }, [openJobs, closedJobs, closedJobsPage, contractsPage, proposals]);

  return {
    isLoading,
    stats,
    recentJobs: openJobs.slice(0, 4),
    recentContracts: contracts.slice(0, 4),
  };
};