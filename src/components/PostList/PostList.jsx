import React, { useEffect, useState } from "react";
import styles from "./PostList.module.scss";
import { Post } from "components/Post/Post";
import { Pagination } from "@mui/material";

export const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = new URL(
      `https://6440faa3792fe886a89abbd7.mockapi.io/posts?page=${page}&limit=5`
    );

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        alert(error);
      });
  }, [page]);

  const handleSetPage = (number) => {
    // smoothScroll(100);
    // dispatch(setCurrentPage(page));
    window.scrollTo(0, 700);
    setPage(number);
    setCurrentPage(number);
  };

  return (
    <div className={styles.posts}>
      <div className={styles.containerMini}>
        <h1>Лента новостей</h1>
        <div className={styles.postsWrapper}>
          {posts.map((post) => (
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
