import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import VerifyEmailBanner from '../../features/auth/components/VerifyEmailBanner';

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <VerifyEmailBanner />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;