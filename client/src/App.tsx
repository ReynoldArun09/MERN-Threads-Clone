import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { VerifyUserQuery } from "./services/queries/auth-queries";
import LoadingSpinner from "./components/common/loading-spinner";
import RootLayout from "./layouts/root-layout";

const AuthPage = lazy(() => import("./pages/auth-page"));
const HomePage = lazy(() => import("./pages/home-page"));
const SettingPage = lazy(() => import("./pages/setting-page"));
const ChatPage = lazy(() => import("./pages/chat-page"));
const PostPage = lazy(() => import("./pages/post-page"));
const UpdateProfilePage = lazy(() => import("./pages/update-profile-page"));
const UserPage = lazy(() => import("./pages/user-page"));
const CreatePost = lazy(() => import("./components/post/create-post"));

export default function App() {
  const { isLoading, data: isAuth } = VerifyUserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RootLayout>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!isAuth ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={isAuth ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={isAuth ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/settings"
            element={isAuth ? <SettingPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/:username"
            element={
              isAuth ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
        </Routes>
      </RootLayout>
    </Suspense>
  );
}
