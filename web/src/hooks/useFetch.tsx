import { useState, useEffect } from "react";
import useHttp from "./useHttp";

// Generalised fetch function for API calls (GET method only)
// This is intended for once-per-mount fetch calls in components. If your component will need to re-fetch data multiple times in its lifetime, or fetch on comman (e.g. button click), this is not appropriate.
const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { get } = useHttp();

  // UseEffect hook will re-evaluate only if the fetch URL changes
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Beginning fetch logic here so set loading state
        // Make fetch call using supplied URL
        const response = await get(url, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          // No error, request successful
          // Data should always be in JSON format. Note that the error message 'Unexpted token < in JSON' means we are getting HTML. Use response.text() to see this
          setData(response.data);
          return;
        }
        // error with fetch request
        // Data should always be in JSON format. Note that the error message 'Unexpted token < in JSON' means we are getting HTML. Use response.text() to see this
        setError(response.data);
      } catch (error) {
        // Regardless of success or error, the loading state is coplete
        setError(error);
      } finally {
        // Regardless of success or error, the loading state is complete
        setLoading(false);
      }
    })();
  }, [url]);

  return { setData, data, loading, error };
};

export default useFetch;
