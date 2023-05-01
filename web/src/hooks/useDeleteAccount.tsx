import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Exports an easily-callable function that completely removes a user's trace from the application. Call with caution!
const useDeleteAccount = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { remove } = useHttp();
  const { showToast } = useContext(ToastContext);

  const deleteAccount = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await remove(
        `${import.meta.env.VITE_API_DOMAIN}/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        return response.data;
      }
      // error with delete operation
      const data = response.data;
      setError(data);
      showToast("error", data.message);
    } catch (error) {
      // for all unexpected errors not handled on backend error handling
      const message = "An unknown error occured while deleting your account";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
};

export default useDeleteAccount;
