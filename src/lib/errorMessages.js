export const getErrorMessage = (error) => {
  const backendMessage = error.response?.data?.message || error.response?.data?.error;
  if (backendMessage && typeof backendMessage === 'string') {
    return backendMessage;
  }

  const status = error.response?.status;

  switch (status) {
    case 400:
      return 'That request looks invalid — please check the form and try again.';
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return "You don't have permission to do that.";
    case 404:
      return "We couldn't find what you're looking for.";
    case 409:
      return 'This already exists or conflicts with something else.';
    case 429:
      return "You're doing that too much — please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
      return 'Something went wrong on our end. Please try again shortly.';
    default:
      if (error.message === 'Network Error') {
        return "Can't reach the server — check your connection and try again.";
      }
      return 'Something went wrong. Please try again.';
  }
};