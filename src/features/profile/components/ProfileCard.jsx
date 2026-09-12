import { useProfile } from '../hooks/useProfile';
import { Mail, Phone, Star, Calendar } from 'lucide-react';

function ProfileCard() {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div className="animate-pulse h-40 bg-border/30 rounded-xl" />;
  }

  if (isError || !profile) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 text-center">
        <p className="font-body text-sm text-muted">Couldn't load your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-2xl">
          {profile.firstName?.[0]}
        </div>
        <div>
          <h2 className="font-display font-bold text-lg text-ink">
            {profile.firstName} {profile.lastName}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <Star size={14} className="text-warning fill-warning" />
            <span className="text-sm font-body text-ink">
              {profile.averageRating?.toFixed(1) ?? 'No ratings yet'}
            </span>
            {profile.totalRatings > 0 && (
              <span className="text-xs font-body text-muted">({profile.totalRatings})</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-border pt-4">
        <div className="flex items-center gap-2 text-sm font-body text-muted">
          <Mail size={14} />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-body text-muted">
          <Phone size={14} />
          <span>{profile.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-body text-muted">
          <Calendar size={14} />
          <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;