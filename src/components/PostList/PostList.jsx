import React, { useEffect, useState } from "react";
import styles from "./PostList.module.scss";
import { Post } from "components/Post/Post";
import { Pagination } from "@mui/material";

export const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleSetPage = (number) => {
    // smoothScroll(100);
    // dispatch(setCurrentPage(page));
    console.log(number);
    setCurrentPage((prev) => (prev = currentPage));
  };

  return (
    <div className={styles.posts}>
      <div className={styles.containerMini}>
        <div className={styles.postsWrapper}>
          <Post />
          <Post />
          <Post />
          <Pagination
            color="secondary"
            variant="outlined"
            page={currentPage}
            count={5}
            className={styles.catalogPagination}
            onChange={(_, num) => handleSetPage(num)}
          />
        </div>
      </div>
    </div>
  );
};
