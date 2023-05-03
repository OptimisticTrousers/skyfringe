import { useState, useContext } from "react";
import useHttp from "./useHttp";
import { ToastContext } from "../context/ToastContext";

// The userID of the request target (i.e. user you are sending the requesr to) is passed into the hook at top level
const useFriendRequests = (userId: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Define the request type when calling this request function specifically. This will be added to the req.body to enable the correct backend action to take place
  const request = async (
    requestType: string,
    successMsg: string,
    errorMsg: string
  ) => {
    setError(null);
    setLoading(true);
    setData(null);

    try {
      const response = await put(
        `${import.meta.env.VITE_API_DOMAIN}/friends/${userId}`,
        { requestType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // No error, request successful
        setError(null);
        setData(response.data);
        showToast("success", successMsg);
        return response.data;
      }

      // error with friend request
      const data = response.data;
      setError(data);
      showToast("error", data.message);
    } catch (error) {
      const message = errorMsg;
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { request, data, loading, error };
};

export default useFriendRequests;
