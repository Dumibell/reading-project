import { useState } from "react";
import { Card } from "./Card";
import { Profile } from "./Profile";
import { useRecoilValue } from "recoil";
import { userObjAtom } from "../atom";

export const MyPage = ({ search, setLoginModal, recentWritings }) => {
  const userObj = useRecoilValue(userObjAtom);

  const [clickState, setClickState] = useState("프로필");

  const showMyPage = () => {
    if (clickState === "프로필") {
      return <Profile userObj={userObj} recentWritings={recentWritings} />;
    } else if (clickState === "작성한 글") {
      return recentWritings.map((item) => {
        if (item.uid === userObj.uid) {
          return (
            <Card
              item={item}
              key={item.id}
              search={search}
              setLoginModal={setLoginModal}
            />
          );
        }
      });
    } else if (clickState === "댓글 단 글") {
      return recentWritings.map((item) => {
        if (item.whoLikesIt.includes(userObj.uid)) {
          return (
            <Card
              item={item}
              key={item.id}
              search={search}
              setLoginModal={setLoginModal}
            />
          );
        }
      });
    } else if (clickState === "좋아요 한 글") {
      return recentWritings.map((item) => {
        if (item.whoLikesIt.includes(userObj.uid)) {
          return (
            <Card
              item={item}
              key={item.id}
              search={search}
              setLoginModal={setLoginModal}
            />
          );
        }
      });
    }
  };

  return (
    <div className="w-full h-screen myPage">
      <div className="flex mt-10">
        <div className="w-1/5 min-w-[140px] flex flex-col items-center border-r border-[#DCCFC0] h-screen myPageNav">
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
        <div className="ml-10 w-4/5 showMyPage">{showMyPage()}</div>
      </div>
    </div>
  );
};
