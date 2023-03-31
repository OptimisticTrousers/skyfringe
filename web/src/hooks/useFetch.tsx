// Generalised fetch function for API calls (GET method only)
import { useState, useEffect } from "react";
import { Error } from "../types";
import useHttp from "./useHttp";

// This is intended for once-per-mount fetch calls in components. If your component will need to re-fetch data multiple times in its lifetime, or fetch on comman (e.g. button click), this is not appropriate.
export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const { get, loading, error } = useHttp();

  // UseEffect hook will re-evaluate only if the fetch URL changes
  useEffect(() => {
    (async () => {
      const response = await get(url);
      // Data should always be in JSON format. Note that the error message 'Unexpted token < in JSON' means we are getting HTML. Use response.text() to see this
      setData(response);
    })();
  }, [url]);

  return { data, loading, error };
};
