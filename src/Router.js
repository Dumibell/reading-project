import { Routes, BrowserRouter, Route, HashRouter } from "react-router-dom";
import { useEffect, useState, useParams } from "react";
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
import { DetailPage } from "./Components/DetailPage";
import { authService, dbService } from "./firebase";
import { Navigation } from "./Components/Navigation";

export const AppRouter = ({ recentWritings, likedWritings, init }) => {
  const [userObj, setUserObj] = useState(null);
  const [search, setSearch] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loginModal, setLoginModal] = useState(false);

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
    });
  }, []);

  return (
    <HashRouter>
      <Navigation
        isLoggedIn={Boolean(userObj)}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        userObj={userObj}
        setSearch={setSearch}
      />
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
              search={search}
              setSearch={setSearch}
              init={init}
              setLoginModal={setLoginModal}
              loginModal={loginModal}
            />
          }
        />
        {userObj ? (
          <Route
            exact
            path="/mypage"
            element={
              <MyPage
                userObj={userObj}
                isLoggedIn={Boolean(userObj)}
                recentWritings={recentWritings}
                likedWritings={likedWritings}
                search={search}
                setSearch={setSearch}
              />
            }
          />
        ) : (
          <></>
        )}
        <Route
          exact
          path="/writing"
          element={
            <Writing
              userObj={userObj}
              isLoggedIn={Boolean(userObj)}
              attachment={attachment}
              setAttachment={setAttachment}
            />
          }
        />
        <Route
          path="/searchbox"
          element={
            <SearchBox
              userObj={userObj}
              isLoggedIn={Boolean(userObj)}
              recentWritings={recentWritings}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/detailpage/:id"
          element={
            <DetailPage
              recentWritings={recentWritings}
              userObj={userObj}
              isLoggedIn={Boolean(userObj)}
              loginModal={loginModal}
              setLoginModal={setLoginModal}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};
