import "./scss/app.scss";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Intro } from "./components/Intro/Intro";
import { PostList } from "./components/PostList/PostList";

import { CircularProgress } from "@mui/material";

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
  return (
    <Routes>
      <Route
        path="/newsfeed"
        element={
          <Suspense fallback={<CircularProgress />}>
            <Newsfeed />
          </Suspense>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Suspense fallback={<CircularProgress />}>
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
          <Suspense fallback={<CircularProgress />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
