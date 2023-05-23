import { addComment } from "../../store/slice/postsSlice/postsSlice";
import { addCommentById } from "../../store/slice/postsSlice/postsThunk";
import { CommentsType, PostType } from "../../store/slice/postsSlice/postsTypes";
import { useAppDispatch } from "../../store/store";
import { getCurrentDateTime } from "../../utils/getCurrentDateTime";
import { Button } from "../UI/Buttons/Button";
import styles from "./FormAddComment.module.scss";
import React, { FC, useState } from "react";

interface IFormAddComment {
  post: PostType;
}

export const FormAddComment: FC<IFormAddComment> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [sendStatus, setSendStatus] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendStatus(true);

    const newComment: CommentsType = {
      id: String(Date.now()),
      userName: userName,
      text: commentValue,
      date: getCurrentDateTime(),
    };
    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    await dispatch(addCommentById({ id: post.id, post: updatedPost }))
      .then(() => dispatch(addComment(newComment)))
      .finally(() => setSendStatus(false));
    setUserName("");
    setCommentValue("");
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
            <textarea
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
              rows={2}
              placeholder="Комментарий..."
              required
            />
            <Button loading={sendStatus} type="submit">Добавить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
