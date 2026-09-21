import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import VerifyEmailBanner from '../../features/auth/components/VerifyEmailBanner';
import CookieConsentBanner from '../../features/cookieConsent/components/cookieConsentBanner';
import CookiePreferencesModal from '../../features/cookieConsent/components/cookiePreferencesModal';

function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <VerifyEmailBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
      <CookiePreferencesModal />
    </div>
  );
}

export default AppLayout;