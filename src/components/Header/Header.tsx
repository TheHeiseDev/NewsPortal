import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import instagram from "../../assets/instagram.webp";
import facebook from "../../assets/facebook.webp";
import { Button } from "../UI/Buttons/Button";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isSticky ? styles.headerSticky : styles.header}>
      <div className="container">
        <div className={styles.headerWrapper}>
          <div className={styles.headerLogo}>
            <Link to="/">WOK BLOG</Link>
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
