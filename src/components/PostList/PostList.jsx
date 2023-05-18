import styles from "./PostList.module.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { fetchPosts } from "store/slice/postsSlice/postsThunk";
import { selectPosts } from "store/slice/postsSlice/postsSlice";
import { Post } from "components/Post/Post";
import { CircularProgress, Pagination } from "@mui/material";
import { StatusEnum } from "../../store/slice/postsSlice/postsTypes";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector(selectPosts);
  console.log(status);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page: page,
      limit: 5,
    };
    dispatch(fetchPosts(params));
  }, [page]);

  const handleSetPage = (number) => {
    // smoothScroll(100);
    // dispatch(setCurrentPage(page));
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
            data.map((post) => <Post key={post.id} post={post} />)
          )}

          {status === StatusEnum.success && data.length > 0 && (
            <Pagination
              color="secondary"
              variant="outlined"
              page={page}
              count={5}
              className={styles.catalogPagination}
              onChange={(_, num) => handleSetPage(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
