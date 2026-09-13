function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden bg-linear-to-br from-[#211A2E] via-[#3B2159] to-[#5B1F4F]">
        {/* Decorative glow blobs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#EC4899] opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-[#7C3AED] opacity-25 blur-3xl" />

        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <span className="relative flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899]" />
          </span>
          Campus-Gig
        </span>

        <div className="relative">
          <p className="text-xs font-body font-semibold tracking-wider text-white/50 uppercase mb-4">
            For students, by students
          </p>
          <h2 className="font-display text-4xl font-bold text-white leading-tight tracking-tight">
            Find the right talent.
            <br />
            <span className="bg-linear-to-r from-[#C4B5FD] to-[#F9A8D4] bg-clip-text text-transparent">
              Get work done.
            </span>
          </h2>
          <p className="font-body text-white/60 mt-4 max-w-sm text-sm leading-relaxed">
            Post a project, receive proposals from skilled students, compare
            bids and hire with confidence.
          </p>
        </div>

        <div className="relative flex items-center gap-6 text-white/50 text-xs font-body">
          <span>Verified profiles</span>
          <span className="text-[#EC4899]">·</span>
          <span>Secure contracts</span>
          <span className="text-[#EC4899]">·</span>
          <span>Real reviews</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-[#FEFCFB] px-4 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-[#5a2bb1] mb-1 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-sm text-[#8B87A0] mb-7">{subtitle}</p>
          )}

          <div className="bg-white border border-[#EDE9F5] rounded-xl p-6 shadow-sm">
            {children}
          </div>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
