import { FormData } from "../types";

const useRequests = () => {
  const GET = (url: string, options = {}) => {
    return fetch(url, options);
  };
  const POST = (url: string, options = {}, formData: FormData) => {
    return fetch(url, { ...options, body: JSON.stringify(formData) });
  };

  const PUT = (url: string, options = {}, formData: FormData) => {
    return fetch(url, { ...options, body: JSON.stringify(formData) });
  };

  const DELETE = (url: string, options = {}) => {
    return fetch(url, { ...options });
  };

  return { GET, POST, PUT, DELETE };
};

export default useRequests;
