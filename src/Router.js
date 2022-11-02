import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { MyPage } from "./Components/MyPage";
import { Writing } from "./Components/Writing";

export const AppRouter = ({ userObj, isLoggedIn }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home userObj={userObj} isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/mypage"
          element={<MyPage userObj={userObj} isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/writing"
          element={<Writing userObj={userObj} isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
