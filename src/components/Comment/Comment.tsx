import styles from "./Comment.module.scss";
import { FC, useMemo } from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";

interface IComment {
  comment: {
    id: string;
    date: string;
    text: string;
    userName: string;
  };
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
            <h3>{userName}</h3>
            <time className={styles.commentDate} dateTime={commentTime}>
              {commentTime} назад
            </time>
          </div>
        </div>
      </header>
      <p className={styles.commenText}>{text}</p>
    </article>
  );
};
