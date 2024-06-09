import { FC } from "react";
import styles from "./loading.module.scss";
import { useTheme } from "next-themes";

type Props = {
  show: boolean;
  message?: string | string[];
};

const Loading: FC<Props> = (props) => {
  const { theme } = useTheme();
  let message = props.message || [];
  if (typeof message === "string") {
    message = [message];
  }

  return (
    <div
      className={`${styles["loading-overlay"]} ${
        props.show ? styles.active : ""
      } }`}>
      <div className={styles.loader}></div>
      {message.length > 0 &&
        message.map((item, index) => {
          return <p key={`loading-overlay-text-${index}`}>{item}</p>;
        })}
    </div>
  );
};

export default Loading;
