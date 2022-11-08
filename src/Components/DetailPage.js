import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { async } from "@firebase/util";
import { Navigation } from "./Navigation";
import { deleteObject, ref } from "firebase/storage";

export const DetailPage = ({ userObj }) => {
  const [cardDetail, setCardDetail] = useState();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newText, setNewText] = useState();

  const navigate = useNavigate();
  const params = useParams();

  const docRef = doc(dbService, "writings", `${params.id}`);

  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setCardDetail(docSnap.data());
        setNewText(docSnap.data().text.replace(/\\n/gi, "\n"));
        setNewTitle(docSnap.data().title);
      }
    });
  }, []);

  const deleteCard = async () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      await deleteDoc(docRef);
      await deleteObject(ref(storageService, cardDetail.attachmentURL));
      navigate("/");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setNewTitle(value);
    } else if (name === "text") {
      setNewText(value);
    }
  };

  const edit = async (event) => {
    if (!editing) {
      setEditing(true);
    } else {
      await updateDoc(docRef, { text: newText, title: newTitle });
      alert("수정이 완료되었습니다!");
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 h-4/5 m-10 flex flex-col">
        {cardDetail ? (
          <>
            <div className="flex justify-between">
              {editing ? (
                <input
                  type="text"
                  name="title"
                  placeholder="책 제목"
                  required
                  value={newTitle}
                  onChange={onChange}
                  className="text-3xl bg-transparent outline-none w-[90%] px-1 mb-5"
                />
              ) : (
                <div className="text-3xl mb-5 pb-2">{cardDetail.title}</div>
              )}

              {userObj.uid === cardDetail.uid ? (
                <div className="mt-4 w-[100px]">
                  <span
                    className="text-sm text-[#A09C94] mx-1 hover:cursor-pointer"
                    onClick={edit}
                  >
                    수정
                  </span>
                  <span
                    className="text-sm text-[#A09C94] mx-1 hover:cursor-pointer"
                    onClick={deleteCard}
                  >
                    삭제
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>

            <img
              src={cardDetail.attachmentURL}
              className="max-w-1/2 max-h-[500px] object-cover"
              alt="이미지"
            />
            {editing ? (
              <div className="flex flex-col justify-between flex-1 mt-3">
                <textarea
                  name="text"
                  value={newText}
                  spellCheck="false"
                  onChange={onChange}
                  className="bg-transparent outline-none w-full flex-1 px-2
                 resize-none scrollbar-hide"
                />
              </div>
            ) : (
              <div className="whitespace-pre-line mt-3">
                {cardDetail.text.replace(/\\n/gi, "\n")}
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
