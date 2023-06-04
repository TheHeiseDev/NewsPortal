import styles from "./Post.module.scss";
import { FC, useEffect, useMemo, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ClassIcon from "@mui/icons-material/Class";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { useFormatDate } from "../../hooks/useFormatDate";
import { Link } from "react-router-dom";
import { PostType } from "../../store/slice/postsSlice/postsTypes";
import { CategoryEnum } from "../../utils/constants/categoryItem";
import { useIPInfo } from "../../hooks/useIpInfo";
import { useAppDispatch } from "../../store/store";
import { fetchDeleteLike, fetchLikedPost } from "../../store/slice/postsSlice/postsThunk";
import { deleteLikePost, likedPost } from "../../store/slice/postsSlice/postsSlice";
import { CircularProgress } from "@mui/material";

interface IPost {
  post: PostType;
}

export const Post: FC<IPost> = ({ post }) => {
  const postData = useFormatDate(post);

  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, []);

  const setCategoryName = (categoryValue: string) => {
    if (categoryValue === CategoryEnum.it_news) {
      return "Новости ИТ";
    }
    if (categoryValue === CategoryEnum.ai) {
      return "AI";
    }
    if (categoryValue === CategoryEnum.useful_services) {
      return "Полезные ресуры";
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <Link to={`/posts/${post.id}`}>
          <div className={styles.postImage}>
            <img src={post.imageUrl} alt="post image" />
          </div>
        </Link>

        <article className={styles.postArticle}>
          <div className={styles.postDate}>
            Опубликовано: {postData}
            <span>{postTime}</span>
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className={styles.postBody}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <div className={styles.descroptionContainer}>
                <p className={styles.postDescription}>{post.description}</p>
              </div>
            </div>
          </Link>
          <div className={styles.postDataContainer}>
            <div className={styles.postData}>
              <div className={styles.views}>
                <RemoveRedEyeIcon />
                {post.views}
              </div>
              <div className={styles.commnets}>
                <ChatBubbleOutlineIcon />
                {post.comments.length}
              </div>
              <div className={styles.category}>
                <ClassIcon />
                {setCategoryName(post.category)}
              </div>
            </div>

            <button className={styles.dataActions}>
              <div className={styles.likedCount}>{post.likes.length}</div>
              <FavoriteIcon />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
