import { useEffect, useState } from "react";
import { useParams, useNavigate, useHistory } from "react-router-dom";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { async } from "@firebase/util";
import { Navigation } from "./Navigation";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Comment } from "./Comment";

export const DetailPage = ({ userObj, isLoggedIn }) => {
  const [cardDetail, setCardDetail] = useState();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newText, setNewText] = useState();
  const [commentArr, setCommentArr] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const date = new Date();

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

  useEffect(() => {
    const q = query(
      collection(docRef, "comments"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const comArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentArr(comArr);
    });
  }); //댓글 가져오기

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
      setEditing(false);
    }
  };

  const onChangeComment = (e) => {
    const {
      target: { value },
    } = e;
    setComment(value);
  };

  const onSubmitComment = async () => {
    await addDoc(collection(docRef, "comments"), {
      uid: userObj.uid,
      name: userObj.displayName,
      comment: comment,
      date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
      createdAt: Date.now(),
    });
    setComment("");
  };

  return (
    <>
      <div className="w-full h-full flex  flex-col justify-center items-center overflow-visible">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fixed top-10 left-10 hover:cursor-pointer detailArrow"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="w-1/2 h-4/5 m-10 flex flex-col mt-14 detail">
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

                {isLoggedIn ? (
                  <>
                    {userObj.uid === cardDetail.uid ||
                    userObj.uid === "HbGSziRbdjXRCi1FdKT8Mbn6FT62" ? (
                      <div className="mt-4 w-[100px] flex justify-end">
                        <span
                          className="border-b border-[#A09C94] text-[#A09C94] h-[16px] mx-1 hover:cursor-pointer text-xs"
                          onClick={edit}
                        >
                          수정
                        </span>
                        <span
                          className="border-b border-[#A09C94] text-[#A09C94] h-[16px] ml-1 hover:cursor-pointer text-xs"
                          onClick={deleteCard}
                        >
                          삭제
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="text-xs italic  flex justify-between">
                <span>
                  {cardDetail.createdDate} by {cardDetail.name}
                </span>
                {isLoggedIn ? (
                  <>
                    {" "}
                    {userObj.uid === cardDetail.uid ||
                    userObj.uid === "HbGSziRbdjXRCi1FdKT8Mbn6FT62" ? (
                      <span>조회수: {cardDetail.visitor}</span>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>

              {editing ? (
                <div className="flex flex-col flex-1 my-3">
                  <img
                    src={cardDetail.attachmentURL}
                    className="w-1/4  object-cover"
                    alt="이미지"
                  />
                  <textarea
                    name="text"
                    value={newText}
                    spellCheck="false"
                    onChange={onChange}
                    className="bg-transparent outline-none w-full h-screen
                 scrollbar-hide"
                  />
                </div>
              ) : (
                <div className="mt-3 pb-16">
                  <img
                    src={cardDetail.attachmentURL}
                    className="w-full  object-cover"
                    alt="이미지"
                  />
                  <div className="whitespace-pre-line mt-5">
                    {cardDetail.text.replace(/\\n/gi, "\n")}
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-1/2 comment mb-20 font-gothic text-sm">
          <div>
            {commentArr && commentArr.length > 0 ? (
              <div className="pb-3">
                {commentArr.map((c) => {
                  return (
                    <Comment
                      id={c.id}
                      uid={c.uid}
                      comment={c.comment}
                      name={c.name}
                      date={c.date}
                      docRef={docRef}
                      userObj={userObj}
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}

            {userObj ? (
              <form
                className="flex w-full  mt-3 border-b"
                onSubmit={onSubmitComment}
              >
                <div>{userObj.displayName}: </div>
                <input
                  type="text"
                  placeholder="댓글을 남겨주세요"
                  className=" flex-1 outline-none bg-inherit ml-2 mb-1"
                  value={comment}
                  onChange={onChangeComment}
                />
                <input
                  type="submit"
                  value="제출"
                  className="text-sm ml-2 rounded-md bg-[gray] text-white px-1.5 mb-1"
                />
              </form>
            ) : (
              <div className="flex w-full  mt-3 border-b">
                <input
                  type="text"
                  placeholder="로그인하고 댓글을 남겨보세요!"
                  className=" flex-1 outline-none bg-inherit ml-2 mb-1"
                />
                <input
                  type="submit"
                  value="제출"
                  className="text-sm ml-2 rounded-md bg-[gray] text-white px-1.5 mb-1"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
