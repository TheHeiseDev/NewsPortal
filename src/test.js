const posts = [
  {
    id: "1",
    title: "Revue — сервис для создания красивой новостной рассылки!",
    description:
      "Монетизируйте лояльную аудиторию с помощью цифровых подписок, спонсорства, рекламы или других бизнес-моделей.  Вы отбираете материалы, Revue делает отличную подачу.  Начните автономную подписку на информационную рассылку с помощью универсального решения для членства или добавьте информационные бюллетени в свой пакет подписки.  Сервисом уже пользуются такие компании как: The New York Times, Vox Media, Schaffhauser Nachrichten, FastCompany и другие.",
    imageUrl: "https://i.ibb.co/170LNtL/1.webp",
    views: 28,
    comments: [
      {
        id: "AbBHyHmfrHmmHB9EUkBzx",
        userName: "Саня",
        text: "И подписка стоит 100500 конечно же",
        date: "2023-06-15T10:04:47",
        country: "United Kingdom",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "useful_services",
    link: "https://www.getrevue.co/",
    likes: [
      {
        ip: "176.59.172.93",
        country: "Armenia",
      },
      {
        ip: "23.106.56.21",
        country: "United Kingdom",
      },
      {
        ip: "37.120.218.27",
        country: "Belgium",
      },
      {
        ip: "176.59.174.43",
        country: "Russia",
      },
      {
        ip: "198.244.132.123",
        country: "United Kingdom",
      },
      {
        ip: "23.106.56.11",
        country: "United Kingdom",
      },
      {
        ip: "176.59.172.196",
        country: "",
      },
    ],
  },
  {
    id: "2",
    title: "Speechactors — преобразование текста в речь на основе ИИ",
    description:
      "Это облачный инструмент для преобразования текста в речь на основе искусственного интеллекта.  Вы сможете быстро и легко превратить любой текст в естественную человеческую речь и мгновенно загрузите его в виде файла MP3.  3 простых шага: выбрать язык и голос, вставить или написать текст, скачать MP3. ",
    imageUrl: "https://i.ibb.co/pyf6qS6/2.png",
    views: 7,
    comments: [],
    date: "2023-05-16T14:40:00",
    category: "useful_services",
    link: "https://speechactors.com",
    likes: [],
  },
  {
    id: "3",
    title: "ResumAI — создайте свое резюме с помощью силы ИИ",
    description:
      "Резюме, возможно является одним из самых важных аспектов поиска работы. Но, никто не учит нас, как его правильно создавать.   Сервис поможет выделить самые важные маркеры в вашем опыте, и в целом подскажет как лучше оформить резюме. Также с ним, вы сможете грамотно и быстро подавать свое резюме на интересные вакансии",
    imageUrl: "https://i.ibb.co/gZrjGMd/3.webp",
    views: 25,
    comments: [
      {
        id: "LUTlSVTC1x1fyBIjqzgB1",
        userName: "Андрей",
        text: "Хороший сервис, можно очень гибко редачить CVшку",
        date: "2023-06-13T15:52:43",
        country: "Armenia",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "useful_services",
    link: "https://www.wonsulting.com/resumai",
    likes: [
      {
        ip: "5.253.205.122",
        country: "Belgium",
      },
      {
        ip: "176.59.172.93",
        country: "Armenia",
      },
      {
        ip: "176.59.54.130",
        country: "Russia",
      },
      {
        ip: "169.150.238.89",
        country: "",
      },
    ],
  },
  {
    id: "4",
    title: "Relight — студийное освещение фотографии за считанные секунды ",
    description:
      "Не все умеют работать в профессиональных редакторах, а красивые фотки нужны всем. Сервис за несколько секунд превратит обычное селфи в профессиональное фото.  Конечно, всё это благодаря ИИ, обученной на миллионах изображений. А главное — просто и быстро.  Загружаете фото и играетесь со светом, как хотите. Можно добавить несколько источников света, закрасить фон или сделать его светлее. Бесплатно сохранять фото можно в разрешении SD.",
    imageUrl: "https://i.ibb.co/gjfPc4S/4.webp",
    views: 29,
    comments: [
      {
        id: "zGI8gNFYRPzE0pXS5THeB",
        userName: "Ваня",
        text: "Пробовал освещать фотки, фигня какая-то получается если честно, ну или я не понял как им пользоваться ",
        date: "2023-07-06T14:45:07",
        country: "Netherlands",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "useful_services",
    link: "https://clipdrop.co/relight",
    likes: [
      {
        ip: "37.120.218.21",
        country: "Belgium",
      },
      {
        ip: "176.59.172.93",
        country: "Armenia",
      },
      {
        ip: "198.244.132.123",
        country: "United Kingdom",
      },
      {
        ip: "50.7.93.29",
        country: "Netherlands",
      },
      {
        ip: "176.59.164.212",
        country: "Russia",
      },
      {
        ip: "62.212.64.18",
        country: "Netherlands",
      },
    ],
  },
  {
    id: "5",
    title: "DeepL - Переводчик с искусственным интеллектом ",
    description:
      "Пока такие гиганты, как Google, Microsoft и Facebook, внедряли основы машинного обучения, маленькая компания под названием DeepL обошла их всех и высоко подняла планку в индустрии перевода.  DeepL переводчик такой же быстрый, но он намного точнее и внимательнее к нюансам языка, чем любые системы, которые вы использовали до этого. ",
    imageUrl: "https://i.ibb.co/mq80Cbb/3.webp",
    views: 2,
    comments: [
      {
        id: "_XvLWCcxqohuo9oaGOAcS",
        userName: "Святослав",
        text: "Топовый переводчик ",
        date: "2023-06-14T12:11:11",
        country: "Belgium",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "useful_services",
    link: "https://www.deepl.com/translator",
    likes: [
      {
        ip: "5.253.205.122",
        country: "Belgium",
      },
      {
        ip: "198.244.132.123",
        country: "United Kingdom",
      },
    ],
  },
  {
    id: "6",
    title: "Teachable Machine - Сервис для создания искусственного интеллекта",
    description:
      "Teachable Machine — быстрый и простой способ создания моделей машинного обучения для ваших сайтов, приложений от Google.   Без специальных знаний или программирования, прямо в браузере. Бесплатно.   Даже школьник сможет с помощью веб-камеры и микрофона на своем ПК без написания кода обучать нейронные сети и экспортировать их в сторонние приложения, носители или на веб-сайты.  ",
    imageUrl: "https://i.ibb.co/M87xxQQ/6.webp",
    views: 0,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "useful_services",
    link: "https://teachablemachine.withgoogle.com/",
    likes: [
      {
        ip: "95.73.133.193",
        country: "Russia",
      },
      {
        ip: "176.59.54.130",
        country: "Russia",
      },
      {
        ip: "62.212.64.19",
        country: "Netherlands",
      },
      {
        ip: "176.59.56.117",
        country: "Russia",
      },
      {
        ip: "77.73.92.136",
        country: "Russia",
      },
    ],
  },
  {
    id: "7",
    title: "Make-A-Video — нейронка оживляет картинки",
    description:
      "Новинка от корпорации Meta — нейросеть, которая превращает загруженные изображения в видео: исходный файл интегрируется с «выученными» видеороликами, в результате картинка начинает двигаться примерно так, как это и положено изображенному предмету. ",
    imageUrl: "https://i.ibb.co/P9Ccxd9/make-a-video-header.gif",
    views: 202,
    comments: [],
    date: "2023-05-17T14:40:00",
    category: "useful_services",
    link: "https://makeavideo.studio/",
    likes: [
      {
        ip: "176.59.54.130",
        country: "Russia",
      },
      {
        ip: "62.212.64.17",
        country: "Netherlands",
      },
      {
        ip: "50.7.93.29",
        country: "Netherlands",
      },
      {
        ip: "176.59.172.196",
        country: "Russia",
      },
      {
        ip: "50.7.93.84",
        country: "Netherlands",
      },
    ],
  },
  {
    id: "8",
    title: "Аналог ChatGPT от Яндекс - YandexGPT",
    description:
      "У Яндекса теперь есть свой ChatGPT — технология называется YandexGPT и интегрирована в Алису.   Что умеет: пишет тексты, предлагает разные идеи, составляет сценарии для выпускного, придумывает планы путешествий.   Пока только тестируется, но уже можно поиграться с ней в приложении Яндекса, Браузере, Станциях и умных телевизорах с Алисой.  Нужно отметить, что ребята первыми внедрили нейронку в виртуального помощника — очень круто.",
    imageUrl: "https://i.ibb.co/Xk4TGN4/Yandex-GPT.webp",
    views: 7,
    comments: [
      {
        id: "OIygJeKTy_NKrWRGfeXNl",
        userName: "Ира",
        text: "Сейчас уже все создают эти чаты кому не лень, OpenAI им не все равно не догнать ",
        date: "2023-07-06T14:47:17",
        country: "Netherlands",
      },
    ],
    date: "2023-03-18T14:40:00",
    category: "it_news",
    link: "https://yandex.ru/alice",
    likes: [
      {
        ip: "169.150.238.89",
        country: "South Africa",
      },
      {
        ip: "62.212.64.18",
        country: "Netherlands",
      },
    ],
  },
  {
    id: "9",
    title: "Apple представила классную фичу - клонирование вашего голоса.",
    description:
      "Она называется «Персональный голос», с помощью которой смартфон всего за 15 минут сможет скопировать ваш голос. Затем им можно будет озвучивать всё, что написано обычной клавиатурой.  Технология предназначена для тех, кто рискует потерять голос, но активировать её может кто угодно. Пока только на английском языке.  Никакие утренние созвоны теперь не страшны.",
    imageUrl: "https://i.ibb.co/NWRTKyj/8.webp",
    views: 51,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "it_news",
    link: "https://www.apple.com/newsroom/2023/05/apple-previews-live-speech-personal-voice-and-more-new-accessibility-features/",
    likes: [
      {
        ip: "5.253.205.10",
        country: "Belgium",
      },
      {
        ip: "176.59.43.159",
        country: "Russia",
      },
      {
        ip: "176.59.174.43",
        country: "Russia",
      },
      {
        ip: "51.195.43.3",
        country: "Germany",
      },
      {
        ip: "176.59.56.117",
        country: "Russia",
      },
    ],
  },
  {
    id: "10",
    title: "Пользователи ChatGPT Plus получили доступ к ChatGPT Browsing",
    description:
      "Большая часть пользователей ChatGPT Plus уже получила доступ к ChatGPT Browsing, который умеет сёрфить в Интернете и выдавать актуальную информацию.  Оказалось, что работает всё не так гладко:  — Да, теперь он знает какой сегодня день, какие главные новости и т.п.   — Чат-бот фильтрует информацию по дате и времени, ходит по ссылкам, изучает контент на внешних сайтах. При этом все свои действия выводит на экран, но по некоторым ссылкам он не смог зайти.  — Если спросить у ChatGPT «Кто новый CEO в Twitter», он так и не сможет найти ответ. Все его переходы по ссылкам были неудачные.  — Видимо, это из-за того, что на сайтах либо paywall, либо ещё какой-то блокирующий экран, и ChatGPT Browsing не понимает как это обойти.  Так что, для получения актуальной информации лучше пока обращаться к Bing.",
    imageUrl: "https://i.ibb.co/bQ7tCt1/10.jpg",
    views: 0,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "it_news",
    link: "https://chat.openai.com/auth/login",
    likes: [],
  },
  {
    id: "11",
    title: "Российский «Антиплагиат» ",
    description:
      "Российский «Антиплагиат» научили определять написанный ChatGPT текст — фича доступна только для платных пользователей сервиса.   Если антиплагиат распознаёт текст от нейросети, то маркирует его как подозрительный и ставит метку (сгенерированный текст). А студентов, мы думаем, этим не запугать, вы ещё не знаете сколько существует способов, чтобы сделать текст диплома оригинальным.",
    imageUrl: "https://i.ibb.co/NxTK9xC/11.jpg",
    views: 0,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "it_news",
    link: "https://antiplagiat.ru/news/text-chatgpt/",
    likes: [],
  },
  {
    id: "12",
    title: "Нейросеть Сaptions смонтирует за вас видео",
    description:
      "Полезный сервис для SMMщиков и блогеров: нейросеть Сaptions смонтирует за вас видео, вырезая из ролика моменты, где вы молчите.   Кроме этого, умеет управлять вашим взглядом и добавлять автоматические субтитры.",
    imageUrl: "https://i.ibb.co/tHVzD18/12.webp",
    views: 53,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "ai",
    link: "https://www.captions.ai/",
    likes: [],
  },
  {
    id: "13",
    title: "Stability AI выпустили новую нейросеть для генерации анимации.",
    description:
      "Анимации создавать можно тремя способами: с помощью обычного текстового запроса, также из изображения или исходного видео на основе запроса. Возможности впечатляют — можно сменить время суток и даже создать бесконечный зум или 3D-рендер. ",
    imageUrl: "https://i.ibb.co/McFMC6p/maxresdefault.jpg",
    views: 0,
    comments: [
      {
        id: "NF1h9exDefECoGcFVPZSm",
        userName: "Светик",
        text: "Прикольный сервис, жаль, что миджоурни так не умеет пока. ",
        date: "2023-06-14T12:09:37",
        country: "Belgium",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "ai",
    link: "https://stability.ai/blog/stable-animation-sdk",
    likes: [
      {
        ip: "5.253.205.122",
        country: "Belgium",
      },
      {
        ip: "176.59.174.43",
        country: "Russia",
      },
    ],
  },
  {
    id: "14",
    title: "Metabob — автоматизировать отладку и рефакторинг кода",
    description:
      "Это мощный ИИ-инструмент для проверки кода, который ускоряет отладку, помогая разработчикам автоматически обнаруживать, понимать и решать сложные проблемы, скрытые в их коде.   Поддерживает Python, Javascript, Typescript, C++, C и Java. Бесплатно доступно на Github, Bitbucket, Gitlab и VScode. ",
    imageUrl: "https://i.ibb.co/9G2S31n/14.png",
    views: 70,
    comments: [
      {
        id: "q30GYf2LE83AblFYpEtz0",
        userName: "Витька",
        text: "А есть туторилы какие-то у кого-то на ютубчике как этим пользоваться ? ",
        date: "2023-07-03T15:29:52",
        country: "Netherlands",
      },
    ],
    date: "2023-04-18T14:40:00",
    category: "ai",
    link: "https://metabob.com/",
    likes: [
      {
        ip: "198.16.66.157",
        country: "Netherlands",
      },
    ],
  },
  {
    id: "15",
    title: "Как Midjourney эволюционировала",
    description:
      "Наглядно о том, как развивалась Midjourney вплоть до последней версии — всё это с использованием одного и того же промта.   Нейросеть была запущена всего лишь год назад, и прогресс просто сумасшедший.",
    imageUrl: "https://i.ibb.co/6mDR9Mj/15.jpg",
    views: 0,
    comments: [],
    date: "2023-05-18T14:40:00",
    category: "ai",
    link: "https://www.midjourney.com/",
    likes: [],
  },
  {
    id: "16",
    title:
      "Полный Full Stack курс ReactJS + NodeJS для начинающих за 4 часа! (MongoDB, Express, React, NodeJS)",
    description:
      "В этом курсе ты научишься с нуля разрабатывать бэкенд на стэке MERN (MongoDB, Express, React, NodeJS) и подключать к фронтенду свой бэкенд. Также, к завершению урока ты научишься деплоить своё приложение на Heroku + Vercel.  Курс идеально подойдёт для новичков, которые впервые решили попробовать NodeJS.",
    imageUrl: "https://i.ibb.co/p097cj7/maxresdefault.jpg",
    views: 0,
    comments: [],
    date: "2023-04-18T14:40:00",
    category: "courses",
    link: "https://www.youtube.com/watch?v=GQ_pTmcXNrQ&t=3047s",
    likes: [
      {
        ip: "37.120.218.27",
        country: "Belgium",
      },
      {
        ip: "176.59.174.43",
        country: "Russia",
      },
    ],
  },
  {
    id: "17",
    title: "Курс от Archakov Blog по разработке интернет магазина",
    description:
      "Это обновлённый курс на 2022 год, одного из [самых популярных курсов по ReactJS для начинающих.  В данном курсе подробно раскрывается тема создания фронтенда части интернет-магазина пиццерии на всех нижеперечисленных технологиях.  Я собрал все самые **топовые** и **актуальные** темы по фронтенду + React на 2022 год, которые тебе пригодятся для **трудоустройства** или же разработки приложений на заказ.  Обновлённый курс идеально подойдёт как для начинающих разработчиков (junior), так и для pre-middle/middle.",
    imageUrl: "https://i.ibb.co/cYjLcrf/maxresdefault.jpg",
    views: 0,
    comments: [
      {
        id: "cSjoIi4S_qAzfbi15P-b1",
        userName: "Витя",
        text: "У Арчакова топовые курсы, на русскоязычном ютубе лучше нет. Красавчик чел",
        date: "2023-06-14T13:54:23",
        country: "Armenia",
      },
    ],
    date: "2023-05-18T14:40:00",
    category: "courses",
    link: "https://www.youtube.com/watch?v=_UywBskWJ7Q&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl",
    likes: [
      {
        ip: "176.59.172.144",
        country: "Armenia",
      },
      {
        ip: "198.244.132.123",
        country: "United Kingdom",
      },
    ],
  },
  {
    id: "18",
    title: "Unscreen — вырезаем фон из видеороликов или гифок",
    description:
      "Уже второй раз за сегодня автоматически вырезаем фон, только теперь из гифок. Из гифок, представляете уровень меметичности? Получается, что вы можете взять любую гифку с растерянным Траволтой, вырезать оттуда все, кроме главного героя, и наложить на любое собственное видео. ",
    imageUrl: "https://i.ibb.co/4PQHkRr/18.webp",
    views: 92,
    comments: [
      {
        id: "T6vbtqzHMDvSMzns3IJMg",
        userName: "Anna",
        text: "Вот это вот классный ресурс ",
        date: "2023-06-13T15:50:14",
        country: "Armenia",
      },
      {
        id: "4cZ0Ly_RgDx_BtmrqXljL",
        userName: "Кот",
        text: "Мурлык... мурлык...",
        date: "2023-06-19T19:22:26",
        country: "United Kingdom",
      },
      {
        id: "yVQpD5w_RXbLukihz-Tj4",
        userName: "jjjj",
        text: "jjjjjjjjjjjjjjjjjjjjjjjjj",
        date: "2023-06-21T16:03:53",
        country: "",
      },
    ],
    date: "2023-06-12T11:43:11",
    category: "useful_services",
    link: "http://www.unscreen.com/",
    likes: [
      {
        ip: "176.59.172.93",
        country: "Armenia",
      },
      {
        ip: "5.253.205.122",
        country: "Belgium",
      },
      {
        ip: "95.73.133.193",
        country: "Russia",
      },
      {
        ip: "37.120.218.27",
        country: "Belgium",
      },
      {
        ip: "198.244.190.147",
        country: "United Kingdom",
      },
      {
        ip: "51.195.43.3",
        country: "Germany",
      },
      {
        ip: "176.59.56.117",
        country: "Russia",
      },
    ],
  },
  {
    id: "19",
    title: "Переводим видео на другой язык за несколько кликов",
    description:
      "Если вы ищете эффективное решение для перевода видео на другой язык или добавления субтитров, то сервис Translate Video станет вашим незаменимым помощником.\n\nСервис может генерировать и переводить субтитры, а так же делать дубляж человеческим голосом. Просто зарегистрируйтесь на сайте и загрузите видео файл, а затем выберите язык перевода. \n\nБесплатно сервис предоставляет только 10 минут перевода. Однако, регистрация на сайте по одноразовым почтовым ящикам работает.\n",
    imageUrl: "https://i.ibb.co/fMyCwmL/post-19.webp",
    views: 0,
    comments: [],
    date: "2023-07-04T18:28:13",
    likes: [
      {
        ip: "176.59.172.196",
        country: "Russia",
      },
      {
        ip: "50.7.93.84",
        country: "Netherlands",
      },
      {
        ip: "169.150.238.89",
        country: "South Africa",
      },
    ],
    category: "useful_services",
    link: "https://www.translate.video/",
  },
];

const statisticsPost = (posts) => {
  const stats = {};

  posts.forEach((post) => {
    stats[post.category] = (stats[post.category] || 0) + 1;
  });

  return stats;
};
const result = statisticsPost(posts);
console.log(result);
