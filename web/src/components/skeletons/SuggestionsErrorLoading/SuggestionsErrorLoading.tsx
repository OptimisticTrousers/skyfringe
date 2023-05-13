import { FC } from "react";
import { ErrorMessage } from "../../ui";
import CSSModules from "react-css-modules";
import styles from "./SuggestionsErrorLoading.module.css";
import SkeletonSuggestion from "../SkeletonSuggestion";

interface Props {
  message: string;
  loading: boolean;
  error: unknown;
}

// Component that handles loading and error UI across all friends pages
const SuggestionsErrorLoading: FC<Props> = ({ message, loading, error }) => {
  return (
    <>
      {loading && (
        <div styleName="loading">
          <SkeletonSuggestion />
          <SkeletonSuggestion />
          <SkeletonSuggestion />
        </div>
      )}

      <div styleName="loading__error">
        {error ? <ErrorMessage message={message} /> : null}
      </div>
    </>
  );
};

export default CSSModules(SuggestionsErrorLoading, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
