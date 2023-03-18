import { useState } from "react";
import useHttp from "./useHttp";

const useCreatePost = () => {
  const [response, setResponse] = useState(null);

  const { post, loading, error } = useHttp();

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: FormData) => {
    setResponse(null);

    const data = await post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/posts`,
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
