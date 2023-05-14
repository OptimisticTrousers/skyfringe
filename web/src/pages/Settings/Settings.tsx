import { FormError } from "@backend/types";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ChangeAvatarModal, DeleteAccountModal } from "../../components/modals";
import {
  Avatar,
  Banner,
  Card,
  ErrorMessage,
  PasswordContainer,
} from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/ToastContext";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import useUpdateUser from "../../hooks/useUpdateUser";
import styles from "./Settings.module.css";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}`
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const { updateUser, loading: updateLoading, formError } = useUpdateUser();

  const {
    fullName,
    bio,
    handleBioChange,
    handleFullNameChange,
    userName,
    handleUserNameChange,
    userNameValid,
    oldPassword,
    userNameError,
    email,
    setBio,
    setEmail,
    setFullName,
    handleEmailChange,
    emailValid,
    emailError,
    password,
    handlePasswordChange,
    passwordValid,
    oldPasswordValid,
    passwordError,
    passwordVisible,
    passwordConf,
    handlePasswordConfChange,
    passwordConfValid,
    passwordConfError,
    oldPasswordValidationStyles,
    checkOldPasswordValidation,
    emailValidationStyles,
    userNameValidationStyles,
    oldPasswordError,
    passwordValidationStyles,
    checkPasswordConfValidation,
    handleOldPasswordChange,
    checkPasswordValidation,
    checkUserNameValidation,
    checkEmailValidation,
    handlePasswordVisiblity,
  } = useForm();

  const toggleAvatarModal = () => {
    setIsAvatarModalOpen((prevValue) => !prevValue);
  };

  const toggleCoverModal = () => {
    setIsCoverModalOpen((prevValue) => !prevValue);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
  };

  const friendCountText = () => {
    const friendCount = user.friends.length;
    if (friendCount > 1) {
      return `${friendCount} friends`;
    } else if (friendCount === 1) {
      return "1 friend";
    }
    return "0 friends";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPasswordValid) {
      showToast("error", "Invalid old password");
      return;
    } else if (!passwordValid) {
      showToast("error", "Invalid password");
      return;
    } else if (!passwordConfValid) {
      showToast("error", "Invalid password confirmation");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("bio", fullName);
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", password);
    formData.append("newPasswordConf", passwordConf);
    updateUser(user._id, formData);
  };

  const disabled = updateLoading;

  useEffect(() => {
    setBio(user.bio);
    setEmail(user.email);
    setFullName(user.fullName);
  }, []);

  return (
    <>
      <div styleName="settings">
        <header styleName="settings__header">
          <button
            styleName="settings__button settings__button--banner"
            onClick={toggleCoverModal}
          >
            <AiOutlineCamera styleName="settings__icon" />
            Change Cover
          </button>
          <Banner
            src={user.cover && user.cover.imageUrl}
            altText={user.cover && user.cover.altText}
          />
        </header>
        <div styleName="settings__grid">
          <aside styleName="settings__aside">
            <Card>
              <div styleName="settings__card">
                <div styleName="settings__avatar">
                  <Avatar
                    size={"xl"}
                    src={user.photo && user.photo.imageUrl}
                    alt={user.photo && user.photo.altText}
                  />
                  <button
                    aria-label="Change profile picture"
                    styleName="settings__button settings__button--avatar"
                    aria-haspopup="dialog"
                    onClick={toggleAvatarModal}
                  >
                    <AiOutlineCamera styleName="settings__icon settings__icon--camera" />
                  </button>
                </div>
                <h2 styleName="settings__name">{user.fullName}</h2>
                <p styleName="settings__friends">{friendCountText()}</p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Posts created</p>
                <p styleName="settings__number settings__number--orange">
                  {data && data.posts.length}
                </p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Posts liked</p>
                <p styleName="settings__number settings__number--green">
                  {data && data.likedPosts.length}
                </p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Comments created</p>
                <p styleName="settings__number settings__number--gray">
                  {data && data.comments.length}
                </p>
              </div>
              <div styleName="settings__box">
                <p styleName="settings__statistic">Comments liked</p>
                <p styleName="settings__number settings__number--red">
                  {data && data.likedComments.length}
                </p>
              </div>
              <div styleName="settings__box">
                <Link
                  to={`/users/${user._id}`}
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
              <form styleName="settings__form" onSubmit={handleSubmit}>
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
                      required
                      disabled={disabled}
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
                      required
                      disabled={disabled}
                      onChange={handleBioChange}
                    />
                  </div>
                </div>
                <div styleName="settings__section">
                  <PasswordContainer
                    showPassword={passwordVisible}
                    handleClick={handlePasswordVisiblity}
                    right={12}
                    disabled={disabled}
                  >
                    <div styleName="settings__group">
                      <label htmlFor="email" styleName="settings__label">
                        Old Password
                      </label>
                      <input
                        styleName={`settings__input ${
                          oldPasswordValidationStyles
                            ? "settings__input--validation"
                            : ""
                        }`}
                        type={passwordVisible ? "text" : "password"}
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        minLength={8}
                        disabled={disabled}
                        onChange={handleOldPasswordChange}
                        onBlur={checkOldPasswordValidation}
                      />
                    </div>
                  </PasswordContainer>
                  {oldPasswordValid === false && (
                    <ErrorMessage message={oldPasswordError} />
                  )}
                  <PasswordContainer
                    showPassword={passwordVisible}
                    handleClick={handlePasswordVisiblity}
                    right={12}
                    disabled={disabled}
                  >
                    <div styleName="settings__group">
                      <label htmlFor="newPassword" styleName="settings__label">
                        New Password
                      </label>
                      <input
                        styleName={`settings__input ${
                          passwordValidationStyles
                            ? "settings__input--validation"
                            : ""
                        }`}
                        type={passwordVisible ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={password}
                        minLength={8}
                        disabled={disabled}
                        onChange={handlePasswordChange}
                        onBlur={checkPasswordValidation}
                      />
                    </div>
                  </PasswordContainer>
                  {passwordValid === false && (
                    <ErrorMessage message={passwordError} />
                  )}
                  <PasswordContainer
                    showPassword={passwordVisible}
                    handleClick={handlePasswordVisiblity}
                    right={12}
                    disabled={disabled}
                  >
                    <div styleName="settings__group">
                      <label
                        htmlFor="newPasswordConf"
                        styleName="settings__label"
                      >
                        Confirm New Password
                      </label>
                      <input
                        styleName="settings__input"
                        type={passwordVisible ? "text" : "password"}
                        id="newPasswordConf"
                        name="newPasswordConf"
                        value={passwordConf}
                        minLength={8}
                        disabled={disabled}
                        onChange={handlePasswordConfChange}
                        onBlur={checkPasswordConfValidation}
                      />
                    </div>
                  </PasswordContainer>
                  {passwordConfValid === false && (
                    <ErrorMessage message={passwordConfError} />
                  )}
                </div>
                <div styleName="settings__box">
                  <button
                    styleName="settings__button--update"
                    disabled={disabled}
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
              <div styleName="auth__errors">
                {formError &&
                  formError.map((error: FormError, index: number) => {
                    return <ErrorMessage key={index} message={error.msg} />;
                  })}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal toggleModal={toggleDeleteModal} userId={user._id} />
      )}
      {isAvatarModalOpen && (
        <ChangeAvatarModal
          toggleModal={toggleAvatarModal}
          title={"Change Avatar"}
        />
      )}
      {isCoverModalOpen && (
        <ChangeAvatarModal
          toggleModal={toggleCoverModal}
          title={"Change Banner"}
        />
      )}
    </>
  );
};

export default CSSModules(Settings, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
