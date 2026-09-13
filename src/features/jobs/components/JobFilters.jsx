const SORT_OPTIONS = [
  { field: 'budget', direction: 'DESC', label: 'Budget: High to Low' },
  { field: 'budget', direction: 'ASC', label: 'Budget: Low to High' },
];

function JobFilters({ filters, onChange }) {
  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('|');
    onChange({ ...filters, sortField: field, sortDirection: direction });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <input
        type="number"
        placeholder="Min budget"
        value={filters.min || ''}
        onChange={(e) => onChange({ ...filters, min: e.target.value })}
        className="border border-border bg-surface rounded-lg px-3 py-2 font-body text-sm text-ink w-32 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
      />
      <input
        type="number"
        placeholder="Max budget"
        value={filters.max || ''}
        onChange={(e) => onChange({ ...filters, max: e.target.value })}
        className="border border-border bg-surface rounded-lg px-3 py-2 font-body text-sm text-ink w-32 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
      />
      <select
        onChange={handleSortChange}
        defaultValue="budget|DESC"
        className="border border-border bg-surface rounded-lg px-3 py-2 font-body text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.label} value={`${opt.field}|${opt.direction}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default JobFilters;