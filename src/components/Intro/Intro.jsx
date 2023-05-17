import React from "react";
import styles from "./Intro.module.scss";

export const Intro = () => {
  return (
    <div className={styles.intro}>
      <div className={styles.introWrapper}>
        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
            <div className={styles.introItemTextBody}>
              <span className={styles.itemNumber}>01</span>
              <span className={styles.divider}></span>
              <span className={styles.itemTitle}>AI</span>
            </div>
          </div>
        </div>

        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
            <div className={styles.introItemTextBody}>
              <span className={styles.itemNumber}>02</span>
              <span className={styles.divider}></span>
              <span className={styles.itemTitle}>IT News</span>
            </div>
          </div>
        </div>

        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
          <div className={styles.introItemTextBody}>
          <span className={styles.itemNumber}>03</span>
          <span className={styles.divider}></span>
            <span className={styles.itemTitle}>Полезные сервисы</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
