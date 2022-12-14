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

  // const onSubmit = useEffect(() => {
  //   updateProfile(authService.currentUser, { displayName: newName });
  // });

  if (userObj) {
    let arr = [];
    recentWritings.forEach((item) => {
      if (item.uid === userObj.uid) {
        arr.push(item.title);
      }
    });
    number = arr.length;
    if (number < 10) {
      levelText = "μμΉ";
      levelEmoji = "π±";
    } else if (number >= 10 && number < 20) {
      levelText = "μμ";
      levelEmoji = "π±π±";
    } else if (number >= 20 && number < 30) {
      levelText = "νλΆ";
      levelEmoji = "πͺ΄";
    } else if (number >= 40 && number < 50) {
      levelText = "λλ¬΄";
      levelEmoji = "π³";
    } else if (number >= 50) {
      levelText = "λμμ";
      levelEmoji = "π";
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
                placeholder="λλ€μμ μλ ₯νμΈμ"
                className="outline-none border-b border-[#8D6D48] bg-inherit "
              />
              <div
                onClick={onSubmit}
                className="ml-3 text-xs font-bold text-[#8D6D48] hover:cursor-pointer updateName"
              >
                μμ  μλ£
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {userObj.displayName}λμ νλ‘ν
              </div>
              <div
                onClick={() => {
                  setEditing(true);
                }}
                className="ml-3 text-xs font-bold text-[#8D6D48] hover:cursor-pointer updateName"
              >
                μ΄λ¦ μμ νκΈ°
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <p>
          {userObj.displayName}λμ νμ¬ λ±κΈμ{" "}
          <span className="text-xl">
            {levelText}
            {levelEmoji}
          </span>
          μλλ€.
        </p>
        <p>
          νμ¬κΉμ§ μμ±ν κΈμ <span className="text-xl">{number}κ°</span>μ΄λ©°,
          λ€μ λ±κΈ λ¬μ±κΉμ§ <span className="text-xl">{10 - number}κ°</span>{" "}
          λ¨μμ΅λλ€.
        </p>
      </div>
      <div className="mt-10">
        <span
          onClick={onLogOutClick}
          className="bg-[#A09C94] p-1 px-2  rounded-md text-white hover:cursor-pointer "
        >
          λ‘κ·Έμμ
        </span>
      </div>
    </div>
  );
};
