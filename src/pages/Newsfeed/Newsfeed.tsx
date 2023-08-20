import styles from "./Newsfeed.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useAppDispatch } from "../../store/store";
import { StatusEnum } from "../../store/slice/posts/postsTypes";
import { fetchFeedPosts } from "../../store/slice/newsfeed/newsfeedThunk";
import {
  removeFeedItems,
  selectFeedPosts,
} from "../../store/slice/newsfeed/newsfeedSlice";
import { MainLayout } from "../../layout/MainLayout";
import { Post } from "../../components/Post/Post";
import { Search } from "../../components/UI/Search/Search";
import { CategoryButton } from "../../components/UI/Buttons/CategoryButton/CategoryButton";
import { CircularProgress } from "@mui/material";
import loadinGif from "../../assets/loading3.gif";
import { useTitle } from "../../hooks/useTitle";
import { categoryItem } from "../../utils/constants/categoryItem";

const Newsfeed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useTitle("Лента новостей");

  const { data, status, totalPages } = useSelector(selectFeedPosts);
  const [categoryValue, setCategoryValue] = useState("");
  const [page, setPage] = useState(1);
  const [isMount, setIsMount] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(removeFeedItems());
    };
  }, []);

  useEffect(() => {
    dispatch(removeFeedItems());
    if (isMount) {
      navigate(`/newsfeed?category=${categoryValue}&sortBy=-data`);
    }
    setPage(1);
    setIsMount(true);
  }, [categoryValue]);

  useEffect(() => {
    if (isMount) {
      navigate(`/newsfeed?search=${searchValue}`);
    }
    setPage(1);
    setIsMount(true);
  }, [searchValue]);

  // Fetch d
  useEffect(() => {
    const searchParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const { category, search } = searchParams;
    console.log(categoryValue);
    const paramsUrl = {
      page: page,
      limit: 5,
      sortBy: "-date",
      ...(category && { category: String(category) }),
      ...(categoryValue && { category: categoryValue }),
      ...(search && {
        description: `*${search}*`,
        page: page,
        limit: 5,
        sortBy: "-date",
      }),
    };

    dispatch(fetchFeedPosts(paramsUrl));
  }, [categoryValue, page]);

  // Implementation of the functionality by which the page switching occurs,
  // after which there is a request to the server and we get the following 5 posts
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    // ! WARNING: If we delete this code, there will be problems with the intersection observer.
    // Requests to the server will be sent even if we finish loading all elements of the array
    return () => {
      observer.current?.disconnect();
    };
  }, [page, data]);
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
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
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

        {status === StatusEnum.loading && data?.length && (
          <div className={styles.observerLoadingContainer}>
            <img src={loadinGif} alt="loading" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default Newsfeed;
