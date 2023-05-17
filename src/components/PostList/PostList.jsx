import React from "react";
import styles from "./PostList.module.scss";
import { Post } from "components/Post/Post";

export const PostList = () => {
  return (
    <div className={styles.posts}>
      <div className={styles.containerMini}>
        <div className={styles.postsWrapper}>
          <Post />
        </div>
      </div>
    </div>
  );
};
