import React from "react";
import styles from "./Subscribe.module.scss";
import { Button } from "../UI/Buttons/Button";

export const Subscribe = () => {
  const subscribeHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className={styles.subscribe}>
      <div className={styles.containerMini}>
        <div className={styles.subscribeWrapper}>
          <form className={styles.form} action="" onSubmit={subscribeHandle}>
            <div>
              <label htmlFor="Подпишитесь на новые посты">
                Подпишитесь на новые посты
              </label>
              <div className={styles.inputContainer}>
                <input type="email" placeholder="template@gmail.com" />
                <Button type="submit">ОК</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
