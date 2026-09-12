function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="text-center py-10">
      <p className="font-body text-sm text-muted mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-body font-semibold text-primary hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;