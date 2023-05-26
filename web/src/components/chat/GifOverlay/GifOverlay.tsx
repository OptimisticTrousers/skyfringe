import { FC, useState } from "react";
import CSSModules from "react-css-modules";
import { AiOutlineFileGif } from "react-icons/ai";
import OverlayModal from "../../modals/OverlayModal";
import styles from "./GifOverlay.module.css";

interface Props {
  sendChatMessage: any;
  handleFeedback: any;
}

const GifOverlay: FC<Props> = ({ sendChatMessage, handleFeedback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  return (
    <div styleName="gif">
      <button styleName="gif__button" onClick={toggleModal} type="button">
        <AiOutlineFileGif styleName="gif__icon" />
      </button>
      {isModalOpen && (
        <OverlayModal
          title="Choose GIFs"
          toggleModal={toggleModal}
          sendChatMessage={sendChatMessage}
          handleFeedback={handleFeedback}
          type="gifs"
        />
      )}
    </div>
  );
};

export default CSSModules(GifOverlay, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
