import styles from "./CategoryButton.module.scss";

export const CategoryButton = ({ title, Image, bgColor, callback }) => {
  return (
    <button
      onClick={callback}
      style={{ background: bgColor, color: "white" }}
      className={styles.CategoryButton}
    >
      <div className={styles.CategoryButtonWrapper}>
        <h6>{title}</h6>
        <div className={styles.CategoryButtonImage}>{Image}</div>
      </div>
    </button>
  );
};
