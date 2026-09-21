function StatCard({ label, value, accent = 'primary' }) {
  const accentColors = {
    primary: 'text-primary',
    success: 'text-success',
    amber: 'text-amber',
    teal: 'text-teal',
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className={`font-display text-2xl font-bold ${accentColors[accent] || accentColors.primary}`}>
        {value}
      </p>
      <p className="text-sm font-body text-muted mt-1">{label}</p>
    </div>
  );
}

export default StatCard;