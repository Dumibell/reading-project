import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { MyPage } from "./Components/MyPage";
import { Writing } from "./Components/Writing";
import { SearchBox } from "./Components/SearchBox";
import { authService, dbService } from "./firebase";

export const AppRouter = ({ recentWritings, likedWritings }) => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              userObj={userObj}
              isLoggedIn={Boolean(userObj)}
              recentWritings={recentWritings}
              likedWritings={likedWritings}
            />
          }
        />
        <Route
          exact
          path="/mypage"
          element={<MyPage userObj={userObj} isLoggedIn={Boolean(userObj)} />}
        />
        <Route
          exact
          path="/writing"
          element={<Writing userObj={userObj} isLoggedIn={Boolean(userObj)} />}
        />
        <Route
          path="/searchbox"
          element={
            <SearchBox userObj={userObj} isLoggedIn={Boolean(userObj)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
