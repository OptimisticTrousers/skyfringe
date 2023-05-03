import { FC } from "react";
import { ErrorMessage } from "../../ui";
import SkeletonFriendCard from "../SkeletonFriendCard/SkeletonFriendCard";
import CSSModules from "react-css-modules";
import styles from "./FriendsErrorLoading.module.css";

interface Props {
  message: string;
  loading: boolean;
  error: unknown;
}

// Component that handles loading and error UI across all friends pages
const FriendsErrorLoading: FC<Props> = ({ message, loading, error }) => {
  return (
    <>
      {loading && (
        <div styleName="loading">
          <SkeletonFriendCard />
          <SkeletonFriendCard />
          <SkeletonFriendCard />
        </div>
      )}

      <div styleName="loading__error">
        {error ? <ErrorMessage message={message} /> : null}
      </div>
    </>
  );
};

export default CSSModules(FriendsErrorLoading, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
