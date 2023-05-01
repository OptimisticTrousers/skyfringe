type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

const useHttp = () => {
  const sendRequest = async (
    url: string,
    method: HttpMethods,
    options: RequestInit,
    body?: unknown
  ) => {
    const response = await fetch(url, {
      method,
      mode: "cors",
      credentials: "include",
      ...options,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });

    const json = await response.json();

    return { status: response.status, data: json };
  };

  const get = async (url: string, options: RequestInit = {}) => {
    return sendRequest(url, "GET", options);
  };

  const post = async (
    url: string,
    body: unknown,
    options: RequestInit = {}
  ) => {
    return sendRequest(url, "POST", options, body);
  };

  const put = async (url: string, body: unknown, options: RequestInit = {}) => {
    return sendRequest(url, "PUT", options, body);
  };

  const remove = async (url: string, options: RequestInit = {}) => {
    return sendRequest(url, "DELETE", options);
  };

  return { get, post, put, remove };
};

export default useHttp;
