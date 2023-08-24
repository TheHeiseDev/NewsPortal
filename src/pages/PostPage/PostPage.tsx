import styles from "./PostPage.module.scss";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { fetchAllVisitByDate, fetchVisit } from "../../store/slice/visit/visitThunk";
import {
  fetchDeleteLike,
  fetchLikedPost,
  fetchPostById,
  fetchUpViewCounts,
} from "../../store/slice/posts/postsThunk";
import { selectDeviceInfo } from "../../store/slice/deviceInfo/deviceInfoSlice";
import { LikesType, PostType, StatusEnum } from "../../store/slice/posts/postsTypes";
import {
  deleteLikePost,
  likedPost,
  removeItem,
  selectPost,
  selectPostStatus,
} from "../../store/slice/posts/postsSlice";
import {
  selectNewsSelectionData,
  selectNewsSelectionStatus,
} from "../../store/slice/newsSelection/newsSelectionSlice";
import { fetchNewsSelection } from "../../store/slice/newsSelection/newsSelectionThunk";

import { CircularProgress as Loader } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkIcon from "@mui/icons-material/Link";

import { MainLayout } from "../../layout/MainLayout";
import { ImageModal } from "../../components/UI/Modal/ImageModal";
import { ShareFacebook } from "../../components/UI/Buttons/ShareFacebook";
import { ShareTwitter } from "../../components/UI/Buttons/ShareTwitter";
import { Comments } from "./components/Comments/Comments";
import { NewsSelection } from "./components/NewsSelection/NewsSelection";

import { useTitle } from "../../hooks/useTitle";
import { useFormatDate } from "../../hooks/useFormatDate";
import { useDeviceInfo } from "../../hooks/useDeviceInfo";

import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { getCurrentDate } from "../../utils/getCurrentDateTime";
import { checkVisitByDate } from "../../utils/checkVisitByDate";

const PAGE_NAME = "Страница";

