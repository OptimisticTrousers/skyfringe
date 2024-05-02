import { useState, useEffect } from "react";
import useHttp from "./useHttp";

type UseFetchReturnType<T> = {
  setData: (data: T | null) => void;
  data: T | null;
  loading: boolean;
  error: unknown | null;
};

const useFetch = <T,>(url: string): UseFetchReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { get } = useHttp();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get(url, {
          headers: { "Content-Type": "application/json" }
        });
        if (response.status === 200) {
          setData(response.data);
          return;
        }
        setError(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { setData, data, loading, error };
};

export default useFetch;
