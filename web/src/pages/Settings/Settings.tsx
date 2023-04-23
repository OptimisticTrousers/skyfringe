import { ChangeEvent, useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  ChangePictureModal,
  DeleteAccountModal,
} from "../../components/modals";
import { Avatar, Banner, Card } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import useUpdateUser from "../../hooks/useUpdateUser";
import styles from "./Settings.module.css";

const Settings = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const { updateUser, loading } = useUpdateUser();

  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
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

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setEmailValid(true);
      setEmailError("");
    }
    setEmail(e.target.value);
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

  const checkPasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      setPasswordValidationStyles(true);
      setPasswordValid(false);
      setPasswordError("The password field must be at least 8 characters");
    }
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

  const handlePasswordVisiblity = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  const toggleAvatarModal = () => {
    setIsAvatarModalOpen((prevValue) => !prevValue);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
  };

  const disabled =
    loading || (!emailValid && email) || ((!passwordValid && password) as any);

  const friendCountText = () => {
    const friendCount = user?.friends.length;
    if (friendCount > 1) {
      return `${friendCount} friends`;
    } else if (friendCount === 1) {
      return "1 friend";
    }
    return "0 friends";
  };

  return (
    <>
      <div styleName="settings">
        <header styleName="settings__header">
          <button styleName="settings__button settings__button--banner">
            <AiOutlineCamera styleName="settings__icon" />
            {/* <AiFillCamera styleName="settings__icon" /> */}
            Change Cover
          </button>
          <Banner src={user?.cover?.imageUrl} altText={user?.cover?.altText} />
        </header>
        <div styleName="settings__grid">
          <aside styleName="settings__aside">
            <Card>
              <div styleName="settings__card">
                <div styleName="settings__avatar">
                  <Avatar
                    size={"xl"}
                    src={user?.photo?.imageUrl}
                    alt={user?.photo?.altText}
                  />
                  <button
                    aria-label="Change profile picture"
                    styleName="settings__button settings__button--avatar"
                    aria-haspopup="dialog"
                    onClick={toggleAvatarModal}
                  >
                    <AiFillCamera />
                  </button>
                </div>
                <h2 styleName="settings__name">{user.fullName}</h2>
                <p styleName="settings__friends">{friendCountText()}</p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Posts created</p>
                <p styleName="settings__number settings__number--orange">32</p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Posts liked</p>
                <p styleName="settings__number settings__number--green">32</p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Comments</p>
                <p styleName="settings__number settings__number--gray">32</p>
              </div>
              <div styleName="settings__box">
                <Link
                  to={`/users/${user?._id}`}
                  styleName="settings__button settings__button--view"
                >
                  View Public Profile
                </Link>
              </div>
            </Card>
            <Card>
              <h3 styleName="settings__subtitle">Close account</h3>
              <p styleName="settings__description">
                By deleting your account, you will lose all of your data. This
                action cannot be reversed. NOTE: Popup will show up confirming
                if you want to delete your account
              </p>
              <button
                styleName="settings__button--delete"
                onClick={toggleDeleteModal}
              >
                Delete
              </button>
            </Card>
          </aside>
          <div styleName="settings__content">
            <Card>
              <h2 styleName="settings__title">Account Settings</h2>
              <form styleName="settings__form">
                <div styleName="settings__section">
                  <div styleName="settings__group">
                    <label htmlFor="fullName" styleName="settings__label">
                      Full Name
                    </label>
                    <input
                      styleName="settings__input"
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      disabled={loading}
                      onChange={handleFullNameChange}
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="bio" styleName="settings__label">
                      Bio
                    </label>
                    <input
                      styleName="settings__input"
                      type="text"
                      id="bio"
                      name="bio"
                      value={bio}
                      disabled={loading}
                      onChange={handleBioChange}
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="email" styleName="settings__label">
                      Email Address
                    </label>
                    <input
                      styleName={`settings__input ${
                        emailValidationStyles
                          ? "settings__input--validation"
                          : ""
                      }`}
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={loading}
                      onChange={handleEmailChange}
                      onBlur={checkEmailValidation}
                      value={email}
                    />
                  </div>
                </div>
                <div styleName="settings__section">
                  <div styleName="settings__group">
                    <label htmlFor="email" styleName="settings__label">
                      Old Password
                    </label>
                    <input
                      styleName="settings__input"
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      required
                      value={password}
                      minLength={8}
                      disabled={loading}
                      onChange={handlePasswordChange}
                      onBlur={checkPasswordValidation}
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="email" styleName="settings__label">
                      New Password
                    </label>
                    <input
                      styleName="settings__input"
                      id="email"
                      name="email"
                      type="email"
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="email" styleName="settings__label">
                      Confirm New Password
                    </label>
                    <input
                      styleName="settings__input"
                      id="email"
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
              </form>
              <div styleName="settings__box">
                <button
                  styleName="settings__button--update"
                  disabled={disabled}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal toggleModal={toggleDeleteModal} userId={user._id} />
      )}
      {isAvatarModalOpen && (
        <ChangePictureModal toggleModal={toggleAvatarModal} />
      )}
    </>
  );
};

export default CSSModules(Settings, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
