import styles from "./Comment.module.scss";
import { FC, useMemo, memo } from "react";
import { CommentsType } from "../../store/slice/posts/postsTypes";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";

interface IComment {
  comment: CommentsType;
}

export const Comment = memo(({ comment }: IComment) => {
  const { date, text, userName } = comment;

  const commentTime = useMemo(() => {
    return calculateTimeElapsed(new Date(date));
  }, []);
  return (
    <article className={styles.wrapper}>
      <header>
        <div className={styles.user}>
          <PersonPinIcon />
          <div>
            <h3 aria-label="Автор комментария">{userName}</h3>
            <time
              aria-label="Время комментария"
              className={styles.date}
              dateTime={commentTime}
            >
              {commentTime} назад
            </time>
          </div>
        </div>
      </header>
      <section className={styles.text} aria-label="Текст комментария">
        {text}
      </section>
    </article>
  );
});
