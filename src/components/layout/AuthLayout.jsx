function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink flex-col justify-between p-14">
        <span className="font-display font-bold text-lg text-white">Campus-Gig</span>

        <div>
          <p className="text-xs font-body font-semibold tracking-wider text-white/40 uppercase mb-4">
            For students, by students
          </p>
          <h2 className="font-display text-4xl font-bold text-white leading-tight tracking-tight">
            Find the right talent.
            <br />
            Get work done.
          </h2>
          <p className="font-body text-white/50 mt-4 max-w-sm text-sm leading-relaxed">
            Post a project, receive proposals from skilled students, compare bids and hire with
            confidence.
          </p>
        </div>

        <div className="flex items-center gap-6 text-white/30 text-xs font-body">
          <span>Verified profiles</span>
          <span>·</span>
          <span>Secure contracts</span>
          <span>·</span>
          <span>Real reviews</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold text-ink mb-1 tracking-tight">{title}</h1>
          {subtitle && <p className="font-body text-sm text-muted mb-7">{subtitle}</p>}

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            {children}
          </div>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;