function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  eyebrow = "FOR STUDENTS, BY STUDENTS",
  heading,
  highlightedHeading,
  description,
  bottomHighlights = ["Verified profiles", "Secure contracts", "Real reviews"],
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden bg-linear-to-br from-ink to-[#5B1F4F]">
        {/* Decorative glow blobs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent-pink opacity-20 blur-3xl" />

        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-primary opacity-25 blur-3xl" />

        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Brand */}
        <span className="relative flex items-center gap-2 font-display font-bold text-lg text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-linear-to-br from-primary to-accent-pink" />
          </span>

          Campus-Gig
        </span>

        {/* Dynamic content */}
        <div className="relative">
          <p className="text-xs font-body font-semibold tracking-wider text-white/50 uppercase mb-4">
            {eyebrow}
          </p>

          <h2 className="font-display text-4xl font-bold text-white leading-tight tracking-tight">
            {heading}
            <br />

            <span className="bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              {highlightedHeading}
            </span>
          </h2>

          <p className="font-body text-white/60 mt-4 max-w-sm text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom highlights */}
        <div className="relative flex items-center gap-6 text-white/50 text-xs font-body">
          {bottomHighlights.map((item, index) => (
            <span key={item} className="flex items-center gap-6">
              {item}

              {index < bottomHighlights.length - 1 && (
                <span className="text-accent-pink">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-[#5a2bb1] mb-1 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="font-body text-sm text-faint mb-7">
              {subtitle}
            </p>
          )}

          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            {children}
          </div>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;