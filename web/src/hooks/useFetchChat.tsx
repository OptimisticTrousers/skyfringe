import { useContext, useEffect, useState } from "react";
import useHttp from "./useHttp";
import { UserWithStringId as IUser } from "@backend/types";
import { ToastContext } from "../context/ToastContext";

const useFetchChat = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { post } = useHttp();
  const { showToast } = useContext(ToastContext);

  const fetchChat = async (url: string, formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        // No error, request successful
        setError(null);
        setData(response.data);
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }

      // error
      const data = response.data;
      setError(data);
      setData(null);
      showToast("error", data.message);
    } catch (error) {
      const message = "An unknown error occured while fetching a chat";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { fetchChat, data, loading, error };
};

export default useFetchChat;
