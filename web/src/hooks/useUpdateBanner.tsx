import { useContext, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import useHttp from "./useHttp";

// Specific profile update route for handling avatar updates
const useUpdateBanner = () => {
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { put } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Requires FormData object as API route parses multipart/form data.
  const updateBanner = async (userId: string, formData: FormData) => {
    setError(null);
    setLoading(true);
    setData(null);

    try {
      const response = await put(
        `${import.meta.env.VITE_API_DOMAIN}/users/${userId}/cover`,
        formData
      );
      if (response.status === 200) {
        // No error, request successfull
        setError(null);
        setData(response.data);
        showToast("success", "Successfully updated banner!");
        // Return out of the function here to avoid setting the 'completed' response below with error JSON data
        return response.data;
      }

      setError(response.data);
    } catch (error) {
      // for all unexpected errors ont handled on backend error handling
      const message = "An unknown error occured while updating banner";
      setError({ message });
      showToast("error", message);
      setData(null);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { updateBanner, data, loading, error };
};

export default useUpdateBanner;
