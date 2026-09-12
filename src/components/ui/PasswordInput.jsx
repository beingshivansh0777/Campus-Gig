import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

function PasswordInput({ register, name, error, placeholder = 'Enter your password' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          className="w-full border border-border bg-surface rounded-lg pl-9 pr-10 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-error text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}

export default PasswordInput;