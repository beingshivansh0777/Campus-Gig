// src/features/jobs/components/JobCard.jsx
import { Link } from 'react-router-dom';
import { Clock, BarChart3 } from 'lucide-react';
import { JOB_STATUS_LABELS } from '../../../lib/constants';
import SaveJobButton from './SaveJobButton';

const statusStyles = {
  OPEN: 'bg-success/10 text-success',
  CLOSED: 'bg-faint/10 text-faint',
  DRAFT: 'bg-amber/10 text-amber',
  DELETED: 'bg-error/10 text-error',
};

const gradientVariants = [
  'from-[#7C3AED] to-[#A855F7]',
  'from-[#EC4899] to-[#F472B6]',
  'from-[#F59E0B] to-[#FBBF24]',
  'from-[#14B8A6] to-[#2DD4BF]',
];

function getGradientForCategory(category) {
  if (!category) return gradientVariants[0];
  const index = category.length % gradientVariants.length;
  return gradientVariants[index];
}

function JobCard({ job, linkTo, showBookmark = false }) {
  const category = job.category;
  const gradient = getGradientForCategory(category);
  const posterName = [job.clientFirstName, job.clientLastName].filter(Boolean).join(' ');

  const content = (
    <div className="bg-surface border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition relative">
      {posterName && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899] text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {job.clientFirstName?.[0] || 'U'}
          </span>
          <span className="text-xs font-body text-muted">{posterName}</span>
        </div>
      )}

      {category && (
        <span
          className={`inline-block text-xs font-body font-semibold text-white px-2.5 py-1 rounded-full mb-2.5 bg-linear-to-r ${gradient}`}
        >
          {category.replace(/_/g, ' ')}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-body font-semibold text-sm text-ink line-clamp-1">{job.title}</h3>
        {job.jobStatus && (
          <span
            className={`text-xs font-body font-medium px-2 py-0.5 rounded-full shrink-0 ${
              statusStyles[job.jobStatus] || 'bg-faint/10 text-faint'
            }`}
          >
            {JOB_STATUS_LABELS[job.jobStatus] || job.jobStatus}
          </span>
        )}
      </div>

      {job.description && (
        <p className="text-sm font-body text-muted mt-1.5 line-clamp-2">{job.description}</p>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4 text-xs font-body text-faint">
          <span className="font-mono text-ink font-semibold">₹{job.budget}</span>
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
        {showBookmark && <SaveJobButton jobId={job.id} />}
      </div>
    </div>
  );

  return linkTo ? <Link to={linkTo}>{content}</Link> : content;
}

export default JobCard;