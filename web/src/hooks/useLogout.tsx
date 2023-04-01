import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "./useHttp";

const useLogout = () => {
  const { post, loading, error } = useHttp();
  const { dispatch } = useContext(AuthContext);

  const logout = async (formData: FormData) => {
    const data = await post(`${import.meta.env.VITE_API_DOMAIN}/auth/logout`);
    if (data.success) {
      dispatch({ type: "LOGOUT" });
    }
  };
};
