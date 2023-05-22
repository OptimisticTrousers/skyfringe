import { useContext, useEffect, useState, useRef } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useSearchQuery = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { get } = useHttp();
  const [query, setQuery] = useState("");
  const { showToast } = useContext(ToastContext);
  const previousQuery = useRef<string>("");

  const handleQuery = (event: any) => {
    setQuery(event.target.value);
  };

  const handleInputFocused = (event: any) => {
    event.preventDefault();
  };

  const searchQuery = async (query: string) => {
    setError(null);
    setLoading(true);

    const message = "There was a problem searching for users";

    try {
      const response = await get(
        `${import.meta.env.VITE_API_DOMAIN}/search-users/${query}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // No errors occurred.
        if (JSON.stringify(response.data) !== JSON.stringify(results)) {
          setResults(response.data);
        }
        setError(null);
      } else {
        setError({ message });
      }
    } catch (error) {
      const message = "An unknown error occurred while liking a post";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    } else if (query !== previousQuery.current) {
      previousQuery.current = query;
      searchQuery(query);
    }
  }, [query]);

  return {
    query,
    handleInputFocused,
    handleQuery,
    setQuery,
    setResults,
    results,
    loading,
    error,
  };
};

export default useSearchQuery;
