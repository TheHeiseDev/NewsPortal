import styles from "./NewsSelection.module.scss";
import { memo } from "react";
import { News } from "../News/News";
import { PostType, StatusEnum } from "../../../../store/slice/posts/postsTypes";
import { CircularProgress as Loader } from "@mui/material";

interface INewsSelection {
  posts: PostType[] | null;
  status: StatusEnum;
}
export const NewsSelection = memo(({ posts, status }: INewsSelection) => {
  if (!posts) {
    return null;
  }
  return (
    <div className={styles.newsSelection}>
      <h3 className={styles.title}>Читайте также</h3>

      <section className={styles.container}>
        {status === StatusEnum.loading && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        {status === StatusEnum.error && <h3>Ошибка при получении данных</h3>}
        {status === StatusEnum.success &&
          posts?.map((post) => <News key={post.id} post={post} />)}
      </section>
    </div>
  );
});
