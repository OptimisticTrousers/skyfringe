import { FC, useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./ProgressBar.module.css";

interface Props {
  speed: any;
}

const ProgressBar: FC<Props> = ({ speed }) => {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    function incrementProg() {
      setProg((prevProg) => Math.min(prevProg + 1 * (speed ? speed : 1), 100));
    }

    const timer = setInterval(incrementProg, 5);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div styleName="progress">
      <span styleName="progress-bar" style={{ width: `${prog}%` }}></span>
    </div>
  );
};

export default CSSModules(ProgressBar, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "ignore",
});
