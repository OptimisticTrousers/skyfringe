import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error } from "../types";
import useHttp from "./useHttp";

const useLogout = () => {
  const [error, setError] = useState<Error | null>(null);
  const { post, loading } = useHttp();
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/logout`
      );
      if (response.success) {
        dispatch({ type: "LOGOUT" });
      } else {
        setError({ message: response.message });
      }
    } catch (err) {
      setError({ message: "An error occurred while logging out." });
    }
  };

  return { logout, loading, error };
};

export default useLogout;
