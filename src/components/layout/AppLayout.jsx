import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import VerifyEmailBanner from '../../features/auth/components/VerifyEmailBanner';

function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <VerifyEmailBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;