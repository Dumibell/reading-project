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

export const Login = ({ setLoginModal }) => {
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
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center bg-[#404656] p-5 rounded-md">
      <img src="/images/book.png" className="w-24 h-24" alt="책 아이콘" />
      <form onSubmit={SignIn} className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2"
        />
        <input
          type="submit"
          value="Log In"
          className="bg-white mt-2 rounded-md h-8  shadow-sm hover:cursor-pointer"
        />
      </form>
      <div className="mt-3 font-bold w-60 flex justify-center rounded-md">
        <button
          onClick={onSocialClick}
          name="google"
          className="p-2 rounded-md text-white"
        >
          구글로 로그인하기 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
      {/* <div
        className="text-white border-b text-sm"
        onClick={() => setSignUpModal(true)}
      >
        Create an Account
      </div>
      {signUpModal ? <SignUp setLoginModal={setLoginModal} /> : <></>} */}
    </div>
  );
};
