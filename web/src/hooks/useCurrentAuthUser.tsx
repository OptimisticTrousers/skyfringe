import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";

// Custom hook that provides functionality to check for a current user. This is used to not only fetch currently logged in user's details, but as a means of checking if there is a currently logged in user (to protect routes in React)
const useCurrentAuthUser = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { get } = useHttp();

  useEffect(() => {
    // Call this function to get the current user's info. Throws error if no user is currently logged in
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get(
          `${import.meta.env.VITE_API_DOMAIN}/auth/current`
        );
        if (response.status === 200) {
          dispatch({ type: "LOGIN", payload: response.data });
          setError(null);
        }
        setError(response.data);
      } catch (error) {
        setError(error);
      } finally {
        // Regardless of success or error, the loading state is complete
        setLoading(false);
      }
    })();
  }, []);

  return { user, loading, error };
};

export default useCurrentAuthUser;
