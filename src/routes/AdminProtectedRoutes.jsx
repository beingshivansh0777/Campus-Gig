import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuthStore } from '../features/admin/adminAuthStore';

function AdminProtectedRoute() {
  const token = useAdminAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminProtectedRoute;