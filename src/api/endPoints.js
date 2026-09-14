export const ENDPOINTS = {
  auth: {
    signup: "/auth/sign-up",
    login: "/auth/login",
    verifyOtp: "/auth/verification", // GET to request, PATCH to confirm
    forgotPasswordOtp: "/auth/forgot-password", // GET to request, PATCH to confirm
    profile: "/auth/profile",
    editProfile: "/auth/edit-profile",
    refreshToken: "/auth/refresh-token",
  },
  gig: {
    becomeGig: "/gig/become-gig",
    myProfile: "/gig/profile",
    addSkills: "/gig/add-skills",
    proposal: "/gig/proposal", // POST to apply
    proposals: "/gig/proposals", // POST (filter/list) — fixed from GET
    proposalById: (id) => `/gig/proposal/${id}`, // PATCH update
    withdrawProposal: (id) => `/gig/withdraw-proposal/${id}`,
  },
  jobs: {
    create: "/job/job",
    delete: "/job/job", // DELETE with ?jobId=
    draft: "/job/draft",
    drafts: "/job/drafts",
    draftById: (id) => `/job/draft/${id}`,
    list: "/job/jobs",
    byId: (id) => `/job/job/${id}`,
    myJobs: "/job/my-jobs",
    applicants: (jobId) => `/job/applicants/${jobId}`,
    acceptProposal: "/job/accept-proposal",
    rejectProposal: "/job/reject-proposal",
    shortlistProposal: "/job/shortlist-proposal",
    withdrawProposalByJobId: (jobId) => `/job/withdraw-proposal/${jobId}`,
  },
  contracts: {
    list: "/contract/contracts",
    byId: (id) => `/contract/contract/${id}`,
    progress: "/contract/progress",
    complete: (id) => `/contract/complete-contract/${id}`,
    activate: (id) => `/contract/active-contract/${id}`,
    breakContract: (id) => `/contract/break-contract/${id}`,
  },
  chat: {
    messages: (conversationId) => `/conversations/${conversationId}/messages`,
  },
  skills: {
    add: "/skills/add-skill",
    list: "/skills/skills",
    byId: (id) => `/skills/skill/${id}`,
    search: "/skills/search",
  },
  bookmarks: {
    save: "/bookmark/bookmark",
    remove: "/bookmark/bookmark", // DELETE with ?jobId=
    list: "/bookmark/bookmarks",
  },
  reviews: {
    byContractId: (id) => `/review/review/${id}`, // POST/PATCH/DELETE
    list: "/review/reviews",
  },
  reports: {
    create: "/report/report",
  },
};
