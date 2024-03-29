import "./scss/app.scss";
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { fetchDeviceInfo } from "./store/slice/deviceInfo/deviceInfoThunk";
import { MainLayout } from "./layout/MainLayout";
import { Intro } from "./components/Intro/Intro";
import { PostList } from "./components/PostList/PostList";
import { ChunkLoading } from "./components/ChunkLoading/ChunkLoading";

const Newsfeed = lazy(
  () => import(/* webpachChunkName: "Newsfeed" */ "./pages/Newsfeed/Newsfeed")
);
const PostPage = lazy(
  () => import(/* webpachChunkName: "PostPage" */ "./pages/PostPage/PostPage")
);
const NotFound = lazy(
  () => import(/* webpachChunkName: "NotFound" */ "./pages/NotFound/NotFound")
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDeviceInfo());
  }, []);

  return (
    <Routes>
      <Route
        path="/newsfeed"
        element={
          <Suspense fallback={<ChunkLoading />}>
            <Newsfeed />
          </Suspense>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Suspense fallback={<ChunkLoading />}>
            <PostPage />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <Intro />
            <PostList />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace={true} />} />
      <Route
        path="/404"
        element={
          <Suspense fallback={<ChunkLoading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
