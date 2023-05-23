import { Button } from "../UI/Buttons/Button";
import styles from "./FormAddComment.module.scss";
import React from "react";

export const FormAddComment = () => {
  return (
    <div className={styles.addComment}>
      <div className={styles.container}>
        <div className={styles.addCommentWrapper}>
          <form>
            <input type="text" placeholder="Введите имя" />
            <textarea rows={2} placeholder="Комментарий..." />
            <Button type="submit">Добавить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
