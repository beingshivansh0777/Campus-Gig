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
        <div className="relative flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-linear-to-br from-primary to-accent-pink" />
          </span>

          <span className="font-display font-bold text-2xl text-white tracking-tight">
            Campus-Gig
          </span>
        </div>

        {/* Dynamic content */}
        <div className="relative">

          {/* Eyebrow */}
          <p className="text-sm font-body font-semibold tracking-[0.18em] text-white/60 uppercase mb-5">
            {eyebrow}
          </p>

          {/* Main heading */}
          <h2 className="font-display text-5xl xl:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-2xl">
            {heading}
            <br />
            <span className="bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
              {highlightedHeading}
            </span>
          </h2>

          {/* Description */}
          <p className="font-body text-white/70 mt-6 max-w-lg text-base xl:text-lg leading-7">
            {description}
          </p>
        </div>

        {/* Bottom highlights */}
        <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 text-white/65 text-sm font-body font-medium">
          {bottomHighlights.map((item, index) => (
            <span key={item} className="flex items-center gap-5">
              <span>{item}</span>

              {index < bottomHighlights.length - 1 && (
                <span className="text-accent-pink text-base">·</span>
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

