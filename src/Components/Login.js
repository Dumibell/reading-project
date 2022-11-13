import { authService } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { SignUp } from "./SignUp";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Login = ({ setLoginModal, userObj }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const SignIn = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await signInWithEmailAndPassword(authService, email, password);

      setLoginModal(false);
    } catch (error) {
      console.log(error);
      alert("일치하는 회원정보가 없습니다.");
    }
  };

  const onSocialClick = async () => {
    let provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    setLoginModal(false);
    alert(`환영합니다 ${userObj.displayName}님!`);
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-96 h-[500px] p-5 rounded-md z-10 shadow-lg loginModal">
      <FontAwesomeIcon
        icon={faXmark}
        className="ml-[340px] text-[#61342F] hover:cursor-pointer closeIcon"
        onClick={() => {
          setLoginModal(false);
        }}
      />
      <img
        src={process.env.PUBLIC_URL + "/images/login-book.jpg"}
        className="w-48 h-32 mt-16 bookImg"
        alt="책 아이콘"
      />
      <div className="w-[80%]">
        <form onSubmit={SignIn} className="flex flex-col ">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
            className="my-1 h-10 outline-none border-b border-[#61342F] px-2 font-gothic"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            value={password}
            onChange={onChange}
            className="my-1 h-10 outline-none border-b  border-[#61342F] px-2 font-gothic"
          />
          <input
            type="submit"
            value="Log In"
            className="mt-2 h-8 bg-[#61342F] text-white hover:cursor-pointer rounded-md"
          />
        </form>
        <button
          onClick={onSocialClick}
          name="google"
          className="w-full mt-2 rounded-md h-8 bg-[#61342F] text-white hover:cursor-pointer "
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
      <div
        className="border-b border-[#61342F] text-[#61342F] text-sm mt-16 hover:cursor-pointer createAnAccount"
        onClick={() => setSignUpModal(true)}
      >
        Create an Account
      </div>
      {signUpModal ? <SignUp setLoginModal={setLoginModal} /> : <></>}
    </div>
  );
};
