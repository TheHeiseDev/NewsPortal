import "./scss/app.scss";
import { MainLayout } from "./layout/MainLayout";
import { Intro } from "./components/Intro/Intro";
import { PostList } from "./components/PostList/PostList";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import NotFound from "./pages/NotFound/NotFound";
import { PostPage } from "./pages/PostPage/PostPage";
import { Newsfeed } from "./pages/Newsfeed/Newsfeed";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Intro />
            <PostList />
          </MainLayout>
        }
      />
      <Route
        path="/newsfeed"
        element={
          <Suspense fallback={<CircularProgress />}>
            <Newsfeed/>
          </Suspense>
        }
      />
      <Route
        path="/newsfeed/:category"
        element={
          <Suspense fallback={<CircularProgress />}>
            <h1>POSTS LIST Category</h1>
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
      <Route path="*" element={<Navigate to="/404" replace={true} />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default App;
