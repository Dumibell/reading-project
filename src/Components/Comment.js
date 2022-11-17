import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Comment = ({ id, uid, comment, name, date, docRef, userObj }) => {
  const commentRef = doc(docRef, "comments", `${id}`);

  const deleteComment = async () => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      await deleteDoc(commentRef);
    }
  };
  return (
    <div className="my-3 py-0.5 flex border-b  justify-between">
      <div>
        <span className="font-bold">{name}: </span>
        <span className="ml-1">{comment}</span>
        <span className="ml-2 text-[gray] italic text-[5px] mt-2">{date}</span>
      </div>
      <div>
        {userObj &&
        (userObj.uid === uid ||
          userObj.uid === "HbGSziRbdjXRCi1FdKT8Mbn6FT62") ? (
          <button onClick={deleteComment} className="ml-1">
            <FontAwesomeIcon icon={faTrash} className="text-[gray]" />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
