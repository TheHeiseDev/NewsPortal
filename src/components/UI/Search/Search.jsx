import React, { useCallback, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.scss";
import { debounce } from "../../../utils/debounce";
import { useAppDispatch } from "../../../store/store";
import { fetchFeedPosts } from "../../../store/slice/newsfeedSlice/newsfeedThunk";
import { removeFeedItems } from "../../../store/slice/newsfeedSlice/newsfeedSlice";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const searchRef = useRef(null);

  // Loading delay when searching, search is performed (500 ms) after input is paused
  const updateSearchValue = useCallback(
    debounce((str) => {
      const params = { search: str };
      dispatch(removeFeedItems());
      dispatch(fetchFeedPosts(params));
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    // Проверка на пробелы, если пользователь просто ввел пробел или два пробела, то запрос не будет уходить
    if (event.target.value.trim().length > 0) {
      setSearchValue(event.target.value);
      updateSearchValue(event.target.value);
    }
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
};
