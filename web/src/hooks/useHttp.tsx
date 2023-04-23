import { useState } from "react";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState(null);

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
        mode: "cors",
        credentials: "include",
        ...options,
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await response.json();
      setLoading(false);

      // No error, operation successful
      setData(json);
      return json;
    } catch (err) {
      // for all unexpected errors not handled on backend error handling
      setError(err);
      setLoading(false);
      setData(null);
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

  const put = async (
    url: string,
    body: unknown = {},
    options: RequestInit = {}
  ) => {
    return sendRequest(url, "PUT", options, body);
  };

  const remove = async (url: string, options: RequestInit = {}) => {
    return sendRequest(url, "DELETE", options);
  };

  return { loading, error, data, get, post, put, remove };
};

export default useHttp;
