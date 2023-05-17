import styles from "./Button.module.scss";

export const Button = ({ children, callback, type }) => {
  return (
    <button type={type} className={styles.buttonStyle} onClick={callback}>
      {children}
    </button>
  );
};
