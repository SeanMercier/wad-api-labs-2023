import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import PublicPage from "./pages/publicPage";
import ProfilePage from "./pages/profilePage";
import MoviesPage from "./pages/moviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginPage from "./pages/loginPage";
import AuthContextProvider from "./contexts/authContext";
import SignUpPage from "./pages/signUpPage";


import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <ul>
            <li>
              <Link to="/">Public</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/signup" element={ <SignUpPage /> } />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));