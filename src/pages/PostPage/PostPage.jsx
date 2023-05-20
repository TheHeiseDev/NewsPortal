import React, { useEffect, useMemo, useState } from "react";
import styles from "./PostPage.module.scss";
import { calculateTimeElapsed } from "../../utils/calculateTimeElapsed";
import { useFormatDate } from "../../hooks/useFormatDate";
import { MainLayout } from "../../layout/MainLayout";
import LinkIcon from "@mui/icons-material/Link";
import { ShareFacebook } from "../../components/UI/Buttons/ShareFacebook";
import { ShareTwitter } from "../../components/UI/Buttons/ShareTwitter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Comment } from "../../components/Comment/Comment";

const post = {
  id: "1",
  title: "Revue — сервис для создания красивой новостной рассылки",
  description:
    "Монетизируйте лояльную аудиторию с помощью цифровых подписок, спонсорства, рекламы или других бизнес-моделей.  Вы отбираете материалы, Revue делает отличную подачу.  Начните автономную подписку на информационную рассылку с помощью универсального решения для членства или добавьте информационные бюллетени в свой пакет подписки.  Сервисом уже пользуются такие компании как: The New York Times, Vox Media, Schaffhauser Nachrichten, FastCompany и другие. ",
  imageUrl: "https://i.ibb.co/170LNtL/1.webp",
  views: 0,
  comments: [],
  date: "2023-05-18T14:40:00",
  category: "useful_services",
  link: "https://www.getrevue.co",
};
const comments = [
  {
    id: 1,
    date: "2023-05-18T11:40:00",
    userName: "Edgar",
    text: "Интересная статья, недавно только об этом общались с коллегами."
  },
  {
    id: 2,
    date: "2023-05-18T15:40:00",
    userName: "Anna",
    text: "Что люди только не делают ради хайпа дурного. Поделюсь статьей, может кому интересно будет"
  }
]

export const PostPage = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const postTime = useMemo(() => {
    return calculateTimeElapsed(new Date(post.date));
  }, []);
  const postData = useFormatDate(post.date);
  console.log(currentUrl);

  useEffect(() => {
    const url = window.document.location.href;
    setCurrentUrl((prev) => (prev = url));
  }, []);
  return (
    <MainLayout>
      <div className={styles.postPage}>
        <div className={styles.container}>
          <div className={styles.postPageWrapper}>
            <article className={styles.postArticle}>
              {/* Дата информация */}
              <div className={styles.postDate}>
                <div>Опубликовано: {postData}</div>
                <span>{postTime}</span>
              </div>
              {/* Заголовок поста */}
              <h3 className={styles.postTitle}>{post.title}</h3>
              {/* Картинка поста */}
              <div className={styles.postImage}>
                <img src={post.imageUrl} alt="post image" />
              </div>
              {/* Ссылка на ресурс */}
              <div className={styles.postLink}>
                <LinkIcon />
                <a href={post.link}>Ссылка на ресурс</a>
              </div>

              {/* Описание поста */}
              <div className={styles.descroptionContainer}>
                <p className={styles.postDescription}>{post.description}</p>
              </div>
              <div className={styles.sharedContainer}>
                <div className={styles.postShared}>
                  <span>Поделиться: </span>
                  <ShareFacebook currentUrl={currentUrl} />
                  <ShareTwitter currentUrl={currentUrl} />
                </div>
                <div className={styles.postActions}>
                  <FavoriteBorderIcon />
                  {/* <FavoriteIcon /> */}
                </div>
              </div>
            </article>
            <section className={styles.commentsContainer}>
              <h2>Комментарии</h2>
             {
              comments.length > 0 && comments.map(comment => (
              <Comment key={comment.id} comment={comment}/>
              ))
             }
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
