import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

const useNotification = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { remove } = useHttp();
  const { showToast } = useContext(ToastContext);

  const markAsRead = async (notificationId: string) => {
    setError(null);
    setLoading(true);

    const message = "There was a problem marking this notification as read";
    try {
      const response = await remove(
        `${import.meta.env.VITE_API_DOMAIN}/users/${
          user._id
        }/notifications/${notificationId}`,
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

      setError({ message });
      showToast("error", message);
    } catch (error) {
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };
  return { markAsRead, loading, error };
};

export default useNotification;
