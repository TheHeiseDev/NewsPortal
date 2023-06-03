const posts = [
  {
    id: "1",
    title: "Revue — сервис для создания красивой новостной рассылки",
    description:
      "Монетизируйте лояльную аудиторию с помощью цифровых подписок, спонсорства, рекламы или других бизнес-моделей.  Вы отбираете материалы, Revue делает отличную подачу.  Начните автономную подписку на информационную рассылку с помощью универсального решения для членства или добавьте информационные бюллетени в свой пакет подписки.  Сервисом уже пользуются такие компании как: The New York Times, Vox Media, Schaffhauser Nachrichten, FastCompany и другие. ",
    imageUrl: "https://i.ibb.co/170LNtL/1.webp",
    views: 59,
    likes: [],
    comments: [],
    date: "2023-04-18T14:40:00",
    category: "useful_services",
    link: "https://www.getrevue.co/",
  },
  {
    id: "2",
    title: "Speechactors — преобразование текста в речь на основе ИИ",
    description:
      " Это облачный инструмент для преобразования текста в речь на основе искусственного интеллекта.  Вы сможете быстро и легко превратить любой текст в естественную человеческую речь и мгновенно загрузите его в виде файла MP3.  3 простых шага: выбрать язык и голос, вставить или написать текст, скачать MP3. ",
    imageUrl: "https://i.ibb.co/pyf6qS6/2.png",
    views: 19,
    likes: [
      {
        ip: "176.59.54.252",
        country: "RU",
      },
      {
        ip: "177.59.54.252",
        country: "RU",
      },
      {
        ip: "178.59.54.252",
        country: "RU",
      },
    ],
    comments: [],
    date: "2023-05-16T14:40:00",
    category: "useful_services",
    link: "https://speechactors.com/",
  },
];

const post = {
  id: "10",
  title: "Пользователи ChatGPT Plus получили доступ к ChatGPT Browsing",
  description:
    "Большая часть пользователей ChatGPT Plus уже получила доступ к ChatGPT Browsing, который умеет сёрфить в Интернете и выдавать актуальную информацию.  Оказалось, что работает всё не так гладко:  — Да, теперь он знает какой сегодня день, какие главные новости и т.п.   — Чат-бот фильтрует информацию по дате и времени, ходит по ссылкам, изучает контент на внешних сайтах. При этом все свои действия выводит на экран, но по некоторым ссылкам он не смог зайти.  — Если спросить у ChatGPT «Кто новый CEO в Twitter», он так и не сможет найти ответ. Все его переходы по ссылкам были неудачные.  — Видимо, это из-за того, что на сайтах либо paywall, либо ещё какой-то блокирующий экран, и ChatGPT Browsing не понимает как это обойти.  Так что, для получения актуальной информации лучше пока обращаться к Bing.",
  imageUrl: "https://i.ibb.co/bQ7tCt1/10.jpg",
  views: 3,
  likes: [
    {
      ip: "176.59.54.252",
      country: "RU",
    },
    {
      ip: "177.59.54.252",
      country: "RU",
    },
    {
      ip: "177.59.54.252",
      country: "RU",
    },
  ],
  comments: [],
  date: "2023-05-18T14:40:00",
  category: "it_news",
  link: "https://chat.openai.com/auth/login",
};

function removeLikeByIdAndIp(posts, id, ip) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return posts; // если элемент по id не найден, возвращаем исходный массив
  }
  const post = posts[postIndex];
  const likes = post.likes.filter((like) => like.ip !== ip);
  const updatedPost = { ...post, likes };
  const updatedPosts = [...posts];
  updatedPosts.splice(postIndex, 1, updatedPost);
  return updatedPosts;
}
const newPosts = removeLikeByIdAndIp(posts, "2", "176.59.54.252");
console.log(newPosts[1].likes); // массив без объекта с id "1" и ip
