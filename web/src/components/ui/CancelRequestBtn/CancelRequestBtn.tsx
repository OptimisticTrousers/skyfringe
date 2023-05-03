import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import CSSModules from "react-css-modules";
import styles from "./CancelRequestBtn.module.css";

interface Props {
  userId: string;
}

// Used to cancel a friend request you have sent
const CancelRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Cancelling...";
    }

    if (error) {
      return "Cancel";
    }

    if (data) {
      return "Cancelled!";
    }

    // Default state should be returned
    return "Cancel";
  };

  const handleCancel = () => {
    request(
      "cancelRequest",
      "Request cancelled.",
      "An unknown error has occured while cancelling the outgoing friend request."
    );
  };

  return (
    <button
      styleName="button"
      onClick={handleCancel}
      disabled={data ? true : false}
    >
      {setBtnText()}
    </button>
  );
};

export default CSSModules(CancelRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
