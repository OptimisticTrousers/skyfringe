const useRequests = () => {
  const throwError = (error: string) => {
    throw new Error(error);
  };

  const GET = (url: string, options = {}) => {
    return fetch(url, options)
      .then((res) => res.json())
      .catch(throwError);
  };

  const POST = (url: string, formData: unknown, options = {}) => {
    return fetch(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch(throwError);
  };

  const PUT = (url: string, formData: unknown, options = {}) => {
    return fetch(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch(throwError);
  };

  const DELETE = (url: string, options = {}) => {
    return fetch(url, { ...options, method: "DELETE" })
      .then((res) => res.json())
      .catch(throwError);
  };

  return { GET, POST, PUT, DELETE };
};

export default useRequests;
