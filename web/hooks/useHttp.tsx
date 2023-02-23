import { useState } from "react";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = async (
    url: string,
    method: HttpMethods,
    options: RequestInit,
    body?: unknown
  ) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(new Error("Failed to fetch. Please try again."));
    }
  };

  const get = async (url: string, options: RequestInit = {}) => {
    return await sendRequest(url, "GET", options);
  };

  const post = async (
    url: string,
    body: unknown,
    options: RequestInit = {}
  ) => {
    return await sendRequest(url, "POST", options, body);
  };

  const put = async (url: string, body: unknown, options: RequestInit = {}) => {
    return await sendRequest(url, "PUT", options, body);
  };

  const remove = async (url: string, options: RequestInit = {}) => {
    return await sendRequest(url, "DELETE", options);
  };

  return { loading, error, get, post, put, remove };
};

export default useHttp;
