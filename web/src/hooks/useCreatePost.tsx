import { useState } from "react";
import { PostData } from "../types";
import useHttp from "./useHttp";

const useCreatePost = () => {
  const [response, setResponse] = useState(null);

  const { post, loading, error } = useHttp();

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: PostData) => {
    setResponse(null);

    const data = await post(
      `${import.meta.env.VITE_API_DOMAIN}/posts`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }
    );
    setResponse(data);
  };

  return { createPost, response, loading, error };
};

export default useCreatePost;
