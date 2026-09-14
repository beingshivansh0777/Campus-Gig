import { useParams, Link } from 'react-router-dom';
import { GraduationCap, Building2, Mail, Phone, Briefcase } from 'lucide-react';
import { useGigProfileById } from '../features/gigProfile/hooks/useGigProfileById';

function GigProfileViewPage() {
  const { gigId } = useParams();
  const { data: gig, isLoading, isError } = useGigProfileById(gigId);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-pulse h-96 bg-border/30 rounded-xl" />
    );
  }

  if (isError || !gig) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="font-body text-sm text-muted">This profile couldn't be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <span className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent-pink text-white flex items-center justify-center font-display font-bold text-2xl shrink-0">
            {gig.gigFirstName?.[0]}
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold text-ink">
              {gig.gigFirstName} {gig.gigLastName}
            </h1>
            <p className="text-sm font-body text-muted mt-0.5">{gig.title}</p>
            <span
              className={`inline-block text-xs font-body font-medium px-2 py-0.5 rounded-full mt-2 ${
                gig.availabilityStatus === 'AVAILABLE'
                  ? 'bg-success/10 text-success'
                  : 'bg-faint/10 text-faint'
              }`}
            >
              {gig.availabilityStatus === 'AVAILABLE' ? 'Available for work' : 'Unavailable'}
            </span>
          </div>
        </div>
      </div>

      {gig.description && (
        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <h2 className="font-body font-semibold text-sm text-ink mb-2">About</h2>
          <p className="text-sm font-body text-muted leading-relaxed whitespace-pre-line">
            {gig.description}
          </p>
        </div>
      )}

      {gig.gigSkills?.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <h2 className="font-body font-semibold text-sm text-ink mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {gig.gigSkills.map((skill) => (
              <span
                key={skill.id ?? skill}
                className="bg-primary/10 text-primary text-xs font-body font-medium px-2.5 py-1 rounded-full"
              >
                {skill.skill ?? skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-surface border border-border rounded-xl p-6 space-y-3">
        <h2 className="font-body font-semibold text-sm text-ink mb-1">Details</h2>
        <div className="flex items-center gap-2 text-sm font-body text-muted">
          <Briefcase size={14} />
          <span>{gig.jobCategory?.replace(/_/g, ' ')}</span>
        </div>
        {gig.college && (
          <div className="flex items-center gap-2 text-sm font-body text-muted">
            <GraduationCap size={14} />
            <span>
              {gig.college}
              {gig.department && ` · ${gig.department}`}
              {gig.semester && ` · Semester ${gig.semester}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GigProfileViewPage;