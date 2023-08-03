import styles from "./Intro.module.scss";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { CategoryEnum } from "../../utils/constants/categoryItem";

export const Intro = () => {
  useTitle("Главная");

  return (
    <div className={styles.intro}>
      <div className={styles.introWrapper}>
        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
            <Link to={`/newsfeed?category=${CategoryEnum.ai}`}>
              <div className={styles.introItemTextBody}>
                <span className={styles.itemNumber}>01</span>
                <span className={styles.divider}></span>
                <span className={styles.itemTitle}>AI</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
            <Link to={`/newsfeed?category=${CategoryEnum.it_news}`}>
              <div className={styles.introItemTextBody}>
                <span className={styles.itemNumber}>02</span>
                <span className={styles.divider}></span>
                <span className={styles.itemTitle}>IT News</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.introItem}>
          <div className={styles.introItemBackground}></div>
          <div className={styles.introItemText}>
            <Link to={`/newsfeed?category=${CategoryEnum.useful_services}`}>
              <div className={styles.introItemTextBody}>
                <span className={styles.itemNumber}>03</span>
                <span className={styles.divider}></span>
                <span className={styles.itemTitle}>Полезные сервисы</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
