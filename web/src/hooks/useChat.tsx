import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import { socket } from "../utils/socket";
import useHttp from "./useHttp";

const useChat = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const { post } = useHttp();

  // useEffect(() => {
  //   function onConnect()u{
  //     setIsConnected(true);
  //   }
  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }
  //   function onFooEvent(value: any) {
  //     setFooEvents((previous: any) => [...previous, value]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("foo", onFooEvent);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("foo", onFooEvent);
  //   };
  // }, []);
  const sendChatMessage = async (chatId: string, formData: any) => {
    setLoading(true);
    setError(null);
    const errorMsg = "There was a problem liking this post";
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/chat/${chatId}/messages`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // No error, request successfull
        setError(null);
        // Return out of the function here to avoid setting the response below with error JSON
        return response.data;
      }
      setError({ message: errorMsg });
      showToast("error", errorMsg);
    } catch (error) {
      const message = "An unknown error occured while sending a message";
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { sendChatMessage, loading, error };
};

export default useChat;
