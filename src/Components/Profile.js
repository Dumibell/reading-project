import { useNavigate } from "react-router-dom";
import { signOut, getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { authService } from "../firebase";

export const Profile = ({ userObj, recentWritings }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(userObj.displayName);
  let levelEmoji;
  let number;
  let levelText;

  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(getAuth());
    navigate("/");
  };

  const onChange = async (event) => {
    const {
      target: { value },
    } = event;
    setNewName(value);
  };

  const onSubmit = async () => {
    await updateProfile(authService.currentUser, { displayName: newName });
    window.location.reload();
  };

  if (userObj) {
    let arr = [];
    recentWritings.forEach((item) => {
      if (item.uid === userObj.uid) {
        arr.push(item.title);
      }
    });
    number = arr.length;
    if (number < 10) {
      levelText = "새싹";
      levelEmoji = "🌱";
    } else if (number >= 10 && number < 20) {
      levelText = "잎새";
      levelEmoji = "🌱🌱";
    } else if (number >= 20 && number < 30) {
      levelText = "화분";
      levelEmoji = "🪴";
    } else if (number >= 40 && number < 50) {
      levelText = "나무";
      levelEmoji = "🌳";
    } else if (number >= 50) {
      levelText = "독서왕";
      levelEmoji = "👑";
    }
  }

  return (
    <div className="mt-10 flex flex-col justify-center items-center profile">
      <div className="flex">
        <div className="flex items-end ">
          {editing ? (
            <>
              <input
                type="text"
                onChange={onChange}
                value={newName}
                placeholder="닉네임을 입력하세요"
                className="outline-none border-b border-[#8D6D48] bg-inherit "
              />
              <div
                onClick={onSubmit}
                className="ml-3 text-xs font-bold text-[#8D6D48] hover:cursor-pointer updateName"
              >
                수정 완료
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {userObj.displayName}님의 프로필
              </div>
              <div
                onClick={() => {
                  setEditing(true);
                }}
                className="ml-3 text-xs font-bold text-[#8D6D48] hover:cursor-pointer updateName"
              >
                이름 수정하기
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <p>
          {userObj.displayName}님의 현재 등급은{" "}
          <span className="text-xl">
            {levelText}
            {levelEmoji}
          </span>
          입니다.
        </p>
        <p>
          현재까지 작성한 글은 <span className="text-xl">{number}개</span>이며,
          다음 등급 달성까지 <span className="text-xl">{10 - number}개</span>{" "}
          남았습니다.
        </p>
      </div>
      <div className="mt-10">
        <span
          onClick={onLogOutClick}
          className="bg-[#A09C94] p-1 px-2  rounded-md text-white hover:cursor-pointer "
        >
          로그아웃
        </span>
      </div>
    </div>
  );
};
