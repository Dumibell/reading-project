import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { authService } from "../firebase";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SignUp = ({ setSignUpModal, setLoginModal }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password confirm") {
      setPasswordConfirm(value);
    }
  };
  console.log(password);
  console.log(passwordConfirm);

  const signUp = async (e) => {
    e.preventDefault();
    let data;
    let passwordValid =
      /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
    if (password === passwordConfirm) {
      if (passwordValid.test(password)) {
        await createUserWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            user.displayName = name;
          })
          .catch((error) => console.log(error));
        await updateProfile(authService.currentUser, { displayName: name });
        alert("회원가입에 성공하였습니다!");
        window.location.reload(); //새로고침해야 반영...
      } else {
        alert("8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.");
      }
    } else {
      alert("비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="w-96 h-[500px] fixed bg-white flex flex-col items-center justify-between signUp">
      <FontAwesomeIcon
        icon={faXmark}
        className="hover:cursor-pointer ml-[330px] mt-5 ml-3 closeIcon"
        onClick={() => setLoginModal(false)}
      />
      <form onSubmit={signUp} className="flex flex-col p-3 w-[90%] mb-24">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border-b border-[#61342F] font-gothic"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border-b border-[#61342F] font-gothic"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border-b border-[#61342F] font-gothic"
        />
        <input
          type="password"
          name="password confirm"
          placeholder="Password Confirm"
          required
          value={passwordConfirm}
          onChange={onChange}
          className="my-1 h-10 outline-none px-2 border-b border-[#61342F] font-gothic"
        />
        {password !== passwordConfirm ? (
          <p className="text-[11px] text-[red] absolute top-[330px] ml-1">
            비밀번호가 일치하지 않습니다
          </p>
        ) : (
          <></>
        )}
        <input
          type="submit"
          value="Sign Up"
          className="bg-[#61342F] text-white rounded-md h-8  shadow-sm hover:cursor-pointer mt-8"
        />
      </form>
    </div>
  );
};
