import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useRegister = () => {
  const [error, setError] = useState<any>(null);
  const [formError, setFormError] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  // Call this function with the object created using relevant user sign up data
  const register = async (formData: any) => {
    setLoading(true);
    setError({ message: "" });
    setFormError(null);
    try {
      const response = await fetch(`${process.env.API_DOMAIN}/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const responseJSON = await response.json();

      if (responseJSON.user) {
        // No errors occured. Dispatch appropriate LOGIN action after adjusting state
        setLoading(false);
        setError({ message: "" });
        setFormError(null);
        dispatch({ type: "LOGIN", payload: responseJSON.user });
        return;
      } else {
        // error with login reject
        if (responseJSON.errorMsg === "Email already in use") {
          // user must select a different email. Set to formError
          setFormError([{ message: "This email is taken. Choose another." }]);
          setLoading(false);
        } else if (responseJSON.length) {
          // length indicates form validation errors (i. e. JSON response is array)
          setFormError(responseJSON);
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
