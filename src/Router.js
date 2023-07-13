import { Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { Home } from "./Components/Home";
import { MyPage } from "./Components/MyPage";
import { Writing } from "./Components/Writing";
import { SearchBox } from "./Components/SearchBox";
import { DetailPage } from "./Components/DetailPage";
import { authService, dbService } from "./firebase";
import { Navigation } from "./Components/Navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initAtom, userObjAtom } from "./atom";

export const AppRouter = () => {
  //데이터 셋팅 여부
  const setInitAtom = useSetRecoilState(initAtom);

  //user 정보
  const userObj = useRecoilValue(userObjAtom);
  const setUserObjAtom = useSetRecoilState(userObjAtom);

  const [search, setSearch] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [recentWritings, setRecentWritings] = useState([]);
  const [likedWritings, setLikedWritings] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "writings"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const writingArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentWritings(writingArr);
      setInitAtom(true);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(dbService, "writings"), orderBy("like", "desc"));
    onSnapshot(q, (snapshot) => {
      const writingArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikedWritings(writingArr);
      setInitAtom(true);
    });
  }, []);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObjAtom({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObjAtom(null);
      }
    });
  }, []);

  return (
    <HashRouter>
      <Navigation
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              recentWritings={recentWritings}
              likedWritings={likedWritings}
              search={search}
              setSearch={setSearch}
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
            <Writing attachment={attachment} setAttachment={setAttachment} />
          }
        />
        <Route
          path="/searchbox"
          element={
            <SearchBox
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
              loginModal={loginModal}
              setLoginModal={setLoginModal}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};
