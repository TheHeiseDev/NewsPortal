import { useMemo } from "react";
import { useFormatDate } from "../../hooks/useFormatDate";
import styles from "./Comment.module.scss";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";

export const Comment = ({ comment }) => {
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
            <time className={styles.commentDate} datetime={commentTime}>
              {commentTime} назад
            </time>
          </div>
        </div>
      </header>
      <p className={styles.commenText}>{text}</p>
    </article>
  );
};
