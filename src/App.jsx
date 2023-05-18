import "./scss/app.scss";
import { MainLayout } from "./layout/MainLayout";
import { Intro } from "components/Intro/Intro";
import { PostList } from "components/PostList/PostList";

function App() {
  return (
    <MainLayout>
      <Intro />
      <PostList />
    </MainLayout>
  );
}

export default App;
