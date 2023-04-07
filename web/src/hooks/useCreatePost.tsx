import useHttp from "./useHttp";
import { PostData } from "../types";
import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";

interface Props {
  toggleModal: () => void;
}

const useCreatePost = ({ toggleModal }: any) => {
  const { post, data, loading, error } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Accepts FormData object that may contain both text and images
  const createPost = async (formData: PostData) => {
    const data = await post(
      `${import.meta.env.VITE_API_DOMAIN}/posts`,
      formData
    );
    return data;
  };

  useEffect(() => {
    if (data) {
      showToast("success", "You have successfully created a post!");
    }

    if (error) {
      showToast("error", "An error occured while creating the post.");
    }
    toggleModal();
  }, [data, showToast, toggleModal]);

  return { createPost, data, loading, error };
};

export default useCreatePost;
