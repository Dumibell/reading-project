import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Login";

export const Navigation = ({ isLoggedIn, setLoginModal }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  const goToMyPage = () => {
    navigate("/mypage");
  };
  return (
    <div className="w-full h-20">
      <div className="flex justify-end mr-10 mt-3">
        <div className="mr-8" onClick={goToHome}>
          Home
        </div>
        {isLoggedIn ? (
          <div onClick={goToMyPage}>마이페이지</div>
        ) : (
          <div onClick={() => setLoginModal(true)}>login</div>
        )}
      </div>
    </div>
  );
};
