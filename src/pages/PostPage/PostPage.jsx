import React, { useEffect, useMemo, useState } from "react";
import styles from "./PostPage.module.scss";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { useFormatDate } from "../../hooks/useFormatDate";
import { MainLayout } from "../../layout/MainLayout";
import LinkIcon from "@mui/icons-material/Link";
import { ShareFacebook } from "../../components/UI/Buttons/ShareFacebook";
import { ShareTwitter } from "../../components/UI/Buttons/ShareTwitter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Comment } from "../../components/Comment/Comment";
import { useAppDispatch } from "../../store/store";
import { fetchPostById } from "../../store/slice/postsSlice/postsThunk";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  removeItem,
  selectPost,
  selectPostStatus,
} from "../../store/slice/postsSlice/postsSlice";
import { CircularProgress } from "@mui/material";
import { StatusEnum } from "../../store/slice/postsSlice/postsTypes";
import { ImageModal } from "../../components/UI/Buttons/Modal/ImageModal";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const post = useSelector(selectPost);
  const status = useSelector(selectPostStatus);
  const [currentUrl, setCurrentUrl] = useState("");

  const postTime = useMemo(() => {
    const date = post ? new Date(post.date) : "";
    return calculateTimeElapsed(date);
  }, [post]);

  let postData = useFormatDate(post);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(removeItem());
    };
  }, []);

  useEffect(() => {
    const url = window.document.location.href;
    setCurrentUrl((prev) => (prev = url));
  }, []);

  useEffect(() => {
    dispatch(fetchPostById(String(id)));
  }, [id]);

  return (
    <MainLayout>
      {status === StatusEnum.loading ? (
        <div className={styles.postLoadingContainer}>
          <CircularProgress />
        </div>
      ) : status === StatusEnum.error ? (
        <div className={styles.postLoadingContainer}>
          <h1>Ошибка загрузки данных, попробуйте обновить страницу</h1>
        </div>
      ) : (
        <div className={styles.postPage}>
          <div className={styles.container}>
            <div className={styles.postPageWrapper}>
              <article className={styles.postArticle}>
                {/* Дата информация */}
                <div className={styles.postDate}>
                  <div>Опубликовано: {postData}</div>
                  <span>{postTime}</span>
                </div>
                {/* Заголовок поста */}
                <h3 className={styles.postTitle}>{post.title}</h3>
                {/* Картинка поста */}
                <div className={styles.postImage}>
                  <span className={styles.zoomIcon}>
                    <ZoomInIcon />
                  </span>
                  <ImageModal imageUrl={post.imageUrl} />
                </div>
                {/* Ссылка на ресурс */}
                <div className={styles.postLink}>
                  <LinkIcon />
                  <a target="_blank" href={post.link}>
                    Ссылка на ресурс
                  </a>
                </div>

                {/* Описание поста */}
                <div className={styles.descriptionContainer}>
                  <p className={styles.postDescription}>{post.description}</p>
                </div>
                <div className={styles.sharedContainer}>
                  <div className={styles.postShared}>
                    <span>Поделиться: </span>
                    <ShareFacebook currentUrl={currentUrl} />
                    <ShareTwitter currentUrl={currentUrl} />
                  </div>
                  <div className={styles.postActions}>
                    <FavoriteBorderIcon />
                    {/* <FavoriteIcon /> */}
                  </div>
                </div>
              </article>
              <section className={styles.commentsContainer}>
                <h2>Комментарии</h2>
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))
                ) : (
                  <span>Нет комментариев</span>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
