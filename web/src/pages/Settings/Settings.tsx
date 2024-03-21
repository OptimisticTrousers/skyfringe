import { FetchUserDetails, FormError, UserWithStringId } from "@backend/types";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineCamera } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ChangeAvatarModal, DeleteAccountModal } from "../../components/modals";
import ChangeBannerModal from "../../components/modals/ChangeBannerModal";
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
import useUpdateAvatar from "../../hooks/useUpdateAvatar";
import useUpdateUser from "../../hooks/useUpdateUser";
import styles from "./Settings.module.css";

const Settings = () => {
  const { user } = useContext(AuthContext);
  console.log(user._id)
  const { showToast } = useContext(ToastContext);
  const { setData, data, loading, error } = useFetch<FetchUserDetails>(
    `${import.meta.env.VITE_API_DOMAIN}/users/${user._id}`
  );
  const setUser = (user: UserWithStringId) => {
    setData((data: any) => {
      const newData = structuredClone(data);
      newData.user = user;
      return newData;
    });
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const { updateUser, loading: updateLoading, formError } = useUpdateUser();
  const { updateAvatar, loading: avatarLoading } = useUpdateAvatar();

  const {
    fullName,
    bio,
    handleBioChange,
    handleFullNameChange,
    oldPassword,
    setBio,
    setEmail,
    setFullName,
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
    oldPasswordError,
    passwordValidationStyles,
    checkPasswordConfValidation,
    handleOldPasswordChange,
    checkPasswordValidation,
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
    const friendCount = data?.user.friends.length;
    if (!friendCount) {
      return "0 friends";
    } else if (friendCount > 1) {
      return `${friendCount} friends`;
    } else if (friendCount === 1) {
      return "1 friend";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    await updateUser(user?._id, {
      fullName,
      bio,
      oldPassword,
      newPassword: password,
      newPasswordConf: passwordConf,
    });
  };

  const disabled =
    updateLoading || data?.user._id === "4c8a331bda76c559ef000004";

  useEffect(() => {
    setBio(data?.user?.bio);
    setEmail(data?.user.email);
    setFullName(data?.user.fullName);
  }, [data?.user]);

  return (
    <>
      <div styleName="settings">
        <header styleName="settings__header">
          <button
            styleName="settings__button settings__button--banner"
            onClick={toggleCoverModal}
            disabled={disabled}
          >
            <AiOutlineCamera styleName="settings__icon" />
            Change Cover
          </button>
          <Banner
            src={`${data?.user?.cover && data?.user?.cover?.imageUrl
              }?${Date.now()}`}
            altText={data?.user?.cover && data?.user?.cover?.altText}
          />
        </header>
        <div styleName="settings__grid">
          <aside styleName="settings__aside">
            <Card>
              <div styleName="settings__card">
                <div styleName="settings__avatar">
                  <Avatar
                    size={"xl"}
                    src={`${data?.user?.photo && data.user.photo.imageUrl
                      }?${Date.now()}`}
                    alt={data?.user?.photo && data.user.photo.altText}
                  />
                  <button
                    aria-label="Change profile picture"
                    styleName="settings__button settings__button--avatar"
                    aria-haspopup="dialog"
                    onClick={toggleAvatarModal}
                    disabled={disabled}
                  >
                    <AiOutlineCamera styleName="settings__icon settings__icon--camera" />
                  </button>
                </div>
                <h2 styleName="settings__name">{data?.user?.fullName}</h2>
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
                disabled={disabled}
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
                    right={8}
                    disabled={disabled}
                  >
                    <div styleName="settings__group">
                      <label htmlFor="email" styleName="settings__label">
                        Old Password
                      </label>
                      <input
                        styleName={`settings__input ${oldPasswordValidationStyles
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
                  <PasswordContainer
                    showPassword={passwordVisible}
                    handleClick={handlePasswordVisiblity}
                    right={8}
                    disabled={disabled}
                  >
                    <div styleName="settings__group">
                      <label htmlFor="newPassword" styleName="settings__label">
                        New Password
                      </label>
                      <input
                        styleName={`settings__input ${passwordValidationStyles
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
                  <PasswordContainer
                    showPassword={passwordVisible}
                    handleClick={handlePasswordVisiblity}
                    right={8}
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
              <>
                {oldPasswordValid === false && (
                  <ErrorMessage message={oldPasswordError} />
                )}
                {passwordConfValid === false && (
                  <ErrorMessage message={passwordConfError} />
                )}
                {passwordValid === false && (
                  <ErrorMessage message={passwordError} />
                )}
              </>
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
        <DeleteAccountModal
          toggleModal={toggleDeleteModal}
          userId={data?.user._id}
        />
      )}
      {isAvatarModalOpen && (
        <ChangeAvatarModal
          toggleModal={toggleAvatarModal}
          title={"Change Avatar"}
          setData={setUser}
        />
      )}
      {isCoverModalOpen && (
        <ChangeBannerModal
          toggleModal={toggleCoverModal}
          title={"Change Banner"}
          setData={setUser}
        />
      )}
    </>
  );
};

export default CSSModules(Settings, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
