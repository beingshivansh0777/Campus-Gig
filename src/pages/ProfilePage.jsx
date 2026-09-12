import { useState } from 'react';
import { useAuthStore } from '../features/auth/authStore';
import ProfileCard from '../features/profile/components/ProfileCard';
import EditProfileForm from '../features/profile/components/EditProfileForm';
import BecomeGigForm from '../features/gigProfile/components/BecomeGigForm';
import EditGigProfileForm from '../features/gigProfile/components/EditGigProfileForm';

function ProfilePage() {
  const isGig = useAuthStore((state) => state.isGig);
  const [tab, setTab] = useState('view');

  const tabs = isGig
    ? ['view', 'edit', 'gig-profile']
    : ['view', 'edit', 'become-gig'];

  const tabLabels = {
    view: 'Overview',
    edit: 'Edit Details',
    'become-gig': 'Become a Campus-Gigger',
    'gig-profile': 'My Gig Profile',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Your Profile</h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        <div className="space-y-2">
          {tabs.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition ${
                tab === key
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted hover:bg-surface'
              }`}
            >
              {tabLabels[key]}
            </button>
          ))}
        </div>

        <div>
          {tab === 'view' && <ProfileCard />}
          {tab === 'edit' && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <EditProfileForm />
            </div>
          )}
          {tab === 'become-gig' && !isGig && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <BecomeGigForm />
            </div>
          )}
          {tab === 'gig-profile' && isGig && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <EditGigProfileForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;