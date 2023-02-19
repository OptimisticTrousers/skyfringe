import { FormData } from "../types";

const defaultSetError = (error: Error) => {
  console.log(error);
};

type SetError = (error: Error) => void;

const useRequests = (setError: SetError = defaultSetError) => {
  const GET = (url: string, options = {}) => {
    return fetch(url, options)
      .then((res) => res.json())
      .catch(setError);
  };
  const POST = (url: string, formData: FormData, options = {}) => {
    return fetch(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch(setError);
  };

  const PUT = (url: string, formData: FormData, options = {}) => {
    return fetch(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch(setError);
  };

  const DELETE = (url: string, options = {}) => {
    return fetch(url, { ...options, method: "DELETE" })
      .then((res) => res.json())
      .catch(setError);
  };

  return { GET, POST, PUT, DELETE };
};

export default useRequests;
