import React from "react";
import styles from "./Post.module.scss";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postImage}>
          <img src={post.imageUrl} alt="post image" />
        </div>
        <article className={styles.postArticle}>
          <div className={styles.postDate}>
            Опубликовано: {post.date}г.
            <span>1 мин.</span>
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
