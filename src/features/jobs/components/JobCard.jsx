import { Link } from 'react-router-dom';
import { Clock, BarChart3 } from 'lucide-react';
import { JOB_STATUS_LABELS } from '../../../lib/constants';

const statusStyles = {
  OPEN: 'bg-success/10 text-success',
  CLOSED: 'bg-muted/10 text-muted',
  DRAFT: 'bg-warning/10 text-warning',
  DELETED: 'bg-error/10 text-error',
};

function JobCard({ job, linkTo }) {
  const content = (
    <div className="bg-surface border border-border rounded-xl p-4 hover:border-ink/20 transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-body font-semibold text-sm text-ink line-clamp-1">{job.title}</h3>
        {job.jobStatus && (
          <span
            className={`text-xs font-body font-medium px-2 py-0.5 rounded-full shrink-0 ${
              statusStyles[job.jobStatus] || 'bg-muted/10 text-muted'
            }`}
          >
            {JOB_STATUS_LABELS[job.jobStatus] || job.jobStatus}
          </span>
        )}
      </div>

      {job.description && (
        <p className="text-sm font-body text-muted mt-1.5 line-clamp-2">{job.description}</p>
      )}

      <div className="flex items-center gap-4 mt-3 text-xs font-body text-muted">
        <span className="font-mono">₹{job.budget}</span>
        {job.deadline && (
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {new Date(job.deadline).toLocaleDateString()}
          </span>
        )}
        {job.experience && (
          <span className="flex items-center gap-1">
            <BarChart3 size={12} />
            {job.experience.charAt(0) + job.experience.slice(1).toLowerCase()}
          </span>
        )}
      </div>
    </div>
  );

  return linkTo ? <Link to={linkTo}>{content}</Link> : content;
}

export default JobCard;