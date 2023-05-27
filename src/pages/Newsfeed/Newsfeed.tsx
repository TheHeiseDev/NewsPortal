import { useSelector } from "react-redux";
import { MainLayout } from "../../layout/MainLayout";
import styles from "./Newsfeed.module.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { Post } from "../../components/Post/Post";
import { CategoryButton } from "../../components/UI/Buttons/CategoryButton/CategoryButton";
import { StatusEnum } from "../../store/slice/postsSlice/postsTypes";
import { CircularProgress } from "@mui/material";
import {
  fetchFeedMaxPage,
  fetchFeedPosts,
} from "../../store/slice/newsfeedSlice/newsfeedThunk";
import {
  removeFeedItems,
  selectFeedPosts,
} from "../../store/slice/newsfeedSlice/newsfeedSlice";
import loadinGif from "../../assets/loading3.gif";
import { categoryItem } from "../../utils/constants/categoryItem";
import { Search } from "../../components/UI/Search/Search";

export const Newsfeed = () => {
  const dispatch = useAppDispatch();
  const { data, status, maxPage } = useSelector(selectFeedPosts);
  //
  const [categoryValue, setCategoryValue] = useState("");
  const [page, setPage] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(removeFeedItems());
    };
  }, []);

  useEffect(() => {
    dispatch(removeFeedItems());
    setPage(1);
  }, [categoryValue]);

  useEffect(() => {
    dispatch(fetchFeedMaxPage(categoryValue));
  }, [dispatch, categoryValue]);

  useEffect(() => {
    if (categoryValue === "") {
      const params = { page: page, limit: 5, category: categoryValue };
      dispatch(fetchFeedPosts(params));
    }

    if (categoryValue !== "") {
      const params = { page: page, limit: 5, category: categoryValue };
      dispatch(fetchFeedPosts(params));
    }
  }, [categoryValue, page]);

  //Implementation of the functionality by which the page switching occurs,
  //after which there is a request to the server and we get the following 5 posts
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page <= maxPage) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    // WARNING: If we delete this code, there will be problems with the intersection observer.
    // Requests to the server will be sent even if we finish loading all elements of the array
    return () => {
      observer.current?.disconnect();
    };
  }, [page, maxPage]);

  // Observer logic
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    const postNodes = document.querySelectorAll(".post");
    if (postNodes.length > 0) {
      observer.current && observer.current.observe(postNodes[postNodes.length - 1]);
    }
  }, [data]);

  return (
    <MainLayout>
      <div className={styles.newsfeed}>
        <div className={styles.container}>
          <Search/>
          <div className={styles.filtersContainer}>
            {categoryItem.map((element) => (
              <CategoryButton
                key={element.category}
                title={element.title}
                bgColor={element.bgColor}
                callback={() => setCategoryValue(element.category)}
                Image={element.Image}
              />
            ))}
          </div>
        </div>

        {!data && status === StatusEnum.loading ? (
          <div className={styles.postLoadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.newsfeedWrapper}>
              <div className={styles.postsContainer}>
                {data &&
                  data.map((post) => (
                    <div key={post.id} className="post">
                      <Post post={post} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {status === StatusEnum.loading && data && (
          <div className={styles.observerLoadingContainer}>
            <img src={loadinGif} alt="loading" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};
