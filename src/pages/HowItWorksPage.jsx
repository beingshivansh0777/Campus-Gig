function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink mb-8">How it Works</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="font-body font-semibold text-sm text-primary mb-4">For Clients</p>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">1</span>
              <p className="font-body text-sm text-muted">
                Post a project with a clear title, description, budget, and deadline.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">2</span>
              <p className="font-body text-sm text-muted">
                Review incoming proposals and compare freelancer profiles, skills, and ratings.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">3</span>
              <p className="font-body text-sm text-muted">
                Chat with candidates, shortlist or accept a proposal to start a contract.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">4</span>
              <p className="font-body text-sm text-muted">
                Track progress, mark the contract complete, and leave a review once the work is done.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <p className="font-body font-semibold text-sm text-primary mb-4">For Giggers</p>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">1</span>
              <p className="font-body text-sm text-muted">
                Browse open projects and find ones that match your skills.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">2</span>
              <p className="font-body text-sm text-muted">
                Submit a proposal with your bid, delivery timeline, and a short cover letter.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">3</span>
              <p className="font-body text-sm text-muted">
                Chat with the client, and once accepted, your contract goes active.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="font-display font-bold text-primary text-sm shrink-0">4</span>
              <p className="font-body text-sm text-muted">
                Deliver the work, update your progress, and build your reputation through reviews.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;