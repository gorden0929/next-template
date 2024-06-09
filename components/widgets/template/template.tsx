import { FC } from "react";
import styles from "./template.module.scss";

type Props = {
  children: React.ReactNode;
};

const Template: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Template;
