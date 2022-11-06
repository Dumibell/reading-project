import { Navigation } from "./Navigation";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";

export const MyPage = ({ isLoggedIn, userObj }) => {
  const [myWritings, setMyWritings] = useState([]);

  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(getAuth());
    navigate("/");
  };

  useEffect(() => {
    const q = query(
      collection(dbService, `writings/users/${userObj.uid}`),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const writingArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyWritings(writingArr);
    });
  }, []);

  console.log(myWritings);

  return (
    <div className="w-full h-screen">
      <Navigation isLoggedIn={isLoggedIn} />
      <div>{userObj.displayName}님의 페이지</div>
      <div onClick={onLogOutClick}>로그아웃</div>
    </div>
  );
};
