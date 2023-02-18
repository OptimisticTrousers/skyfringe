const useRequests = () => {
  const GET = (url: string, options: any = {}) => {
    return fetch(url, options);
  };
  const POST = (url: string, options: any = {}, formData: any = {}) => {
    return fetch(url, { ...options, body: JSON.stringify(formData) });
  };

  const PUT = (url: string, options: any = {}, formData: any = {}) => {
    return fetch(url, { ...options, body: JSON.stringify(formData) });
  };

  const DELETE = (url: string, options: any = {}) => {
    return fetch(url, { ...options });
  };

  return { GET, POST, PUT, DELETE };
};

export default useRequests;
