import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import CSSModules from "react-css-modules";
import styles from "./UnfriendRequestBtn.module.css";

interface Props {
  userId: string;
}

// Used to unfriend a user
const UnfriendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynaically change the button text to communicate loading taking place
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Removing...";
    }

    if (error) {
      return "Unfriend";
    }

    if (data) {
      return "Removed!";
    }

    // Default state should be returned
    return "Unfriend";
  };

  const handleUnfriend = () => {
    request(
      "unfriendRequest",
      "Friend removed.",
      "An unknown error has occured while unfriending."
    );
  };

  return (
    <button
      styleName="button"
      onClick={handleUnfriend}
      disabled={data ? true : false}
    >
      {setBtnText()}
    </button>
  );
};

export default CSSModules(UnfriendRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
