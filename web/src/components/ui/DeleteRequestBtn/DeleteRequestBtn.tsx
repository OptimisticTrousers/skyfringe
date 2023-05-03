import { FC } from "react";
import useFriendRequests from "../../../hooks/useFriendRequests";
import CSSModules from "react-css-modules";
import styles from "./DeleteRequest.module.css";

interface Props {
  userId: string;
}

// Used to delete a friend request sent by another user
const UnfriendRequestBtn: FC<Props> = ({ userId }) => {
  const { request, data, loading, error }: any = useFriendRequests(userId);

  // Dynamically set button text to indicate loading state
  const setBtnText = () => {
    // Set out the conditionals in order of which they should be evaluated
    if (loading) {
      return "Deleting...";
    }

    if (error) {
      return "Delete";
    }

    if (data) {
      return "Deleted!";
    }

    // Default state should be returned
    return "Delete";
  };

  const handleAccept = () => {
    request(
      "rejectRequest",
      "Request rejected.",
      "An unknown error has occured while rejecting the friend request."
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

export default CSSModules(UnfriendRequestBtn, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
