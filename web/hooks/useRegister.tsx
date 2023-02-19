import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Error, FormData, FormError, FormErrors } from "../types";
import useRequests from "./useRequests";

const useRegister = () => {
  const [error, setError] = useState<Error | null>(null);
  const [formError, setFormError] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const { POST } = useRequests(setError);

  // Call this function with the object created using relevant user sign up data
  const register = async (formData: FormData) => {
    setLoading(true);
    setError({ message: "" });
    setFormError(null);
    try {
      const response = await POST(
        `http://localhost:5000/api/auth/register`,
        formData,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseJSON = await response.json();

      if (responseJSON.hasOwnProperty("user")) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setLoading(false);
        setError({ message: "" });
        setFormError(null);
        dispatch({ type: "LOGIN", payload: responseJSON.user });
        return;
      } else {
        // error with login reject
        if (responseJSON.error.message === "Email already in use") {
          // user must select a different email. Set to formError
          setFormError({
            errors: [{ msg: "This email is taken. Choose another." }],
          });
          setLoading(false);
        } else if (responseJSON.hasOwnProperty("errors")) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(responseJSON.errors);
          setLoading(false);
        } else {
          // unspecified error, return generic error msg
          setError({ message: "An unknown error occured while signing up." });
          setLoading(false);
        }
      }
    } catch (err) {
      // internal React hook error
      setError({ message: "An unknown error occured while signing up." });
      setLoading(false);
    }
  };

  return { register, loading, error, formError };
};

export default useRegister;
