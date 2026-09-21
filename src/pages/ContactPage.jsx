function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs font-body font-semibold text-primary uppercase tracking-wide mb-2">
        Contact &amp; Support
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">We're here to help.</h1>
      <p className="font-body text-sm text-muted leading-relaxed mb-8">
        Whether you have a question about your account, need help with a project, or want to report an
        issue, our support team is here to assist you.
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-sm text-ink mb-1">General Support</p>
          <p className="font-body text-xs font-semibold text-muted mb-2">Account &amp; Platform Help</p>
          <p className="font-body text-sm text-muted leading-relaxed mb-4">
            Get assistance with account-related questions, profiles, gigs, proposals, contracts,
            notifications, and other Campus-GIG features.
          </p>
          <button
            type="button"
            className="text-sm font-body font-semibold text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition"
          >
            Get Support
          </button>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-sm text-ink mb-1">Technical Support</p>
          <p className="font-body text-xs font-semibold text-muted mb-2">Something isn't working?</p>
          <p className="font-body text-sm text-muted leading-relaxed mb-4">
            If you're experiencing a technical issue, tell us what happened, what you were trying to do,
            and any relevant details that can help us investigate the problem.
          </p>
          <button
            type="button"
            className="text-sm font-body font-semibold text-primary border border-primary/30 px-4 py-2 rounded-lg hover:bg-primary/5 transition"
          >
            Report Technical Issue
          </button>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-sm text-ink mb-1">Safety &amp; Reporting</p>
          <p className="font-body text-xs font-semibold text-muted mb-2">
            See something that shouldn't be here?
          </p>
          <p className="font-body text-sm text-muted leading-relaxed mb-4">
            If you encounter inappropriate content, suspicious activity, fraudulent behavior, harassment,
            or a violation of our platform rules, you can report it to our team.
          </p>
          <button
            type="button"
            className="text-sm font-body font-semibold text-error border border-error/20 px-4 py-2 rounded-lg hover:bg-error/5 transition"
          >
            Report an Issue
          </button>
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-ink mb-2">Before Contacting Support</h2>
      <p className="font-body text-sm text-muted leading-relaxed mb-6">
        You may find a quick answer in our FAQ. For account-specific issues, please provide enough
        information for our support team to identify the relevant account or activity.
      </p>

      <h2 className="font-display text-lg font-bold text-ink mb-2">Response Information</h2>
      <p className="font-body text-sm text-muted leading-relaxed">
        Support requests are reviewed during our operating hours. Response times may vary depending on
        the nature and complexity of your request.
      </p>
    </div>
  );
}

export default ContactPage;