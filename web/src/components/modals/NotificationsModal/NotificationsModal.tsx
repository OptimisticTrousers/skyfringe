import { FC } from "react";
import CSSModules from "react-css-modules";
import { Notification } from "../../ui";
import ModalContainer from "../ModalContainer";
import styles from "./NotificationsModal.module.css";

interface Props {
  toggleModal: any;
}

const NotificationsModal: FC<Props> = ({ toggleModal }) => {
  return (
    <ModalContainer title="Notifications" toggleModal={toggleModal}>
      <div styleName="notifications">
        <Notification />
        <Notification />
        <Notification />
      </div>
    </ModalContainer>
  );
};

export default CSSModules(NotificationsModal, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
