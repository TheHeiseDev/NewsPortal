import styles from "./Post.module.scss";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PostType } from "../../store/slice/posts/postsTypes";
import { useFormatDate } from "../../hooks/useFormatDate";

import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import CategoryIcon from "@mui/icons-material/Class";
import LikeIcon from "@mui/icons-material/Favorite";

import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { setCategoryName } from "../../utils/setCategoryName";

interface IPost {
  post: PostType;
}

export const Post = ({ post }: IPost) => {
  const postData = useFormatDate(post);

  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, [post]);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postImage}>
          <Link to={`/posts/${post.id}`}>
            <img src={post.imageUrl} alt="post" />
          </Link>
        </div>

        <article className={styles.postArticle}>
          <time className={styles.postDate}>
            Опубликовано: {postData}
            <span>{postTime}</span>
          </time>
          <Link to={`/posts/${post.id}`}>
            <div className={styles.postBody}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <div className={styles.descroptionContainer}>
                <p className={styles.postDescription}>{post.description}</p>
              </div>
            </div>
          </Link>
          <div className={styles.postDataContainer}>
            <div className={styles.postData}>
              <div className={styles.views}>
                <ViewIcon />
                {post.views}
              </div>
              <div className={styles.commnets}>
                <CommentIcon />
                {post.comments?.length}
              </div>
              <div className={styles.category}>
                <CategoryIcon />
                {setCategoryName(post.category)}
              </div>
            </div>

            <div className={styles.dataActions}>
              <div className={styles.likedCount}>{post.likes.length}</div>
              <LikeIcon />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
