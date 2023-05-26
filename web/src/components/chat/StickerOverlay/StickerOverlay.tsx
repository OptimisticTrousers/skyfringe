import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { AiFillPicture, AiOutlineFileGif } from "react-icons/ai";
import { BiSticker } from "react-icons/bi";
import OverlayModal from "../../modals/OverlayModal";
import styles from "./StickerOverlay.module.css";

interface Props {
  sendChatMessage: any;
  handleFeedback: any;
}

const StickerOverlay: FC<Props> = ({ sendChatMessage, handleFeedback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  return (
    <div styleName="gif">
      <button styleName="gif__button" onClick={toggleModal} type="button">
        <BiSticker styleName="gif__icon" />
      </button>
      {isModalOpen && (
        <OverlayModal
          title="Choose Stickers"
          toggleModal={toggleModal}
          sendChatMessage={sendChatMessage}
          handleFeedback={handleFeedback}
          type="stickers"
        />
      )}
    </div>
  );
};

export default CSSModules(StickerOverlay, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
