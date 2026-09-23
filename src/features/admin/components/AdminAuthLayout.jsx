function AdminAuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
            Campus-Gig
          </span>
          <p className="text-xs font-body text-white/40 mt-1 tracking-wide uppercase">Admin Panel</p>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border shadow-xl">
          <h1 className="font-display text-xl font-bold text-ink mb-1">{title}</h1>
          {subtitle && <p className="text-sm font-body text-muted mb-5">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminAuthLayout;