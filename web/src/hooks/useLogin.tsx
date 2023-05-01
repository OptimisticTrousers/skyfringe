import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { FormError, LoginData } from "../types";
import useHttp from "./useHttp";

const useLogin = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [formError, setFormError] = useState<FormError[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { post } = useHttp();
  const { showToast } = useContext(ToastContext);

  // Call this function with the FormData object created using relevant user login data
  const login = async (formData: LoginData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    const message = "An unknown error occured while logging in.";
    try {
      const response = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)

      if (response.status === 200) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setError(null);
        setFormError(null);
        dispatch({ type: "LOGIN", payload: response });
        showToast("success", "Successfully logged in!");
      } else {
        // error with login request
        if (response.status === 403) {
          // invalid credentials
          setError({ message: "Invalid credentials. Try again." });
        } else if (response.data.length) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(response.data);
        } else {
          // unspecified error, return generic error msg
          setError({ message });
          showToast("error", message);
        }
      }
    } catch (err) {
      //internal React hook error
      setError({ message });
      showToast("error", message);
    } finally {
      // Regardless of success or error, the loading state is complete
      setLoading(false);
    }
  };

  return { login, loading, error, formError };
};

export default useLogin;
