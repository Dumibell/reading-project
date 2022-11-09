import { Navigation } from "./Navigation";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";
import { Card } from "./Card";
import { isReactNative } from "@firebase/util";

export const MyPage = ({
  isLoggedIn,
  userObj,
  search,
  setLoginModal,
  recentWritings,
}) => {
  const [myWritings, setMyWritings] = useState([]);
  const [clickState, setClickState] = useState("프로필");

  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(getAuth());
    navigate("/");
  };

  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, `writings/users/${userObj.uid}`),
  //     orderBy("createdAt", "desc")
  //   );
  //   onSnapshot(q, (snapshot) => {
  //     const writingArr = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMyWritings(writingArr);
  //   });
  // }, []);

  // console.log(myWritings);

  const showMyPage = () => {
    if (clickState === "프로필") {
      return (
        <div className="mt-3">
          <div className="flex items-end">
            <div> {userObj.displayName}님의 프로필</div>
            <div className="ml-3 text-xs font-bold text-[#8D6D48] hover:cursor-pointer">
              이름 수정하기
            </div>
          </div>
          <div onClick={onLogOutClick} className="mt-10 hover:cursor-pointer">
            로그아웃
          </div>
        </div>
      );
    } else if (clickState === "작성한 글") {
      return recentWritings.map((item) => {
        if (item.uid === userObj.uid)
          return (
            <Card
              item={item}
              key={item.id}
              userObj={userObj}
              search={search}
              isLoggedIn={isLoggedIn}
              setLoginModal={setLoginModal}
            />
          );
      });
    } else if (clickState === "좋아요 한 글") {
      return recentWritings.map((item) => {
        if (item.whoLikesIt.includes(userObj.uid)) {
          return (
            <Card
              item={item}
              key={item.id}
              userObj={userObj}
              search={search}
              isLoggedIn={isLoggedIn}
              setLoginModal={setLoginModal}
            />
          );
        }
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <Navigation isLoggedIn={isLoggedIn} />
      <div className="flex mt-10">
        <div className="w-1/5 min-w-[140px] flex flex-col items-center border-r border-[#DCCFC0]  h-screen">
          <div className="flex flex-col text-lg">
            <div
              onClick={() => setClickState("프로필")}
              className="my-1 hover:cursor-pointer"
            >
              프로필
            </div>
            <div
              onClick={() => setClickState("작성한 글")}
              className="my-1 hover:cursor-pointer"
            >
              작성한 글
            </div>
            <div
              onClick={() => setClickState("좋아요 한 글")}
              className="my-1 hover:cursor-pointer"
            >
              좋아요 한 글
            </div>
          </div>
        </div>
        <div className="ml-10 w-4/5">{showMyPage()}</div>
      </div>
    </div>
  );
};
