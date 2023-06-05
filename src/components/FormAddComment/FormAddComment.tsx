import { useIPInfo } from "../../hooks/useIpInfo";
import { addComment } from "../../store/slice/postsSlice/postsSlice";
import { addCommentById } from "../../store/slice/postsSlice/postsThunk";
import { CommentsType, PostType } from "../../store/slice/postsSlice/postsTypes";
import { useAppDispatch } from "../../store/store";
import { getCurrentDateTime } from "../../utils/getCurrentDateTime";
import { Button } from "../UI/Buttons/Button";
import styles from "./FormAddComment.module.scss";
import React, { FC, useState } from "react";
import {nanoid} from "nanoid";

interface IFormAddComment {
  post: PostType;
}

export const FormAddComment: FC<IFormAddComment> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { country } = useIPInfo();

  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [sendStatus, setSendStatus] = useState(false);  
  const [nameError, setNameError] = useState(false);
  const [textError, setTextError] = useState(false);
  // @ts-ignore
  const uniqueId = nanoid();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameError(false);
    setTextError(false);

    const newComment: CommentsType = {
      id: uniqueId,
      userName: userName,
      text: commentValue,
      date: getCurrentDateTime(),
      country: country,
    };
    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };
    if (userName.length >= 2) {
      if (commentValue.length > 9) {
        setSendStatus(true);
        await dispatch(addCommentById({ id: post.id, post: updatedPost }))
          .then(() => dispatch(addComment(newComment)))
          .finally(() => setSendStatus(false));
        setUserName("");
        setCommentValue("");
      } else {
        setTextError(true);
      }
    } else {
      setNameError(true);
    }
  };

  return (
    <div className={styles.addComment}>
      <div className={styles.container}>
        <div className={styles.addCommentWrapper}>
          <form onSubmit={onSubmitHandler}>
            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              type="text"
              placeholder="Введите имя"
              required
            />
            {nameError && <label>Минимальная длина имени 2 символа</label>}
            <textarea
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
              rows={2}
              placeholder="Комментарий..."
              required
            />
            {textError && <label>Минимальная длина комментария 10 символов</label>}
            <Button loading={sendStatus} type="submit">
              Добавить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
