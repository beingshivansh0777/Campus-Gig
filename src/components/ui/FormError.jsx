import { AlertCircle } from 'lucide-react';

function FormError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 bg-error/5 border border-error/20 rounded-lg px-3 py-2.5 mb-4">
      <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
      <p className="text-sm font-body text-error">{message}</p>
    </div>
  );
}

export default FormError;