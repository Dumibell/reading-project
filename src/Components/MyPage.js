import { Navigation } from "./Navigation";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

export const MyPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(getAuth());
    navigate("/");
  };

  return (
    <div className="w-full h-screen">
      <Navigation isLoggedIn={isLoggedIn} />
      <div>마이페이지~!~!</div>
      <div onClick={onLogOutClick}>로그아웃</div>
    </div>
  );
};
