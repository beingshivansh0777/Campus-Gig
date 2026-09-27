export const getErrorMessage = (error) => {
  const backendMessage = error.response?.data?.message || error.response?.data?.error;
  if (backendMessage && typeof backendMessage === 'string') {
    return backendMessage;
  }

  if (error.message === 'Network Error') {
    return "Can't reach the server — check your connection and try again.";
  }

  return 'Something went wrong. Please try again.';
};