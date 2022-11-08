import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../firebase";
import { async } from "@firebase/util";

export const DetailPage = ({ userObj }) => {
  const [cardDetail, setCardDetail] = useState();

  const docRef = doc(dbService, "writings", `${useParams().id}`);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setCardDetail(docSnap.data());
      }
    });
  }, []);

  const deleteCard = async () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      await deleteDoc(docRef);
      navigate("/");
    }
  };

  const editCard = async () => {
    navigate("/writing");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[60%] h-4/5 m-10 flex flex-col">
        {cardDetail ? (
          <>
            <div className="flex justify-between">
              <div className="text-3xl mb-5 pb-2">{cardDetail.title}</div>
              {userObj.uid === cardDetail.uid ? (
                <div className="mt-4">
                  <span className="text-sm text-[#A09C94] mx-1 hover:cursor-pointer">
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
            <div className="whitespace-pre-wrap">
              {cardDetail.text.replace(/\\n/gi, "\n")}
            </div>
          </>
        ) : (
          "initializing..."
        )}
      </div>
    </div>
  );
};
