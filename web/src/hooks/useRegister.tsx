import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error, FormError, RegisterData } from "../types";
import useHttp from "./useHttp";

const useRegister = () => {
  const [error, setError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<FormError[] | null>(null);
  const { dispatch } = useContext(AuthContext);
  const { post, loading } = useHttp();

  // Call this function with the object created using relevant user sign up data
  const register = async (formData: RegisterData) => {
    setError(null);
    setFormError(null);
    try {
      const data = await post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/register`,
        formData
      );

      if (data.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        dispatch({ type: "LOGIN", payload: data.user });
        return;
      } else {
        // error with login reject
        if (data.error.message === "Email already in use") {
          // user must select a different email. Set to error
          setError({ message: "This email is taken. Choose another." });
        } else if (data.hasOwnProperty("errors")) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(data.errors);
        } else {
          // unspecified error, return generic error msg
          setError({ message: "An unknown error occured while signing up." });
        }
      }
    } catch (err) {
      // internal React hook error
      setError({ message: "An unknown error occured while signing up." });
    }
  };

  return { register, loading, error, formError };
};

export default useRegister;
