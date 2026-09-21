import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../../features/dashboard/components/StatCard';
import { useAdminStats, useAdminGrowthChart, useAdminPopularJobs } from '../../features/admin/hooks/useAdminStats';

function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: growth, isLoading: growthLoading } = useAdminGrowthChart();
  const { data: popularJobs, isLoading: popularLoading } = useAdminPopularJobs();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Admin Dashboard</h1>

      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="animate-pulse h-24 bg-border/30 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Users" value={stats?.totalUser ?? 0} />
          <StatCard label="Total Clients" value={stats?.totalClient ?? 0} accent="teal" />
          <StatCard label="Total Gigs" value={stats?.totalGIG ?? 0} accent="amber" />
          <StatCard label="Total Jobs" value={stats?.totalJob ?? 0} accent="success" />
          <StatCard label="Job Applications" value={stats?.totalJobApplication ?? 0} />
          <StatCard label="Total Contracts" value={stats?.totalContract ?? 0} accent="teal" />
          <StatCard label="Total Reports" value={stats?.totalReport ?? 0} accent="amber" />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="font-body font-semibold text-sm text-ink mb-4">Growth Over Time</h2>
          {growthLoading ? (
            <div className="animate-pulse h-64 bg-border/30 rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={growth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE9F5" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2} />
                <Line type="monotone" dataKey="gigs" stroke="#EC4899" strokeWidth={2} />
                <Line type="monotone" dataKey="clients" stroke="#14B8A6" strokeWidth={2} />
                <Line type="monotone" dataKey="jobs" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="applications" stroke="#5B5470" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="font-body font-semibold text-sm text-ink mb-4">Popular Categories</h2>
          {popularLoading ? (
            <div className="animate-pulse h-64 bg-border/30 rounded-lg" />
          ) : !popularJobs || popularJobs.length === 0 ? (
            <p className="text-sm font-body text-faint">No data yet.</p>
          ) : (
            <div className="space-y-2">
              {popularJobs.map((p) => (
                <div key={p.jobCategory} className="flex items-center justify-between text-sm font-body">
                  <span className="text-ink">{p.jobCategory?.replace(/_/g, ' ')}</span>
                  <span className="text-muted font-mono">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;