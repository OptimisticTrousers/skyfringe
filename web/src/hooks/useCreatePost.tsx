import useHttp from "./useHttp";
import { PostData } from "../types";

const useCreatePost = () => {
  const { post, data, loading, error } = useHttp();

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: PostData) => {
    const data = await post(
      `${import.meta.env.VITE_API_DOMAIN}/posts`,
      formData
    );
    return data;
  };

  return { createPost, data, loading, error };
};

export default useCreatePost;
