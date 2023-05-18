import "./scss/app.scss";
import { MainLayout } from "./layout/MainLayout";
import { Intro } from "components/Intro/Intro";
import { PostList } from "components/PostList/PostList";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import NotFound from "./pages/NotFound/NotFound";

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
        path="/posts"
        element={
          <Suspense fallback={<CircularProgress />}>
            <h1>POSTS LIST</h1>
          </Suspense>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Suspense fallback={<CircularProgress />}>
            <h1>POSTS ID</h1>
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace={true} />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default App;
