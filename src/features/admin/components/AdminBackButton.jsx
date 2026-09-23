import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function AdminBackButton({ fallback = '/admin/dashboard' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-1.5 text-sm font-body font-medium text-muted hover:text-ink transition mb-4"
    >
      <ArrowLeft size={16} /> Back
    </button>
  );
}

export default AdminBackButton;