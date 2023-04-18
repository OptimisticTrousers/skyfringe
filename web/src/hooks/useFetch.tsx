import { useEffect } from "react";
import useHttp from "./useHttp";

// Generalised fetch function for API calls (GET method only)
// This is intended for once-per-mount fetch calls in components. If your component will need to re-fetch data multiple times in its lifetime, or fetch on comman (e.g. button click), this is not appropriate.
const useFetch = (url: string) => {
  const { get, data, loading, error } = useHttp();

  // UseEffect hook will re-evaluate only if the fetch URL changes
  useEffect(() => {
    (async () => {
      await get(url);
      // Data should always be in JSON format. Note that the error message 'Unexpted token < in JSON' means we are getting HTML. Use response.text() to see this
    })();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
