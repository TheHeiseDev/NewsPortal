import styles from "./PostList.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Pagination } from "@mui/material";
import { StatusEnum } from "../../store/slice/postsSlice/postsTypes";
import { selectPosts } from "../../store/slice/postsSlice/postsSlice";
import { fetchPosts } from "../../store/slice/postsSlice/postsThunk";
import { useAppDispatch } from "../../store/store";
import { Post } from "../Post/Post";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { data, status } = useSelector(selectPosts);

  useEffect(() => {
    const params = {
      page: page,
      limit: 5,
    };
    dispatch(fetchPosts(params));
  }, [page]);

  const setPageHandle = (number) => {
    window.scrollTo(0, 700);
    setPage(number);
    // dispatch(setCurrentPage(page));
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
            data.map((post) => <Post  key={post.id} post={post} />)
          )}

          {status === StatusEnum.success && data.length > 0 && (
            <Pagination
              color="secondary"
              variant="outlined"
              page={page}
              count={5}
              className={styles.catalogPagination}
              onChange={(_, num) => setPageHandle(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
