import styles from "./PostList.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StatusEnum } from "../../store/slice/posts/postsTypes";
import { selectPosts } from "../../store/slice/posts/postsSlice";
import { fetchPosts } from "../../store/slice/posts/postsThunk";
import { useAppDispatch } from "../../store/store";
import { Post } from "../Post/Post";
import { CircularProgress, Pagination } from "@mui/material";
import qs from "qs";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, status, totalPages } = useSelector(selectPosts);

  useEffect(() => {
    const searchParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    navigate(
      `?page=${searchParams.page}&limit=${searchParams.limit}&sortBy=${searchParams.sortBy}`
    );

    const params = {
      page: Number(searchParams.page) ? Number(searchParams.page) : page,
      limit: Number(searchParams.limit) ? Number(searchParams.limit) : 5,
      sortBy: String(searchParams.sortBy) ? String(searchParams.sortBy) : "-date",
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
              count={totalPages}
              className={styles.catalogPagination}
              onChange={(_, num) => setPageHandle(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
