import { useState } from "react";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

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
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        ...options,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const get = async (url: string, options: RequestInit = {}) => {
    return sendRequest(url, "GET", options);
  };

  const post = async (
    url: string,
    body: unknown = {},
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

  return { loading, error, get, post, put, remove };
};

export default useHttp;
