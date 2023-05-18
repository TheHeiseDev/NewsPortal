import styles from "./Post.module.scss";
import { useMemo } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useFormatDate } from "components/hooks/useFormatDate";
import { calculateTimeElapsed } from "utils/calculateTimeElapsed";

export const Post = ({ post }) => {
  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, []);
  const postData = useFormatDate(post.date);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postImage}>
          <img src={post.imageUrl} alt="post image" />
        </div>
        <article className={styles.postArticle}>
          <div className={styles.postDate}>
            Опубликовано: {postData}
            <span>{postTime}</span>
          </div>
          <div className={styles.postBody}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.descroptionContainer}>
              <p className={styles.postDescription}>{post.description}</p>
            </div>
          </div>

          <div className={styles.postDataContainer}>
            <div className={styles.postData}>
              <div className={styles.views}>
                {post.views} <span>просмотров</span>
              </div>
              <div className={styles.commnets}>
                {post.comments.length} <span>комментариев</span>
              </div>
            </div>
            <div className={styles.dataActions}>
              <FavoriteBorderIcon />
              {/* <FavoriteIcon /> */}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
