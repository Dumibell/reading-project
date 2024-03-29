import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "./Login";
import { Card } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { initAtom, userObjAtom } from "../atom";

export const Home = ({
  recentWritings,
  likedWritings,
  search,
  setLoginModal,
  loginModal,
}) => {
  //데이터 조회 여부
  const init = useRecoilValue(initAtom);

  // 유저 정보
  const userObj = useRecoilValue(userObjAtom);

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
      <div className="w-full h-[70%] flex justify-end  relative text-container mr-10 bg-[#F0E5CA] mainImg">
        <div className="mr-[-100px] mt-48 z-10 small-main min-w-[350px]">
          <div className="flex flex-col italic text-xl">
            <p className="text-6xl">Re:bit</p>
            <p className="main-title-text">
              We Are Building Your Reading Habit
            </p>
          </div>
          <div className="mt-1.5 text-xs text main-text">
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
          className="w-[900px] min-w-[900px] mainBg"
        />
      </div>
      <div className="flex justify-end mt-10 mr-20 text-sm filter">
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
      <div className="w-full px-2 justify-center cardContainer mt-2 pb-12">
        {init ? (
          <>
            {" "}
            {filter === "recent"
              ? recentWritings.map((item) => {
                  return (
                    <Card
                      item={item}
                      key={item.id}
                      userObj={userObj}
                      search={search}
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
                      setLoginModal={setLoginModal}
                    />
                  );
                })}
          </>
        ) : (
          <div className="w-full flex justify-center items-center">
            <img
              src={process.env.PUBLIC_URL + "/images/buffer.png"}
              alt="buffer"
              className="w-52 animate-spin mt-20"
            />
          </div>
        )}
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
