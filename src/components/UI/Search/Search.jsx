import React, { useCallback, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.scss";
import { debounce } from "../../../utils/debounce";
import { useAppDispatch } from "../../../store/store";
import { fetchFeedPosts } from "../../../store/slice/newsfeedSlice/newsfeedThunk";
import { removeFeedItems } from "../../../store/slice/newsfeedSlice/newsfeedSlice";

export const Search = React.memo(() => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);

  // Loading delay when searching, search is performed (1000 ms) after input is paused
  const updateSearchValue = useCallback(
    debounce((str) => {
      if (str !== " " && str !== "  ") {
        const params = { search: str, sortBy: "date", order: "desc" };
        dispatch(removeFeedItems());
        dispatch(fetchFeedPosts(params));
      }
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    updateSearchValue(value);
  };

  const onClickClear = () => {
    searchRef.current.focus();
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
