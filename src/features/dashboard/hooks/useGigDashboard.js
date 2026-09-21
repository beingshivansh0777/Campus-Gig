import { useMemo } from "react";
import { useContracts } from "../../contracts/hooks/useContracts";
import { useMyProposals } from "../../proposals/hooks/useMyProposals";
import { useProfile } from "../../profile/hooks/useProfile";

export const useGigDashboard = () => {
  const { data: contractsPage, isLoading: contractsLoading } = useContracts();
  const { data: appliedProposals, isLoading: appliedLoading } =
    useMyProposals("APPLIED");
  const { data: shortlistedProposals, isLoading: shortlistedLoading } =
    useMyProposals("SHORTLISTED");
  const { data: profile, isLoading: profileLoading } = useProfile();
  const contracts = contractsPage?.content ?? [];
  const isLoading =
    contractsLoading || appliedLoading || shortlistedLoading || profileLoading;

  const stats = useMemo(() => {
    const activeContracts = contracts.filter((c) => c.status === "ACTIVE");
    const completedContracts = contracts.filter((c) => c.status === "COMPLETE");
    const totalEarnings = completedContracts.reduce(
      (sum, c) => sum + (c.agreementAmount || 0),
      0,
    );

    return {
      activeContractsCount: activeContracts.length,
      completedContractsCount: completedContracts.length,
      totalEarnings,
      averageRating: profile?.averageRating,
      totalRatings: profile?.totalRatings,
      appliedCount: appliedProposals?.length || 0,
      shortlistedCount: shortlistedProposals?.length || 0,
    };
  }, [contractsPage, profile, appliedProposals, shortlistedProposals]);

  return {
    isLoading,
    stats,
    recentContracts: contracts.slice(0, 4),
  };
};