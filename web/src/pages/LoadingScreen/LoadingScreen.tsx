import CSSModules from "react-css-modules";
import { Loading } from "../../components/ui";
import useFetch from "../../hooks/useFetch";
import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_DOMAIN}/search-users/ping`
  );
  return (
    <div styleName={"screen" + (loading ? "" : " invisible")}>
      <Loading />
      <div styleName="screen__message">
        Please be patient as the Render Web Service wakes up. This may initially
        take 15 to 30 seconds.
      </div>
    </div>
  );
}

export default CSSModules(LoadingScreen, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
