import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import instagram from "../../assets/instagram.webp";
import facebook from "../../assets/facebook.webp";
import { Button } from "../UI/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";

export const Header = React.memo(() => {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/">AI Chronicles</Link>
            <span>/ Хроники AI</span>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.headerAuthor}>
              <span>Автор: </span>

              <div>
                <a href="https://www.instagram.com/armyan_ed/" target="_blank">
                  <img src={instagram} alt="instagram" />
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/varderesan" target="_blank">
                  <img src={facebook} alt="instagram" />
                </a>
              </div>
            </div>
            <Button callback={() => navigate("/newsfeed")}>Лента</Button>
          </div>
        </div>
      </div>
    </header>
  );
});
