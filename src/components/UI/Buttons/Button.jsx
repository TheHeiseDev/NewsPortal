import styles from "./Button.module.scss";

export const Button = ({ children, callback }) => {
  return (
    <button className={styles.buttonStyle} onClick={callback}>
      {children}
    </button>
  );
};
