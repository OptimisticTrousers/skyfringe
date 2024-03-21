import { FC, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import CSSModules from "react-css-modules";
import styles from "./EmojiPickerBtn.module.css";

interface Props {
  onEmojiClick: any;
  modal: any;
  position: number | undefined;
}

// Creating an accessible button that opens the Emoji picker component
// The third party emoji picker itself is hardly accessible which is a pain in the ass. For the purposes of this project it is acceptible, but in a production app this would be removed and generated from scratch
const EmojiPickerBtn: FC<Props> = ({ onEmojiClick, modal, position }) => {
  const [showPicker, setShowPicker] = useState(false);
  const openBtnRef = useRef<any>(null);

  // Add accessible handlers for enter and space key press
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      openBtnRef.current?.click();
    }
  };
  // Containing div is a relative parent to the picker to allow absolute positioning of the picker. It is set up as a button and therefore has explicitly set focus and keypress handlers for accessibility.
  return (
    <div
      ref={openBtnRef}
      id="openPicker"
      styleName="button"
      onClick={() => setShowPicker((prevState) => !prevState)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      aria-haspopup="menu"
      aria-label="Open emoji picker"
    >
      🙂
      {showPicker && (
        <div role="menu" aria-label="Emoji picker" styleName="menu">
          <div styleName={`container ${modal ? "container--modal" : ""} ${position === 0 ? "container--first" : ""}`}>
            <EmojiPicker onEmojiClick={onEmojiClick} searchDisabled={true} />
          </div>
        </div>
      )
      }
    </div >
  );
};

export default CSSModules(EmojiPickerBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
