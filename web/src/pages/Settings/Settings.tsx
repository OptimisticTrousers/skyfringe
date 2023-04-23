import { useContext, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineCamera } from "react-icons/ai";
import { DeleteAccountModal } from "../../components/modals";
import { Card } from "../../components/ui";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Settings.module.css";

const Settings = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] =
    useState(false);

  const { user } = useContext(AuthContext);

  const toggleModal = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
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
          <img
            src="/images/optimistictrousers.jpg"
            styleName="settings__banner"
          />
        </header>
        <div styleName="settings__grid">
          <aside styleName="settings__aside">
            <Card>
              <div styleName="settings__card">
                <img
                  src="/images/optimistictrousers.jpg"
                  styleName="settings__avatar"
                />
                <h2 styleName="settings__name">Nathaniel Poole</h2>
                <p styleName="settings__friends">10 friends</p>
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
                <button styleName="settings__button settings__button--view">
                  View Public Profile
                </button>
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
                onClick={toggleModal}
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
                    <label htmlFor="firstName" styleName="settings__label">
                      Full Name
                    </label>
                    <input
                      styleName="settings__input"
                      id="firstName"
                      name="firstName"
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="lastName" styleName="settings__label">
                      Bio
                    </label>
                    <input
                      styleName="settings__input"
                      id="lastName"
                      name="lastName"
                    />
                  </div>
                  <div styleName="settings__group">
                    <label htmlFor="email" styleName="settings__label">
                      Email
                    </label>
                    <input
                      styleName="settings__input"
                      id="email"
                      name="email"
                      type="email"
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
                      id="email"
                      name="email"
                      type="email"
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
                <button styleName="settings__button--update">Update</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal toggleModal={toggleModal} userId={user._id} />
      )}
    </>
  );
};

export default CSSModules(Settings, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
