import useHttp from "./useHttp";

const useDeleteComment = () => {
  const { remove, data, loading, error } = useHttp();

  // Requires both post and comment ID to ensure the API route is satisfied and that the comment is removed from the post's comments array.
  const deleteComment = async (postId: string, commentId: string) => {
    const response = await remove(
      `${import.meta.env.VITE_API_DOMAIN}/posts/${postId}/comments/${commentId}`
    );
    return response;
  };

  return { deleteComment, data, loading, error };
};

export default useDeleteComment;
