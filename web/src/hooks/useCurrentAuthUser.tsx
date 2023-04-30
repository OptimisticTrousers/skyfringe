import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { isUser } from "../utils/isUser";
import useHttp from "./useHttp";

const useCurrentAuthUser = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const { get } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await get(
          `${import.meta.env.VITE_API_DOMAIN}/auth/current`
        );
        setLoading(false);
        if (response.ok && response.status === 200 && isUser(response)) {
          dispatch({ type: "LOGIN", payload: response });
          setError(null);
        } else if (response.status !== 401) {
          dispatch({ type: "LOGOUT" });
          setError(response);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    })();
  }, []);

  return { user, loading, error };
};

export default useCurrentAuthUser;
