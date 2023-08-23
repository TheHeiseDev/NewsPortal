import styles from "./Newsfeed.module.scss";
import { useEffect, useState } from "react";
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
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const Newsfeed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useTitle("Лента новостей");

  const { data, status, totalPages } = useSelector(selectFeedPosts);
  const [categoryValue, setCategoryValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMount, setIsMount] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(removeFeedItems());
    };
  }, []);

  useEffect(() => {
    dispatch(removeFeedItems());
    if (isMount) {
      navigate(`/newsfeed?category=${categoryValue}&sortBy=-date`);
    }
    setCurrentPage(1);
    setIsMount(true);
  }, [categoryValue]);

  useEffect(() => {
    if (isMount) {
      navigate(`/newsfeed?search=${searchValue}`);
    }
    setCurrentPage(1);
    setIsMount(true);
  }, [searchValue]);

  // Fetch data
  useEffect(() => {
    const searchParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const { category, search } = searchParams;
    console.log(currentPage)
    const paramsUrl = {
      page: currentPage,
      limit: 5,
      sortBy: "-date",
      ...(category && { category: String(category) }),
      ...(categoryValue && { category: categoryValue }),
      ...(search && {
        description: `*${search}*`,
        page: currentPage,
        limit: 5,
        sortBy: "-date",
      }),
    };

    dispatch(fetchFeedPosts(paramsUrl));
  }, [categoryValue, currentPage]);

  // Implementation of the functionality by which the page switching occurs,
  // after which there is a request to the server and we get the following 5 posts
  useIntersectionObserver(currentPage, totalPages, data, "post", setCurrentPage);

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
