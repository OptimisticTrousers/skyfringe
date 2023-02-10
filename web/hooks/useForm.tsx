import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_EMAIL":
      return { ...state, email: action.payload };
    case "EMAIL_ERROR":
      return { ...state };
  }
};

const useForm = (...inputs: string[]) => {
  const [form, dispatch] = useReducer(
    reducer,
    inputs.map((input) => {
      return { value: input, valid: true, error: "" };
    })
  );

  const handleEmailChange = (e) => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setEmailValid(true);
      setEmailError("");
    }
  };

  const checkEmailValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if (email === "" || email === "null" || email === null) {
      setEmailValid(false);
      setEmailError("Input is required.");
    } else if (!emailRegex.test(email)) {
      setEmailValid(false);
      setEmailError("Input is not a valid email-address.");
    } else {
      setEmailValid(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordValid(true);
      setPasswordError("");
    }
  };

  const checkPasswordValidation = () => {
    // Password must be at least 8 characters
    if (password.length === 0) {
      setPasswordValid(false);
      setPasswordError(`Input is required.`);
    } else if (password.length < 8) {
      setPasswordValid(false);
      setPasswordError("Input must be at least 8 characters long.");
    } else {
      setPasswordValid(true);
      setPasswordError("");
    }
  };

  if (!emailValid) {
    checkEmailValidation();
  }

  if (!passwordValid) {
    checkPasswordValidation();
  }
};

export default useForm;
