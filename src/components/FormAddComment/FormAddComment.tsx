import styles from "./FormAddComment.module.scss";
import React, { FC, useState, memo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { addComment } from "../../store/slice/posts/postsSlice";
import { addCommentById } from "../../store/slice/posts/postsThunk";
import { CommentsType, PostType } from "../../store/slice/posts/postsTypes";
import { selectDeviceInfo } from "../../store/slice/deviceInfo/deviceInfoSlice";
import { getCurrentDateTime } from "../../utils/getCurrentDateTime";
import { Button } from "../UI/Buttons/Button";
import { nanoid } from "nanoid";

interface IFormAddComment {
  post: PostType;
}

export const FormAddComment: FC<IFormAddComment> = memo(({ post }) => {
  const dispatch = useAppDispatch();
  const { country } = useSelector(selectDeviceInfo);

  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const [sendStatus, setSendStatus] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [textError, setTextError] = useState(false);

  const uniqueId = nanoid();

  const validateUserName = (name: string): boolean => {
    const isValid = name.length >= 2;
    if (!isValid) {
      setNameError(true);
    }
    return isValid;
  };

  const validateComment = (comment: string): boolean => {
    const isValid = comment.length > 9;
    if (!isValid) {
      setTextError(true);
    }
    return isValid;
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError(false);
    setTextError(false);

    const isValidName = validateUserName(userName);
    const isValidComment = validateComment(commentValue);

    if (isValidName && isValidComment) {
      setSendStatus(true);
      try {
        const newComment: CommentsType = {
          id: uniqueId,
          userName: userName,
          text: commentValue,
          date: getCurrentDateTime(),
          country: country || "Unknown",
        };

        const updatedPost: PostType = {
          ...post,
          comments: [...post.comments, newComment],
        };

        await dispatch(addCommentById({ id: post.id, post: updatedPost }));
        dispatch(addComment(newComment));

        setUserName("");
        setCommentValue("");
      } catch (error) {
        console.log(error);
        setSendStatus(false);
      }
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
});
