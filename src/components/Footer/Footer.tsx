import { memo } from "react";
import styles from "./Footer.module.scss";
import { Subscribe } from "../Subscribe/Subscribe";

export const Footer = memo(() => {
  return (
    <footer>
      <div className={styles.containerMini}>
        <div className={styles.footerWrapper}>
          <Subscribe />
          <div className={styles.author}>© 2023 Blog by Edgar Varderesyan</div>
        </div>
      </div>
    </footer>
  );
});
