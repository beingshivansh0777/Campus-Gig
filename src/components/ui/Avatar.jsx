function Avatar({ src, name, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-2xl',
  };

  const initial = name?.[0]?.toUpperCase() || 'U';

  const fullSrc = src
    ? src.startsWith('http')
      ? src
      : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${src}`
    : null;

  if (fullSrc) {
    return (
      <img
        src={fullSrc}
        alt={name || 'Profile'}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-linear-to-br from-primary to-accent-pink text-white flex items-center justify-center font-semibold shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
}

export default Avatar;