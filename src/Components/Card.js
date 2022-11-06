import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  arrayUnion,
  FieldValue,
  arrayRemove,
} from "firebase/firestore";
import { dbService } from "../firebase";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export const Card = ({ item, userObj }) => {
  const itemRef = doc(dbService, "writings", `${item.id}`);

  const plusLike = (event) => {
    updateDoc(itemRef, { like: item.like + 1 });
    updateDoc(itemRef, { whoLikesIt: arrayUnion(userObj.uid) });
  };

  const minusLike = (event) => {
    updateDoc(itemRef, { like: item.like - 1 });
    updateDoc(itemRef, { whoLikesIt: arrayRemove(userObj.uid) });
  };

  const clickLikeButton = async () => {
    if (userObj) {
      if (item.whoLikesIt.includes(userObj.uid)) {
        minusLike();
      } else {
        plusLike();
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-[1000px] border-b pb-3 mt-5 m-4 flex justify-between">
          <div className="w-[700px]">
            <div className="text-xl font-bold mb-1">{item.title}</div>
            <div className="mb-1">{item.text}</div>
            <div>
              {item.whoLikesIt.includes(userObj.uid) ? (
                <FontAwesomeIcon
                  icon={solidHeart}
                  onClick={clickLikeButton}
                  className="text-[red] hover:cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={regularHeart}
                  onClick={clickLikeButton}
                  className="hover:cursor-pointer"
                />
              )}
              <span className="ml-1">{item.like}</span>
            </div>
          </div>
          <div className="w-40 h-40 border">img</div>
        </div>
      </div>
    </div>
  );
};
