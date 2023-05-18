import styles from "./PostList.module.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { fetchPosts } from "store/slice/postsSlice/postsThunk";
import { selectPosts } from "store/slice/postsSlice/postsSlice";
import { Post } from "components/Post/Post";
import { Pagination } from "@mui/material";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector(selectPosts);
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

  if (!data) {
    return <h1>Нет постов</h1>;
  }

  return (
    <div className={styles.posts}>
      <div className={styles.containerMini}>
        <h1>Лента новостей</h1>

        <div className={styles.postsWrapper}>
          {data.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          <Pagination
            color="secondary"
            variant="outlined"
            page={page}
            count={5}
            className={styles.catalogPagination}
            onChange={(_, num) => handleSetPage(num)}
          />
        </div>
      </div>
    </div>
  );
};
