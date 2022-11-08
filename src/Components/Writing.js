import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { dbService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

export const Writing = ({ userObj }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const date = new Date();

  const cancelWriting = () => {
    if (window.confirm("글 작성을 취소하시겠습니까?")) {
      navigate("/");
    }
  };

  const userRef = doc(dbService, "writings", "users");

  const onChange = async (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "text") {
      setText(value.replace(/\n/gi, "\\n")); //줄바꿈시 \n이 추가되어 db에 저장되도록
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("책 제목을 입력해주세요");
    } else if (text === "") {
      alert("내용을 입력해주세요");
    } else if (window.confirm("작성글을 게시하시겠습니까?")) {
      await addDoc(collection(userRef, `${userObj.uid}`), {
        title: title,
        text: text,
        createdAt: Date.now(),
        createdDate: `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()}`,
        like: 0,
        whoLikesIt: [],
        month: `${date.getFullYear()}.${date.getMonth() + 1}`,
        uid: userObj.uid,
      });
      await addDoc(collection(dbService, "writings"), {
        title: title,
        text: text,
        createdAt: Date.now(),
        createdDate: `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()}`,
        like: 0,
        whoLikesIt: [],
        month: `${date.getFullYear()}.${date.getMonth() + 1}`,
        uid: userObj.uid,
      });
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#FBF7EE]">
      <div className="w-[60%] h-4/5 m-10 flex flex-col">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col flex-1">
            <div className="text-3xl border-b mb-5 pb-2">
              <input
                type="text"
                name="title"
                placeholder="책 제목"
                required
                onChange={onChange}
                className="bg-transparent outline-none w-full px-1"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <textarea
                name="text"
                placeholder="읽고 느낀 점을 자유롭게 작성해주세요"
                required
                spellCheck="false"
                onChange={onChange}
                className="bg-transparent outline-none w-full flex-1 px-2
                resize-none scrollbar-hide"
              />
            </div>
          </div>
          <div className="text-[#9CA3AF] py-3 border-b text-sm">
            <label for="photoFile" className="hover:cursor-pointer">
              <FontAwesomeIcon icon={faPhotoFilm} />
              사진 첨부
            </label>
            <input
              type="file"
              accept="image/*"
              id="photoFile"
              className="opacity-0"
            />
          </div>
          <div className="flex justify-end mt-3">
            <span
              onClick={cancelWriting}
              className="bg-[#A09C94] text-white rounded-md p-1 px-2 mr-2 hover:cursor-pointer"
            >
              취소
            </span>
            <span
              onClick={onSubmit}
              className="bg-[#A09C94] text-white rounded-md px-2 p-1 hover:cursor-pointer"
            >
              게시
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
