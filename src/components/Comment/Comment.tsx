import styles from "./Comment.module.scss";
import { FC, useMemo } from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { CommentsType } from "../../store/slice/posts/postsTypes";

interface IComment {
  comment: CommentsType;
}

export const Comment: FC<IComment> = ({ comment }) => {
  const { id, date, text, userName } = comment;

  const commentTime = useMemo(() => {
    return calculateTimeElapsed(new Date(date));
  }, []);
  return (
    <article className={styles.commentWrapper}>
      <header>
        <div className={styles.commentUser}>
          <PersonPinIcon />
          <div>
            <h3 aria-label="Автор комментария">{userName}</h3>
            <time
              aria-label="Время комментария"
              className={styles.commentDate}
              dateTime={commentTime}
            >
              {commentTime} назад
            </time>
          </div>
        </div>
      </header>
      <section className={styles.commenText} aria-label="Текст комментария">
        {text}
      </section>
    </article>
  );
};
