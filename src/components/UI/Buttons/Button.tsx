import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import { CircularProgress } from "@mui/material";

interface IButton {
  children: ReactNode;
  callback?: () => void;
  type?: "submit" | "button" | "reset";
  loading?: boolean;
}

export const Button: FC<IButton> = ({ children, callback, type, loading = false }) => {
  return (
    <button
      type={type}
      className={`${styles.buttonStyle} ${loading ? styles.buttonDisabled : ""}`}
      onClick={callback}
    >
      <div className={styles.buttonContainer}>
        {loading ? <CircularProgress color="success" /> : children}
      </div>
    </button>
  );
};