const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const post = useSelector(selectPost);
  const postLoading = useSelector(selectPostStatus);
  const newsSelectionData = useSelector(selectNewsSelectionData);
  const newsSelectionStatus = useSelector(selectNewsSelectionStatus);
  const { ipAddress, country } = useSelector(selectDeviceInfo);

  const [liked, setLiked] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const [likedLoading, setLikedLoading] = useState(false);
  const [toogleFetchVisit, setToogleFetchVisit] = useState(false);

  const normalizePostDate = useFormatDate(post);
  const deviceInfo = useDeviceInfo();

  useTitle(post ? post.title : PAGE_NAME);

  const postTime = useMemo(() => {
    if (post) {
      const date = new Date(post.date);
      return calculateTimeElapsed(date);
    }
  }, [post]);

  const addLike = useCallback(
    async (post: PostType, ip: string, country: string) => {
      setLikedLoading(true);
      try {
        const liked = {
          ip,
          country,
        };
        const updatedPost: PostType = { ...post, likes: [...post.likes, liked] };
        const data = { id: post.id, post: updatedPost };
        const { payload } = await dispatch(fetchLikedPost(data));

        if (payload) {
          dispatch(likedPost(liked));
          setLikedLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLikedLoading(false);
      }
    },
    [dispatch, setLikedLoading]
  );

  const likedHandle = useCallback(
    async (post: PostType) => {
      if (ipAddress && country) {
        await addLike(post, ipAddress, country);
      }
    },
    [ipAddress, country]
  );

  const deleteLike = useCallback(
    async (post: PostType, ip: string) => {
      setLikedLoading(true);
      try {
        const updatedLikesList: LikesType[] = post.likes.filter(
          (like: LikesType) => like.ip !== ip
        );
        const updatedPost: PostType = { ...post, likes: updatedLikesList };
        const data = { id: post.id, post: updatedPost };
        const { payload } = await dispatch(fetchDeleteLike(data));

        if (payload) {
          dispatch(deleteLikePost(ip));
          setLikedLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLikedLoading(false);
      }
    },
    [dispatch, deleteLikePost, setLikedLoading]
  );

  const unLikedHandle = useCallback(
    async (post: PostType) => {
      if (ipAddress) {
        await deleteLike(post, ipAddress);
      }
    },
    [ipAddress]
  );

  const checkTheLikes = useCallback((post: PostType, ip: string) => {
    if (post && ip) {
      const isLiked = post.likes.some((like: LikesType) => like.ip === ip);

      setLiked(isLiked);
      setLikedLoading(false);
    }
  }, []);

  // Get the current url address,  it need the facebook and twitter share buttons to work correctly
  useEffect(() => {
    window.scrollTo(0, 0);
    const url = window.document.location.href;
    setCurrentPageUrl(url);
  }, []);

  //Request the current post's visit log for the current date
  useEffect(() => {
    const getTheVisitLog = async (ip: string) => {
      const date = getCurrentDate();
      const { payload } = await dispatch(fetchAllVisitByDate(date));

      const checkingForUserVisits = checkVisitByDate(ip, payload); // return true or false
      setToogleFetchVisit(checkingForUserVisits);
    };
    if (ipAddress) {
      getTheVisitLog(ipAddress);
    }
  }, [ipAddress, dispatch]);

  useEffect(() => {
    setLikedLoading(true);

    if (post && ipAddress) {
      checkTheLikes(post, ipAddress);
    }
  }, [post, ipAddress]);

  // Getting post by ID and logic of post view counting
  useEffect(() => {
    dispatch(fetchPostById(Number(id)))
      .then(({ payload }) => payload as PostType)
      .then((post) => post.category)
      .then((category) => {
        if (category) {
          dispatch(fetchNewsSelection(category));
        }
      })
      .catch((error) => console.log(error));
    dispatch(fetchUpViewCounts(Number(id)));

    return () => {
      dispatch(removeItem());
    };
  }, [id, dispatch]);

  // Registering a user visit
  useEffect(() => {
    // toogleFetchVisit - This toggle switch is used to prevent re-registration of visits
    if (toogleFetchVisit) {
      const visitInfo = {
        date: getCurrentDate(),
        country: country || "unknown",
        ip: ipAddress || "unknown",
        device: deviceInfo.device,
        os: deviceInfo.os,
      };
      dispatch(fetchVisit(visitInfo));
    }
  }, [toogleFetchVisit, dispatch]);

  if (!post) {
    return (
      <MainLayout>
        <div className={styles.postLoadingContainer}>
          <Loader />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {postLoading === StatusEnum.loading && (
        <div className={styles.postLoadingContainer}>
          <Loader />
        </div>
      )}
      {postLoading === StatusEnum.error && (
        <div className={styles.postLoadingContainer}>
          <span>Ошибка загрузки данных, попробуйте обновить страницу</span>
        </div>
      )}
      {postLoading === StatusEnum.success && (
        <div className={styles.postPage}>
          <div className={styles.container}>
            <div className={styles.postPageWrapper}>
              <article className={styles.postArticle}>
                {/* Дата информация */}
                <time className={styles.postDate}>
                  <div>Опубликовано: {normalizePostDate}</div>
                  <span>{postTime}</span>
                </time>
                {/* Заголовок поста */}
                <h1 className={styles.postTitle}>{post.title}</h1>
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
                {/* Кнопки поделиться */}
                <div className={styles.sharedContainer}>
                  <div className={styles.postShared}>
                    <span>Поделиться: </span>
                    <ShareFacebook currentUrl={currentPageUrl} />
                    <ShareTwitter currentUrl={currentPageUrl} />
                  </div>
                  <div className={styles.postActions}>
                    <div className={styles.likedCount}>{post.likes.length}</div>
                    {likedLoading ? (
                      <Loader />
                    ) : liked ? (
                      <FavoriteIcon onClick={() => unLikedHandle(post)} />
                    ) : (
                      <FavoriteBorderIcon onClick={() => likedHandle(post)} />
                    )}
                  </div>
                </div>
              </article>

              <Comments post={post} />
              <NewsSelection posts={newsSelectionData} status={newsSelectionStatus} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
export default PostPage;
