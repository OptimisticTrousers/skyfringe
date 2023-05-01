import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useLogout = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const { get } = useHttp();
  const { dispatch } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get(
        `${import.meta.env.VITE_API_DOMAIN}/auth/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // No error, logout successful. Payload not required, it will be set to null within the reducer function for this action type
        setError(null);
        dispatch({ type: "LOGOUT" });
        showToast("success", "Successfully logged out!");
        return;
      }

      const data = response.data;
      setError(data);
      showToast("error", data.message);
    } catch (err) {
      // internal React hook error
      const message = "An unknown error occured while logging out";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export default useLogout;
