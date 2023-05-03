import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import CSSModules from "react-css-modules";
import styles from "./SendRequest.module.css";

interface Props {
  userId: string;
}

// Used to send a friend request to a user
const SendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically change btn text to indicate loading of request
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Sending...";
    }

    if (error) {
      return "Add Friend";
    }

    if (data) {
      return "Sent!";
    }

    // Default state should be returned
    return "Add Friend";
  };

  const handleAccept = () => {
    request(
      "sendRequest",
      "Request sent.",
      "An unknown error has occured while sending the friend request."
    );
  };

  return (
    <button
      styleName="button"
      onClick={handleAccept}
      disabled={data ? true : false}
    >
      {setBtnText()}
    </button>
  );
};

export default CSSModules(SendRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
