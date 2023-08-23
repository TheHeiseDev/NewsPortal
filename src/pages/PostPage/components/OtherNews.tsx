import styles from "./OtherNews.module.scss";
import { PostType } from "../../../store/slice/posts/postsTypes";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { setCategoryName } from "../../../utils/setCategoryName";
import { Link } from "react-router-dom";

interface IOtherNews {
  post: PostType;
}
export const OtherNews = ({ post }: IOtherNews) => {
  const normalizeDate = useFormatDate(post);

  return (
    <article className={styles.news}>
      <Link to={`/posts/${post.id}`}>
      <div className={styles.container}>

          <header>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.description}>{post.description}</p>

            <div className={styles.dataContainer}>
              <span className={styles.category}>{setCategoryName(post.category)}</span>
              <time className={styles.date}>{normalizeDate}</time>
            </div>
          </header>

        <div className={styles.content}>
          <img src={post.imageUrl} alt="Описание картинки" className={styles.image} />
        </div>
      </div>
      </Link>
    </article>
  );
};
