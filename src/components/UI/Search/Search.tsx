import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.scss";
import { debounce } from "../../../utils/debounce";
import { useAppDispatch } from "../../../store/store";
import { fetchFeedPosts } from "../../../store/slice/newsfeed/newsfeedThunk";
import { removeFeedItems } from "../../../store/slice/newsfeed/newsfeedSlice";
import { useNavigate } from "react-router-dom";

interface ISearch {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const Search = React.memo(({ searchValue, setSearchValue }: ISearch) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  // Loading delay when searching, search is performed (1000 ms) after input is paused
  const updateSearchValue = useCallback(
    debounce((str) => {
      if (str !== " " && str !== "  " && str !== "") {
        const params = {
          description: `*${str}*`,
          sortBy: "date",
        };
        dispatch(removeFeedItems());
        dispatch(fetchFeedPosts(params));
      } else {
        const paramsUrl = {
          page: 1,
          limit: 5,
          sortBy: "-date",
        };
     
        dispatch(removeFeedItems());
        navigate(`/newsfeed?page=1&limit=5&category=all&sortBy=-date`);
        dispatch(fetchFeedPosts(paramsUrl));
   
      }
    }, 1000),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchValue(value);
    updateSearchValue(value);
  };

  const onClickClear = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
    setSearchValue("");
    updateSearchValue("");
  };
  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        ref={searchRef}
        value={searchValue}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск..."
      />
      <button onClick={onClickClear}>x</button>
    </div>
  );
});
