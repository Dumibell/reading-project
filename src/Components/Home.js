import { Navigation } from "./Navigation";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { dbService } from "../firebase";
import { Login } from "./Login";
import { Card } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

export const Home = ({
  isLoggedIn,
  recentWritings,
  likedWritings,
  userObj,
  search,
  setSearch,
}) => {
  const [loginModal, setLoginModal] = useState(false);
  const [filter, setFilter] = useState("recent");

  const navigate = useNavigate();

  const goToWriting = () => {
    if (userObj) {
      navigate("/writing");
    } else {
      alert("로그인이 필요한 서비스입니다.");
      setLoginModal(true);
    }
  };

  return (
    <div className="w-full h-screen">
      <Navigation
        isLoggedIn={isLoggedIn}
        setLoginModal={setLoginModal}
        userObj={userObj}
      />
      <div className="w-full h-[80%] flex justify-end  relative text-container mr-10 bg-[#F0E5CA]">
        <div className="mr-[-220px] mt-60 z-10 small-main min-w-[350px]">
          <div className="flex flex-col italic text-3xl">
            <p className="main-title-text">We Are Building</p>
            <p className="main-title-text">Your Reading Habit</p>
          </div>
          <div className="mt-2 text-xs text main-text">
            <p>매일 책 읽는 습관을 기르기 위한 프로젝트입니다.</p>
            <p>책 읽는 사진과 함께 느낀점을 자유롭게 작성해주세요.</p>
            <p>
              마음에 드는 구절을 인용하는 것도 독후감을 작성하는 좋은 방법 중
              하나입니다.
            </p>
          </div>
          <div
            onClick={goToWriting}
            className="mt-5 p-2 w-[160px] bg-black opacity-50 text-white hover:cursor-pointer hover:opacity-60"
          >
            <FontAwesomeIcon icon={faPenNib} className="mr-1" />글 작성하러 가기
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/images/original.avif"}
          alt="bg"
          className="w-[1000px] min-w-[1000px]"
        />
      </div>
      <div className="flex justify-end mt-20 mr-20 text-sm filter">
        <div
          className="mr-2 hover:cursor-pointer hover:font-semibold"
          onClick={() => setFilter("recent")}
        >
          최신순
        </div>
        <div>·</div>
        <div
          className="ml-2 hover:cursor-pointer hover:font-semibold"
          onClick={() => setFilter("like")}
        >
          인기순
        </div>
      </div>
      <div className="w-full px-2 justify-center cardContainer">
        {filter === "recent"
          ? recentWritings.map((item) => {
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
            })
          : likedWritings.map((item) => {
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
            })}
      </div>

      {loginModal ? (
        <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10">
          <Login setLoginModal={setLoginModal} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
