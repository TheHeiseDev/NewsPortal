import { Header } from "components/Header/Header";
import "./scss/app.scss";
import { Intro } from "components/Intro/Intro";
import { Footer } from "components/Footer/Footer";
import { PostList } from "components/PostList/PostList";
import { Subscribe } from "components/Subscribe/Subscribe";

function App() {
  return (
    <>
      <Header />
      <Intro />
      <PostList />
      <Subscribe/>
      <Footer />
    </>
  );
}

export default App;
