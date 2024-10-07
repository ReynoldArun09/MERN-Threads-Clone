import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { VerifyUserQuery } from "./services/queries/auth-queries";
import LoadingSpinner from "./components/common/loading-spinner";

const AuthPage = lazy(() => import("./pages/auth-page"));
const HomePage = lazy(() => import("./pages/home-page"));

export default function App() {
  const { isLoading, data: isAuth } = VerifyUserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!isAuth ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
}
