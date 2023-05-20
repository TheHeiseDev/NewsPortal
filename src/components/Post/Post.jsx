import styles from "./Post.module.scss";
import { useEffect, useMemo } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { useFormatDate } from "../../hooks/useFormatDate";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, []);
  const postData = useFormatDate(post);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postImage}>
          <img src={post.imageUrl} alt="post image" />
        </div>
        <Link to={`/posts/${post.id}`}>
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
        </Link>
      </div>
    </div>
  );
};
