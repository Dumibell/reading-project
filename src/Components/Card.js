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
import { useNavigate, useParams, Link } from "react-router-dom";
import { dbService } from "../firebase";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export const Card = ({ item, userObj, search, isLoggedIn, setLoginModal }) => {
  const itemRef = doc(dbService, "writings", `${item.id}`);
  const navigate = useNavigate();

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
      setLoginModal(true);
    }
  };

  const showSearchList = () => {
    if (
      item.title.includes(search) ||
      item.text.includes(search) ||
      search === ""
    ) {
      return (
        <div className="flex justify-center">
          <div className="w-[900px]  border-b pb-3 mt-6 m-4 flex justify-between">
            <div className="w-full flex flex-col justify-between">
              <div
                onClick={() => navigate(`/detailpage/${item.id}`)}
                className="hover:cursor-pointer"
              >
                <div className="text-xl font-bold mb-1">{item.title}</div>
                <div className="mb-1 h-[70px] overflow-hidden">
                  {item.text.replace(/\\n/gi, " ")}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="italic opacity-80">
                  <span>{item.createdDate}</span>
                  <span className="ml-3">by {item.name}</span>
                </div>
                <div className="mr-3">
                  {isLoggedIn ? (
                    <>
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
                      )}{" "}
                    </>
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
            </div>
            <img
              src={item.attachmentURL}
              alt="사진"
              className="min-w-[160px] min-h-[160px] w-[160px] h-[160px] object-cover ml-2"
            />
          </div>
        </div>
      );
    }
  };

  return <div>{showSearchList()}</div>;
};
