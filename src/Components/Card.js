import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userObjAtom } from "../atom";

export const Card = ({ item, search, setLoginModal }) => {
  const itemRef = doc(dbService, "writings", `${item.id}`);
  const navigate = useNavigate();

  const userObj = useRecoilValue(userObjAtom);

  const plusLike = () => {
    updateDoc(itemRef, { like: item.like + 1 });
    updateDoc(itemRef, { whoLikesIt: arrayUnion(userObj.uid) });
  };

  const minusLike = () => {
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

  const onClick = () => {
    if (userObj && userObj.uid !== item.uid) {
      updateDoc(itemRef, { visitor: item.visitor + 1 }); //다른 사용자들이 눌렀을 때만 조회수 집계
    }
    navigate(`/detailpage/${item.id}`);
  };

  const showSearchList = () => {
    return (
      <div className="flex justify-center">
        <div className="w-[900px]  border-b pb-3 mt-6 m-4 flex justify-between">
          <div className="w-full flex flex-col justify-between">
            <div onClick={onClick} className="hover:cursor-pointer">
              <div className="text-xl font-bold mb-1 bookTitle">
                {item.title}
              </div>
              <div className="mb-1 h-[70px] overflow-hidden cardHeight">
                {item.text.replace(/\\n/gi, " ")}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className="italic opacity-80 dateAndName">
                <span>{item.createdDate}</span>
                <span className="ml-3">by {item.name}</span>
              </div>
              <div className="mr-3">
                {!!userObj ? (
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
            className="min-w-[160px] min-h-[160px] w-[160px] h-[160px] object-cover ml-2 cardImg"
          />
        </div>
      </div>
    );
  };

  return <div>{showSearchList()}</div>;
};
