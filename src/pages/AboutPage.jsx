function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs font-body font-semibold text-primary uppercase tracking-wide mb-2">About Us</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-6">Where Skills Meet Opportunities</h1>

      <p className="font-body text-sm text-muted leading-relaxed mb-8">
        Campus-GIG is a modern freelancing marketplace built to connect skilled professionals with clients
        looking for reliable talent. We make it easier to discover opportunities, collaborate on projects,
        manage contracts, and build long-term professional relationships — all from one platform.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mb-3">Our Mission</h2>
      <p className="font-body text-sm font-semibold text-ink mb-2">
        Making Freelancing Simple, Accessible &amp; Trusted
      </p>
      <p className="font-body text-sm text-muted leading-relaxed mb-8">
        Freelancing should be more than simply finding a project. It should be about discovering the right
        opportunity, working with the right people, and building a professional reputation along the way.
        Campus-GIG brings clients and freelancers together through a streamlined platform designed around
        discovery, communication, collaboration, and trust.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mb-4">What You Can Do</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-sm text-ink mb-3">For Freelancers</p>
          <ul className="space-y-1.5 text-sm font-body text-muted list-disc list-inside">
            <li>Discover projects that match your skills</li>
            <li>Submit proposals to potential clients</li>
            <li>Communicate with clients through real-time chat</li>
            <li>Manage active and completed contracts</li>
            <li>Build your professional reputation through reviews and ratings</li>
            <li>Save interesting opportunities for later</li>
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-sm text-ink mb-3">For Clients</p>
          <ul className="space-y-1.5 text-sm font-body text-muted list-disc list-inside">
            <li>Post projects with detailed requirements</li>
            <li>Discover skilled freelancers</li>
            <li>Review and manage incoming proposals</li>
            <li>Communicate directly with freelancers</li>
            <li>Manage contracts and project relationships</li>
            <li>Review freelancers after successful completion</li>
          </ul>
        </div>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mb-3">Built Around Trust</h2>
      <p className="font-body text-sm text-muted leading-relaxed mb-8">
        Every successful project starts with the right connection. Campus-GIG provides tools that help
        users communicate clearly, manage their work, and build trust through transparent reviews and
        professional interactions.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mb-3">Our Vision</h2>
      <p className="font-body text-sm text-muted leading-relaxed">
        To build a trusted digital marketplace where skills are discoverable, opportunities are accessible,
        and great work can happen without unnecessary barriers.
      </p>
    </div>
  );
}

export default AboutPage;