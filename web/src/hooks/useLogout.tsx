import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { Error } from "../types";
import useHttp from "./useHttp";

const useLogout = () => {
  const [error, setError] = useState<Error | null>(null);
  const { post, loading } = useHttp();
  const { dispatch } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const logout = async () => {
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/logout`
      );
      if (response.message) {
        dispatch({ type: "LOGOUT" });
        showToast("success", response.message);
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