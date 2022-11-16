import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Navigation = ({
  isLoggedIn,
  setLoginModal,
  userObj,
  setSearch,
}) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const goToMyPage = () => {
    navigate("/mypage");
  };

  const goToSearchBox = () => {
    navigate("/searchbox");
  };

  return (
    <div className="w-full font-referi">
      <div className="flex justify-end items-end h-20 mr-10 mb-3">
        <div
          className="mr-8 hover:cursor-pointer hover:translate-y-[-2px]"
          onClick={goToHome}
        >
          Home
        </div>
        {isLoggedIn ? (
          <div
            onClick={goToMyPage}
            className="hover:cursor-pointer hover:translate-y-[-2px]"
          >
            My Page
          </div>
        ) : (
          <div
            onClick={() => setLoginModal(true)}
            className="hover:cursor-pointer hover:translate-y-[-2px]"
          >
            Login
          </div>
        )}
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="ml-10 hover:cursor-pointer hover:translate-y-[-2px]"
            onClick={goToSearchBox}
          />
        </div>
      </div>
    </div>
  );
};
