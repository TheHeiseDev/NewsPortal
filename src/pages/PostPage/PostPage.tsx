import styles from "./PostPage.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  fetchDeleteLike,
  fetchLikedPost,
  fetchPostById,
  fetchUpViewCounts,
} from "../../store/slice/postsSlice/postsThunk";
import { PostType, StatusEnum } from "../../store/slice/postsSlice/postsTypes";
import {
  deleteLikePost,
  likedPost,
  removeItem,
  selectPost,
  selectPostStatus,
} from "../../store/slice/postsSlice/postsSlice";

import { CircularProgress } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkIcon from "@mui/icons-material/Link";

import { MainLayout } from "../../layout/MainLayout";
import { ImageModal } from "../../components/UI/Modal/ImageModal";
import { ShareFacebook } from "../../components/UI/Buttons/ShareFacebook";
import { ShareTwitter } from "../../components/UI/Buttons/ShareTwitter";
import { Comment } from "../../components/Comment/Comment";

import { useTitle } from "../../hooks/useTitle";
import { useFormatDate } from "../../hooks/useFormatDate";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { FormAddComment } from "../../components/FormAddComment/FormAddComment";
import { useIPInfo } from "../../utils/getIpAdress";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const post = useSelector(selectPost);
  const status = useSelector(selectPostStatus);
  const [currentUrl, setCurrentUrl] = useState("");

  // ! LIKE
  const { ipAddress, country } = useIPInfo();
  const [liked, setLiked] = useState(false);
  const [likedLoadingStatus, setLikedLoadingStatus] = useState(false);

  const likedPostHandle = async (post: PostType) => {
    setLikedLoadingStatus(true);
    try {
      const liked = {
        ip: ipAddress,
        country: country || "",
      };

      const updatePost = {
        ...post,
        likes: [...post.likes, liked],
      };
      dispatch(fetchLikedPost({ id: post.id, post: updatePost })).then(
        (response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(likedPost(liked));
            setLikedLoadingStatus(false);
          }
        }
      );
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const deleteLikeHandle = async (post: any) => {
    setLikedLoadingStatus(true);
    try {
      const updatePost = {
        ...post,
        likes: post.likes.filter((like: any) => like.ip !== ipAddress),
      };

      dispatch(fetchDeleteLike({ id: post.id, post: updatePost })).then(
        (response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(deleteLikePost(ipAddress));
            setLikedLoadingStatus(false);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLikedLoadingStatus(true);

    const checkLiked = async () => {
      if (ipAddress) {
        function checkLikesByIp() {
          if (post && post.likes.some((like: any) => like.ip === ipAddress)) {
            return true;
          }
          return false;
        }
        setLiked((prev) => (prev = checkLikesByIp()));
        setLikedLoadingStatus(false);
      }
    };
    checkLiked();
  }, [ipAddress, post, liked]);

  // ! LIKE

  const postTime = useMemo(() => {
    const date = post ? new Date(post.date) : "";
    return calculateTimeElapsed(date);
  }, [post]);

  let postData = useFormatDate(post);

  // set the current page title
  useTitle(post ? post.title : "");

  // fetch post by ID
  useEffect(() => {
    dispatch(fetchPostById(String(id)));
  }, [id]);

  // Actions when mounting and unmounting a component
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(removeItem());
    };
  }, []);

  // The logic of counting post views
  useEffect(() => {
    if (id) {
      // TODO change name
      dispatch(fetchUpViewCounts(id));
    }
  }, [id]);

  // Get the current url address. We need the facebook and twitter share buttons to work correctly
  useEffect(() => {
    const url = window.document.location.href;
    setCurrentUrl((prev) => (prev = url));
  }, []);

  if (!post) {
    return (
      <MainLayout>
        <div className={styles.postLoadingContainer}>
          <CircularProgress />
        </div>
      </MainLayout>
    );
  }

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
                  <div className={styles.linkContainer}>
                    <LinkIcon />
                    <a target="_blank" href={post.link}>
                      Ссылка на ресурс
                    </a>
                  </div>
                  <div className={styles.viewContainer}>
                    <RemoveRedEyeIcon />
                    {post.views}
                  </div>
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
                    <div className={styles.likedCount}>{post.likes.length}</div>
                    {likedLoadingStatus ? (
                      <CircularProgress />
                    ) : !liked ? (
                      <FavoriteBorderIcon onClick={() => likedPostHandle(post)} />
                    ) : (
                      <FavoriteIcon onClick={() => deleteLikeHandle(post)} />
                    )}
                  </div>
                </div>
              </article>
              <section className={styles.commentsContainer}>
                <h2>Добавить комментарий</h2>
                <FormAddComment post={post} />

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
