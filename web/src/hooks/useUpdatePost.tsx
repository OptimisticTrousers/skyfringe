import { useState } from "react";
import useHttp from "./useHttp";

// Used to update both text and images in posts.
const useUpdatePost = () => {
  const [data, setData] = useState(null);

  const { put, loading, error } = useHttp();

   // Accepts FormData object that can include image data
  const updatePost = async (postId: string, formData: FormData) => {
    const response = await put(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}`,
      formData
    );
    setData(response);
    return response;
  };

  return { updatePost, data, loading, error };
};

export default useUpdatePost;
