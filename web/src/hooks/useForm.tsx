import { useState, ChangeEvent } from "react";

const useForm = () => {
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");

  const [userName, setuserName] = useState("");
  const [userNameValid, setuserNameValid] = useState(true);
  const [userNameError, setuserNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordValid, setOldPasswordValid] = useState(true);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordConf, setPasswordConf] = useState("");
  const [passwordConfValid, setPasswordConfValid] = useState(true);
  const [passwordConfError, setPasswordConfError] = useState("");

  const [emailValidationStyles, setEmailValidationStyles] = useState(false);
  const [userNameValidationStyles, setuserNameValidationStyles] =
    useState(false);
  const [passwordValidationStyles, setPasswordValidationStyles] =
    useState(false);
  const [oldPasswordValidationStyles, setOldPasswordValidationStyles] =
    useState(false);

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setOldPasswordValid(true);
      setOldPasswordError("");
    }
    setOldPassword(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setuserNameValid(true);
      setuserNameError("");
    }
    setuserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setEmailValid(true);
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordConfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (password === passwordConf && e.target.checkValidity()) {
      setPasswordConfValid(true);
      setPasswordConfError("");
    }
    setPasswordConf(e.target.value);
  };

  const checkPasswordConfValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (password !== passwordConf) {
      setPasswordConfValid(false);
      setPasswordConfError("Passwords do not match");
    } else {
      setPasswordConfValid(true);
      setPasswordConfError("");
    }
  };

  const checkEmailValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setEmailValidationStyles(true);
      setEmailValid(false);
      setEmailError("The email field must be a valid email");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setPasswordValid(true);
      setPasswordError("");
    }
    setPassword(e.target.value);
  };

  const checkOldPasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setOldPasswordValidationStyles(true);
      setOldPasswordValid(false);
      setOldPasswordError("The password field must be at least 8 characters");
    }
  };

  const checkPasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setPasswordValidationStyles(true);
      setPasswordValid(false);
      setPasswordError("The password field must be at least 8 characters");
    }
  };

  const checkUserNameValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setuserNameValidationStyles(true);
      setuserNameValid(false);
      setuserNameError("No spaces, uppercase letters, or special characters");
    }
  };

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };
  return {
    fullName,
    handleFullNameChange,
    userName,
    handleUserNameChange,
    userNameValid,
    userNameError,
    setBio,
    setEmail,
    setFullName,
    email,
    oldPassword,
    oldPasswordError,
    oldPasswordValid,
    oldPasswordValidationStyles,
    oldPasswordVisible,
    checkOldPasswordValidation,
    handleOldPasswordChange,
    handleEmailChange,
    emailValid,
    emailError,
    password,
    handlePasswordChange,
    passwordValid,
    passwordError,
    passwordVisible,
    setPasswordVisible,
    passwordConf,
    handlePasswordConfChange,
    passwordConfValid,
    passwordConfError,
    emailValidationStyles,
    userNameValidationStyles,
    passwordValidationStyles,
    checkPasswordConfValidation,
    checkPasswordValidation,
    checkUserNameValidation,
    checkEmailValidation,
    handlePasswordVisiblity,
    bio,
    handleBioChange,
  };
};

export default useForm;
