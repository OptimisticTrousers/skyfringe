import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { Error, FormError, LoginData } from "../types";
import useHttp from "./useHttp";

const useLogin = () => {
  const [error, setError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<FormError[] | null>(null);
  const { dispatch } = useContext(AuthContext);
  const { post, loading } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Call this function with the FormData object created using relevant user login data
  const login = async (formData: LoginData) => {
    setError(null);
    setFormError(null);
    try {
      const data = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`,
        formData
      );
      if (data.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setError(null);
        setFormError(null);
        dispatch({ type: "LOGIN", payload: data.user });
        showToast("success", "Logged in!");
        return;
      } else {
        if (data.error.message === "Unauthorized") {
          // invalid credentials
          setError({ message: "Invalid credentials. Try again." });
        } else if (data.hasOwnProperty("errors")) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(data.errors);
        } else {
          // unspecified error, return generic error msg
          setError({ message: "An unknown error occured while logging in." });
        }
      }
    } catch (err) {
      //internal React hook error
      setError({ message: "An unknown error occured while logging in." });
    }
  };

  return { login, loading, error, formError };
};

export default useLogin;
