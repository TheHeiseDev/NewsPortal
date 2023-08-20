import styles from "./Newsfeed.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useAppDispatch } from "../../store/store";
import { StatusEnum } from "../../store/slice/posts/postsTypes";
import { ParamsType } from "../../store/slice/newsfeed/newsfeedTypes";
import {
  fetchFeedMaxPage,
  fetchFeedPosts,
} from "../../store/slice/newsfeed/newsfeedThunk";
import {
  removeFeedItems,
  selectFeedPosts,
  setMaxPage,
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

  const { data, status, maxPage } = useSelector(selectFeedPosts);
  const [categoryValue, setCategoryValue] = useState("");
  const [page, setPage] = useState(0);
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
    if (isMount) {
      navigate(`/newsfeed?category=${categoryValue}`);
    }
    setIsMount(true);
  }, [categoryValue]);

  useEffect(() => {
    dispatch(removeFeedItems());
    setPage(1);
  }, [categoryValue]);

  useEffect(() => {
    dispatch(fetchFeedMaxPage(categoryValue));
  }, [categoryValue]);

  // Fetch data
  useEffect(() => {
    const searchParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    let paramsUrl: ParamsType = {
      page: page,
      limit: 5,
      search: `*${searchValue}*`,
      sortBy: "-date",
    };

    if (searchParams.category) {
      setCategoryValue(String(searchParams.category));

      paramsUrl = {
        page: page,
        limit: 5,
        category: categoryValue,
        sortBy: "-date",
      };
    }
    if (searchParams.search) {
      setSearchValue(String(searchParams.search));
      // fixes the bug, best not to touch it, otherwise we stumble on repeated requests
      dispatch(setMaxPage(1));
      paramsUrl = {
        page: page,
        limit: 5,
        search: `*${searchValue}*`,
        sortBy: "-date",
      };
    }
    dispatch(fetchFeedPosts(paramsUrl));
  }, [categoryValue, page, dispatch]);

  useEffect(() => {
    if (isMount) {
      navigate(`/newsfeed?search=${searchValue}`);
    }
    setIsMount(true);
  }, [searchValue]);
  // Implementation of the functionality by which the page switching occurs,
  // after which there is a request to the server and we get the following 5 posts
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page <= maxPage) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    // ! WARNING: If we delete this code, there will be problems with the intersection observer.
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
