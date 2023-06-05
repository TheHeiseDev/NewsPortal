import React from "react";
import styles from "./NotFound.module.scss";
import { MainLayout } from "../../layout/MainLayout";
import notFound from "../../assets/404.png";
import { Link } from "react-router-dom";

 const NotFound = () => {
  return (
    <MainLayout>
      <div className={styles.notFound}>
        <div className={styles.container}>
          <div className={styles.notFoundWrapper}>
            <div className={styles.image}>
              <img src={notFound} alt="" />
            </div>
            <div className={styles.action}>
              <Link to="/">ГЛАВНАЯ</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};


export default NotFound;