import { Navigation } from "./Navigation";

import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";
import { Card } from "./Card";
import { isReactNative } from "@firebase/util";
import { Profile } from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

export const MyPage = ({
  isLoggedIn,
  userObj,
  search,
  setLoginModal,
  recentWritings,
}) => {
  const [myWritings, setMyWritings] = useState([]);
  const [clickState, setClickState] = useState("프로필");
  const [writeVacant, setWriteVacant] = useState(false);
  const [likeVacant, setLikeVacant] = useState(false);

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
      return <Profile userObj={userObj} recentWritings={recentWritings} />;
    } else if (clickState === "작성한 글") {
      if (!writeVacant) {
        return recentWritings.map((item) => {
          if (item.uid === userObj.uid) {
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
          setWriteVacant(true);
        });
      } else {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center pb-60">
            <FontAwesomeIcon
              icon={faSadTear}
              className="text-[200px] opacity-50"
            />
            <p className="mt-4 text-2xl font-bold opacity-50">
              작성한 게시글이 없습니다
            </p>
          </div>
        );
      }
    } else if (clickState === "좋아요 한 글") {
      if (!likeVacant) {
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
          } else {
            setLikeVacant(true);
          }
        });
      } else {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center pb-60">
            <FontAwesomeIcon
              icon={faSadTear}
              className="text-[200px] opacity-50"
            />
            <p className="mt-4 text-2xl font-bold opacity-50">
              좋아요를 누른 게시글이 없습니다
            </p>
          </div>
        );
      }
    }
  };

  return (
    <div className="w-full h-screen myPage">
      <Navigation isLoggedIn={isLoggedIn} />
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
