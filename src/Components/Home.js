import { Navigation } from "./Navigation";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Login } from "./Login";

export const Home = ({ isLoggedIn }) => {
  const [loginModal, setLoginModal] = useState(false);

  const navigate = useNavigate();

  const goToWriting = () => {
    navigate("/writing");
  };

  return (
    <div className="w-full h-screen">
      <Navigation isLoggedIn={isLoggedIn} setLoginModal={setLoginModal} />
      <div>홈화면~!~!</div>
      <div onClick={goToWriting}>글 작성하기</div>
      {loginModal ? (
        <div className="absolute top-1/3 left-1/3">
          <Login setLoginModal={setLoginModal} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
