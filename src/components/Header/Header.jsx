import React from "react";
import styles from "./Header.module.scss";
import instagram from "../../assets/instagram.webp";
import facebook from "../../assets/facebook.webp";
import { Button } from "components/UI/Buttons/Button";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={styles.headerWrapper}>
          <div className={styles.headerLogo}>
            WOK BLOG
            <span>/ Way of Knowledge</span>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.headerAuthor}>
              <span>Автор: </span>

              <div>
                <img src={instagram} alt="instagram" />
              </div>
              <div>
                <img src={facebook} alt="instagram" />
              </div>
            </div>
            <Button>Лента</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
