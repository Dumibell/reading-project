import { authService } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export const Login = ({ setLoginModal }) => {
  const onSocialClick = async () => {
    let provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    setLoginModal(false);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center bg-[#404656] p-5 rounded-md">
      <img src="/images/book.png" className="w-24 h-24" alt="책 아이콘" />
      <div className="mt-3 font-bold w-60 flex justify-center rounded-md">
        <button
          onClick={onSocialClick}
          name="google"
          className="p-2 rounded-md text-white"
        >
          구글로 로그인하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  );
};
