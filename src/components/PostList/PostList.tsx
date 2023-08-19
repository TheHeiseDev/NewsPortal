import styles from "./PostList.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Pagination } from "@mui/material";
import { StatusEnum } from "../../store/slice/posts/postsTypes";
import { selectPosts } from "../../store/slice/posts/postsSlice";
import { fetchPages, fetchPosts } from "../../store/slice/posts/postsThunk";
import { useAppDispatch } from "../../store/store";
import { Post } from "../Post/Post";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { data, status, pages } = useSelector(selectPosts);

  useEffect(() => {
    if (!pages) {
      dispatch(fetchPages());
    }
  }, [pages]);

  useEffect(() => {
    const params = {
      page: page,
      limit: 5,
      sortBy: "-date",
    };
    dispatch(fetchPosts(params));
  }, [page]);

  const setPageHandle = (number: number) => {
    window.scrollTo(0, 700);
    setPage(number);
  };

  return (
    <div className={styles.posts}>
      <div className={styles.containerMini}>
        <h1>Лента новостей</h1>

        <div className={styles.postsWrapper}>
          {status === StatusEnum.loading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
          ) : status === StatusEnum.error ? (
            <h2>Произошла ошибка при получении данных из сервера</h2>
          ) : (
            data?.map((post) => <Post key={post.id} post={post} />)
          )}

          {status === StatusEnum.success && data && data.length > 0 && (
            <Pagination
              color="secondary"
              variant="outlined"
              page={page}
              count={pages ? pages : 1}
              className={styles.catalogPagination}
              onChange={(_, num) => setPageHandle(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
