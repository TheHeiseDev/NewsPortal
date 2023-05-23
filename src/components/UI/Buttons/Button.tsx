import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButton {
  children: ReactNode;
  callback?: () => void;
  type?: "submit" | "button" | "reset";
}

export const Button: FC<IButton> = ({ children, callback, type }) => {
  return (
    <button type={type} className={styles.buttonStyle} onClick={callback}>
      {children}
    </button>
  );
};
