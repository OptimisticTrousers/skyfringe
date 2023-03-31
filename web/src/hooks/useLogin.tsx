import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error, FormError, LoginData } from "../types";
import useHttp from "./useHttp";
import useToast from "./useToast";

const useLogin = () => {
  const [error, setError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<FormError[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { post } = useHttp();
  const { success } = useToast();

  // Call this function with the FormData object created using relevant user login data
  const login = async (formData: LoginData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    try {
      const data = await post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/login`,
        formData
      );
      if (data.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setLoading(false);
        setError(null);
        setFormError(null);
        dispatch({ type: "LOGIN", payload: data.user });
        success("Logged in!");
        return;
      } else {
        if (data.error.message === "Unauthorized") {
          // invalid credentials
          setError({ message: "Invalid credentials. Try again." });
          setLoading(false);
        } else if (data.hasOwnProperty("errors")) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(data.errors);
          setLoading(false);
        } else {
          // unspecified error, return generic error msg
          setError({ message: "An unkown error occured while logging in." });
          setLoading(false);
        }
      }
    } catch (err) {
      //internal React hook error
      setError({ message: "An unknown error occured while logging in." });
      setLoading(false);
    }
  };

  return { login, loading, error, formError };
};

export default useLogin;
