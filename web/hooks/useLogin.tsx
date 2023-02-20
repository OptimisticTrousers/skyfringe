import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error, FormData, FormErrors } from "../types";
import useRequests from "./useRequests";

const useLogin = () => {
  const [error, setError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { POST } = useRequests();

  // Call this function with the FormData object created using relevant user login data
  const login = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setFormError(null);
    try {
      const data = await POST(`${process.env.API_DOMAIN}`, formData, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (data.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setLoading(false);
        setError(null);
        setFormError(null);
        dispatch({ type: "LOGIN", payload: data.user });
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
