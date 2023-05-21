import { useEffect, useState } from "react";
import useHttp from "./useHttp";

const useSearchQuery = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { get } = useHttp();
  const [query, setQuery] = useState("");

  const handleQuery = (event: any) => {
    setQuery(event.target.value);
  };

  const searchQuery = async (query: string) => {
    setError(null);
    setLoading(true);
    setResults(null);

    const response = await get(
      `${import.meta.env.VITE_API_DOMAIN}/search-users/${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setResults(response.data);
  };

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    } else {
      searchQuery(query);
    }
  }, [query]);

  return { query, handleQuery, setQuery, setResults, results, loading, error };
};

export default useSearchQuery;
